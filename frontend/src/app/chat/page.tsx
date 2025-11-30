"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";

type Role = "user" | "assistant";
type MessageStatus = "sending" | "sent" | "error";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
}

interface SendingState {
  isSending: boolean;
  error: string | null;
}

interface QuickSuggestion {
  id: string;
  icon: "trending" | "map" | "database" | "chart";
  text: string;
  query: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "¡Hola! Soy el agente inteligente de IMDADIC. Estoy aquí para ayudarte a entender anomalías inmobiliarias, detectar patrones de riesgo y explorar datos geográficos.",
    timestamp: new Date(),
  },
  {
    id: "welcome-2",
    role: "assistant",
    content:
      "Puedes preguntarme sobre casos específicos, tendencias por ciudad, o solicitar análisis detallados. ¿En qué te puedo ayudar hoy?",
    timestamp: new Date(),
  },
];

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: "suggestion-1",
    icon: "database",
    text: "Analizar anomalía específica",
    query: "¿Por qué la anomalía A-98231 fue clasificada como de alta severidad?",
  },
  {
    id: "suggestion-2",
    icon: "map",
    text: "Hotspots por ciudad",
    query: "Muéstrame los barrios con mayor concentración de anomalías en Bogotá",
  },
  {
    id: "suggestion-3",
    icon: "trending",
    text: "Resumen de tendencias",
    query: "Resume los principales patrones de riesgo detectados este mes",
  },
  {
    id: "suggestion-4",
    icon: "chart",
    text: "Comparación temporal",
    query: "¿Cómo han evolucionado las anomalías en los últimos 3 meses?",
  },
];

const BEST_PRACTICES = [
  {
    title: "Sé específico",
    description: "Incluye ciudad, barrio y rango de fechas en tus consultas",
  },
  {
    title: "Solicita datos",
    description: "Pide explicaciones basadas en evidencia, no solo opiniones",
  },
  {
    title: "Valida resultados",
    description: "Combina el chat con el dashboard y mapa para confirmar hallazgos",
  },
  {
    title: "Usa ejemplos",
    description: "Referencia IDs de anomalías específicas para análisis detallados",
  },
];

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
      className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 ${isUser ? "flex-row-reverse" : "flex-row"
        }`}
    >
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-md ${isUser
          ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
          : "bg-gradient-to-br from-blue-600 to-blue-700"
          }`}
      >
        <Icon name={isUser ? "target" : "lightbulb"} className="h-5 w-5 text-white" />
      </div>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${isUser
            ? "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900"
            : "border border-slate-200 bg-white text-slate-900"
            }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className="mt-1 px-1 text-xs text-slate-400">{formatTime(message.timestamp)}</span>
      </div>
    </article>
  );
}

function LoadingIndicator() {
  return (
    <article className="flex items-start gap-3 animate-in fade-in duration-300">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
        <Icon name="lightbulb" className="h-5 w-5 text-white" />
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
        </div>
        <span className="text-sm text-slate-600">Analizando tu consulta...</span>
      </div>
    </article>
  );
}

function QuickSuggestionCard({ suggestion, onClick }: { suggestion: QuickSuggestion; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2 transition-colors group-hover:bg-blue-100">
        <Icon name={suggestion.icon} className="h-4 w-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-900">{suggestion.text}</p>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{suggestion.query}</p>
      </div>
    </button>
  );
}

