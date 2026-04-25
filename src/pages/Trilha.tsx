import { ArrowRight, CheckCircle2, CircleDashed } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { modules } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";

const Trilha = () => {
  const { progress } = useLocalProgress();

  return (
    <section className="section-pad">
      <div className="content-wrap">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Trilha de Consciência</p>
          <h1 className="text-4xl font-bold md:text-6xl">Cinco conversas essenciais antes do casamento.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Leia no seu ritmo, responda quizzes rápidos e salve seu progresso.</p>
        </div>
        <div className="grid gap-4">
          {modules.map((module) => {
            const done = progress.modulosConcluidos.includes(module.id);
            const hasQuiz = Boolean(progress.quizResultados[module.id]);
            const Icon = module.icon;
            return (
              <Link key={module.id} to={`/trilha/${module.id}`} className="editorial-card grid gap-5 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-secondary/10 text-secondary"><Icon className="h-7 w-7" /></div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold">Módulo {module.id}</span>
                    <span className="text-sm text-muted-foreground">{module.tempo}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${done ? "bg-success/15 text-success" : hasQuiz ? "bg-warning/20 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                      {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleDashed className="h-3.5 w-3.5" />}
                      {done ? "Concluído" : hasQuiz ? "Em andamento" : "Não iniciado"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{module.titulo}</h2>
                  <p className="mt-2 text-muted-foreground">{module.resumo}</p>
                </div>
                <Button variant="soft" size="sm">Abrir <ArrowRight /></Button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trilha;
