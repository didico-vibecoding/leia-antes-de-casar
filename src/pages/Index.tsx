import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { featureCards, modules } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import weddingRingsImage from "@/assets/gold-wedding-rings-approaching.png";

const Index = () => {
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;

  return (
    <div>
      <HeroHighlight containerClassName="section-pad min-h-[calc(100vh-5rem)] bg-warm-gradient">
        <div className="content-wrap grid min-h-[calc(100vh-10rem)] items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Cartilha interativa sem juridiquês
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance font-serif text-5xl font-bold leading-tight tracking-normal text-foreground md:text-7xl">
                Leia isso{" "}
                <span className="inline-block whitespace-nowrap">
                  <Highlight className="text-foreground">antes&nbsp;de&nbsp;casar!</Highlight>
                </span>
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
          </motion.div>

          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[460px]">
            <div className="absolute inset-x-8 bottom-8 top-16 rounded-full border border-primary/20 bg-card/35 blur-3xl" />

            <div className="relative w-full max-w-xl overflow-hidden rounded-lg border bg-card shadow-soft">
              <img
                src={weddingRingsImage}
                alt="Duas alianças douradas delicadas próximas, sem se tocar"
                width={1536}
                height={864}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </HeroHighlight>

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
