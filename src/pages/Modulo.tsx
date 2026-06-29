import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { boxStyles, modules } from "@/data/appData";
import uniaoEstavelInfografico from "@/assets/uniao-estavel-vs-casamento.png.asset.json";
import mudancaDeNomeInfografico from "@/assets/mudanca-de-nome.png.asset.json";
import escolhendoRegimeInfografico from "@/assets/escolhendo-regime-de-bens.png.asset.json";
import pactoAntenupcialInfografico from "@/assets/pacto-antenupcial.png.asset.json";

const renderText = (text: string) => <span>{text}</span>;

const Modulo = () => {
  const { moduloId } = useParams();
  const module = modules.find((item) => item.id === Number(moduloId));
  const [scroll, setScroll] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openInfografico, setOpenInfografico] = useState<"uniao" | "nome" | "regime" | "pacto" | null>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const score = useMemo(() => module?.quiz.reduce((total, question, index) => total + (answers[index] === question.correta ? 1 : 0), 0) ?? 0, [answers, module]);

  if (!module) return <Navigate to="/trilha" replace />;

  const next = modules.find((item) => item.id === module.id + 1);
  const allAnswered = module.quiz.every((_, index) => answers[index]);

  const finish = () => {
    toast.success("Módulo concluído! 🎉", { description: `Você acertou ${score} de ${module.quiz.length}.` });
  };

  return (
    <article>
      <div className="fixed left-0 right-0 top-16 z-30"><ProgressBar value={scroll} className="h-1 rounded-none" /></div>
      <header className="section-pad bg-warm-gradient">
        <div className="mx-auto max-w-3xl">
          <Button asChild variant="ghost" className="mb-8"><Link to="/trilha"><ArrowLeft /> Voltar à trilha</Link></Button>
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-primary"><span>Módulo {module.id}</span><span>{module.tempo}</span></div>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">{module.titulo}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{module.resumo}</p>
        </div>
      </header>
      <div className="section-pad">
        <div className="mx-auto max-w-[680px] space-y-10">
          {module.id === 1 && (
            <figure className="space-y-2">
              <button
                type="button"
                onClick={() => setOpenInfografico("uniao")}
                className="block w-full overflow-hidden rounded-lg border-2 transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ borderColor: "#005D99" }}
                aria-label="Abrir infográfico União Estável vs. Casamento em tela cheia"
              >
                <img
                  src={uniaoEstavelInfografico.url}
                  alt="Infográfico comparando União Estável e Casamento Civil: definição, contrato, regime de bens, estado civil e possibilidade de acrescentar sobrenome, conforme o Código Civil brasileiro."
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </button>
              <figcaption className="text-center text-sm text-muted-foreground">
                Toque na imagem para ampliar
              </figcaption>
            </figure>
          )}
          {module.sections.map((section) => (
            <section key={section.titulo} className="space-y-4">
              <h2 className="text-3xl font-bold">{section.titulo}</h2>
              {section.paragrafos.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-foreground/85">{renderText(paragraph)}</p>)}
              {section.box && (() => {
                const style = boxStyles[section.box.tipo];
                const Icon = style.icon;
                return (
                  <div className={`mt-5 rounded-lg border p-5 ${style.className}`}>
                    <div className="mb-2 flex items-center gap-2 font-bold"><Icon className="h-5 w-5" /> {section.box.tipo}:</div>
                    <p className="leading-7">{renderText(section.box.texto)}</p>
                  </div>
                );
              })()}
              {module.id === 1 && section.titulo === "Nome: escolha, não obrigação" && (
                <figure className="space-y-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenInfografico("nome")}
                    className="block w-full overflow-hidden rounded-lg border-2 transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{ borderColor: "#005D99" }}
                    aria-label="Abrir infográfico Mudança de Nome em tela cheia"
                  >
                    <img
                      src={mudancaDeNomeInfografico.url}
                      alt="Infográfico Mudança de Nome: Um Quebra-Cabeça de Possibilidades. Apresenta princípios gerais (igualdade de direitos e caráter facultativo), possibilidades do Código Civil (adição, permuta, supressão) e como proceder antes e depois do casamento."
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="text-center text-sm text-muted-foreground">
                    Toque na imagem para ampliar
                  </figcaption>
                </figure>
              )}
              {module.id === 2 && section.titulo === "Universal, separação total e participação final" && (
                <figure className="space-y-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenInfografico("regime")}
                    className="block w-full overflow-hidden rounded-lg border-2 transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{ borderColor: "#005D99" }}
                    aria-label="Abrir infográfico Escolhendo o Regime de Bens em tela cheia"
                  >
                    <img
                      src={escolhendoRegimeInfografico.url}
                      alt="Infográfico Escolhendo o Regime de Bens: Um Checklist para o Futuro. Compara Comunhão Parcial, Comunhão Universal e Separação Total de bens com exemplos e artigos do Código Civil."
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="text-center text-sm text-muted-foreground">
                    Toque na imagem para ampliar
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
          <section className="rounded-lg border bg-card p-5 shadow-card">
            <h2 className="text-3xl font-bold">Mini-quiz</h2>
            <div className="mt-6 space-y-7">
              {module.quiz.map((question, qIndex) => (
                <fieldset key={question.pergunta} className="space-y-3">
                  <legend className="font-semibold">{qIndex + 1}. {question.pergunta}</legend>
                  <div className="grid gap-2">
                    {question.alternativas.map((answer) => {
                      const selected = answers[qIndex] === answer;
                      const isCorrect = answer === question.correta;
                      const answered = Boolean(answers[qIndex]);
                      return (
                        <button key={answer} type="button" onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: answer }))} className={`rounded-md border px-4 py-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10" : answered && isCorrect ? "border-success/50 bg-success/5" : "bg-background hover:bg-muted"}`}>
                          {answer}
                        </button>
                      );
                    })}
                  </div>
                  {answers[qIndex] && (
                    <p className={`flex items-start gap-2 text-sm ${answers[qIndex] === question.correta ? "text-success" : "text-destructive"}`}>
                      {answers[qIndex] === question.correta ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <XCircle className="mt-0.5 h-4 w-4" />}
                      <span>{question.explicacao}</span>
                    </p>
                  )}
                </fieldset>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">Pontuação: {score} de {module.quiz.length}</p>
              <Button onClick={finish} disabled={!allAnswered}>Concluir módulo</Button>
            </div>
          </section>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline"><Link to="/trilha"><ArrowLeft /> Ver todos</Link></Button>
            {next ? <Button asChild variant="calm"><Link to={`/trilha/${next.id}`}>Próximo módulo <ArrowRight /></Link></Button> : <Button asChild variant="calm"><Link to="/trilha">Ver todos <ArrowRight /></Link></Button>}
          </div>
        </div>
      </div>
      <Dialog open={openInfografico !== null} onOpenChange={(open) => { if (!open) setOpenInfografico(null); }}>
        <DialogContent className="max-w-[98vw] max-h-[95vh] overflow-auto p-2 sm:p-4">
          <DialogTitle className="sr-only">
            {openInfografico === "uniao" && "Infográfico União Estável vs. Casamento"}
            {openInfografico === "nome" && "Infográfico Mudança de Nome"}
            {openInfografico === "regime" && "Infográfico Escolhendo o Regime de Bens"}
          </DialogTitle>
          <img
            src={openInfografico === "uniao" ? uniaoEstavelInfografico.url : openInfografico === "nome" ? mudancaDeNomeInfografico.url : escolhendoRegimeInfografico.url}
            alt={openInfografico === "uniao" ? "Infográfico ampliado comparando União Estável e Casamento Civil." : openInfografico === "nome" ? "Infográfico ampliado Mudança de Nome: Um Quebra-Cabeça de Possibilidades." : "Infográfico ampliado Escolhendo o Regime de Bens: Um Checklist para o Futuro."}
            className="block h-auto w-full max-w-none"
          />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default Modulo;
