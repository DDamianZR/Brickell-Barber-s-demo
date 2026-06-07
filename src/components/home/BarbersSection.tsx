"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { barbers } from "@/data/barbers";
import { playHapticClick } from "@/lib/haptics";

export default function BarbersSection() {
  return (
    <section className="py-9 px-4" style={{ background: "var(--background)" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-3 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>Staff</span>
        </div>
        <h2 className="text-xl font-black text-[var(--foreground)] leading-tight">
          Maestros del <span className="text-gradient-gold">Grooming</span>
        </h2>
        <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">
          Artistas de nivel mundial dedicados a perfeccionar tu imagen.
        </p>
      </motion.div>

      {/* Barber Cards */}
      <div className="space-y-6">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
            }}
          >
            {/* Portrait */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={barber.photo}
                alt={barber.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-black/20 to-transparent" />

              {/* Neon top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)" }} />

              {/* Availability */}
              {barber.available && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md"
                  style={{ background: "rgba(0,200,50,0.15)", border: "1px solid rgba(0,200,50,0.25)" }}>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Disponible</span>
                </div>
              )}

              {/* Rating */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl backdrop-blur-md"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Star size={11} className="fill-[var(--gold)] text-[var(--gold)]" />
                <span className="text-xs font-black text-white">{barber.rating}</span>
              </div>

              {/* Name overlay */}
              <div className="absolute bottom-4 left-4">
                <h3 className="text-base font-black text-white">{barber.name}</h3>
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
                  {barber.experience} de experiencia
                </span>
              </div>
            </div>

            {/* Info Panel */}
            <div className="p-4.5" style={{ padding: "18px" }}>
              <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
                {barber.bio}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-neutral-600 block mb-2">
                  Especialidades
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {barber.specialties.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-xl text-[9px] font-bold tracking-wide"
                      style={{
                        background: "rgba(0,200,255,0.05)",
                        border: "1px solid rgba(0,200,255,0.15)",
                        color: "var(--gold)"
                      }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 py-3 px-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div className="text-center">
                  <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-wide block">Cortes</span>
                  <span className="text-sm font-black text-white mt-1 block">{barber.cuts.toLocaleString()}+</span>
                </div>
                <div className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-wide block">Rating</span>
                  <span className="text-sm font-black mt-1 block" style={{ color: "var(--gold)" }}>{barber.rating}/5.0</span>
                </div>
              </div>

              {/* CTA */}
              <Link href="/reservar" onClick={playHapticClick}>
                <button className="w-full py-3 rounded-2xl text-xs font-bold text-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  style={{ background: "var(--gold)", boxShadow: "0 0 18px rgba(0,200,255,0.25)" }}>
                  Reservar con {barber.name.split(" ")[0]}
                  <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
