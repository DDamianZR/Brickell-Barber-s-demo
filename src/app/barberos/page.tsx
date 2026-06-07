"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, ArrowRight } from "lucide-react";
import { barbers } from "@/data/barbers";

export default function BarberosPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">El Equipo</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Nuestros <span className="text-gradient-gold">Barberos</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed max-w-xs">
          Artistas con pasión y precisión obsesiva por tu estilo.
        </p>
      </motion.div>

      {/* Barbers Listing */}
      <div className="space-y-5">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.012)"
            }}
          >
            {/* Top neon line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.22), transparent)" }} />

            <div className="p-5">
              {/* Header Portrait Row */}
              <div className="flex gap-4 items-start mb-5">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0"
                  style={{ border: "1px solid rgba(0,200,255,0.15)", boxShadow: "0 0 12px rgba(0,200,255,0.08)" }}>
                  <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-black text-white leading-tight">{barber.name}</h2>
                    <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Star size={10} className="text-[var(--gold)] fill-[var(--gold)]" />
                      <span className="text-[11px] font-black text-white">{barber.rating}</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1.5"
                    style={{ color: "var(--gold)" }}>
                    {barber.experience} de exp.
                  </p>

                  {/* Stats */}
                  <div className="flex gap-5 mt-3">
                    <div>
                      <span className="text-[9px] text-neutral-600 uppercase tracking-wide block">Cortes</span>
                      <span className="text-sm font-black text-white mt-0.5 block">{barber.cuts.toLocaleString()}+</span>
                    </div>
                    <div className="w-px self-stretch bg-neutral-800" />
                    <div>
                      <span className="text-[9px] text-neutral-600 uppercase tracking-wide block">Estado</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400">Activo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[12px] text-neutral-400 leading-relaxed mb-5">
                {barber.bio}
              </p>

              {/* Specialties */}
              <div className="mb-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 block mb-2.5">
                  Especialidades
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {barber.specialties.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                      style={{
                        background: "rgba(0,200,255,0.06)",
                        border: "1px solid rgba(0,200,255,0.18)",
                        color: "var(--gold)"
                      }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 block mb-3">
                  Horario disponible
                </span>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1 scrollbar-none">
                  {barber.schedule.map((day) => (
                    <div key={day.day} className="flex items-center justify-between py-1.5 gap-2"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <span className="text-[11px] text-neutral-300 font-semibold shrink-0">{day.day}</span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {day.slots.slice(0, 2).map((slot) => (
                          <span key={slot} className="px-2 py-0.5 rounded-md text-[10px] text-neutral-300 font-mono font-bold whitespace-nowrap"
                            style={{ background: "var(--surface-dark)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            {slot}
                          </span>
                        ))}
                        {day.slots.length > 2 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap"
                            style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.18)", color: "var(--gold)" }}>
                            +{day.slots.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href="/reservar">
                <button className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  style={{ background: "var(--gold)", boxShadow: "0 0 14px rgba(0,200,255,0.18)" }}>
                  <Calendar size={14} />
                  Reservar con {barber.name.split(" ")[0]}
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
