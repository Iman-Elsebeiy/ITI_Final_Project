"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { PERIOD_LABELS } from "@/lib/types";

type ItemCard = {
  id: string;
  title: string;
  category: string;
  price: number;
  listing_type: "rent" | "sale";
  rental_period: string;
  condition: string;
  location: string | null;
  image: string | null;
};

type UIMessage = {
  role: "user" | "assistant";
  content: string;
  items?: ItemCard[];
};

const WELCOME: UIMessage = {
  role: "assistant",
  content:
    "Hi! 👋 I'm your UniTool assistant. Tell me what you need — e.g. \"Do you have laptops for rent?\" or \"عايز آلة حاسبة علمية\" — and I'll find matching items with prices.",
};

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([WELCOME]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: UIMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const history = next
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't find anything right now.",
          items: Array.isArray(data.items) ? data.items : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1DA5A6] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#188d8e] active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] max-h-[calc(100vh-7rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#1DA5A6] px-4 py-3 text-white">
            <Sparkles className="h-5 w-5" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">UniTool Assistant</p>
              <p className="text-[11px] text-white/80">Find tools to rent or buy</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F1F3F5] p-3">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  dir="auto"
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto rounded-br-sm bg-[#1DA5A6] text-white"
                      : "mr-auto rounded-bl-sm bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  {m.content}
                </div>

                {m.items && m.items.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.items.map((it) => (
                      <Link
                        key={it.id}
                        href={`/item/${it.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 transition-colors hover:border-[#1DA5A6] hover:bg-[#1DA5A6]/5"
                      >
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {it.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                              <MessageCircle className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{it.title}</p>
                          <p className="text-xs text-gray-500">
                            {it.listing_type === "sale"
                              ? "For Sale"
                              : PERIOD_LABELS[it.rental_period] || "Rental"}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-semibold text-[#1DA5A6]">
                            {it.price} EGP
                          </p>
                          <span className="text-[11px] text-[#1DA5A6] underline">View</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="mr-auto flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              dir="auto"
              placeholder="Ask about any item..."
              className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1DA5A6]"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1DA5A6] text-white transition-colors hover:bg-[#188d8e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
