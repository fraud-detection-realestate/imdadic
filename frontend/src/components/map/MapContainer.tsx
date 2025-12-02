"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Card } from "@/components/shared/Card";
import type { MapPoint } from "@/app/actions/map";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
// (Este bloque está bien, déjalo como está)
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
    case "alta": return "#dc2626";
    case "media": return "#f59e0b";
    case "baja": return "#10b981";
    default: return "#6b7280";
  }
}

// Memoized icon creation to avoid recreating icons on every render
const createCustomIcon = (severity: "alta" | "media" | "baja") => {
  const color = getMarkerColor(severity);
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Component to handle map updates (Auto-fit bounds)
function MapUpdater({ points }: { points: MapPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      try {
        const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }
      } catch (e) {
        console.error("Error fitting bounds:", e);
      }
    }
  }, [points, map]);

  return null;
}

export function MapContainer({ mode, points, loading }: MapContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtrar puntos inválidos antes de renderizar para evitar errores
  const validPoints = useMemo(() => {
    return points.filter(p =>
      p.lat !== undefined && p.lng !== undefined &&
      !isNaN(p.lat) && !isNaN(p.lng)
    );
  }, [points]);

  if (!mounted) return <LoadingCard message="Inicializando mapa..." />;
  if (loading) return <LoadingCard message="Cargando datos del mapa..." />;

  return (
    <Card
      title={`Mapa interactivo - ${mode === 'clusters' ? 'Agrupado' : 'Puntos'}`}
      subtitle={`Visualizando ${validPoints.length} registros`}
      className="h-full"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl relative z-0">
        <LeafletMap
          center={[4.5709, -74.2973]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater points={validPoints} />

          {/* MODO CLUSTERS (Optimizado para muchos puntos) */}
          {mode === "clusters" ? (
            <MarkerClusterGroup
              chunkedLoading // <--- CLAVE PARA RENDIMIENTO
              maxClusterRadius={60}
              spiderfyOnMaxZoom={true}
            >
              {validPoints.map((point) => (
                <PointMarker key={point.id} point={point} />
              ))}
            </MarkerClusterGroup>
          ) : (
            // MODO PUNTOS (Sin agrupar, cuidado con >500 puntos)
            validPoints.map((point) => (
              <PointMarker key={point.id} point={point} />
            ))
          )}
        </LeafletMap>
      </div>
    </Card>
  );
}

// Sub-componente para el Marcador Individual (más limpio)
function PointMarker({ point }: { point: MapPoint }) {
  return (
    <Marker
      position={[point.lat, point.lng]}
      icon={createCustomIcon(point.severity)}
    >
      <Popup>
        <div className="text-xs space-y-1 min-w-[150px]">
          <p className="font-bold text-slate-900 text-sm">{point.municipio}</p>
          <p className="text-slate-600 border-b pb-1 mb-1">{point.departamento}</p>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <span className="text-slate-500">Gravedad:</span>
            <span className={`font-semibold capitalize`} style={{ color: getMarkerColor(point.severity) }}>
              {point.severity}
            </span>

            <span className="text-slate-500">Tipo:</span>
            <span className="text-slate-700">{point.type}</span>

            <span className="text-slate-500">Score:</span>
            <span className="font-mono text-slate-700">{point.score?.toFixed(3) || 'N/A'}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// Componente de carga reutilizable
function LoadingCard({ message }: { message: string }) {
  return (
    <Card title="Mapa interactivo" className="h-full">
      <div className="aspect-[16/9] w-full flex items-center justify-center bg-slate-50 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-slate-500">{message}</p>
        </div>
      </div>
    </Card>
  );
}
