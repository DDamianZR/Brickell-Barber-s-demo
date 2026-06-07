export function formatDistanceToNow(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora mismo";
  if (minutes < 60) return `hace ${minutes}m`;
  if (hours < 24) return `hace ${hours}h`;
  if (days < 7) return `hace ${days}d`;
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    confirmed: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    completed: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    cancelled: "text-red-400 bg-red-500/10 border-red-500/30",
  };
  return map[status] || "";
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    completed: "Completada",
    cancelled: "Cancelada",
  };
  return map[status] || status;
}
