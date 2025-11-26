"use client";

import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export function Card({ title, subtitle, children, className = "", headerRight }: CardProps) {
  return (
    <section
      className={`bg-white rounded-xl shadow-sm border border-slate-200/70 p-6 flex flex-col gap-4 ${className}`}
    >
      {(title || subtitle || headerRight) && (
        <header className="flex items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
