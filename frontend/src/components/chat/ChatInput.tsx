"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white/90 backdrop-blur-sm px-3 py-2 flex flex-col gap-1">
      <div className="flex items-end gap-2">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje para el agente IMDADIC..."
          className="flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs md:text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSend}
          className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition-colors"
        >
          Enviar
        </button>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Enter para enviar · Shift + Enter para nueva línea</span>
      </div>
    </div>
  );
}
