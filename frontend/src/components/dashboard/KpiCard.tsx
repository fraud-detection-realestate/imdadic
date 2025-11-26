"use client";

import type { IconName } from "@/components/shared/Icon";
import { Icon } from "@/components/shared/Icon";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  trendLabel?: string;
  trendValue?: string;
  iconName: IconName;
  intent?: "default" | "success" | "warning" | "danger";
}

const intentClasses: Record<NonNullable<KpiCardProps["intent"]>, string> = {
  default: "bg-slate-50 text-slate-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
};

export function KpiCard({
  label,
  value,
  helper,
  trendLabel,
  trendValue,
  iconName,
  intent = "default",
}: KpiCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
        </div>
        <div
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${intentClasses[intent]}`}
        >
          <Icon name={iconName} className="h-5 w-5" />
        </div>
      </div>
      {(trendLabel || trendValue) && (
        <p className="mt-1 text-xs text-slate-500">
          {trendLabel && <span>{trendLabel} </span>}
          {trendValue && <span className="font-medium text-slate-800">{trendValue}</span>}
        </p>
      )}
    </article>
  );
}
