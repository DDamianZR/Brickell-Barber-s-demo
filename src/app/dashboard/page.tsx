"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Star, Crown, Zap, Clock, CheckCircle, XCircle, AlertCircle, Plus, Scissors, Gift, RotateCcw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

function LevelIcon({ level }: { level: string }) {
  if (level === "Black") return <Zap size={13} className="text-white" />;
  if (level === "Gold") return <Crown size={13} className="text-black" />;
  return <Star size={13} className="text-neutral-300" />;
}

function LevelGradient({ level }: { level: string }) {
  if (level === "Black") return "from-neutral-800 to-neutral-950";
  if (level === "Gold") return "from-[#C9A227] to-[#E0B84A]";
  return "from-neutral-400 to-neutral-500";
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { appointments, loadAppointments, cancelAppointment, getUserAppointments } = useBookingStore();
  const router = useRouter();

  // Demo Stamp State: start with 3 completed stamps so it looks active out of the box
  const [stamps, setStamps] = useState(3);
  const [showVoucher, setShowVoucher] = useState(false);

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
    pending: <AlertCircle size={12} className="text-amber-400" />,
    confirmed: <CheckCircle size={12} className="text-emerald-400" />,
    completed: <CheckCircle size={12} className="text-blue-400" />,
    cancelled: <XCircle size={12} className="text-red-400" />,
  };

  const handleAddStamp = () => {
    if (stamps < 8) {
      const nextStamps = stamps + 1;
      setStamps(nextStamps);
      if (nextStamps === 8) {
        setShowVoucher(true);
      }
    }
  };

  const handleResetStamps = () => {
    setStamps(0);
    setShowVoucher(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 px-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Club <span className="text-gradient-gold">VIP</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">Beneficios exclusivos y fidelidad digital.</p>
      </motion.div>

      {/* 1. VIP Membership Metal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-44 rounded-3xl p-5 bg-gradient-to-br from-[#1C1D21] via-[#121316] to-[#0A0B0D] border border-white/5 shadow-2xl flex flex-col justify-between mb-8 overflow-hidden"
      >
        {/* Shiny radial sheen */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_100%)] pointer-events-none" />
        
        {/* Top line: Brand & Level Badge */}
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-[8px] font-black text-[var(--gold)] tracking-[0.25em] uppercase">BRICKELL VIP CLUB</span>
            <h3 className="text-sm font-bold text-white mt-0.5">{user.name}</h3>
          </div>
          <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${LevelGradient({ level: user.level })} flex items-center justify-center border border-white/10 shadow-lg`}>
            <LevelIcon level={user.level} />
          </div>
        </div>

        {/* Middle line: Points Slider */}
        <div className="relative z-10">
          <div className="flex justify-between items-center text-[9px] text-neutral-400 mb-1 font-semibold">
            <span>Rango de Fidelidad</span>
            <span>{user.points} / {user.level === "Silver" ? "400" : user.level === "Gold" ? "1000" : "2000"} pts</span>
          </div>
          {/* Slider track */}
          <div className="w-full h-1.5 rounded-full neo-inset p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((user.points / (user.level === "Silver" ? 400 : user.level === "Gold" ? 1000 : 2000)) * 100, 100)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
            />
          </div>
        </div>

        {/* Bottom line: Card ID */}
        <div className="flex justify-between items-end relative z-10">
          <div>
            <span className="text-[7px] text-neutral-500 uppercase block">ID de Socio</span>
            <p className="text-[9px] font-mono text-neutral-300">BC-{user.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase text-[var(--gold)] tracking-widest">
            MIEMBRO {user.level.toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* 2. Interactive Visitas Stamp Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="neo-flat rounded-3xl p-5 border border-[var(--border)] mb-6 relative"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tarjeta de Visitas</h3>
            <p className="text-[9px] text-neutral-500 mt-0.5">Completa 8 sellos para tu corte gratis</p>
          </div>
          <span className="text-xs font-black text-[var(--gold)]">{stamps}/8 Sellos</span>
        </div>

        {/* Stamps 2x4 grid */}
        <div className="grid grid-cols-4 gap-3 my-4">
          {Array.from({ length: 8 }).map((_, idx) => {
            const isStamped = idx < stamps;
            const isLast = idx === 7;
            
            return (
              <div key={idx} className="aspect-square flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {isStamped ? (
                    <motion.div
                      key="stamped"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 15 }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex flex-col items-center justify-center text-black shadow-lg shadow-[var(--gold)]/15 border border-[var(--gold-light)]/20"
                    >
                      {isLast ? (
                        <Gift size={16} className="stroke-[2.5]" />
                      ) : (
                        <Scissors size={14} className="stroke-[2.5]" />
                      )}
                      <span className="text-[8px] font-black mt-0.5 leading-none">VIP</span>
                    </motion.div>
                  ) : (
                    <div
                      key="empty"
                      className="absolute inset-0 rounded-2xl neo-inset flex flex-col items-center justify-center text-neutral-600"
                    >
                      {isLast ? (
                        <Gift size={13} className="opacity-45 text-[var(--gold)]/70" />
                      ) : (
                        <span className="text-xs font-mono font-bold opacity-30">{idx + 1}</span>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Free haircut unlocked banner */}
        <AnimatePresence>
          {showVoucher && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3.5 bg-gradient-to-r from-[var(--gold-glow)] to-emerald-500/10 border border-[var(--gold)]/20 rounded-2xl text-center"
            >
              <p className="text-xs font-bold text-[var(--gold)] flex items-center justify-center gap-1.5">
                👑 ¡Corte Gratis Desbloqueado!
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">
                Presenta esta pantalla en caja para redimir tu corte premium gratuito.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo simulator controls */}
        <div className="mt-5 pt-3 border-t border-neutral-900/50 flex gap-2 justify-end">
          <button
            onClick={handleAddStamp}
            disabled={stamps >= 8}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl neo-btn text-[9px] font-bold text-white uppercase border border-[var(--border)] active:scale-95 disabled:opacity-45 disabled:cursor-not-allowed"
          >
            <Plus size={11} className="text-[var(--gold)]" /> Visita (+1 Sello)
          </button>
          <button
            onClick={handleResetStamps}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl neo-btn text-[9px] font-bold text-neutral-500 uppercase active:scale-95"
            title="Reiniciar sellos"
          >
            <RotateCcw size={10} /> Reiniciar
          </button>
        </div>
      </motion.div>

      {/* 3. Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6 px-1"
      >
        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3.5">Próximas Citas</h2>
        {upcoming.length === 0 ? (
          <div className="neo-flat rounded-2xl p-6 border border-[var(--border)] text-center">
            <Calendar size={28} className="mx-auto text-neutral-700 mb-2.5" />
            <p className="text-[10px] text-neutral-500 mb-3.5">No tienes citas programadas.</p>
            <Link href="/reservar">
              <Button variant="primary" size="sm" className="!py-2 !text-[11px] !rounded-xl font-bold bg-[var(--gold)] text-black">
                Reservar Ahora
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <div key={apt.id} className="neo-flat rounded-2xl p-4 border border-[var(--border)] flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {statusIcons[apt.status]}
                    <span className="text-[8px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white truncate">{apt.serviceName}</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Con {apt.barberName} · {apt.date} a las {apt.time}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-[var(--gold)]">${apt.servicePrice}</p>
                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="text-[9px] text-red-400 font-semibold hover:underline mt-1 block"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 4. Past Appointments Historial */}
      {past.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-1"
        >
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Historial</h2>
          <div className="space-y-2">
            {past.slice(0, 3).map((apt) => (
              <div key={apt.id} className="neo-flat rounded-xl p-3 border border-[var(--border)] flex justify-between items-center gap-3 opacity-60">
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{apt.serviceName}</h4>
                  <p className="text-[9px] text-neutral-500">{apt.date} · con {apt.barberName}</p>
                </div>
                <span className="text-xs font-bold text-neutral-300 shrink-0">${apt.servicePrice}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
