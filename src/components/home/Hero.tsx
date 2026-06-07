"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/ui/Button";

const haircutStyles = [
  { name: "Corte Premium", image: "/images/corte-3.png", price: "$35", duration: "45m", tag: "Popular" },
  { name: "Corte + Barba", image: "/images/corte-1.png", price: "$55", duration: "75m", tag: "VIP" },
  { name: "Fade Artístico", image: "/images/corte-2.png", price: "$45", duration: "60m", tag: null },
  { name: "Texturizado", image: "/images/corte-4.png", price: "$50", duration: "60m", tag: null }
];

const stats = [
  { label: "Rating", val: "4.9", unit: "★", desc: "Google" },
  { label: "Atención", val: "1:1", unit: "", desc: "Sin esperas" },
  { label: "Bebida", val: "Free", unit: "", desc: "Cada cita" }
];

export default function Hero() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <section className="relative px-4 pt-5 pb-12 overflow-hidden bg-[var(--background)]">
      {/* Ambient glow — cyan top right */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)" }} />
      {/* Ambient glow — red bottom left */}
      <div className="absolute bottom-20 -left-10 w-56 h-56 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,17,51,0.05) 0%, transparent 70%)" }} />

      {/* 1. Welcome & Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)] opacity-60" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">
            Miami's Elite Grooming
          </span>
        </div>
        <h1 className="text-[28px] font-black leading-tight text-[var(--foreground)]">
          {isAuthenticated && user ? (
            <>
              Hola, <span className="text-gradient-gold">{user.name.split(" ")[0]}</span>
            </>
          ) : (
            <>
              Estilo{" "}
              <span className="text-gradient-gold">Sin Límites</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[var(--foreground)] opacity-45 mt-1.5 leading-relaxed max-w-xs">
          Arte, precisión y detalle. Los barberos más exclusivos de Brickell.
        </p>
      </motion.div>

      {/* 2. Booking Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="rounded-3xl mb-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0C0F14 0%, #10141A 100%)",
          border: "1px solid rgba(0, 200, 255, 0.12)",
          boxShadow: "0 0 30px rgba(0,200,255,0.05), 6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
        }}
      >
        {/* Top neon accent line */}
        <div className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.5), transparent)" }} />

        <div className="p-5">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <Zap size={14} className="text-[var(--gold)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Reserva tu Cita VIP
              </h3>
              <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                Gana <strong className="text-[var(--gold)]">+100 puntos</strong> hoy · Lavado y bebida incluidos
              </p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Link href="/reservar" className="flex-1">
              <Button variant="primary" size="sm" fullWidth iconRight={<ArrowRight size={12} />}
                className="!py-2.5 !text-[11px] !rounded-2xl !font-bold">
                Reservar Cita
              </Button>
            </Link>
            <Link href="/servicios">
              <Button variant="secondary" size="sm"
                className="!py-2.5 !text-[11px] !rounded-2xl neo-btn border-0 !text-neutral-300 !font-semibold">
                Servicios
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 3. Haircut Styles Gallery */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 px-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Estilos & Tendencias
          </span>
          <Link href="/servicios">
            <span className="text-[10px] text-[var(--gold)] font-semibold tracking-wide">Ver todos ›</span>
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory">
          {haircutStyles.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="w-40 shrink-0 snap-start rounded-2xl overflow-hidden"
              style={{
                background: "#0C0F14",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.6), -4px -4px 10px rgba(255,255,255,0.01)"
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-transparent to-transparent" />

                {style.tag && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-black"
                      style={{ background: "var(--gold)" }}>
                      {style.tag}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h5 className="font-bold text-[11px] text-white leading-tight truncate">{style.name}</h5>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-[9px] text-neutral-500">
                    <Clock size={9} />
                    <span>{style.duration}</span>
                  </div>
                  <span className="text-xs font-black text-[var(--gold)]">{style.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
        className="grid grid-cols-3 gap-2.5"
      >
        {stats.map((stat) => (
          <div key={stat.label}
            className="p-3 rounded-2xl text-center relative overflow-hidden"
            style={{
              background: "#0C0F14",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.6), -4px -4px 10px rgba(255,255,255,0.01)"
            }}
          >
            <span className="block text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-600 mb-0.5">{stat.label}</span>
            <span className="block text-base font-black leading-none"
              style={{ color: "var(--gold)" }}>
              {stat.val}<span className="text-xs">{stat.unit}</span>
            </span>
            <span className="block text-[9px] text-neutral-600 mt-0.5">{stat.desc}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
