"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Star, Crown, Zap, Clock, CheckCircle, XCircle, AlertCircle, Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

function LevelIcon({ level }: { level: string }) {
  if (level === "Black") return <Zap size={16} className="text-white" />;
  if (level === "Gold") return <Crown size={16} className="text-black" />;
  return <Star size={16} className="text-gray-600" />;
}

function LevelGradient({ level }: { level: string }) {
  if (level === "Black") return "from-gray-800 to-gray-900";
  if (level === "Gold") return "from-[#C9A227] to-[#E0B84A]";
  return "from-gray-400 to-gray-500";
}

function PointsBar({ points, level }: { points: number; level: string }) {
  const max = level === "Silver" ? 400 : level === "Gold" ? 1000 : 2000;
  const pct = Math.min((points / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--foreground)] opacity-50">{points} pts</span>
        <span className="text-[var(--foreground)] opacity-30">{max} pts</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
          className="h-full rounded-full bg-[var(--gold)]" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { appointments, loadAppointments, cancelAppointment, getUserAppointments } = useBookingStore();
  const router = useRouter();

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!user) return null;

  const userAppointments = getUserAppointments(user.id);
  const upcoming = userAppointments.filter((a) => a.status !== "cancelled" && new Date(a.date) >= new Date());
  const past = userAppointments.filter((a) => a.status === "completed" || new Date(a.date) < new Date());

  const statusIcons = {
    pending: <AlertCircle size={14} className="text-amber-400" />,
    confirmed: <CheckCircle size={14} className="text-emerald-400" />,
    completed: <CheckCircle size={14} className="text-blue-400" />,
    cancelled: <XCircle size={14} className="text-red-400" />,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Mi Panel</h1>
          <p className="text-sm text-[var(--foreground)] opacity-50 mt-1">Gestiona tus citas y recompensas</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)]">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${LevelGradient({ level: user.level })} flex items-center justify-center mb-4`}>
              <span className="text-2xl font-bold text-black">{user.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)]">{user.name}</h2>
            <p className="text-sm text-[var(--foreground)] opacity-40 mb-4">{user.email}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${LevelGradient({ level: user.level })} flex items-center justify-center`}>
                <LevelIcon level={user.level} />
              </div>
              <Badge variant={user.level === "Gold" ? "gold" : user.level === "Black" ? "black" : "silver"}>
                Miembro {user.level}
              </Badge>
            </div>
            <PointsBar points={user.points} level={user.level} />
            <p className="text-xs text-[var(--foreground)] opacity-30 mt-2">
              {user.level === "Black" ? "Nivel máximo alcanzado ✨" :
               user.level === "Gold" ? `${1000 - user.points} pts para nivel Black` :
               `${400 - user.points} pts para nivel Gold`}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Total citas", value: userAppointments.length, icon: Calendar, color: "text-blue-400" },
              { label: "Puntos", value: user.points, icon: Star, color: "text-[var(--gold)]" },
              { label: "Próximas", value: upcoming.length, icon: Clock, color: "text-emerald-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)]">
                <stat.icon size={20} className={`${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                <p className="text-xs text-[var(--foreground)] opacity-40 uppercase tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-3 bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">¿Listo para tu próxima cita?</p>
                <p className="text-xs text-[var(--foreground)] opacity-30">Reserva ahora y gana +100 puntos</p>
              </div>
              <Link href="/reservar">
                <Button variant="primary" size="sm" icon={<Plus size={14} />}>Reservar</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Upcoming appointments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Próximas citas</h2>
          {upcoming.length === 0 ? (
            <div className="bg-[var(--surface)] rounded-3xl p-10 border border-[var(--border)] text-center">
              <Calendar size={40} className="mx-auto text-[var(--foreground)] opacity-20 mb-3" />
              <p className="text-[var(--foreground)] opacity-50 mb-4">No tienes citas próximas</p>
              <Link href="/reservar">
                <Button variant="primary" size="md">Reservar ahora</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((apt) => (
                <div key={apt.id} className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {statusIcons[apt.status]}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(apt.status)}`}>
                        {getStatusLabel(apt.status)}
                      </span>
                    </div>
                    <p className="font-semibold text-[var(--foreground)]">{apt.serviceName}</p>
                    <p className="text-sm text-[var(--foreground)] opacity-50">Con {apt.barberName} · {apt.date} · {apt.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[var(--gold)]">{formatCurrency(apt.servicePrice)}</p>
                    {apt.status !== "cancelled" && (
                      <button onClick={() => cancelAppointment(apt.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors mt-1">
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Past appointments */}
        {past.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Historial</h2>
            <div className="space-y-3">
              {past.slice(0, 5).map((apt) => (
                <div key={apt.id} className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] flex items-center gap-4 opacity-60">
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{apt.serviceName}</p>
                    <p className="text-xs text-[var(--foreground)] opacity-50">{apt.date} · {apt.barberName}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--foreground)] opacity-70">{formatCurrency(apt.servicePrice)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
