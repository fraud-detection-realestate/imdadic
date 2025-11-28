"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FilterPanel } from "@/components/map/FilterPanel";
import { MapLegend } from "@/components/map/MapLegend";
import { getMapData, type MapPoint, type MapData } from "@/app/actions/map";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("@/components/map/MapContainer").then((m) => ({ default: m.MapContainer })),
  { ssr: false }
);

export default function MapPage() {
  const [mode, setMode] = useState<"heatmap" | "clusters" | "points">("points");
  const [ciudad, setCiudad] = useState("");
  const [severidad, setSeveridad] = useState("todas");
  const [tipo, setTipo] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [mapData, setMapData] = useState<MapData>({ points: [], stats: { total: 0, alta: 0, media: 0, baja: 0 } });
  const [filteredPoints, setFilteredPoints] = useState<MapPoint[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getMapData();
        setMapData(data);
        setFilteredPoints(data.points);
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = mapData.points;

    if (ciudad) {
      const searchTerm = ciudad.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.municipio.toLowerCase().includes(searchTerm) ||
          p.departamento.toLowerCase().includes(searchTerm)
      );
    }

    if (severidad !== "todas") {
      filtered = filtered.filter((p) => p.severity === severidad);
    }

    if (tipo !== "todas") {
      filtered = filtered.filter((p) => p.type.includes(tipo.toLowerCase()));
    }

    setFilteredPoints(filtered);
  }, [ciudad, severidad, tipo, mapData.points]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-6">
        <section className="space-y-3 lg:space-y-4">
          <header>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Mapa interactivo de anomalías
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Visualización geoespacial de anomalías inmobiliarias en Colombia.
              Explora patrones de riesgo por ubicación, severidad y tipo.
            </p>
          </header>
          <MapContainer mode={mode} points={filteredPoints} loading={loading} />
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
            }}
          />
          <MapLegend stats={mapData.stats} filteredCount={filteredPoints.length} />
        </aside>
      </div>
    </main>
  );
}
