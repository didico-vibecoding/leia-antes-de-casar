import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Loader2, Mic, RotateCcw, Send, ShieldCheck, Square } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

type SpeechRecognitionResultEvent = Event & {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const getSpeechRecognition = () => window.SpeechRecognition ?? window.webkitSpeechRecognition;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
};

const ConsultaAudio = () => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isRecording) return undefined;
    const interval = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const startRecording = () => {
    const SpeechRecognitionApi = getSpeechRecognition();
    if (!SpeechRecognitionApi) {
      toast.error("Gravação por voz indisponível", { description: "Digite seu relato no campo de texto para receber a orientação." });
      return;
    }

    const recognition = new SpeechRecognitionApi();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const text = event.results[index][0]?.transcript ?? "";
        if (event.results[index].isFinal) finalText += `${text} `;
        else interimText += text;
      }

      if (finalText) setTranscript((current) => `${current}${finalText}`.trimStart());
      setInterimTranscript(interimText);
    };
    recognition.onerror = () => {
      setIsRecording(false);
      toast.error("Não consegui captar o áudio", { description: "Confira a permissão do microfone ou escreva seu relato." });
    };
    recognition.onend = () => {
      setIsRecording(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    setAnswer("");
    setSeconds(0);
    setIsRecording(true);
    recognition.start();
  };

  const stopRecording = () => recognitionRef.current?.stop();

  const resetConsultation = () => {
    recognitionRef.current?.stop();
    setTranscript("");
    setInterimTranscript("");
    setAnswer("");
    setSeconds(0);
    setIsRecording(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const report = transcript.trim();
    if (!report || isSending) return;

    setIsSending(true);
    setAnswer("");

    const { data, error } = await supabase.functions.invoke("legal-chat", {
      body: {
        messages: [
          {
            role: "user",
            content: `A pessoa gravou este relato sobre sua situação antes do casamento. Faça uma triagem educativa, identifique os temas jurídicos envolvidos, explique riscos e próximos passos práticos sem dar aconselhamento personalizado. Relato: ${report}`,
          },
        ],
      },
    });

    setIsSending(false);

    if (error || !data?.answer) {
      toast.error("Não consegui analisar o relato", { description: "Tente novamente em alguns instantes." });
      return;
    }

    setAnswer(data.answer);
  };

  return (
    <section className="section-pad bg-warm-gradient">
      <div className="content-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5 animate-reveal">
          <span className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 text-sm font-semibold text-primary shadow-card">
            <Mic className="h-4 w-4" /> Consulta guiada por voz
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">Conte sua situação em voz alta.</h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              A IA transforma seu relato em uma orientação educativa, aponta temas sensíveis e sugere caminhos seguros antes do casamento civil.
            </p>
          </div>
          <div className="soft-panel grid gap-3 p-4 text-sm leading-relaxed sm:grid-cols-2">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <p>Indica pontos que merecem atenção, como bens, dívidas, herança, filhos e empresa.</p>
            </div>
            <div className="flex gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <p>Organiza o relato em uma visão clara para conversar com o par ou com um advogado.</p>
            </div>
          </div>
        </div>

        <div className="editorial-card p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <div>
                <p className="font-serif text-2xl font-bold">Relato da situação</p>
                <p className="text-sm text-muted-foreground">{isRecording ? `Gravando ${formatTime(seconds)}` : "Áudio ou texto"}</p>
              </div>
              <div className="flex gap-2">
                {isRecording ? (
                  <Button type="button" variant="destructive" onClick={stopRecording}>
                    <Square className="h-4 w-4" /> Parar
                  </Button>
                ) : (
                  <Button type="button" variant="secondary" onClick={startRecording} disabled={isSending}>
                    <Mic className="h-4 w-4" /> Gravar
                  </Button>
                )}
                <Button type="button" variant="outline" size="icon" onClick={resetConsultation} aria-label="Limpar consulta">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="consultation-transcript" className="text-sm font-semibold text-foreground">Transcrição editável</label>
              <Textarea
                id="consultation-transcript"
                value={interimTranscript ? `${transcript}${transcript ? " " : ""}${interimTranscript}` : transcript}
                onChange={(event) => setTranscript(event.target.value)}
                placeholder="Grave ou descreva sua situação atual..."
                className="min-h-44 resize-y bg-background text-base leading-relaxed"
              />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isSending || isRecording || !transcript.trim()}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Receber orientação
            </Button>
          </form>

          {answer && (
            <div className="mt-6 rounded-lg border bg-soft p-4 text-soft-foreground">
              <p className="mb-3 font-serif text-xl font-bold">Orientação inicial</p>
              <div className="prose prose-sm max-w-none text-soft-foreground prose-p:leading-relaxed prose-strong:text-inherit prose-li:marker:text-primary">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConsultaAudio;