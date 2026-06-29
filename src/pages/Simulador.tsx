import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Landmark, Scale } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Answers = Record<string, string>;
type AssetKey = "imovelAnterior" | "imovelDurante" | "investimentos" | "dividas";

const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const assetLabels: Record<AssetKey, string> = {
  imovelAnterior: "Bens anteriores ao casamento",
  imovelDurante: "Bens comprados durante o casamento",
  investimentos: "Investimentos e reservas do casal",
  dividas: "Dívidas comuns",
};

const parseCurrency = (value: string) => Number(value.replace(/\./g, "").replace(",", ".")) || 0;

const calculateDivision = (regime: string, values: Record<AssetKey, string>) => {
  const previousAssets = parseCurrency(values.imovelAnterior);
  const sharedAssets = parseCurrency(values.imovelDurante) + parseCurrency(values.investimentos);
  const debts = parseCurrency(values.dividas);
  const divisibleBase = regime === "Comunhão Universal" ? previousAssets + sharedAssets - debts : regime === "Separação Total" ? sharedAssets * 0.5 - debts * 0.5 : sharedAssets - debts;
  const spouseShare = Math.max(divisibleBase / 2, 0);
  const protectedIndividual = regime === "Comunhão Parcial" ? previousAssets : regime === "Separação Total" ? previousAssets + sharedAssets * 0.5 : 0;

  return { spouseShare, protectedIndividual, totalConsidered: previousAssets + sharedAssets - debts };
};

const steps = [
  { title: "Seu perfil", questions: [{ id: "imoveis", label: "Você tem imóveis no seu nome?", options: ["Sim", "Não"] }, { id: "empresa", label: "Você é sócio de alguma empresa?", options: ["Sim", "Não"] }, { id: "dividas", label: "Você tem dívidas relevantes?", options: ["Sim", "Não"] }] },
  { title: "Filhos e família", questions: [{ id: "filhos", label: "Você tem filhos de outro relacionamento?", options: ["Sim", "Não"] }, { id: "filhosParceiro", label: "Seu parceiro(a) tem filhos de outro relacionamento?", options: ["Sim", "Não"] }, { id: "heranca", label: "Há herança ou bens recebidos por doação que você quer proteger?", options: ["Sim", "Não"] }] },
  { title: "Patrimônio conjunto", questions: [{ id: "comprarJuntos", label: "Vocês pretendem comprar imóveis juntos?", options: ["Sim", "Não", "Já temos"] }, { id: "uniaoEstavel", label: "Vocês já vivem em união estável?", options: ["Sim", "Não"] }, { id: "bensProteger", label: "Algum de vocês possui empresa, marca registrada, patente ou outros bens que deseja proteger?", options: ["Sim", "Não"] }, { id: "desigualdade", label: "Existe grande diferença de patrimônio entre vocês?", options: ["Sim", "Não"] }] },
];

const Simulador = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedRegime, setSelectedRegime] = useState("Comunhão Parcial");
  const [assetValues, setAssetValues] = useState<Record<AssetKey, string>>({ imovelAnterior: "", imovelDurante: "", investimentos: "", dividas: "" });
  const current = steps[step];
  const canAdvance = step >= steps.length || current.questions.every((q) => answers[q.id]);

  const result = useMemo(() => {
    const hasOtherKids = answers.filhos === "Sim" || answers.filhosParceiro === "Sim";
    const needsSeparation = answers.empresa === "Sim" || hasOtherKids || answers.desigualdade === "Sim";
    const universalRisk = answers.dividas === "Sim" || hasOtherKids;
    const hasProtectedAssets = answers.bensProteger === "Sim";
    const recommended = needsSeparation ? "Separação Total" : universalRisk ? "Comunhão Parcial" : answers.comprarJuntos === "Sim" || answers.comprarJuntos === "Já temos" || answers.uniaoEstavel === "Sim" ? "Comunhão Parcial" : "Comunhão Universal";
    return { recommended, hasOtherKids, needsSeparation, universalRisk, hasProtectedAssets };
  }, [answers]);

  const regimes = [
    { name: "Comunhão Parcial", icon: Scale, complexity: "Baixo", pros: ["É o regime padrão no Brasil", "Protege bens anteriores ao casamento", answers.comprarJuntos !== "Não" ? "Funciona bem para patrimônio construído em conjunto" : "Mantém lógica simples para novos bens"], cons: ["Pode gerar dúvida sobre esforço comum", "Exige documentação organizada de bens anteriores"] },
    { name: "Separação Total", icon: Building2, complexity: "Médio", pros: ["Separa empresas e patrimônio individual", "Ajuda quando há filhos de outra relação", "Traz clareza em grande diferença patrimonial"], cons: ["Exige pacto antenupcial", "Pode parecer pouco intuitivo para compras conjuntas"] },
    { name: "Comunhão Universal", icon: Landmark, complexity: "Alto", pros: ["Integração patrimonial ampla", "Pode refletir projeto de vida totalmente compartilhado"], cons: [result.universalRisk ? "Risco elevado com dívidas ou famílias recompostas" : "Inclui bens anteriores no patrimônio comum", "Exige pacto antenupcial"] },
  ];

  const showResult = step === 3;
  const division = calculateDivision(selectedRegime, assetValues);

  return (
    <section className="section-pad">
      <div className="content-wrap">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Simulador de Regime de Bens</p>
          <h1 className="text-4xl font-bold md:text-6xl">Compare caminhos antes de escolher.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Responda algumas perguntas e veja quais regimes merecem atenção na conversa com um advogado.</p>
        </div>
        {!showResult ? (
          <div className="mx-auto max-w-3xl rounded-lg border bg-card p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between"><h2 className="text-3xl font-bold">Passo {step + 1} — {current.title}</h2><span className="text-sm font-semibold text-muted-foreground">{step + 1}/4</span></div>
            <div className="space-y-5">
              {current.questions.map((question) => (
                <fieldset key={question.id} className="space-y-3">
                  <legend className="font-semibold">{question.label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option) => (
                      <button key={option} type="button" onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))} className={`rounded-md border px-4 py-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${answers[question.id] === option ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>{option}</button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}><ArrowLeft /> Voltar</Button>
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance}>Continuar <ArrowRight /></Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {regimes.map((regime) => {
                const Icon = regime.icon;
                const highlighted = regime.name === result.recommended;
                return (
                  <article key={regime.name} className={`rounded-lg border bg-card p-5 shadow-card ${highlighted ? "border-primary ring-2 ring-primary/20" : ""}`}>
                    {highlighted && <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary"><CheckCircle2 className="h-4 w-4" /> Mais indicado para seu perfil</div>}
                    <Icon className="mb-4 h-9 w-9 text-secondary" />
                    <h2 className="text-2xl font-bold">{regime.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">Complexidade: {regime.complexity}</p>
                    <h3 className="mt-5 font-bold">Pontos positivos</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">{regime.pros.map((item) => <li key={item}>{item}</li>)}</ul>
                    <h3 className="mt-5 font-bold">Pontos de atenção</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">{regime.cons.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                );
              })}
            </div>
            {result.hasProtectedAssets && (
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-5 text-foreground">
                <p className="font-bold">Proteção de patrimônio</p>
                <p className="mt-2 text-sm">Como vocês possuem empresa, marca registrada, patente ou outros bens que desejam proteger, vale a pena considerar um pacto antenupcial ou o regime de separação de bens para resguardar esses ativos. Recomenda-se buscar orientação de um advogado de família para formalizar a melhor forma de proteção.</p>
              </div>
            )}
            <div className="rounded-lg border bg-card p-5 shadow-card">
              <div className="mb-6 max-w-2xl">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Calculadora de bens</p>
                <h2 className="text-3xl font-bold">Simule uma divisão patrimonial aproximada.</h2>
                <p className="mt-3 text-muted-foreground">Informe valores estimados e escolha um regime para visualizar uma divisão educativa, sem valor jurídico.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <label className="grid gap-2 font-semibold">
                    Regime escolhido pelo casal
                    <select value={selectedRegime} onChange={(event) => setSelectedRegime(event.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {regimes.map((regime) => <option key={regime.name}>{regime.name}</option>)}
                    </select>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(Object.keys(assetLabels) as AssetKey[]).map((key) => (
                      <label key={key} className="grid gap-2 text-sm font-semibold">
                        {assetLabels[key]}
                        <input inputMode="decimal" placeholder="Ex: 150000" value={assetValues[key]} onChange={(event) => setAssetValues((prev) => ({ ...prev, [key]: event.target.value }))} className="rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Resultado estimado</p>
                  <div className="mt-5 space-y-4">
                    <div><p className="text-sm text-muted-foreground">Parte aproximada de cada cônjuge</p><p className="text-3xl font-bold text-primary">{currencyFormatter.format(division.spouseShare)}</p></div>
                    <div><p className="text-sm text-muted-foreground">Valor preservado como individual nesta simulação</p><p className="text-2xl font-bold">{currencyFormatter.format(division.protectedIndividual)}</p></div>
                    <div><p className="text-sm text-muted-foreground">Patrimônio líquido considerado</p><p className="text-xl font-bold">{currencyFormatter.format(Math.max(division.totalConsidered, 0))}</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-4 rounded-lg border bg-card p-4 shadow-soft">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm font-medium text-muted-foreground">Este simulador tem fins educativos. Consulte um advogado de família para orientação personalizada.</p>
                <Button asChild variant="calm"><Link to="/trilha/2">Entender cada regime</Link></Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Simulador;
