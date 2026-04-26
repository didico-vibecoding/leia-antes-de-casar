import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { featureCards, modules } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";

const Index = () => {
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;

  return (
    <div>
      <section className="section-pad overflow-hidden bg-warm-gradient">
        <div className="content-wrap grid min-h-[calc(100vh-10rem)] items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-reveal space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> Cartilha interativa sem juridiquês
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-normal text-foreground md:text-7xl">
                Leia isso antes de casar!
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                Uma cartilha interativa sobre os seus direitos e deveres no casamento. Simples, honesta e sem
                juridiquês.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="hero">
                <Link to="/trilha">
                  Começar a trilha <ArrowRight />
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
          </div>
          <div className="relative flex min-h-[360px] items-center justify-center">
            <div className="absolute inset-8 rounded-full border border-primary/20 bg-card/35 blur-3xl" />
            <div className="relative flex aspect-square w-full max-w-md animate-float items-center justify-center rounded-full border bg-card/70 shadow-soft backdrop-blur-sm motion-reduce:animate-none">
              <Heart className="h-36 w-36 text-primary" strokeWidth={1.3} />
              <div className="absolute left-16 top-20 h-24 w-24 rounded-full border-4 border-secondary/45" />
              <div className="absolute right-16 bottom-20 h-24 w-24 rounded-full border-4 border-primary/45" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="content-wrap">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Escolha por onde começar</h2>
            <p className="mt-3 text-muted-foreground">
              Conteúdo prático para transformar conversas difíceis em decisões conscientes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.href}
                  className="editorial-card group p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
