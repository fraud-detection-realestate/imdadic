"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

export type InputVariant = "default" | "error" | "success";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    errorText?: string;
    variant?: InputVariant;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

const variantClasses: Record<InputVariant, string> = {
    default: "border-[var(--border-color)] focus:border-[var(--igac-blue-600)] focus:ring-[var(--igac-blue-100)]",
    error: "border-[var(--danger-500)] focus:border-[var(--danger-600)] focus:ring-[var(--danger-100)]",
    success: "border-[var(--success-500)] focus:border-[var(--success-600)] focus:ring-[var(--success-100)]",
};

export function Input({
    label,
    helperText,
    errorText,
    variant = "default",
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = "",
    id,
    required,
    disabled,
    ...props
}: InputProps) {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = helperText || errorText ? `${inputId}-helper` : undefined;
    const actualVariant = errorText ? "error" : variant;

    return (
        <div className={`${fullWidth ? "w-full" : ""}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-[var(--gray-700)] mb-1.5"
                >
                    {label}
                    {required && <span className="text-[var(--danger-600)] ml-1" aria-label="requerido">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)]" aria-hidden="true">
                        {leftIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    className={`
            w-full px-3 py-2.5 text-sm text-[var(--gray-900)]
            bg-white rounded-lg border
            transition-all duration-200 ease-in-out
            placeholder:text-[var(--gray-500)]
            focus:outline-none focus:ring-2
            disabled:bg-[var(--gray-100)] disabled:cursor-not-allowed disabled:text-[var(--gray-500)]
            ${variantClasses[actualVariant]}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${className}
          `}
                    aria-describedby={helperId}
                    aria-invalid={actualVariant === "error"}
                    disabled={disabled}
                    required={required}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)]" aria-hidden="true">
                        {rightIcon}
                    </div>
                )}
            </div>

            {(helperText || errorText) && (
                <p
                    id={helperId}
                    className={`mt-1.5 text-xs ${errorText
                            ? "text-[var(--danger-600)]"
                            : "text-[var(--gray-600)]"
                        }`}
                    role={errorText ? "alert" : undefined}
                >
                    {errorText || helperText}
                </p>
            )}
        </div>
    );
}
