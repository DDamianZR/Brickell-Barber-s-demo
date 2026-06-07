"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Clock, CheckCircle, AlertCircle, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import { barbers } from "@/data/barbers";
import Badge from "@/components/ui/Badge";

export default function BarberPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { appointments, loadAppointments, getBarberAppointments } = useBookingStore();
  const router = useRouter();

  useEffect(() => { loadAppointments(); }, [loadAppointments]);
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "barber") router.push("/login");
  }, [isAuthenticated, user, router]);

  if (!user || user.role !== "barber") return null;

  const barber = barbers.find((b) => b.name === user.name);
  const barberId = barber?.id || "b1";
  const myAppointments = getBarberAppointments(barberId);

  const today = new Date().toISOString().split("T")[0];
  const todayApts = myAppointments.filter((a) => a.date === today);
  const upcoming = myAppointments.filter((a) => a.date > today);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Mi Panel</h1>
          <p className="text-sm text-[var(--foreground)] opacity-50 mt-1">Bienvenido, {user.name}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Hoy", value: todayApts.length, icon: Calendar, color: "text-[var(--gold)]" },
            { label: "Esta semana", value: upcoming.length, icon: Clock, color: "text-blue-400" },
            { label: "Total citas", value: myAppointments.length, icon: CheckCircle, color: "text-emerald-400" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] text-center">
              <s.icon size={20} className={`${s.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-xs text-[var(--foreground)] opacity-40 uppercase tracking-wide mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Today */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Agenda de hoy</h2>
          {todayApts.length === 0 ? (
            <div className="bg-[var(--surface)] rounded-3xl p-10 border border-[var(--border)] text-center">
              <AlertCircle size={32} className="mx-auto text-[var(--foreground)] opacity-20 mb-3" />
              <p className="text-[var(--foreground)] opacity-50">Sin citas para hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayApts.map((apt) => (
                <div key={apt.id} className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--gold)]/20 flex items-center gap-4 flex-wrap">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center">
                    <User size={18} className="text-[var(--gold)]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--foreground)]">{apt.clientName}</p>
                    <p className="text-sm text-[var(--foreground)] opacity-50">{apt.serviceName} · {apt.time}</p>
                  </div>
                  <Badge variant="gold">{formatCurrency(apt.servicePrice)}</Badge>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Upcoming */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Próximas citas</h2>
          {upcoming.length === 0 ? (
            <div className="bg-[var(--surface)] rounded-3xl p-10 border border-[var(--border)] text-center">
              <p className="text-[var(--foreground)] opacity-50">Sin citas próximas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((apt) => (
                <div key={apt.id} className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] flex items-center gap-4 flex-wrap">
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{apt.clientName}</p>
                    <p className="text-sm text-[var(--foreground)] opacity-50">{apt.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--foreground)]">{apt.date}</p>
                    <p className="text-xs text-[var(--foreground)] opacity-40">{apt.time}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--gold)]">{formatCurrency(apt.servicePrice)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
