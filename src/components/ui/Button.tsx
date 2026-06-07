"use client";
import { motion } from "framer-motion";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[var(--gold)] text-black hover:bg-[var(--gold-light)] shadow-lg hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] active:scale-[0.98]",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--gold)] hover:text-[var(--gold)] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] active:scale-[0.98]",
      outline:
        "bg-transparent text-[var(--gold)] border border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black active:scale-[0.98]",
      danger:
        "bg-red-600 text-white hover:bg-red-500 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-lg",
      md: "px-6 py-3 text-sm rounded-xl",
      lg: "px-8 py-4 text-base rounded-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {iconRight && !loading && (
          <span className="flex-shrink-0">{iconRight}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
