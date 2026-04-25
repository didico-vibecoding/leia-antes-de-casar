import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { glossaryTerms } from "@/data/appData";

const Glossario = () => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => glossaryTerms.filter((item) => `${item.termo} ${item.definicao}`.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <section className="section-pad">
      <div className="content-wrap max-w-4xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Glossário jurídico</p>
          <h1 className="text-4xl font-bold md:text-6xl">Palavras difíceis, explicações simples.</h1>
        </div>
        <label className="relative mb-6 block">
          <span className="sr-only">Buscar termo</span>
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar termo jurídico..." className="h-12 pl-10" />
        </label>
        <Accordion type="single" collapsible className="space-y-3">
          {filtered.map((item) => (
            <AccordionItem key={item.termo} value={item.termo} className="rounded-lg border bg-card px-4 shadow-card">
              <AccordionTrigger className="text-left font-serif text-xl font-bold hover:no-underline">{item.termo}</AccordionTrigger>
              <AccordionContent className="space-y-3 text-base leading-7 text-muted-foreground">
                <p>{item.definicao}</p>
                <div className="rounded-md bg-soft p-4 text-soft-foreground"><strong>Exemplo prático:</strong> {item.exemplo}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filtered.length === 0 && <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">Nenhum termo encontrado.</div>}
      </div>
    </section>
  );
};

export default Glossario;
