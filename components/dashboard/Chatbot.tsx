import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant ESI Together. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = messages.filter(
      (m) => m.role !== "assistant" || messages.indexOf(m) !== 0
    );

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.answer ?? data.error ?? "Erreur inattendue.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur de connexion. Veuillez réessayer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(100vh - 120px)", minHeight: 0 }}
    >
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-white">🤖 Chatbot ESI</h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Posez vos questions sur le règlement intérieur de l&apos;ESI
        </p>
      </div>

      {/* Scrollable messages area */}
      <div
        className="flex-1 overflow-y-auto rounded-xl p-4 space-y-4"
        style={{
          background: "#0F2854",
          border: "1px solid #1C4D8D",
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white rounded-tr-sm"
                  : "text-white rounded-tl-sm"
              }`}
              style={
                msg.role === "user"
                  ? { background: "#1C4D8D" }
                  : { background: "#122E63", border: "1px solid #1C4D8D" }
              }
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-invert prose-sm max-w-none markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col justify-start items-center gap-2">
            <div
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs"
              style={{ background: "#1C4D8D" }}
            >
              🤖
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm"
              style={{
                background: "#122E63",
                border: "1px solid #1C4D8D",
                color: "#7FAFD4",
              }}
            >
              <span className="animate-pulse">En train de réfléchir…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Fixed input bar at the bottom */}
      <div
        className="shrink-0 flex gap-3 pt-3 pb-1"
        style={{
          background: "transparent",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question…"
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-blue-300 outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            background: "#122E63",
            border: "1px solid #1C4D8D",
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
          style={{ background: "#1C4D8D" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#4988C4")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#1C4D8D")
          }
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}