"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FilterPanel } from "@/components/map/FilterPanel";
import { MapLegend } from "@/components/map/MapLegend";
import { getMapData, type MapPoint, type MapData } from "@/app/actions/map";
import { DEPARTAMENTOS_COLOMBIA } from "@/lib/constants/formDefaults";

const MapContainer = dynamic(
  () => import("@/components/map/MapContainer").then((m) => ({ default: m.MapContainer })),
  {
    ssr: false,
    loading: () => <div className="h-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Cargando mapa...</div>
  }
);

export default function MapPage() {
  const [mode, setMode] = useState<"heatmap" | "clusters" | "points">("clusters");
  const [departamento, setDepartamento] = useState("todos");
  const [ciudad, setCiudad] = useState("");
  const [severidad, setSeveridad] = useState("todas");
  const [tipo, setTipo] = useState("todas");
  const [loading, setLoading] = useState(true);

  const [allPoints, setAllPoints] = useState<MapPoint[]>([]);
  const [stats, setStats] = useState({ total: 0, alta: 0, media: 0, baja: 0 });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getMapData(departamento);
        if (data && data.points) {
          setAllPoints(data.points);
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [departamento]);

  const filteredPoints = useMemo(() => {
    let filtered = allPoints;
    if (departamento !== "todos") filtered = filtered.filter(p => p.departamento === departamento);
    if (ciudad.trim()) filtered = filtered.filter((p) => p.municipio.toLowerCase().includes(ciudad.toLowerCase().trim()));
    if (severidad !== "todas") filtered = filtered.filter((p) => p.severity === severidad);
    if (tipo !== "todas") filtered = filtered.filter((p) => p.type.includes(tipo.toLowerCase()));
    return filtered;
  }, [allPoints, departamento, ciudad, severidad, tipo]);

  return (
    // CAMBIO 1: h-screen para usar toda la altura de la ventana y overflow-hidden para evitar scroll global
    <main className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden">

      {/* Header compacto */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex-none z-10 shadow-sm">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Mapa de Anomalías
            </h1>
            <p className="text-xs text-slate-500">
              {filteredPoints.length} registros visualizados
            </p>
          </div>

          {/* Selector rápido de departamento en el header para ahorrar espacio lateral */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Departamento:</span>
            <select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 bg-white min-w-[200px]"
            >
              <option value="todos">Todos los departamentos</option>
              {DEPARTAMENTOS_COLOMBIA.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Contenedor Principal Flexible */}
      <div className="flex flex-1 min-h-0 relative">

        {/* SECCIÓN MAPA: Flex-1 para ocupar todo el espacio restante */}
        <section className="flex-1 relative bg-slate-100 h-full">
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white relative">
              <MapContainer
                mode={mode}
                points={filteredPoints}
                loading={loading}
              />

              {/* Overlay sin resultados */}
              {!loading && filteredPoints.length === 0 && (
                <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
                    <p className="text-slate-500 font-medium">No hay resultados.</p>
                    <button
                      onClick={() => { setDepartamento("todos"); setCiudad(""); }}
                      className="mt-3 text-blue-600 text-sm hover:underline"
                    >
                      Restablecer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BARRA LATERAL: Ancho fijo y scrollable independiente */}
        <aside className="w-80 flex-none bg-white border-l border-slate-200 h-full overflow-y-auto p-4 z-20 shadow-xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Filtros & Controles</h2>
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
            </div>

            <div className="border-t border-slate-100 pt-6">
              <MapLegend stats={stats} filteredCount={filteredPoints.length} />
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
