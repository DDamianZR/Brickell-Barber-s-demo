"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Award, Scissors } from "lucide-react";
import { barbers } from "@/data/barbers";
import { playHapticClick } from "@/lib/haptics";
import Button from "@/components/ui/Button";

export default function BarbersSection() {
  return (
    <section className="py-12 bg-[var(--background)] px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Scissors size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--gold)] uppercase">Staff</span>
        </div>
        <h2 className="text-2xl font-black text-[var(--foreground)] tracking-wide">
          Maestros del <span className="text-gradient-gold">Grooming</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed tracking-wide">
          Dos artistas de nivel mundial dedicados a perfeccionar tu imagen.
        </p>
      </motion.div>

      {/* Vertical List of Full-Width Barber Cards */}
      <div className="space-y-8 px-1">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-3xl overflow-hidden neo-flat border border-[var(--border)] p-5 flex flex-col justify-between"
          >
            {/* Portrait Image */}
            <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-4 border border-neutral-900 bg-neutral-900 shadow-inner">
              <Image
                src={barber.photo}
                alt={barber.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013]/90 via-transparent to-transparent" />
              
              {/* Availability tag */}
              {barber.available && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Disponible</span>
                </div>
              )}

              {/* Float Rating Badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/5 shadow-lg">
                <Star size={11} className="text-[var(--gold)] fill-[var(--gold)]" />
                <span className="text-xs font-black text-white">{barber.rating}</span>
              </div>
            </div>

            {/* Profile Info details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">{barber.name}</h3>
                    <span className="text-[9px] font-semibold text-[var(--gold)] uppercase tracking-widest mt-0.5 block">
                      {barber.experience} de experiencia
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-neutral-400 mt-3.5 leading-relaxed tracking-wide text-justify">
                  {barber.bio}
                </p>
              </div>

              {/* Specialties block */}
              <div className="mt-4 pt-3 border-t border-neutral-900/60">
                <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2">
                  Especialidades
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {barber.specialties.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/15 text-[9px] text-[var(--gold)] font-bold tracking-wide">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-4 my-5 py-3 border-y border-neutral-900/40 bg-neutral-950/20 rounded-xl px-2">
                <div className="text-center">
                  <span className="text-[7.5px] font-bold text-neutral-500 uppercase tracking-[0.1em] block">Cortes Realizados</span>
                  <span className="text-sm font-black text-white mt-1 block">{barber.cuts.toLocaleString()}+</span>
                </div>
                <div className="text-center border-l border-neutral-900/60">
                  <span className="text-[7.5px] font-bold text-neutral-500 uppercase tracking-[0.1em] block">Calificación</span>
                  <span className="text-sm font-black text-[var(--gold)] mt-1 block">{barber.rating} / 5.0</span>
                </div>
              </div>

              {/* Call to action book button */}
              <Link href="/reservar" className="block" onClick={playHapticClick}>
                <Button variant="primary" size="md" fullWidth className="!py-3 !text-xs !rounded-xl font-bold bg-[var(--gold)] text-black">
                  Reservar con {barber.name.split(" ")[0]}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
