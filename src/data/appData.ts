import { Baby, Banknote, BookOpen, CheckSquare, CircleDollarSign, FileHeart, Gavel, HeartHandshake, Home, Landmark, Scale, Shield, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QuizQuestion = { pergunta: string; correta: string; alternativas: string[]; explicacao: string };
export type ModuleSection = { titulo: string; paragrafos: string[]; box?: { tipo: "Atenção" | "Exemplo prático" | "Curiosidade jurídica"; texto: string } };
export type ModuleData = { id: number; titulo: string; tempo: string; resumo: string; icon: LucideIcon; pontos: string[]; sections: ModuleSection[]; quiz: QuizQuestion[] };


const quizAlternativas = (correta: string, outras: string[]) => [correta, ...outras].sort((a, b) => a.localeCompare(b));

export const modules: ModuleData[] = [
  {
    id: 1,
    titulo: "O que muda na sua vida ao casar",
    tempo: "~5 min",
    resumo: "Entenda o casamento como contrato civil e os efeitos práticos no cotidiano.",
    icon: HeartHandshake,
    pontos: ["O casamento é um contrato civil", "O que muda no CPF, IR, INSS", "Direitos que surgem automaticamente", "Nome: mudança ou não?"],
    sections: [
      { titulo: "Casar também é um ato jurídico", paragrafos: ["Além da celebração afetiva, o casamento cria um vínculo reconhecido pelo Estado. Isso gera direitos e deveres de assistência, respeito, vida em comum e cooperação.", "Pense no casamento como um acordo sério: não precisa perder o romantismo, mas merece ser compreendido antes do sim."], box: { tipo: "Atenção", texto: "O casamento no Brasil é um contrato civil regulado pelo Código Civil. Ele produz efeitos mesmo quando o casal nunca conversou sobre patrimônio." } },
      { titulo: "Documentos, CPF, IR e INSS", paragrafos: ["Seu CPF não muda por casar. O que pode mudar é a forma como o casal organiza a declaração de Imposto de Renda: em conjunto ou separadamente.", "Benefícios previdenciários, dependência e pensão por morte podem ganhar relevância com o vínculo conjugal."], box: { tipo: "Exemplo prático", texto: "Se uma pessoa depende financeiramente da outra, o casamento pode facilitar comprovação de vínculo para alguns benefícios." } },
      { titulo: "Nome: escolha, não obrigação", paragrafos: ["Qualquer pessoa pode acrescentar sobrenome do cônjuge, mas isso não é obrigatório. Também é possível manter o nome exatamente como está.", "A decisão deve considerar documentos, carreira, identidade pessoal e praticidade."], box: { tipo: "Curiosidade jurídica", texto: "A escolha sobre o nome é feita no processo de habilitação no cartório." } },
    ],
    quiz: [
      { pergunta: "No regime de comunhão parcial, um imóvel comprado antes do casamento pertence...", correta: "Somente a quem comprou, pois é um bem anterior ao casamento", alternativas: quizAlternativas("Somente a quem comprou, pois é um bem anterior ao casamento", ["Ao casal, sempre em partes iguais", "Ao casal apenas se houver filhos", "Ao cônjuge que tiver menor renda"]), explicacao: "Na comunhão parcial, bens anteriores não entram automaticamente no patrimônio comum." },
      { pergunta: "Ao casar, a declaração de Imposto de Renda pode ser feita...", correta: "Em conjunto ou separadamente, conforme a opção do casal", alternativas: quizAlternativas("Em conjunto ou separadamente, conforme a opção do casal", ["Sempre em conjunto", "Sempre separadamente", "Apenas pelo cônjuge com maior renda"]), explicacao: "A escolha depende do que for mais adequado para a vida fiscal do casal." },
      { pergunta: "O casamento no Brasil é juridicamente um...", correta: "Contrato civil regulado pelo Código Civil", alternativas: quizAlternativas("Contrato civil regulado pelo Código Civil", ["Acordo informal de convivência", "Contrato exclusivamente religioso", "Cadastro sem efeitos patrimoniais"]), explicacao: "O casamento civil produz deveres pessoais e efeitos patrimoniais." },
    ],
  },
  {
    id: 2,
    titulo: "Regimes de bens: o que é seu, o que é nosso",
    tempo: "~7 min",
    resumo: "Compare comunhão parcial, universal, separação total e participação final nos aquestos.",
    icon: Scale,
    pontos: ["O que é regime de bens", "Comunhão Parcial", "Comunhão Universal", "Separação Total", "Participação Final nos Aquestos", "Quando pode mudar"],
    sections: [
      { titulo: "Regime de bens é a regra do patrimônio", paragrafos: ["O regime de bens define quais bens são individuais, quais são comuns e como eles serão divididos em divórcio ou morte.", "Se o casal não escolhe outro regime, a regra automática no Brasil é a comunhão parcial de bens."], box: { tipo: "Atenção", texto: "Escolher um regime não é desconfiança. É planejamento, clareza e cuidado com a vida de ambos." } },
      { titulo: "Comunhão parcial: o padrão brasileiro", paragrafos: ["Na comunhão parcial, em regra, o que cada um já tinha antes do casamento continua individual. O que for adquirido onerosamente durante o casamento tende a ser comum.", "Heranças e doações recebidas por uma pessoa costumam ficar fora da comunhão, salvo decisões específicas."], box: { tipo: "Exemplo prático", texto: "Se o casal compra um imóvel durante o casamento, ele normalmente pertence aos dois, ainda que esteja no nome de apenas um." } },
      { titulo: "Universal, separação total e participação final", paragrafos: ["Na comunhão universal, há integração ampla do patrimônio, inclusive bens anteriores, com riscos maiores quando existem dívidas.", "Na separação total, cada pessoa preserva seu patrimônio individual. Já a participação final nos aquestos funciona separada durante o casamento, mas apura ganhos ao final."], box: { tipo: "Curiosidade jurídica", texto: "Separação total e participação final nos aquestos exigem pacto antenupcial antes do casamento." } },
      { titulo: "É possível mudar depois?", paragrafos: ["A mudança de regime pode ser autorizada judicialmente, com justificativa e sem prejudicar terceiros.", "Por isso, conversar antes é mais simples, barato e preventivo." ] },
    ],
    quiz: [
      { pergunta: "Qual regime de bens é adotado automaticamente se o casal não escolher outro?", correta: "Comunhão parcial de bens", alternativas: quizAlternativas("Comunhão parcial de bens", ["Separação total de bens", "Comunhão universal de bens", "Participação final nos aquestos"]), explicacao: "A comunhão parcial é o regime legal padrão." },
      { pergunta: "Na comunhão universal, as dívidas anteriores ao casamento...", correta: "Podem ser comunicadas ao patrimônio comum em alguns casos", alternativas: quizAlternativas("Podem ser comunicadas ao patrimônio comum em alguns casos", ["Nunca afetam o casal", "Sempre desaparecem", "São pagas apenas pelo cartório"]), explicacao: "A integração patrimonial ampla exige atenção a dívidas passadas." },
      { pergunta: "Para adotar o regime de separação total, o casal precisa...", correta: "Fazer pacto antenupcial em cartório antes do casamento", alternativas: quizAlternativas("Fazer pacto antenupcial em cartório antes do casamento", ["Apenas avisar verbalmente ao juiz", "Esperar cinco anos de casamento", "Registrar depois do divórcio"]), explicacao: "O pacto antenupcial formaliza regimes diferentes do padrão legal." },
    ],
  },
  {
    id: 3,
    titulo: "Dívidas e responsabilidades",
    tempo: "~5 min",
    resumo: "Saiba quando uma dívida é individual, comum ou ligada à proteção da família.",
    icon: Shield,
    pontos: ["Responsabilidade por dívidas", "Dívida antes e durante o casamento", "Bem de família"],
    sections: [
      { titulo: "Nem toda dívida vira dívida do casal", paragrafos: ["A responsabilidade depende do regime de bens, da data da dívida e do benefício gerado para a família.", "Dívidas pessoais anteriores ao casamento, em regra, permanecem de quem as contraiu."], box: { tipo: "Atenção", texto: "Dívidas feitas para benefício da família podem alcançar ambos, mesmo quando apenas uma pessoa assinou." } },
      { titulo: "Proteção do lar", paragrafos: ["O bem de família protege o imóvel residencial contra penhora em muitos casos, mas há exceções, como financiamento do próprio imóvel e algumas dívidas específicas.", "Organizar documentos e entender riscos evita surpresas."], box: { tipo: "Exemplo prático", texto: "Uma dívida empresarial pode não atingir automaticamente o lar, mas garantias pessoais mudam o cenário." } },
    ],
    quiz: [
      { pergunta: "No regime de comunhão parcial, uma dívida pessoal feita antes do casamento...", correta: "Em regra, é de responsabilidade exclusiva de quem a contraiu", alternativas: quizAlternativas("Em regra, é de responsabilidade exclusiva de quem a contraiu", ["Sempre vira dívida do casal", "É anulada no casamento", "É paga pelo cartório"]), explicacao: "Dívidas anteriores pessoais não se comunicam automaticamente." },
      { pergunta: "O bem de família é...", correta: "O imóvel residencial protegido de penhora por dívidas em certos casos", alternativas: quizAlternativas("O imóvel residencial protegido de penhora por dívidas em certos casos", ["Qualquer investimento do casal", "Uma conta conjunta", "Um contrato de namoro"]), explicacao: "A proteção existe, mas comporta exceções legais." },
      { pergunta: "Se um cônjuge faz uma dívida para benefício da família durante o casamento...", correta: "Ambos os cônjuges podem ser responsabilizados", alternativas: quizAlternativas("Ambos os cônjuges podem ser responsabilizados", ["Ninguém responde", "A dívida sempre é do banco", "Apenas os filhos respondem"]), explicacao: "O benefício familiar pode gerar responsabilidade comum." },
    ],
  },
  {
    id: 4,
    titulo: "Herança, filhos e a partilha",
    tempo: "~6 min",
    resumo: "Diferencie meação e herança e entenda o papel de filhos, cônjuge e testamento.",
    icon: Baby,
    pontos: ["Cônjuge herda?", "Filhos de outro relacionamento", "Testamento", "Meação vs. herança"],
    sections: [
      { titulo: "Meação vem antes da herança", paragrafos: ["Meação é a parte que já pertence ao cônjuge nos bens comuns. Herança é o que será transmitido após a morte.", "Confundir os dois pode gerar expectativas erradas e conflitos familiares."], box: { tipo: "Atenção", texto: "O cônjuge pode ser meeiro, herdeiro ou ambos, conforme o regime de bens e a composição familiar." } },
      { titulo: "Filhos e planejamento", paragrafos: ["Filhos de relacionamentos anteriores tornam o planejamento mais delicado. O testamento pode organizar a parte disponível com clareza.", "Herdeiros necessários preservam direito à legítima."], box: { tipo: "Exemplo prático", texto: "Um testamento não exclui filhos, mas pode reduzir disputas sobre a parte disponível." } },
    ],
    quiz: [
      { pergunta: "Meação é...", correta: "A metade do patrimônio comum que pertence a cada cônjuge independentemente de herança", alternativas: quizAlternativas("A metade do patrimônio comum que pertence a cada cônjuge independentemente de herança", ["Um imposto de cartório", "A parte disponível do testamento", "Uma dívida sucessória"]), explicacao: "Meação é direito patrimonial próprio, não herança." },
      { pergunta: "No caso de filhos de relacionamentos anteriores, o testamento é importante porque...", correta: "Permite direcionar a parte disponível da herança com mais clareza", alternativas: quizAlternativas("Permite direcionar a parte disponível da herança com mais clareza", ["Remove automaticamente herdeiros necessários", "Substitui o casamento civil", "Evita qualquer imposto"]), explicacao: "O testamento organiza a parte disponível sem afastar a legítima." },
      { pergunta: "Em relação à herança, cônjuge e filhos são considerados...", correta: "Herdeiros necessários, que não podem ser excluídos da herança", alternativas: quizAlternativas("Herdeiros necessários, que não podem ser excluídos da herança", ["Testemunhas do inventário", "Credores automáticos", "Sócios obrigatórios"]), explicacao: "Herdeiros necessários têm proteção legal." },
    ],
  },
  {
    id: 5,
    titulo: "E se der errado? Entendendo o divórcio",
    tempo: "~5 min",
    resumo: "Veja caminhos do divórcio, partilha, alimentos, guarda e o papel do advogado.",
    icon: Gavel,
    pontos: ["Divórcio extrajudicial vs. judicial", "Partilha", "Alimentos", "Guarda", "Advogado"],
    sections: [
      { titulo: "Divórcio hoje é direito", paragrafos: ["O divórcio extrajudicial é realizado diretamente no Cartório de Notas, por escritura pública. É uma alternativa mais rápida e menos burocrática quando há consenso entre o casal.", "Atualmente, ele pode ser realizado mesmo existindo filhos menores ou incapazes, desde que todas as questões relativas à guarda, convivência e alimentos já tenham sido previamente resolvidas por decisão judicial.", "A escritura pública produz os mesmos efeitos da sentença judicial quanto ao divórcio, à partilha de bens e à definição sobre a manutenção ou alteração do sobrenome.", "A assistência de advogado ou defensor público é obrigatória.", "Com filhos menores, conflito ou temas sensíveis, o caminho judicial protege interesses envolvidos."], box: { tipo: "Atenção", texto: "Mesmo no cartório, a presença de advogado é necessária para orientar e formalizar o ato." } },
      { titulo: "Partilha, alimentos e guarda", paragrafos: ["A partilha aplica o regime de bens escolhido. Alimentos entre ex-cônjuges podem existir, mas dependem de necessidade e capacidade.", "Guarda dos filhos busca o melhor interesse da criança, e não uma vitória de um adulto sobre o outro."], box: { tipo: "Exemplo prático", texto: "O casal pode divorciar e deixar a partilha para depois, quando isso for juridicamente adequado." } },
    ],
    quiz: [
      { pergunta: "O divórcio extrajudicial (em cartório) é possível quando...", correta: "Não há filhos menores ou incapazes e o casal está em acordo", alternativas: quizAlternativas("Não há filhos menores ou incapazes e o casal está em acordo", ["Sempre há briga", "Há filhos menores sem acordo", "Um cônjuge desapareceu"]), explicacao: "A via cartorial exige consenso e ausência de filhos menores/incapazes." },
      { pergunta: "Alimentos (pensão alimentícia) entre ex-cônjuges são...", correta: "Possíveis, mas dependem de necessidade e capacidade de cada um", alternativas: quizAlternativas("Possíveis, mas dependem de necessidade e capacidade de cada um", ["Automáticos para sempre", "Proibidos pela lei", "Pagos apenas por cartório"]), explicacao: "A análise é concreta e considera necessidade e possibilidade." },
      { pergunta: "Partilha de bens no divórcio...", correta: "Pode ser feita antes, durante ou depois do divórcio", alternativas: quizAlternativas("Pode ser feita antes, durante ou depois do divórcio", ["Só após dez anos", "Nunca pode ser separada", "É sempre igual para todos os regimes"]), explicacao: "A partilha pode ser organizada em momento próprio." },
    ],
  },
];

export const checklistCategories = [
  { id: "documentacao", title: "Documentação e cartório", icon: FileHeart, items: ["Verificar documentos necessários para habilitação no cartório (RG, CPF, certidão de nascimento)", "Dar entrada na habilitação com pelo menos 30 dias de antecedência", "Definir o regime de bens", "Se for Separação Total: fazer pacto antenupcial com advogado antes do casamento"] },
  { id: "juridicas", title: "Questões jurídicas", icon: Scale, items: ["Consultar um advogado de família (especialmente se há empresa, imóvel ou filhos de outra relação)", "Conversar com o parceiro(a) sobre o que acontece com os bens em caso de separação", "Verificar se há necessidade de testamento", "Atualizar beneficiários de planos de previdência privada e seguros de vida"] },
  { id: "financeiras", title: "Questões financeiras", icon: Banknote, items: ["Decidir se o IR será feito em conjunto ou separado", "Conversar sobre contas conjuntas ou separadas", "Alinhar com parceiro(a) sobre dívidas existentes de cada um", "Verificar como fica o INSS/benefícios previdenciários"] },
  { id: "patrimonio", title: "Patrimônio", icon: Home, items: ["Registrar imóveis corretamente se for comprar junto", "Entender como ficam imóveis já existentes no novo regime"] },
];

export const featureCards = [
  { title: "Trilha", description: "Cinco módulos claros para entender o casamento antes de assinar.", href: "/trilha", icon: BookOpen },
  { title: "Simulador", description: "Compare regimes de bens conforme seu perfil familiar e patrimonial.", href: "/simulador", icon: CircleDollarSign },
  { title: "Checklist", description: "Organize documentos, conversas e decisões essenciais antes do cartório.", href: "/checklist", icon: CheckSquare },
];

export const boxStyles = {
  "Atenção": { icon: Landmark, className: "border-primary/30 bg-primary/10 text-foreground" },
  "Exemplo prático": { icon: Sparkles, className: "border-secondary/30 bg-secondary/10 text-foreground" },
  "Curiosidade jurídica": { icon: BookOpen, className: "border-info/30 bg-info/10 text-foreground" },
};
