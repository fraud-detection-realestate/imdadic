"use client";

import type { ReactNode } from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export function MessageBubble({ role, children }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-[11px] font-semibold">
          IA
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs md:text-sm shadow-sm ${isUser
          ? "bg-blue-900 text-white rounded-br-sm"
          : "bg-white text-slate-900 border border-slate-200 rounded-bl-sm"
          }`}
      >
        {children}
      </div>
      {isUser && (
        <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[11px] font-semibold">
          Tú
        </div>
      )}
    </div>
  );
}
