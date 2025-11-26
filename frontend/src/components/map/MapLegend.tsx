"use client";

import { Card } from "@/components/shared/Card";

export function MapLegend() {
  return (
    <Card
      title="Leyenda de anomalías"
      subtitle="Colores y códigos de severidad en el mapa."
      className="text-xs"
    >
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="font-medium text-slate-800">Alta</span>
          <span className="ml-auto text-[11px] text-slate-500">Riesgo crítico</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="font-medium text-slate-800">Media</span>
          <span className="ml-auto text-[11px] text-slate-500">Revisión prioritaria</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="font-medium text-slate-800">Baja</span>
          <span className="ml-auto text-[11px] text-slate-500">Seguimiento</span>
        </li>
      </ul>
    </Card>
  );
}
