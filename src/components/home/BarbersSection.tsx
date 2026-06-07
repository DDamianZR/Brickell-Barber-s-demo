"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Award } from "lucide-react";
import { barbers } from "@/data/barbers";
import Button from "@/components/ui/Button";

export default function BarbersSection() {
  return (
    <section className="py-10 bg-[var(--background)] px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 px-1 flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Award size={11} className="text-[var(--gold)]" />
            <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Staff</span>
          </div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
            Maestros del <span className="text-gradient-gold">Grooming</span>
          </h2>
        </div>
        <Link href="/barberos">
          <span className="text-xs font-semibold text-[var(--gold)]">Ver más ›</span>
        </Link>
      </motion.div>

      {/* Side by Side Barbers Grid */}
      <div className="grid grid-cols-2 gap-3 px-1">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden neo-flat border border-[var(--border)] flex flex-col justify-between"
          >
            {/* Barber Portrait */}
            <div className="relative h-44 w-full bg-neutral-900">
              <Image
                src={barber.photo}
                alt={barber.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013]/90 via-transparent to-transparent" />
              
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/5">
                <Star size={9} className="text-[var(--gold)] fill-[var(--gold)]" />
                <span className="text-[8px] font-black text-white">{barber.rating}</span>
              </div>
            </div>

            {/* Barber Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-white truncate">{barber.name}</h3>
                <p className="text-[9px] text-[var(--gold)] font-medium mt-0.5">{barber.experience} de exp.</p>
                <p className="text-[9px] text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {barber.bio}
                </p>
              </div>

              {/* Specialties block */}
              <div className="mt-3 pt-2 border-t border-neutral-900 flex flex-col gap-2">
                <div className="flex gap-1 overflow-x-auto scrollbar-none">
                  {barber.specialties.slice(0, 2).map((spec) => (
                    <span key={spec} className="px-1.5 py-0.5 rounded-md bg-[var(--gold)]/5 border border-[var(--gold)]/15 text-[8px] text-[var(--gold)] font-medium whitespace-nowrap">
                      {spec}
                    </span>
                  ))}
                </div>
                
                <Link href="/reservar" className="block">
                  <Button variant="primary" size="sm" fullWidth className="!py-1.5 !text-[10px] !rounded-xl font-bold bg-[var(--gold)] text-black">
                    Reservar
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
