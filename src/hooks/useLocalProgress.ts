import { useCallback, useEffect, useMemo, useState } from "react";

export type QuizResult = { acertos: number; total: number };
export type AppProgress = {
  modulosConcluidos: number[];
  quizResultados: Record<string, QuizResult>;
  checklistItems: Record<string, boolean>;
  simuladorResultado?: Record<string, unknown>;
};

const STORAGE_KEY = "viver-de-bem-casado-progress";
const initialProgress: AppProgress = { modulosConcluidos: [], quizResultados: {}, checklistItems: {} };

const readProgress = (): AppProgress => {
  if (typeof window === "undefined") return initialProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialProgress, ...JSON.parse(raw) } : initialProgress;
  } catch {
    return initialProgress;
  }
};

export const useLocalProgress = () => {
  const [progress, setProgress] = useState<AppProgress>(readProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("vbc-progress"));
  }, [progress]);

  useEffect(() => {
    const sync = () => setProgress(readProgress());
    const sync = () => {
      const next = readProgress();
      setProgress((current) => (JSON.stringify(current) === JSON.stringify(next) ? current : next));
    };
    window.addEventListener("storage", sync);
    window.addEventListener("vbc-progress", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("vbc-progress", sync);
    };
  }, []);

  const completeModule = useCallback((moduleId: number, result?: QuizResult) => {
    setProgress((prev) => ({
      ...prev,
      modulosConcluidos: Array.from(new Set([...prev.modulosConcluidos, moduleId])).sort((a, b) => a - b),
      quizResultados: result ? { ...prev.quizResultados, [moduleId]: result } : prev.quizResultados,
    }));
  }, []);

  const setChecklistItem = useCallback((itemId: string, checked: boolean) => {
    setProgress((prev) => ({ ...prev, checklistItems: { ...prev.checklistItems, [itemId]: checked } }));
  }, []);

  const clearChecklist = useCallback(() => {
    setProgress((prev) => ({ ...prev, checklistItems: {} }));
  }, []);

  const saveSimulator = useCallback((value: Record<string, unknown>) => {
    setProgress((prev) => ({ ...prev, simuladorResultado: value }));
  }, []);

  return useMemo(() => ({ progress, completeModule, setChecklistItem, clearChecklist, saveSimulator }), [progress, completeModule, setChecklistItem, clearChecklist, saveSimulator]);
};
