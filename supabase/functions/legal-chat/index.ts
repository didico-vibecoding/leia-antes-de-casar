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
              "Você é o assistente educativo do app Viver de Bem Casado, sobre aspectos jurídicos do casamento no Brasil. Responda em português brasileiro, com tom calmo, claro e sem juridiquês. Seja breve, prático e empático. Foque em informação geral sobre casamento civil, regimes de bens, dívidas, herança, divórcio, checklist pré-casamento e glossário jurídico. Não dê aconselhamento jurídico personalizado; quando houver risco concreto, valores altos, empresa, filhos de outro relacionamento ou conflito, recomende consultar advogado de família.",
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