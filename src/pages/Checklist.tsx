import { Award, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import ProgressBar from "@/components/app/ProgressBar";
import { Button } from "@/components/ui/button";
import { checklistCategories } from "@/data/appData";
import { useLocalProgress } from "@/hooks/useLocalProgress";

const itemId = (categoryId: string, index: number) => `${categoryId}-${index}`;

const Checklist = () => {
  const { progress, setChecklistItem, clearChecklist } = useLocalProgress();
  const total = checklistCategories.reduce((sum, category) => sum + category.items.length, 0);
  const done = checklistCategories.reduce((sum, category) => sum + category.items.filter((_, index) => progress.checklistItems[itemId(category.id, index)]).length, 0);

  const toggle = (id: string, value: boolean) => {
    setChecklistItem(id, value);
    if (value) toast("Item marcado", { description: "Seu checklist foi atualizado." });
  };

  const reset = () => {
    if (window.confirm("Tem certeza que deseja limpar todo o checklist?")) clearChecklist();
  };

  return (
    <section className="section-pad">
      <div className="content-wrap">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Checklist pré-casamento</p>
            <h1 className="text-4xl font-bold md:text-6xl">Pequenas decisões, muita tranquilidade.</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Marque cada item conforme vocês conversam, organizam documentos e alinham expectativas.</p>
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center justify-between font-bold"><span>{done} de {total} itens concluídos</span><span>{Math.round((done / total) * 100)}%</span></div>
            <ProgressBar value={(done / total) * 100} />
            <Button variant="outline" className="mt-4 w-full" onClick={reset}><RotateCcw /> Limpar tudo</Button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {checklistCategories.map((category) => {
            const Icon = category.icon;
            const categoryDone = category.items.every((_, index) => progress.checklistItems[itemId(category.id, index)]);
            return (
              <article key={category.id} className="rounded-lg border bg-card p-5 shadow-card">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary"><Icon className="h-5 w-5" /></span><h2 className="text-2xl font-bold">{category.title}</h2></div>
                  {categoryDone && <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success"><Award className="h-3.5 w-3.5" /> Completo</span>}
                </div>
                <div className="space-y-3">
                  {category.items.map((item, index) => {
                    const id = itemId(category.id, index);
                    return (
                      <label key={id} className="flex cursor-pointer gap-3 rounded-md border bg-background p-3 transition-colors hover:bg-muted">
                        <input type="checkbox" checked={Boolean(progress.checklistItems[id])} onChange={(event) => toggle(id, event.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                        <span className="text-sm leading-6">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Checklist;
