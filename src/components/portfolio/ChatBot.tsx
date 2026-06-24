import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { generateLocalRagAnswer, RAG_CONFIG } from "@/lib/localRag";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o GABOT, assistente local do portfólio do Gabriel Nunes. Posso responder sobre perfil profissional, projetos, stack, IA, dados, desenvolvimento web e contato.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamLocalAnswer = async (answer: string) => {
    let assistantContent = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const chunks = answer.match(/.{1,22}(\s|$)/g) ?? [answer];
    for (const chunk of chunks) {
      assistantContent += chunk;
      setMessages((prev) =>
        prev.map((message, index) =>
          index === prev.length - 1 ? { ...message, content: assistantContent } : message
        )
      );
      await new Promise((resolve) => window.setTimeout(resolve, 16));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim().slice(0, RAG_CONFIG.maxInputChars) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { answer } = generateLocalRagAnswer(userMsg.content, messages);
      await streamLocalAnswer(answer);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro local. Você também pode falar diretamente pelo email gabrielnbn@hotmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
        className="fixed right-4 top-32 z-50 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg glow-primary md:bottom-6 md:right-6 md:top-auto md:w-16 md:h-16"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
        ) : (
          <Bot className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-48 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-13rem)] glass rounded-2xl border border-primary/20 flex flex-col overflow-hidden shadow-2xl md:bottom-24 md:right-6 md:top-auto md:max-w-[calc(100vw-3rem)] md:max-h-[calc(100vh-8rem)]"
          >
            <div className="bg-gradient-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground">GABOT</h3>
                <p className="text-xs text-primary-foreground/80">RAG local • Sem dependências externas</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-secondary"
                        : "bg-gradient-primary"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                        : "glass-strong rounded-tl-sm"
                    }`}
                  >
                    <div className="text-sm prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="glass-strong rounded-2xl rounded-tl-sm px-4 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-primary/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  aria-label="Mensagem para o GABOT"
                  value={input}
                  maxLength={RAG_CONFIG.maxInputChars}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre projetos, stack ou contato..."
                  className="flex-1 bg-muted/50 border border-primary/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  aria-label="Enviar mensagem"
                  className="rounded-full bg-gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
