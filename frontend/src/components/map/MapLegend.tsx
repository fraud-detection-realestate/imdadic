"use client";

import { Card } from "@/components/shared/Card";
import { Icon } from "@/components/shared/Icon";

interface MapLegendProps {
  stats: {
    total: number;
    alta: number;
    media: number;
    baja: number;
  };
  filteredCount: number;
}

export function MapLegend({ stats, filteredCount }: MapLegendProps) {
  const severityItems = [
    { label: "Alta", color: "#dc2626", count: stats.alta },
    { label: "Media", color: "#f59e0b", count: stats.media },
    { label: "Baja", color: "#10b981", count: stats.baja },
  ];

  return (
    <Card title="Leyenda y estadísticas" subtitle="Clasificación por severidad" className="h-full">
      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          {severityItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 font-medium">{item.label}</span>
              </div>
              <span className="text-slate-500">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Total anomalías:</span>
            <span className="font-semibold text-slate-900">{stats.total.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Mostrando:</span>
            <span className="font-semibold text-blue-600">{filteredCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Icon name="database" className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[11px] text-blue-900 font-medium">Datos en tiempo real</p>
              <p className="text-[10px] text-blue-700 mt-1">
                Los puntos se actualizan según los filtros aplicados
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
