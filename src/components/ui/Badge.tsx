interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "silver" | "black" | "success" | "warning" | "info";
  size?: "sm" | "md";
}

const styles = {
  gold: "bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--gold)]/30",
  silver: "bg-gray-500/10 text-gray-400 border border-gray-500/30",
  black: "bg-white/5 text-white border border-white/10",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  info: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export default function Badge({ children, variant = "gold", size = "md" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium tracking-wide ${styles[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
