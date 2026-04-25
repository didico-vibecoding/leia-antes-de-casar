import { ArrowRight, CheckCircle2, CircleDashed, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { checklistCategories, modules } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";

const Progresso = () => {
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;
  const totalChecklist = checklistCategories.reduce((sum, category) => sum + category.items.length, 0);
  const checklistDone = Object.values(progress.checklistItems).filter(Boolean).length;
  const nextModule = modules.find((module) => !progress.modulosConcluidos.includes(module.id)) ?? modules[0];
  const circumference = 2 * Math.PI * 54;
  const percentage = (completed / modules.length) * 100;

  return (
    <section className="section-pad">
      <div className="content-wrap">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Seu progresso</p>
          <h1 className="text-4xl font-bold md:text-6xl">Acompanhe sua jornada de consciência.</h1>
        </div>
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-lg border bg-card p-6 text-center shadow-card">
            <div className="relative mx-auto h-36 w-36">
              <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
                <circle cx="64" cy="64" r="54" className="fill-none stroke-muted" strokeWidth="10" />
                <circle cx="64" cy="64" r="54" className="fill-none stroke-primary transition-all duration-700" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (percentage / 100) * circumference} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-bold">{completed}/5</span><span className="text-xs font-bold text-muted-foreground">módulos</span></div>
            </div>
            <div className="mt-6 rounded-md bg-soft p-4 text-left">
              <div className="mb-2 flex items-center gap-2 font-bold"><ListChecks className="h-5 w-5 text-secondary" /> Checklist</div>
              <p className="mb-2 text-sm text-muted-foreground">{checklistDone} de {totalChecklist} itens concluídos</p>
              <ProgressBar value={(checklistDone / totalChecklist) * 100} />
            </div>
            <Button asChild className="mt-5 w-full" variant="hero"><Link to={`/trilha/${nextModule.id}`}>Continuar de onde parei <ArrowRight /></Link></Button>
          </aside>
          <div className="grid gap-4">
            {modules.map((module) => {
              const done = progress.modulosConcluidos.includes(module.id);
              const quiz = progress.quizResultados[module.id];
              return (
                <article key={module.id} className="rounded-lg border bg-card p-5 shadow-card">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-muted-foreground">{done ? <CheckCircle2 className="h-4 w-4 text-success" /> : <CircleDashed className="h-4 w-4" />} Módulo {module.id}</div>
                      <h2 className="text-2xl font-bold">{module.titulo}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{done ? "Concluído" : quiz ? "Quiz iniciado" : "Não iniciado"}{quiz ? ` · Nota ${quiz.acertos}/${quiz.total}` : ""}</p>
                    </div>
                    <Button asChild variant={done ? "soft" : "default"}><Link to={`/trilha/${module.id}`}>{done ? "Revisar" : "Abrir"}</Link></Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Progresso;
