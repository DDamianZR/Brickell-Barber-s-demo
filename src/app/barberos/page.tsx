"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Scissors, Award, Calendar } from "lucide-react";
import { barbers } from "@/data/barbers";
import Button from "@/components/ui/Button";

export default function BarberosPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Scissors size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">El Equipo</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Nuestros <span className="text-gradient-gold">Barberos</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Artistas con pasión y precisión obsesiva por tu estilo.
        </p>
      </motion.div>

      {/* Barbers Listing */}
      <div className="space-y-6 px-1">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="neo-flat rounded-3xl p-5 border border-[var(--border)] relative overflow-hidden"
          >
            {/* Header Portrait Row */}
            <div className="flex gap-4 items-start mb-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-neutral-800 bg-neutral-900">
                <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-white truncate">{barber.name}</h2>
                  <div className="flex items-center gap-0.5 shrink-0 bg-black/60 px-1.5 py-0.5 rounded-full border border-white/5">
                    <Star size={9} className="text-[var(--gold)] fill-[var(--gold)]" />
                    <span className="text-[9px] font-bold text-white">{barber.rating}</span>
                  </div>
                </div>
                
                <p className="text-[10px] text-[var(--gold)] font-bold uppercase mt-0.5">{barber.experience} de exp.</p>
                
                {/* Stats quick panel */}
                <div className="flex gap-4 mt-2">
                  <div>
                    <span className="text-[7px] text-neutral-500 uppercase block">Cortes</span>
                    <span className="text-[10px] font-bold text-neutral-300">{barber.cuts.toLocaleString()}</span>
                  </div>
                  <div className="w-px h-5 bg-neutral-800 self-center" />
                  <div>
                    <span className="text-[7px] text-neutral-500 uppercase block">Estado</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[9px] font-bold text-emerald-400">Activo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio info */}
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
              {barber.bio}
            </p>

            {/* Specialties */}
            <div className="mb-4">
              <span className="text-[8px] font-black text-neutral-500 uppercase tracking-widest block mb-2">
                Especialidades
              </span>
              <div className="flex flex-wrap gap-1.5">
                {barber.specialties.map((spec) => (
                  <span key={spec} className="px-2 py-0.5 rounded-lg bg-[var(--gold)]/5 border border-[var(--gold)]/15 text-[9px] text-[var(--gold)] font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule Preview */}
            <div className="mb-5 border-t border-neutral-900/50 pt-4">
              <span className="text-[8px] font-black text-neutral-500 uppercase tracking-widest block mb-2">
                Horario disponible
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {barber.schedule.map((day) => (
                  <div key={day.day} className="flex items-center justify-between py-1 border-b border-neutral-900/20 last:border-0">
                    <span className="text-[10px] text-neutral-400 font-semibold w-16">{day.day}</span>
                    <div className="flex gap-1 overflow-x-auto scrollbar-none justify-end">
                      {day.slots.slice(0, 3).map((slot) => (
                        <span key={slot} className="px-1.5 py-0.5 rounded-md bg-[#0D0E11] border border-neutral-800 text-[9px] text-neutral-300 font-mono">
                          {slot}
                        </span>
                      ))}
                      {day.slots.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#0D0E11] border border-neutral-800 text-[9px] text-neutral-500">
                          +{day.slots.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book link button */}
            <Link href="/reservar">
              <Button variant="primary" size="md" fullWidth iconRight={<Calendar size={13} />} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
                Reservar con {barber.name.split(" ")[0]}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
