"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] text-white shadow-[var(--shadow-igac-sm)] hover:from-[var(--igac-blue-800)] hover:to-[var(--igac-blue-900)] hover:shadow-[var(--shadow-igac-md)] active:shadow-[var(--shadow-igac-sm)]",
    secondary: "bg-white text-[var(--igac-blue-700)] border-2 border-[var(--igac-blue-700)] hover:bg-[var(--igac-blue-50)] hover:border-[var(--igac-blue-800)] hover:text-[var(--igac-blue-800)]",
    outline: "bg-transparent text-[var(--gray-700)] border border-[var(--border-color)] hover:bg-[var(--gray-50)] hover:border-[var(--border-color-hover)]",
    ghost: "bg-transparent text-[var(--gray-700)] hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]",
    danger: "bg-gradient-to-br from-[var(--danger-600)] to-[var(--danger-700)] text-white shadow-sm hover:from-[var(--danger-700)] hover:to-[var(--danger-700)] hover:shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3.5 text-base rounded-xl",
};

export function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    fullWidth = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--igac-blue-600)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const hoverEffect = variant === "primary" || variant === "danger"
        ? "hover:-translate-y-0.5 active:translate-y-0"
        : "";

    return (
        <button
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${hoverEffect}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Cargando...</span>
                </>
            ) : (
                <>
                    {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
                </>
            )}
        </button>
    );
}
