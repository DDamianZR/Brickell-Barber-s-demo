"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Scissors, CheckCircle } from "lucide-react";
import { barbers } from "@/data/barbers";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function BarberosPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
              <Scissors size={12} className="text-[var(--gold)]" />
              <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">El Equipo</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[var(--foreground)] mb-4">
              Nuestros <span className="text-gradient-gold">Barberos</span>
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
              Artistas del grooming con años de experiencia y una pasión obsesiva por la excelencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Barbers */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {barbers.map((barber, i) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden border border-[var(--border)]">
                  <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{barber.name}</h2>
                        <p className="text-sm text-white/60">{barber.experience} de experiencia</p>
                      </div>
                      <div className="flex items-center gap-1 bg-[var(--gold)]/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[var(--gold)]/30">
                        <Star size={14} className="text-[var(--gold)] fill-[var(--gold)]" />
                        <span className="text-sm font-bold text-[var(--gold)]">{barber.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] text-center">
                    <p className="text-2xl font-bold text-[var(--foreground)]">{barber.cuts.toLocaleString()}</p>
                    <p className="text-xs text-[var(--foreground)] opacity-40 uppercase tracking-wide mt-1">Cortes realizados</p>
                  </div>
                  <div className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] text-center">
                    {barber.available ? (
                      <>
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="text-emerald-400 font-bold text-sm">Disponible</span>
                        </div>
                        <p className="text-xs text-[var(--foreground)] opacity-40 uppercase tracking-wide">Acepta citas</p>
                      </>
                    ) : (
                      <p className="text-sm text-red-400 font-medium">No disponible</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">{barber.name}</h2>
                <p className="text-[var(--foreground)] opacity-60 leading-relaxed mb-6">{barber.bio}</p>

                <div className="mb-6">
                  <p className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase mb-3">Especialidades</p>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((spec) => (
                      <Badge key={spec} variant="gold">{spec}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase mb-3">Horarios</p>
                  <div className="space-y-2">
                    {barber.schedule.map((day) => (
                      <div key={day.day} className="flex items-center gap-3">
                        <span className="text-sm text-[var(--foreground)] opacity-60 w-24">{day.day}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {day.slots.slice(0, 4).map((slot) => (
                            <span key={slot} className="px-2 py-0.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--foreground)] opacity-70">
                              {slot}
                            </span>
                          ))}
                          {day.slots.length > 4 && (
                            <span className="px-2 py-0.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--foreground)] opacity-40">
                              +{day.slots.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/reservar">
                  <Button variant="primary" size="lg">
                    Reservar con {barber.name.split(" ")[0]}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
