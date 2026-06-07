"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Star, Crown, Zap, CheckCircle, XCircle, AlertCircle, Plus, Scissors, Gift, RotateCcw, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { getStatusLabel } from "@/lib/utils";
import { playHapticClick, playHapticSuccess } from "@/lib/haptics";

function LevelIcon({ level }: { level: string }) {
  if (level === "Black") return <Zap size={14} className="text-white" />;
  if (level === "Gold") return <Crown size={14} className="text-black" />;
  return <Star size={14} className="text-neutral-300" />;
}

function LevelGradient({ level }: { level: string }) {
  if (level === "Black") return "from-neutral-800 to-neutral-950";
  if (level === "Gold") return "from-[#00C8FF] to-[#0099CC]";
  return "from-neutral-400 to-neutral-500";
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { loadAppointments, cancelAppointment, getUserAppointments } = useBookingStore();
  const router = useRouter();

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
    pending: <AlertCircle size={13} className="text-amber-400" />,
    confirmed: <CheckCircle size={13} className="text-emerald-400" />,
    completed: <CheckCircle size={13} className="text-blue-400" />,
    cancelled: <XCircle size={13} className="text-red-400" />,
  };

  const handleAddStamp = () => {
    if (stamps < 8) {
      const nextStamps = stamps + 1;
      setStamps(nextStamps);
      if (nextStamps === 8) {
        playHapticSuccess();
        setShowVoucher(true);
      } else {
        playHapticClick();
      }
    }
  };

  const handleResetStamps = () => {
    playHapticClick();
    setStamps(0);
    setShowVoucher(false);
  };

  const maxPoints = user.level === "Silver" ? 400 : user.level === "Gold" ? 1000 : 2000;
  const pointsPct = Math.min((user.points / maxPoints) * 100, 100);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Mi Cuenta</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Club <span className="text-gradient-gold">VIP</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2">Beneficios exclusivos y fidelidad digital.</p>
      </motion.div>

      {/* VIP Membership Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-48 rounded-3xl p-5 flex flex-col justify-between mb-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #001828 0%, #07090C 50%, #2b0408 100%)",
          border: "1px solid rgba(0,200,255,0.18)",
          boxShadow: "0 0 30px rgba(0,200,255,0.08), 8px 8px 18px rgba(0,0,0,0.65)"
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.6), transparent)" }} />
        {/* Holographic sheen */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 30%, #ffffff 0%, transparent 50%)" }} />

        {/* Header */}
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
              BRICKELL VIP CLUB
            </span>
            <h3 className="text-base font-bold text-white mt-1">{user.name}</h3>
          </div>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${LevelGradient({ level: user.level })} flex items-center justify-center shadow-lg`}
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            <LevelIcon level={user.level} />
          </div>
        </div>

        {/* Points bar */}
        <div className="relative z-10">
          <div className="flex justify-between items-center text-[10px] mb-1.5 font-semibold">
            <span className="text-neutral-400">Progreso de Fidelidad</span>
            <span className="text-white font-bold">{user.points} / {maxPoints} pts</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pointsPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-light))", boxShadow: "0 0 8px rgba(0,200,255,0.5)" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end relative z-10">
          <div>
            <span className="text-[8px] text-neutral-600 uppercase tracking-widest block">ID de Socio</span>
            <p className="text-[11px] font-mono text-neutral-300 mt-0.5 tracking-wider">BC-{user.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{
              background: "rgba(0,200,255,0.1)",
              border: "1px solid rgba(0,200,255,0.25)",
              color: "var(--gold)"
            }}>
            {user.level}
          </span>
        </div>
      </motion.div>

      {/* Visit Stamps Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl p-5 mb-6 relative overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(0,200,255,0.08)",
          boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.22), transparent)" }} />

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-white">Tarjeta de Visitas</h3>
            <p className="text-[11px] text-neutral-500 mt-1">Completa 8 sellos para tu corte gratis</p>
          </div>
          <span className="text-sm font-black px-2.5 py-1 rounded-lg"
            style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", color: "var(--gold)" }}>
            {stamps}/8
          </span>
        </div>

        {/* Stamps Grid */}
        <div className="grid grid-cols-4 gap-2.5 my-4">
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
                      className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center text-black"
                      style={{
                        background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
                        boxShadow: "0 0 14px rgba(0,200,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      {isLast ? <Gift size={17} className="stroke-[2.5]" /> : <Scissors size={15} className="stroke-[2.5]" />}
                      <span className="text-[8px] font-black mt-0.5 leading-none">VIP</span>
                    </motion.div>
                  ) : (
                    <div
                      key="empty"
                      className="absolute inset-0 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "var(--surface-dark)",
                        boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.03)"
                      }}
                    >
                      {isLast ? (
                        <Gift size={14} className="opacity-30" style={{ color: "var(--gold)" }} />
                      ) : (
                        <span className="text-sm font-mono font-bold text-neutral-700">{idx + 1}</span>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {showVoucher && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-2xl text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,200,255,0.1), rgba(255,17,51,0.08))",
                border: "1px solid rgba(0,200,255,0.3)"
              }}
            >
              <p className="text-sm font-black flex items-center justify-center gap-2"
                style={{ color: "var(--gold)" }}>
                <Crown size={14} /> ¡Corte Gratis Desbloqueado!
              </p>
              <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                Presenta esta pantalla en caja para redimir tu corte premium gratuito.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo controls */}
        <div className="mt-5 pt-4 flex gap-2 justify-end"
          style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <button
            onClick={handleAddStamp}
            disabled={stamps >= 8}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider neo-btn border-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus size={12} style={{ color: "var(--gold)" }} /> Visita
          </button>
          <button
            onClick={handleResetStamps}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold text-neutral-500 uppercase tracking-wider neo-btn border-0 active:scale-95 cursor-pointer"
          >
            <RotateCcw size={11} /> Reiniciar
          </button>
        </div>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">Próximas Citas</h2>
        {upcoming.length === 0 ? (
          <div className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.01)"
            }}>
            <Calendar size={32} className="mx-auto text-neutral-700 mb-3" />
            <p className="text-sm text-neutral-400 mb-4">No tienes citas programadas.</p>
            <Link href="/reservar" onClick={playHapticClick}>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer"
                style={{ background: "var(--gold)", boxShadow: "0 0 10px rgba(0,200,255,0.18)" }}>
                Reservar Ahora <ArrowRight size={12} />
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {upcoming.map((apt) => (
              <div key={apt.id} className="rounded-2xl p-4 flex justify-between items-center gap-3"
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  boxShadow: "4px 4px 10px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.01)"
                }}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    {statusIcons[apt.status]}
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(0,200,80,0.1)", border: "1px solid rgba(0,200,80,0.2)" }}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white leading-tight">{apt.serviceName}</h4>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Con {apt.barberName} · {apt.date} · {apt.time}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-black" style={{ color: "var(--gold)" }}>${apt.servicePrice}</p>
                  <button
                    onClick={() => { playHapticClick(); cancelAppointment(apt.id); }}
                    className="text-[10px] text-red-400 font-semibold hover:underline mt-1 block cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* History */}
      {past.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">Historial</h2>
          <div className="space-y-2">
            {past.slice(0, 3).map((apt) => (
              <div key={apt.id} className="rounded-xl p-3.5 flex justify-between items-center gap-3 opacity-65"
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,255,255,0.04)"
                }}>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-white">{apt.serviceName}</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{apt.date} · con {apt.barberName}</p>
                </div>
                <span className="text-sm font-black text-neutral-300 shrink-0">${apt.servicePrice}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
