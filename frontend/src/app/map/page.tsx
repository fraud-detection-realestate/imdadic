"use client";

import { useState } from "react";
import { MapContainer } from "@/components/map/MapContainer";
import { FilterPanel } from "@/components/map/FilterPanel";
import { MapLegend } from "@/components/map/MapLegend";

export default function MapPage() {
  const [mode, setMode] = useState<"heatmap" | "clusters" | "points">("heatmap");
  const [ciudad, setCiudad] = useState("");
  const [severidad, setSeveridad] = useState("todas");
  const [tipo, setTipo] = useState("todas");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-6">
        <section className="space-y-3 lg:space-y-4">
          <header>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Mapa interactivo de anomalías
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Visualización geoespacial mock. Esta vista está lista para conectarse a datos reales usando deck.gl o
              mapbox-gl con capas de heatmap, clusters y puntos individuales.
            </p>
          </header>
          <MapContainer mode={mode} />
        </section>

        <aside className="space-y-4">
          <FilterPanel
            ciudad={ciudad}
            severidad={severidad}
            tipo={tipo}
            mode={mode}
            onChange={(field, value) => {
              if (field === "mode") setMode(value as typeof mode);
              if (field === "ciudad") setCiudad(value);
              if (field === "severidad") setSeveridad(value);
              if (field === "tipo") setTipo(value);
              // campos desde/hasta aún no se usan, se reservarán para integrar filtros con backend
            }}
          />
          <MapLegend />
        </aside>
      </div>
    </main>
  );
}
