"use client";

import { Card } from "@/components/shared/Card";

interface MapSummaryCardProps {
  totalAnomalies: number;
  topCity: string;
}

export function MapSummaryCard({ totalAnomalies, topCity }: MapSummaryCardProps) {
  return (
    <Card
      title="Mapa de calor nacional"
      subtitle="Vista resumida de densidad de anomalías. Para explorar en detalle, ir al mapa interactivo."
      className="h-full"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-sky-100 to-slate-100 border border-slate-200 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(249,115,22,0.2),transparent_55%),radial-gradient(circle_at_40%_70%,rgba(16,185,129,0.2),transparent_55%)]" />
        <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Resumen geoespacial mock
          </p>
          <p className="text-sm text-slate-700">
            {totalAnomalies.toLocaleString("es-CO")} anomalías activas, mayor concentración en
            <span className="font-semibold text-slate-900"> {topCity}</span>.
          </p>
        </div>
      </div>
    </Card>
  );
}
