"use client";

import type { AnomalyRecord } from "@/types/anomaly";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import type { BadgeVariant } from "@/components/shared/Badge";
import { Icon } from "@/components/shared/Icon";

interface RecentAnomaliesTableProps {
  anomalies: AnomalyRecord[];
}

const severityVariants: Record<AnomalyRecord["severidad"], BadgeVariant> = {
  alta: "danger",
  media: "warning",
  baja: "success",
};

const severityLabels: Record<AnomalyRecord["severidad"], string> = {
  alta: "ALTA",
  media: "MEDIA",
  baja: "BAJA",
};

export function RecentAnomaliesTable({ anomalies }: RecentAnomaliesTableProps) {
  const [reviewedAnomalies, setReviewedAnomalies] = useState<Record<string, boolean>>({});

  // Load reviewed anomalies from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('reviewedAnomalies');
    if (stored) {
      setReviewedAnomalies(JSON.parse(stored));
    }

    // Set up an interval to check for updates (in case user marks as reviewed in another tab)
    const interval = setInterval(() => {
      const updated = localStorage.getItem('reviewedAnomalies');
      if (updated) {
        setReviewedAnomalies(JSON.parse(updated));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Card
      title="Anomalías recientes"
      subtitle="Últimas transacciones marcadas por los modelos. Datos reales del sistema."
      className="h-full"
    >
      <div className="overflow-x-auto -mx-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--gray-50)]">
              <th className="py-3.5 px-4 text-left font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                ID
              </th>
              <th className="py-3.5 px-4 text-left font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Ciudad
              </th>
              <th className="py-3.5 px-4 text-left font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Severidad
              </th>
              <th className="py-3.5 px-4 text-left font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Tipo
              </th>
              <th className="py-3.5 px-4 text-left font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Fecha
              </th>
              <th className="py-3.5 px-4 text-right font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Valor
              </th>
              <th className="py-3.5 px-4 text-center font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Revisada
              </th>
              <th className="py-3.5 px-4 text-center font-semibold text-[var(--gray-700)] text-xs uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((a) => (
              <tr
                key={a.id}
                className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--gray-50)] transition-colors duration-150"
              >
                <td className="py-3.5 px-4 font-mono text-xs text-[var(--gray-700)]">
                  {a.id}
                </td>
                <td className="py-3.5 px-4 text-[var(--gray-900)]">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{a.ciudad}</span>
                    <span className="text-xs text-[var(--gray-600)]">{a.municipio}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant={severityVariants[a.severidad]} size="sm">
                    {severityLabels[a.severidad]}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 text-[var(--gray-700)] capitalize">
                  {a.tipo.replace("_", " ")}
                </td>
                <td className="py-3.5 px-4 text-[var(--gray-600)] text-sm">
                  {new Date(a.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3.5 px-4 text-right font-semibold text-[var(--gray-900)]">
                  {a.valorTransaccion.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {reviewedAnomalies[a.id] && (
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                      <Icon name="check" className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <Link
                    href={`/anomaly/${a.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] text-white text-xs font-medium px-4 py-2 hover:from-[var(--igac-blue-800)] hover:to-[var(--igac-blue-900)] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {anomalies.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[var(--gray-600)] text-sm">
            No se encontraron anomalías con los filtros seleccionados.
          </p>
        </div>
      )}
    </Card>
  );
}
