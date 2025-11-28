"use client";

import type { ReactNode } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-[var(--gray-100)] text-[var(--gray-700)] border-[var(--gray-200)]",
    success: "bg-[var(--success-50)] text-[var(--success-700)] border-[var(--success-100)]",
    warning: "bg-[var(--warning-50)] text-[var(--warning-700)] border-[var(--warning-100)]",
    danger: "bg-[var(--danger-50)] text-[var(--danger-700)] border-[var(--danger-100)]",
    info: "bg-[var(--info-50)] text-[var(--info-700)] border-[var(--info-100)]",
};

const sizeClasses: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
};

const dotColors: Record<BadgeVariant, string> = {
    default: "bg-[var(--gray-500)]",
    success: "bg-[var(--success-600)]",
    warning: "bg-[var(--warning-600)]",
    danger: "bg-[var(--danger-600)]",
    info: "bg-[var(--info-600)]",
};

export function Badge({
    variant = "default",
    size = "md",
    children,
    icon,
    className = "",
    dot = false,
}: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
            role="status"
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}
                    aria-hidden="true"
                />
            )}
            {icon && <span aria-hidden="true">{icon}</span>}
            {children}
        </span>
    );
}
