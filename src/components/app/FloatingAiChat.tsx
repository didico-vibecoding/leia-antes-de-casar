import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Qual regime de bens é melhor para o meu caso?",
  "O que é pacto antenupcial?",
  "Como funciona a comunhão parcial de bens?",
];

const FloatingAiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const recentMessages = useMemo(() => messages.slice(-8), [messages]);

  const sendMessage = async (messageText = input) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const { data, error } = await supabase.functions.invoke("legal-chat", {
      body: { messages: [...recentMessages, { role: "user", content: trimmed }] },
    });

    setIsLoading(false);

    if (error || (!data?.answer && !data?.answerParts)) {
      console.warn("Sofia chat request failed", { error, response: data });
      toast.error("Não consegui responder agora", { description: "Tente novamente em alguns instantes." });
      setMessages([...nextMessages, { role: "assistant", content: "Tive uma instabilidade ao responder. Pode tentar de novo?" }]);
      return;
    }

    const assistantMessages: ChatMessage[] = Array.isArray(data.answerParts)
      ? data.answerParts.filter(Boolean).map((content: string) => ({ role: "assistant", content }))
      : [{ role: "assistant", content: data.answer }];

    setMessages([...nextMessages, ...assistantMessages]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div
        className={cn(
          "mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border bg-card text-card-foreground shadow-soft transition-all duration-300 sm:w-96",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between gap-3 border-b bg-soft px-4 py-3 text-soft-foreground">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="font-serif text-base font-bold">Sofia</p>
              <p className="text-xs text-muted-foreground">Dúvidas rápidas, sem juridiquês</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)} aria-label="Fechar chat">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[22rem] min-h-[16rem] space-y-3 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex min-h-[14rem] flex-col items-center justify-center gap-4 text-center">
              <p className="max-w-xs text-sm font-medium leading-relaxed text-foreground">
                Olá! Digite sua dúvida ou escolha uma das perguntas abaixo.
              </p>
              <div className="flex w-full flex-col gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="rounded-md border bg-background px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => void sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[86%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                  )}
                >
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0 prose-strong:text-inherit">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && <p className="text-sm text-muted-foreground">Pensando com cuidado...</p>}
        </div>

        <form onSubmit={handleSubmit} className="border-t bg-background p-3">
          <label htmlFor="ai-chat-message" className="sr-only">Digite sua dúvida</label>
          <div className="flex gap-2">
            <Textarea
              id="ai-chat-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Digite sua dúvida aqui..."
              className="min-h-11 resize-none"
              rows={1}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Enviar mensagem">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      <Button
        variant="hero"
        size="lg"
        className="ml-auto flex rounded-full px-5 shadow-soft"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar assistente" : "Abrir assistente"}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Tirar dúvida</span>
      </Button>
    </div>
  );
};

export default FloatingAiChat;