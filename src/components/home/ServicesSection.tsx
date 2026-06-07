"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Scissors } from "lucide-react";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";

export default function ServicesSection() {
  const featured = services.slice(0, 4);

  return (
    <section className="py-10 bg-[var(--surface-dark)] border-y border-neutral-900 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 px-1 flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Scissors size={11} className="text-[var(--gold)]" />
            <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Menu</span>
          </div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
            Servicios <span className="text-gradient-gold">Destacados</span>
          </h2>
        </div>
        <Link href="/servicios">
          <span className="text-xs font-semibold text-[var(--gold)]">Ver todos ›</span>
        </Link>
      </motion.div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-1">
        {featured.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="w-56 shrink-0 snap-start rounded-2xl overflow-hidden neo-flat border border-[var(--border)] flex flex-col justify-between"
          >
            {/* Image banner */}
            <div className="relative h-28 w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-transparent" />
              {service.popular && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--gold)] text-[8px] font-bold text-black uppercase tracking-wide">
                    Estrella
                  </span>
                </div>
              )}
            </div>

            {/* Info panel */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-white truncate">{service.name}</h3>
                <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-neutral-900 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                  <Clock size={10} />
                  <span>{service.duration} min</span>
                </div>
                <span className="text-sm font-bold text-[var(--gold)]">${service.price}</span>
              </div>

              <Link href="/reservar" className="block mt-3">
                <Button variant="primary" size="sm" fullWidth className="!py-1.5 !text-[11px] !rounded-xl font-bold bg-transparent text-[var(--gold)] border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:text-black">
                  Reservar
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
