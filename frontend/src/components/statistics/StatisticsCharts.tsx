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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PIE_COLORS = ["#1d4ed8", "#0f766e", "#f59e0b", "#be123c", "#6b7280"];

interface StatisticsChartsProps {
  temporal: Array<{ mes: string; anomalías: number }>;
  tipo: Array<{ name: string; value: number }>;
  geografico: Array<{ nombre: string; valor: number }>;
}

export function StatisticsCharts({ temporal, tipo, geografico }: StatisticsChartsProps) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Evolución temporal</h2>
          <p className="text-xs text-slate-500 mb-3">
            Serie de tiempo agregada de anomalías detectadas por año.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temporal} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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

        <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Distribución por tipo</h2>
          <p className="text-xs text-slate-500 mb-3">Proporción relativa de los diferentes tipos de anomalías.</p>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tipo} dataKey="value" nameKey="name" outerRadius={80} innerRadius={45} paddingAngle={2}>
                  {tipo.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "#e5e7eb",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Comparativo geográfico (Top 5)</h2>
        <p className="text-xs text-slate-500 mb-3">Anomalías por departamento.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geografico} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
