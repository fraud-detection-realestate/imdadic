"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { MapSummaryCard } from "@/components/dashboard/MapSummaryCard";
import type { AnomalyRecord } from "@/types/anomaly";

interface DashboardChartsProps {
  tendenciaMensual: Array<{ mes: string; anomalías: number }>;
  severidad: Array<{ nombre: string; valor: number }>;
  anomalías: AnomalyRecord[];
  ciudadTop: string;
}

export function DashboardCharts({
  tendenciaMensual,
  severidad,
  anomalías,
  ciudadTop,
}: DashboardChartsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Tendencia temporal de anomalías (mock)
            </h2>
            <p className="text-xs text-slate-500">
              Evolución mensual del conteo de anomalías detectadas por los modelos.
            </p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendenciaMensual} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={{ stroke: "#e5e7eb" }} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#e5e7eb",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="anomalías"
                stroke="#1d4ed8"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <MapSummaryCard totalAnomalies={anomalías.length} topCity={ciudadTop} />
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            Distribución por severidad (mock)
          </h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severidad} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="nombre" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={{ stroke: "#e5e7eb" }} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "#e5e7eb",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]} fill="#0369a1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
