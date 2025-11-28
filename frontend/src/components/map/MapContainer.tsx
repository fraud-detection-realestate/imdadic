"use client";

import { useEffect, useState } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card } from "@/components/shared/Card";
import type { MapPoint } from "@/app/actions/map";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapContainerProps {
  mode: "heatmap" | "clusters" | "points";
  points: MapPoint[];
  loading?: boolean;
}

// Custom marker colors based on severity
function getMarkerColor(severity: "alta" | "media" | "baja"): string {
  switch (severity) {
    case "alta":
      return "#dc2626"; // red-600
    case "media":
      return "#f59e0b"; // amber-500
    case "baja":
      return "#10b981"; // emerald-500
    default:
      return "#6b7280"; // gray-500
  }
}

function createCustomIcon(severity: "alta" | "media" | "baja") {
  const color = getMarkerColor(severity);
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

// Component to handle map updates
function MapUpdater({ points, mode }: { points: MapPoint[]; mode: string }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [points, map]);

  return null;
}

export function MapContainer({ mode, points, loading }: MapContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card
        title="Mapa interactivo de anomalías"
        subtitle="Cargando mapa..."
        className="h-full"
      >
        <div className="aspect-[16/9] w-full flex items-center justify-center bg-slate-100 rounded-xl">
          <p className="text-sm text-slate-500">Inicializando mapa...</p>
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card
        title="Mapa interactivo de anomalías"
        subtitle="Cargando datos..."
        className="h-full"
      >
        <div className="aspect-[16/9] w-full flex items-center justify-center bg-slate-100 rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-sm text-slate-600">Cargando puntos del mapa...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={`Mapa interactivo de anomalías - Modo: ${mode}`}
      subtitle={`Visualizando ${points.length} anomalías en el mapa`}
      className="h-full"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
        <LeafletMap
          center={[4.5709, -74.2973]} // Colombia center
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater points={points} mode={mode} />

          {mode === "points" && points.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={createCustomIcon(point.severity)}
            >
              <Popup>
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-slate-900">{point.municipio}</p>
                  <p className="text-slate-600">{point.departamento}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: getMarkerColor(point.severity) }}
                    />
                    <span className="capitalize">{point.severity}</span>
                  </div>
                  <p className="text-slate-500">Tipo: {point.type}</p>
                  <p className="text-slate-500">Año: {point.year}</p>
                  <p className="text-slate-500">Score: {point.score.toFixed(4)}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {mode === "heatmap" && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              <p className="text-xs text-slate-600">
                Modo Heatmap: Mostrando densidad de {points.length} anomalías
              </p>
            </div>
          )}

          {mode === "clusters" && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              <p className="text-xs text-slate-600">
                Modo Clusters: Agrupando {points.length} anomalías
              </p>
            </div>
          )}
        </LeafletMap>
      </div>
    </Card>
  );
}
