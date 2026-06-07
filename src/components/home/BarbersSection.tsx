"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Scissors, ArrowRight } from "lucide-react";
import { barbers } from "@/data/barbers";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function BarbersSection() {
  return (
    <section className="py-32 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
            <Scissors size={12} className="text-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Nuestros Barberos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            Maestros del <span className="text-gradient-gold">arte</span>
          </h2>
          <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
            Dos artistas del grooming con años de experiencia y miles de transformaciones exitosas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {barbers.map((barber, i) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="group bg-[var(--background)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={barber.photo}
                  alt={barber.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                {barber.available && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wide">Disponible</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      {barber.name}
                    </h3>
                    <p className="text-xs text-[var(--foreground)] opacity-40 mt-0.5">{barber.experience} de experiencia</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--gold-glow)] px-2 py-1 rounded-full">
                    <Star size={12} className="text-[var(--gold)] fill-[var(--gold)]" />
                    <span className="text-xs font-bold text-[var(--gold)]">{barber.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-[var(--foreground)] opacity-50 leading-relaxed mb-4 line-clamp-2">
                  {barber.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {barber.specialties.map((spec) => (
                    <Badge key={spec} variant="gold" size="sm">{spec}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 pt-3 border-t border-[var(--border)]">
                  <div className="text-center">
                    <p className="text-lg font-bold text-[var(--foreground)]">{barber.cuts.toLocaleString()}</p>
                    <p className="text-[10px] text-[var(--foreground)] opacity-40 uppercase tracking-wide">Cortes</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)]" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-[var(--foreground)]">{barber.experience}</p>
                    <p className="text-[10px] text-[var(--foreground)] opacity-40 uppercase tracking-wide">Experiencia</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)]" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-[var(--gold)]">{barber.rating}</p>
                    <p className="text-[10px] text-[var(--foreground)] opacity-40 uppercase tracking-wide">Rating</p>
                  </div>
                </div>

                <Link href="/reservar">
                  <Button variant="primary" size="md" fullWidth>
                    Reservar con {barber.name.split(" ")[0]}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/barberos">
            <Button variant="ghost" size="md" iconRight={<ArrowRight size={15} />}>
              Conocer más sobre nuestros barberos
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
