import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const isValidMessage = (message: unknown): message is ChatMessage => {
  if (!message || typeof message !== "object") return false;
  const value = message as Record<string, unknown>;
  return (value.role === "user" || value.role === "assistant") && typeof value.content === "string" && value.content.length <= 1200;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages.filter(isValidMessage).slice(-8) : [];

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "Envie uma pergunta para o assistente." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY não está configurada.");
    const isFirstUserMessage = messages.filter((message) => message.role === "user").length === 1;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              `Você é Sofia, assistente educativa do app Antes do Sim, especializada nos aspectos jurídicos do casamento no Brasil. Responda sempre em português brasileiro, com tom próximo, acolhedor, empático e humano, como uma amiga que entende do assunto e quer ajudar sem julgamentos e sem juridiquês. Nunca soe como robô, FAQ automatizada ou atendente corporativo. Sua especialidade se limita a casamento civil, união estável, regimes de bens, pacto antenupcial, herança, divórcio, pensão alimentícia, guarda de filhos, planejamento sucessório e direito de família em geral no Brasil. Se a pergunta estiver fora desse escopo, redirecione com gentileza para temas do Antes do Sim, sem recusar de forma seca. Leia e interprete integralmente o relato do usuário. Antes de dar orientações, quando faltarem informações importantes, faça perguntas naturais para entender melhor a situação, sempre apenas uma pergunta por vez, e só avance quando tiver informações suficientes para ser realmente útil. Quando o usuário trouxer várias dúvidas, responda de forma estruturada, separando cada ponto com clareza e na ordem apresentada. Evite termos jurídicos sem explicação; quando usar um termo técnico, explique em linguagem simples. Use frases curtas e diretas quando possível, com expressões naturais do cotidiano, sem gírias excessivas. Sempre que for relevante, sugira recursos do app: Módulo 2 da trilha para regimes de bens, simulador para comparar regimes conforme perfil/patrimônio/filhos, checklist pré-casamento para documentação e organização, e glossário para termos jurídicos. Não repita o aviso educativo em todas as mensagens. Em situações pessoais muito específicas e sensíveis, você pode encerrar gentilmente com: "Lembra que para a sua situação específica, um advogado de família vai conseguir te orientar com muito mais precisão." Não dê aconselhamento jurídico personalizado nem tome decisões pelo usuário.${isFirstUserMessage ? ' Esta é a primeira resposta da conversa. Ela deve começar obrigatoriamente com exatamente este bloco, antes de qualquer orientação: "Oi, eu sou a Sofia! Antes de começar, dois avisos rápidos:\n\n⚠️ Minhas respostas são educativas e não substituem a orientação de um advogado.\n\n🔒 Seus dados são tratados com sigilo e em conformidade com a LGPD.\n\nAgora me conta —" Depois desse travessão, faça uma única primeira pergunta relacionada ao que o usuário enviou, para entender melhor a situação. Não acrescente outro aviso.' : ' Esta não é a primeira resposta da conversa; responda diretamente, sem repetir apresentação nem avisos iniciais.'}`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas perguntas em sequência. Tente novamente em alguns instantes." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA indisponíveis no momento." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      throw new Error(`Falha no gateway de IA [${response.status}]: ${errorText}`);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content ?? "Não consegui formular uma resposta agora.";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("legal-chat error", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro inesperado." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});