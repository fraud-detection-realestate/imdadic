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

const MOCK_TEMPORAL = [
  { periodo: "2016", valor: 4200 },
  { periodo: "2018", valor: 6100 },
  { periodo: "2020", valor: 7200 },
  { periodo: "2022", valor: 9800 },
  { periodo: "2024", valor: 11800 },
];

const MOCK_TIPO = [
  { name: "Sobrevaloración", value: 45 },
  { name: "Subvaloración", value: 25 },
  { name: "Flipping", value: 18 },
  { name: "Inconsistencias", value: 12 },
];

const MOCK_GEOGRAFICO = [
  { nombre: "Bogotá D.C.", valor: 5200 },
  { nombre: "Antioquia", valor: 3100 },
  { nombre: "Valle del Cauca", valor: 2300 },
  { nombre: "Atlántico", valor: 1900 },
];

const PIE_COLORS = ["#1d4ed8", "#0f766e", "#f59e0b", "#be123c"];

export function StatisticsCharts() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Evolución temporal (mock)</h2>
          <p className="text-xs text-slate-500 mb-3">
            Serie de tiempo agregada de anomalías detectadas por año.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TEMPORAL} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="periodo" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} tick={{ fontSize: 11 }} />
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
                  dataKey="valor"
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
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Distribución por tipo (mock)</h2>
          <p className="text-xs text-slate-500 mb-3">Proporción relativa de los diferentes tipos de anomalías.</p>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_TIPO} dataKey="value" nameKey="name" outerRadius={80} innerRadius={45} paddingAngle={2}>
                  {MOCK_TIPO.map((entry, index) => (
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
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Comparativo geográfico (mock)</h2>
        <p className="text-xs text-slate-500 mb-3">Anomalías por departamento / área geográfica.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_GEOGRAFICO} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
