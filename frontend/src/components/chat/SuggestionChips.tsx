"use client";

interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

const SUGGESTIONS = [
  "¿Por qué la anomalía A-2025-0001 fue marcada?",
  "Muéstrame hotspots en Bogotá D.C.",
  "Resume patrones del último mes",
  "Compara anomalías entre ciudades",
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-900 transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
