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
  Legend,
} from "recharts";
import { Card } from "@/components/shared/Card";
import type { AnomalyRecord } from "@/types/anomaly";

interface DashboardChartsProps {
  tendenciaMensual: Array<{ mes: string; anomalías: number }>;
  severidad: Array<{ nombre: string; valor: number }>;
  anomalías: AnomalyRecord[];
  ciudadTop: string;
}

// Colores IGAC para gráficos
const IGAC_COLORS = {
  primary: "#0066CC",
  secondary: "#003876",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  chart: ["#0066CC", "#3399FF", "#66B3FF", "#003876", "#004A99"],
};

const SEVERITY_COLORS: Record<string, string> = {
  Alta: "#EF4444",
  Media: "#F59E0B",
  Baja: "#10B981",
};

export function DashboardCharts({
  tendenciaMensual,
  severidad,
  anomalías,
  ciudadTop,
}: DashboardChartsProps) {
  // Calcular top 5 municipios con más anomalías
  const municipiosCounts = anomalías.reduce((acc, a) => {
    const key = `${a.ciudad}, ${a.municipio}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topMunicipios = Object.entries(municipiosCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([nombre, cantidad]) => ({ nombre, cantidad }));

  // Calcular distribución por tipo de anomalía
  const tiposCounts = anomalías.reduce((acc, a) => {
    acc[a.tipo] = (acc[a.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tiposData = Object.entries(tiposCounts)
    .map(([nombre, valor]) => ({
      nombre: nombre.replace(/_/g, " ").toLowerCase(),
      valor,
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 6);

  // Preparar datos de severidad con colores
  const severidadConColores = severidad.map((s) => ({
    ...s,
    fill: SEVERITY_COLORS[s.nombre] || IGAC_COLORS.primary,
  }));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Tendencia Temporal - Ocupa 2 columnas en desktop */}
      <Card
        title="Tendencia temporal de anomalías"
        subtitle="Evolución mensual del conteo de anomalías detectadas"
        className="lg:col-span-2"
        elevation="outlined"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendenciaMensual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 12, fill: "var(--gray-600)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 12, fill: "var(--gray-600)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border-color)",
                  fontSize: 13,
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <Line
                type="monotone"
                dataKey="anomalías"
                stroke={IGAC_COLORS.primary}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Distribución por Severidad */}
      <Card
        title="Distribución por severidad"
        subtitle="Clasificación de anomalías según nivel de riesgo"
        elevation="outlined"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severidadConColores} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border-color)" />
              <XAxis
                dataKey="nombre"
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 12, fill: "var(--gray-600)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 12, fill: "var(--gray-600)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border-color)",
                  fontSize: 13,
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
                {severidadConColores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top 5 Municipios */}
      <Card
        title="Top 5 municipios con más anomalías"
        subtitle="Municipios con mayor concentración de casos detectados"
        elevation="outlined"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topMunicipios}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--border-color)" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 12, fill: "var(--gray-600)" }}
              />
              <YAxis
                type="category"
                dataKey="nombre"
                tickLine={false}
                axisLine={{ stroke: "var(--border-color)" }}
                tick={{ fontSize: 11, fill: "var(--gray-600)" }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border-color)",
                  fontSize: 13,
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <Bar dataKey="cantidad" radius={[0, 8, 8, 0]} fill={IGAC_COLORS.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Distribución por Tipo de Anomalía */}
      <Card
        title="Tipos de anomalías más frecuentes"
        subtitle="Clasificación por patrón de comportamiento detectado"
        elevation="outlined"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tiposData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { nombre, percent } = props;
                  if (!nombre || percent === undefined) return "";
                  return `${nombre.slice(0, 15)}... ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                fill={IGAC_COLORS.primary}
                dataKey="valor"
              >
                {tiposData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={IGAC_COLORS.chart[index % IGAC_COLORS.chart.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border-color)",
                  fontSize: 13,
                  boxShadow: "var(--shadow-md)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Resumen Geográfico */}
      <Card
        title="Resumen geográfico"
        subtitle="Cobertura y concentración de anomalías"
        elevation="outlined"
        className="lg:col-span-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] mb-3">
              <span className="text-2xl font-bold text-white">{anomalías.length}</span>
            </div>
            <p className="text-sm font-medium text-[var(--gray-900)]">Total Anomalías</p>
            <p className="text-xs text-[var(--gray-600)] mt-1">Casos detectados</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--success-600)] to-[var(--success-700)] mb-3">
              <span className="text-2xl font-bold text-white">{Object.keys(municipiosCounts).length}</span>
            </div>
            <p className="text-sm font-medium text-[var(--gray-900)]">Municipios Afectados</p>
            <p className="text-xs text-[var(--gray-600)] mt-1">Con al menos 1 caso</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--warning-600)] to-[var(--warning-700)] mb-3">
              <span className="text-xl font-bold text-white truncate px-2">{ciudadTop}</span>
            </div>
            <p className="text-sm font-medium text-[var(--gray-900)]">Ciudad Crítica</p>
            <p className="text-xs text-[var(--gray-600)] mt-1">Mayor concentración</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
