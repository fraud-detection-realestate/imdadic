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

const intentClasses: Record<NonNullable<KpiCardProps["intent"]>, { bg: string; icon: string; border: string }> = {
  default: {
    bg: "bg-[var(--gray-50)]",
    icon: "text-[var(--gray-700)]",
    border: "border-[var(--gray-200)]",
  },
  success: {
    bg: "bg-[var(--success-50)]",
    icon: "text-[var(--success-700)]",
    border: "border-[var(--success-200)]",
  },
  warning: {
    bg: "bg-[var(--warning-50)]",
    icon: "text-[var(--warning-700)]",
    border: "border-[var(--warning-200)]",
  },
  danger: {
    bg: "bg-[var(--danger-50)]",
    icon: "text-[var(--danger-700)]",
    border: "border-[var(--danger-200)]",
  },
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
  const classes = intentClasses[intent];

  return (
    <article className="bg-white rounded-xl shadow-[var(--shadow-sm)] border border-[var(--border-color)] p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:border-[var(--border-color-hover)] group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--gray-600)] uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold text-[var(--gray-900)] tracking-tight">
            {value}
          </p>
          {helper && (
            <p className="mt-1.5 text-xs text-[var(--gray-600)] leading-relaxed">
              {helper}
            </p>
          )}
        </div>
        <div
          className={`
            inline-flex h-12 w-12 items-center justify-center rounded-xl border
            ${classes.bg} ${classes.border}
            transition-transform duration-200 group-hover:scale-110
          `}
        >
          <Icon name={iconName} className={`h-6 w-6 ${classes.icon}`} />
        </div>
      </div>
      {(trendLabel || trendValue) && (
        <div className="pt-3 border-t border-[var(--border-color)]">
          <p className="text-xs text-[var(--gray-600)]">
            {trendLabel && <span className="font-medium">{trendLabel} </span>}
            {trendValue && (
              <span className="font-semibold text-[var(--igac-blue-700)]">
                {trendValue}
              </span>
            )}
          </p>
        </div>
      )}
    </article>
  );
}
