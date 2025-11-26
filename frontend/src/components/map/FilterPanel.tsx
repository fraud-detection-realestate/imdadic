"use client";

import { Card } from "@/components/shared/Card";

interface FilterPanelProps {
  ciudad: string;
  severidad: string;
  tipo: string;
  mode: "heatmap" | "clusters" | "points";
  onChange: (field: "ciudad" | "severidad" | "tipo" | "mode" | "desde" | "hasta", value: string) => void;
}

export function FilterPanel({ ciudad, severidad, tipo, mode, onChange }: FilterPanelProps) {
  return (
    <Card
      title="Filtros avanzados"
      subtitle="Ajusta la vista del mapa según ciudad, severidad, fechas y tipo de anomalía."
      className="h-full"
    >
      <div className="space-y-4 text-xs">
        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-600">Ciudad / municipio</label>
          <input
            type="text"
            value={ciudad}
            onChange={(e) => onChange("ciudad", e.target.value)}
            placeholder="Buscar ciudad o municipio"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-600">Severidad</label>
          <select
            value={severidad}
            onChange={(e) => onChange("severidad", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-600">Tipo de anomalía</label>
          <select
            value={tipo}
            onChange={(e) => onChange("tipo", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="todas">Todas</option>
            <option value="sobrevaloracion">Sobrevaloración</option>
            <option value="subvaloracion">Subvaloración</option>
            <option value="flipping">Flipping</option>
            <option value="inconsistencia">Inconsistencias</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-600">Desde</label>
            <input
              type="date"
              onChange={(e) => onChange("desde", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-600">Hasta</label>
            <input
              type="date"
              onChange={(e) => onChange("hasta", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-600">Modo de visualización</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Heatmap", value: "heatmap" },
              { label: "Clusters", value: "clusters" },
              { label: "Puntos", value: "points" },
            ].map((m) => {
              const active = mode === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => onChange("mode", m.value)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    active
                      ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
