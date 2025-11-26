"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Card";

interface MapContainerProps {
  mode: "heatmap" | "clusters" | "points";
}

// Componente mock: aquí luego se integrará deck.gl o mapbox-gl con datos reales
export function MapContainer({ mode }: MapContainerProps) {
  const [zoom, setZoom] = useState(5);

  return (
    <Card
      title="Mapa interactivo de anomalías (mock)"
      subtitle="Componente listo para integrar deck.gl o mapbox-gl con datos del backend."
      className="h-full"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-slate-50">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.7),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(249,115,22,0.65),transparent_55%),radial-gradient(circle_at_40%_70%,rgba(16,185,129,0.7),transparent_55%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-4 text-xs md:text-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
              Modo: {mode}
            </span>
            <span className="rounded-full bg-black/40 px-3 py-1 text-[11px]">
              Zoom mock: {zoom.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <p className="max-w-md text-center text-[11px] md:text-xs text-slate-100/90">
              Aquí se renderizará el mapa geoespacial real usando deck.gl o mapbox-gl con capas de
              <span className="font-semibold"> heatmap</span>,<span className="font-semibold"> clusters</span> y
              <span className="font-semibold"> puntos individuales</span> conectados al backend IMDADIC.
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-slate-50 text-sm"
              onClick={() => setZoom((z) => Math.min(z + 0.5, 18))}
            >
              +
            </button>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-slate-50 text-sm"
              onClick={() => setZoom((z) => Math.max(z - 0.5, 2))}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