function SidebarCard() {
  return (
    <aside className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Icon name="checklist" className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">Mejores prácticas</h2>
        </div>
        <ul className="space-y-4">
          {BEST_PRACTICES.map((practice, index) => (
            <li key={index} className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{practice.title}</p>
                <p className="mt-1 text-xs text-slate-600">{practice.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Icon name="database" className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-900">Integración técnica</h3>
        </div>
        <p className="text-xs leading-relaxed text-blue-800">
          Este componente está listo para conectarse con tu backend de ML. Implementa la función
          <code className="rounded bg-blue-200 px-1.5 py-0.5 font-mono text-[11px]"> sendMessageToAgent()</code>
          para integrar el modelo de lenguaje y las herramientas de consulta de datos.
        </p>
        <div className="mt-4 rounded-lg border border-blue-200 bg-white/60 p-3">
          <p className="text-xs font-medium text-blue-900">Endpoints sugeridos:</p>
          <ul className="mt-2 space-y-1 text-xs text-blue-700">
            <li>
              <code className="font-mono">/api/v1/chat/query</code>
            </li>
            <li>
              <code className="font-mono">/api/v1/anomalies/explain</code>
            </li>
            <li>
              <code className="font-mono">/api/v1/insights/generate</code>
            </li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Acciones rápidas</h3>
        <div className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-100"
          >
            <Icon name="chart" className="h-4 w-4" />
            <span>Ver dashboard</span>
          </Link>
          <Link
            href="/map"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-100"
          >
            <Icon name="map" className="h-4 w-4" />
            <span>Explorar mapa</span>
          </Link>
        </div>
      </section>
    </aside>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState<SendingState>({ isSending: false, error: null });
  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, sending.isSending]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    if (sending.error) {
      setSending((prev) => ({ ...prev, error: null }));
    }
  }

  function handleSuggestionClick(query: string) {
    setInputValue(query);
    textareaRef.current?.focus();
  }

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
      const agentReply = await sendMessageToAgent(trimmed);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: agentReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setSending({ isSending: false, error: null });
    } catch (error) {
      setSending({
        isSending: false,
        error: "No se pudo conectar con el agente. Por favor, intenta nuevamente.",
      });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  const showSuggestions = messages.length === INITIAL_MESSAGES.length && !sending.isSending;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-3 shadow-md">
                    <Icon name="lightbulb" className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                      Agente IA activo
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      Chat con Agente IMDADIC
                    </h1>
                    <p className="mt-1 max-w-2xl text-sm text-slate-600">
                      Conversa con nuestro asistente inteligente para analizar anomalías, explorar tendencias
                      y obtener insights sobre el mercado inmobiliario
                    </p>
                  </div>
                </div>
                <div className="hidden flex-shrink-0 gap-2 sm:flex">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
                  >
                    <Icon name="chart" className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/map"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
                  >
                    <Icon name="map" className="h-4 w-4" />
                    <span>Mapa</span>
                  </Link>
                </div>
              </div>
            </header>
            <div
              ref={listRef}
              className="flex-1 space-y-4 overflow-y-auto p-6"
              style={{ minHeight: "60vh", maxHeight: "65vh" }}
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {sending.isSending && <LoadingIndicator />}
              {showSuggestions && (
                <div className="pt-6">
                  <p className="mb-4 text-sm font-medium text-slate-700">
                    Prueba estas consultas rápidas:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {QUICK_SUGGESTIONS.map((suggestion) => (
                      <QuickSuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onClick={() => handleSuggestionClick(suggestion.query)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 bg-slate-50/50 p-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      rows={2}
                      placeholder="Escribe tu pregunta sobre anomalías, tendencias o casos específicos..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-24 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      disabled={sending.isSending}
                    />
                    <div className="pointer-events-none absolute bottom-3 right-3 text-xs text-slate-400">
                      <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-sans">Enter</kbd> enviar
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || sending.isSending}
                    className="flex h-[76px] items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                  >
                    <Icon name="lightbulb" className="h-5 w-5" />
                    <span className="hidden sm:inline">
                      {sending.isSending ? "Enviando..." : "Enviar"}
                    </span>
                  </button>
                </div>
                {sending.error && (
                  <div className="flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 px-4 py-2">
                    <Icon name="database" className="h-4 w-4 text-rose-600" />
                    <p className="text-sm font-medium text-rose-700">{sending.error}</p>
                  </div>
                )}
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Tip:</span> Usa
                  <kbd className="rounded bg-slate-200 px-1 py-0.5">Shift + Enter</kbd>
                  para crear una nueva línea
                </p>
              </form>
            </div>
          </section>
          <SidebarCard />
        </div>
      </div>
    </main>
  );
}
