"use client";

import type { ReactNode } from "react";

export type CardElevation = "flat" | "elevated" | "outlined";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
  elevation?: CardElevation;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const elevationClasses: Record<CardElevation, string> = {
  flat: "bg-white border-0 shadow-none",
  elevated: "bg-white border-0 shadow-[var(--shadow-md)]",
  outlined: "bg-white border border-[var(--border-color)] shadow-[var(--shadow-sm)]",
};

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  title,
  subtitle,
  children,
  className = "",
  headerRight,
  elevation = "outlined",
  hoverable = false,
  padding = "md",
}: CardProps) {
  return (
    <section
      className={`
        rounded-xl transition-all duration-200 ease-in-out
        ${elevationClasses[elevation]}
        ${paddingClasses[padding]}
        ${hoverable ? "hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-color-hover)] cursor-pointer" : ""}
        ${className}
      `}
    >
      {(title || subtitle || headerRight) && (
        <header className={`flex items-start justify-between gap-3 ${padding !== "none" ? "mb-4" : "p-6 pb-4"}`}>
          <div className="flex-1">
            {title && (
              <h2 className="text-base font-semibold text-[var(--gray-900)] tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-[var(--gray-600)]">
                {subtitle}
              </p>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2 flex-shrink-0">{headerRight}</div>}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
