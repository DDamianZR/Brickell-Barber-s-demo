"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BarChart3, Users, Calendar, DollarSign, TrendingUp,
  Settings, Shield, Star, Package, ChevronUp
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { services } from "@/data/services";
import { formatCurrency } from "@/lib/utils";

const mockMetrics = {
  dailyRevenue: 485,
  dailyAppointments: 12,
  recurringClients: 87,
  avgRating: 4.9,
};

function MetricCard({ icon: Icon, label, value, change, color }: {
  icon: React.ElementType; label: string; value: string | number; change?: string; color: string;
}) {
  return (
    <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {change && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <ChevronUp size={12} /> {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-[var(--foreground)] mb-1">{value}</p>
      <p className="text-xs text-[var(--foreground)] opacity-40 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function SimpleBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--foreground)] opacity-60 w-32 truncate">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
          className="h-full rounded-full bg-[var(--gold)]" />
      </div>
      <span className="text-xs font-bold text-[var(--gold)] w-12 text-right">{value}</span>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { appointments, loadAppointments } = useBookingStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "services">("overview");

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") router.push("/login");
  }, [isAuthenticated, user, router]);

  if (!user || user.role !== "admin") return null;

  const totalRevenue = appointments.filter((a) => a.status !== "cancelled")
    .reduce((acc, a) => acc + a.servicePrice, 0);

  const servicePopularity = services.map((s) => ({
    name: s.name,
    count: appointments.filter((a) => a.serviceId === s.id && a.status !== "cancelled").length + Math.floor(Math.random() * 20 + 5),
  })).sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...servicePopularity.map((s) => s.count), 1);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-[var(--gold)]" />
              <span className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase">Panel Administrativo</span>
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">Dashboard</h1>
            <p className="text-sm text-[var(--foreground)] opacity-40 mt-1">Vista general de Brickell Barber&apos;s</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-[var(--foreground)] opacity-70">Sistema en línea</span>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: "Ingresos del día", value: formatCurrency(mockMetrics.dailyRevenue), change: "+12%", color: "bg-[var(--gold-glow)] text-[var(--gold)]" },
            { icon: Calendar, label: "Citas hoy", value: mockMetrics.dailyAppointments, change: "+3", color: "bg-blue-500/10 text-blue-400" },
            { icon: Users, label: "Clientes recurrentes", value: `${mockMetrics.recurringClients}%`, change: "+5%", color: "bg-emerald-500/10 text-emerald-400" },
            { icon: Star, label: "Calificación promedio", value: mockMetrics.avgRating, color: "bg-amber-500/10 text-amber-400" },
          ].map((m) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <MetricCard {...m} />
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "overview", label: "Resumen", icon: BarChart3 },
            { key: "appointments", label: "Citas", icon: Calendar },
            { key: "services", label: "Servicios", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === key ? "bg-[var(--gold)] text-black" : "bg-[var(--surface)] text-[var(--foreground)] opacity-60 hover:opacity-100 border border-[var(--border)]"
              }`}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue summary */}
            <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[var(--foreground)]">Ingresos Totales</h3>
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <p className="text-5xl font-bold text-[var(--gold)] mb-2">{formatCurrency(totalRevenue + 8420)}</p>
              <p className="text-xs text-[var(--foreground)] opacity-40 mb-6">Ingresos acumulados · {appointments.length + 234} citas</p>
              <div className="space-y-3">
                {["Cortes", "Barba", "Combos", "Tratamientos"].map((cat, i) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--foreground)] opacity-60">{cat}</span>
                    <span className="text-sm font-bold text-[var(--foreground)]">{formatCurrency([3200, 1800, 2400, 1020][i])}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service popularity */}
            <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[var(--foreground)]">Servicios más solicitados</h3>
                <Package size={18} className="text-[var(--gold)]" />
              </div>
              <div className="space-y-4">
                {servicePopularity.slice(0, 5).map((s) => (
                  <SimpleBar key={s.name} label={s.name} value={s.count} max={maxCount} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-bold text-[var(--foreground)]">Todas las citas</h3>
              <span className="text-xs text-[var(--foreground)] opacity-40">{appointments.length} total</span>
            </div>
            {appointments.length === 0 ? (
              <div className="text-center py-20">
                <Calendar size={40} className="mx-auto text-[var(--foreground)] opacity-20 mb-3" />
                <p className="text-[var(--foreground)] opacity-40">Sin citas registradas</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {appointments.slice().reverse().slice(0, 20).map((apt) => (
                  <div key={apt.id} className="flex items-center gap-4 p-4 hover:bg-[var(--surface-2)] transition-colors flex-wrap gap-y-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[var(--foreground)]">{apt.clientName}</p>
                      <p className="text-xs text-[var(--foreground)] opacity-40">{apt.serviceName} · {apt.barberName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--foreground)] opacity-60">{apt.date} · {apt.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border font-medium ${
                      apt.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                      apt.status === "cancelled" ? "bg-red-500/10 text-red-400 border-red-500/30" :
                      "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {apt.status === "confirmed" ? "Confirmada" : apt.status === "cancelled" ? "Cancelada" : "Pendiente"}
                    </span>
                    <span className="font-bold text-[var(--gold)] text-sm">{formatCurrency(apt.servicePrice)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border)]">
              <h3 className="font-bold text-[var(--foreground)]">Gestión de Servicios</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {services.map((service) => (
                <div key={service.id} className="flex items-center gap-4 p-4 hover:bg-[var(--surface-2)] transition-colors flex-wrap">
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{service.name}</p>
                    <p className="text-xs text-[var(--foreground)] opacity-40">{service.duration} min · {service.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      defaultValue={service.price}
                      className="w-20 px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] text-center focus:border-[var(--gold)]/50 transition-colors"
                    />
                    <span className="text-xs text-[var(--foreground)] opacity-40">USD</span>
                    <button className="px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-medium hover:bg-[var(--gold)]/20 transition-colors border border-[var(--gold)]/20">
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
