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
        "bg-[var(--gold)] text-black font-bold hover:bg-[var(--gold-light)] shadow-md shadow-[var(--gold)]/15 hover:shadow-[0_0_16px_rgba(0,200,255,0.28)] active:scale-[0.97] transition-all duration-200",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--gold)]/30 hover:text-[var(--gold)] active:scale-[0.97]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] active:scale-[0.97]",
      outline:
        "bg-transparent text-[var(--gold)] border border-[var(--gold)]/40 hover:bg-[var(--gold)] hover:text-black active:scale-[0.97]",
      danger:
        "bg-[var(--red-accent)] text-white hover:bg-[var(--red-accent-light)] active:scale-[0.97]",
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
