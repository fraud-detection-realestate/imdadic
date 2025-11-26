"use client";

import type { AnomalyRecord } from "@/types/anomaly";
import Link from "next/link";
import { Card } from "@/components/shared/Card";

interface RecentAnomaliesTableProps {
  anomalies: AnomalyRecord[];
}

const severityColors: Record<AnomalyRecord["severidad"], string> = {
  alta: "bg-rose-50 text-rose-700 border-rose-100",
  media: "bg-amber-50 text-amber-700 border-amber-100",
  baja: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export function RecentAnomaliesTable({ anomalies }: RecentAnomaliesTableProps) {
  return (
    <Card
      title="Anomalías recientes"
      subtitle="Últimas transacciones marcadas por los modelos. Datos mock a la espera de integración con backend."
      className="h-full"
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="py-3 px-4 text-left font-medium text-slate-500">ID</th>
              <th className="py-3 px-4 text-left font-medium text-slate-500">Ciudad</th>
              <th className="py-3 px-4 text-left font-medium text-slate-500">Severidad</th>
              <th className="py-3 px-4 text-left font-medium text-slate-500">Tipo</th>
              <th className="py-3 px-4 text-left font-medium text-slate-500">Fecha</th>
              <th className="py-3 px-4 text-right font-medium text-slate-500">Valor</th>
              <th className="py-3 px-4 text-center font-medium text-slate-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                <td className="py-2.5 px-4 font-mono text-[11px] sm:text-xs text-slate-700">{a.id}</td>
                <td className="py-2.5 px-4 text-slate-700">
                  <span className="font-medium">{a.ciudad}</span>
                  <span className="text-slate-400 text-[11px] sm:text-xs"> · {a.municipio}</span>
                </td>
                <td className="py-2.5 px-4">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-medium ${severityColors[a.severidad]}`}>
                    {a.severidad.toUpperCase()}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-slate-700 capitalize">
                  {a.tipo.replace("_", " ")}
                </td>
                <td className="py-2.5 px-4 text-slate-600">
                  {new Date(a.fecha).toLocaleDateString("es-CO")}
                </td>
                <td className="py-2.5 px-4 text-right text-slate-700">
                  {a.valorTransaccion.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="py-2.5 px-4 text-center">
                  <Link
                    href={`/anomaly/${a.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-[11px] sm:text-xs px-3 py-1 hover:bg-slate-800 transition-colors"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
