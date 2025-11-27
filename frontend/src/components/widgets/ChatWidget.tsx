"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

interface SendingState {
  isSending: boolean;
  error: string | null;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-widget-1",
  role: "assistant",
  content: "¡Hola! Soy el asistente IMDADIC. ¿En qué puedo ayudarte hoy?",
  timestamp: new Date(),
};

async function sendMessageToAgent(prompt: string): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <article
      className={`flex animate-in fade-in slide-in-from-bottom-2 duration-200 ${isUser ? "flex-row-reverse" : "flex-row"
        } items-start gap-2`}
    >
      <div
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg shadow-sm ${isUser
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
            : "bg-gradient-to-br from-blue-600 to-blue-700"
          }`}
      >
        <Icon name={isUser ? "target" : "lightbulb"} className="h-3.5 w-3.5 text-white" />
      </div>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}>
        <div
          className={`rounded-xl px-3 py-2 shadow-sm ${isUser
              ? "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900"
              : "border border-slate-200 bg-white text-slate-900"
            }`}
        >
          <p className="text-xs leading-relaxed">{message.content}</p>
        </div>
        <span className="mt-1 px-1 text-[10px] text-slate-400">{formatTime(message.timestamp)}</span>
      </div>
    </article>
  );
}

function LoadingIndicator() {
  return (
    <article className="flex animate-in fade-in duration-200 items-start gap-2">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
        <Icon name="lightbulb" className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
        </div>
        <span className="text-xs text-slate-600">Pensando...</span>
      </div>
    </article>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState<SendingState>({ isSending: false, error: null });
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, sending.isSending, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || sending.isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSending({ isSending: true, error: null });

    try {
      const reply = await sendMessageToAgent(trimmed);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setSending({ isSending: false, error: null });
    } catch (error) {
      setSending({
        isSending: false,
        error: "Error al conectar. Intenta nuevamente.",
      });
    }
  }

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <article className="w-[90vw] max-w-md animate-in slide-in-from-bottom-8 fade-in duration-300 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <Icon name="lightbulb" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Agente IMDADIC</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs text-blue-100">En línea</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/chat"
                  className="hidden rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 sm:inline-flex"
                >
                  Abrir chat completo
                </Link>
                <button
                  onClick={handleToggle}
                  className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                  aria-label="Cerrar chat"
                >
                  <Icon name="clock" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>
          <div
            ref={listRef}
            className="flex h-80 flex-col gap-3 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {sending.isSending && <LoadingIndicator />}
          </div>
          <footer className="border-t border-slate-200 bg-slate-50 p-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  disabled={sending.isSending}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || sending.isSending}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Icon name="lightbulb" className="h-4 w-4" />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>
              {sending.error && <p className="text-xs font-medium text-rose-600">{sending.error}</p>}
            </form>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">Chat rápido · IMDADIC</span>
              <Link
                href="/chat"
                className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
              >
                <span>Chat avanzado</span>
                <Icon name="trending" className="h-3 w-3" />
              </Link>
            </div>
          </footer>
        </article>
      )}
      <button
        type="button"
        onClick={handleToggle}
        className={`group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-700 px-5 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 ${isOpen ? "rotate-0" : ""
          }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        <span className="hidden sm:inline">{isOpen ? "Cerrar chat" : "¿Necesitas ayuda?"}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:rotate-12">
          <Icon name="lightbulb" className="h-4 w-4" />
        </div>
        {!isOpen && messages.length > 1 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-md">
            {messages.length - 1}
          </span>
        )}
      </button>
    </div>
  );
}
