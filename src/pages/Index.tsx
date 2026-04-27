import { ArrowRight, BookOpen, CheckCircle2, Heart, Scale, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { modules } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";

const projectPillars = [
  {
    title: "Clareza antes do sim",
    description: "Conteúdo direto para entender efeitos práticos do casamento sem linguagem complicada.",
    icon: BookOpen,
  },
  {
    title: "Decisão patrimonial consciente",
    description: "Comparação de regimes de bens, dívidas, herança e partilha com exemplos do cotidiano.",
    icon: Scale,
  },
  {
    title: "Cuidado com o futuro",
    description: "Uma experiência leve para transformar temas difíceis em conversas mais honestas.",
    icon: Shield,
  },
];

const Index = () => {
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;

  return (
    <div>
      <HeroHighlight containerClassName="section-pad bg-warm-gradient">
        <div className="content-wrap grid min-h-[calc(100vh-11rem)] items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Plataforma educativa para casais
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance font-serif text-5xl font-bold leading-tight tracking-normal text-foreground md:text-7xl">
                <Highlight className="text-foreground">Leia isso antes de casar!</Highlight>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                Um projeto para ajudar pessoas a conversarem sobre casamento, patrimônio, filhos, dívidas e
                futuro com mais clareza — sem juridiquês e sem perder a leveza.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="hero">
                <Link to="/trilha">
                  Explorar a trilha <ArrowRight />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/simulador">Fazer o simulador</Link>
              </Button>
            </div>

            {completed > 0 && (
              <div className="max-w-md rounded-lg border bg-card/80 p-4 shadow-card backdrop-blur">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span>Você completou {completed} de 5 módulos</span>

                  <span>{Math.round((completed / modules.length) * 100)}%</span>
                </div>

                <ProgressBar value={(completed / modules.length) * 100} />
              </div>
            )}
          </motion.div>

          <div className="relative flex min-h-[360px] items-center justify-center">
            <div className="absolute inset-8 rounded-full border border-primary/20 bg-card/35 blur-3xl" />

            <div className="relative flex aspect-square w-full max-w-md animate-float items-center justify-center rounded-full border bg-card/70 shadow-soft backdrop-blur-sm motion-reduce:animate-none">
              <Heart className="h-36 w-36 text-primary" strokeWidth={1.3} />

              <div className="absolute left-16 top-20 h-24 w-24 rounded-full border-4 border-secondary/45" />

              <div className="absolute right-16 bottom-20 h-24 w-24 rounded-full border-4 border-primary/45" />
            </div>
          </div>
        </div>
      </HeroHighlight>

      <section className="section-pad">
        <div className="content-wrap">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Por que esse projeto existe</h2>

            <p className="mt-3 text-muted-foreground">
              Casar também é uma decisão jurídica e patrimonial. A proposta é tornar esse assunto acessível,
              acolhedor e fácil de conversar antes que ele vire problema.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {projectPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article key={pillar.title} className="editorial-card p-5">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-2xl font-bold">{pillar.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-card/45">
        <div className="content-wrap grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Como funciona</p>
            <h2 className="text-3xl font-bold md:text-4xl">Uma jornada curta para pensar melhor antes de decidir.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A plataforma combina trilha guiada, simulador, checklist e glossário para organizar o que muita gente
              só descobre depois do casamento.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {modules.slice(0, 4).map((module) => {
              const Icon = module.icon;

              return (
                <article key={module.id} className="rounded-lg border bg-card p-5 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">{module.tempo}</span>
                  </div>
                  <h3 className="text-xl font-bold">{module.titulo}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.resumo}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-wrap grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">O que você encontra aqui</h2>
            <div className="mt-6 grid gap-4">
              {["Explicações simples sobre direitos e deveres no casamento", "Simulador de regime de bens para refletir sobre cenários", "Checklist prático para conversar, organizar documentos e buscar apoio", "Glossário para entender termos jurídicos sem travar na leitura"].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border bg-card p-4 shadow-card">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-panel p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Convite</p>
            <h2 className="mt-3 text-3xl font-bold">Antes de dizer sim, entenda o contrato que vem junto.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Amor e planejamento podem caminhar juntos. Comece pela trilha ou faça o simulador para descobrir quais
              temas merecem mais atenção na sua conversa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="hero">
                <Link to="/trilha">
                  Começar agora <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/checklist">Ver checklist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
