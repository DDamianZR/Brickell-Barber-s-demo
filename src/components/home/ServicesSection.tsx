"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesSection() {
  const featured = services.slice(0, 4);

  return (
    <section className="py-20 px-5 relative overflow-hidden"
      style={{ background: "var(--surface-dark)", borderTop: "1px solid rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.025)" }}>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-px opacity-50" style={{ background: "var(--gold)" }} />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase opacity-80" style={{ color: "var(--gold)" }}>Menú</span>
          </div>
          <h2 className="text-2xl font-light text-[var(--foreground)] leading-tight tracking-tight">
            Servicios <span className="font-black text-gradient-gold">Destacados</span>
          </h2>
        </div>
        <Link href="/servicios">
          <span className="text-[11px] font-medium opacity-80" style={{ color: "var(--gold)" }}>Ver todos</span>
        </Link>
      </motion.div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory">
        {featured.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="w-52 shrink-0 snap-start rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "5px 5px 12px rgba(0,0,0,0.6), -5px -5px 12px rgba(255,255,255,0.01)"
            }}
          >
            {/* Image */}
            <div className="relative h-28 w-full shrink-0">
              <Image src={service.image} alt={service.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-black/10 to-transparent" />
              {service.popular && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide text-black"
                    style={{ background: "var(--gold)" }}>
                    Estrella
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-white leading-tight truncate">{service.name}</h3>
                <p className="text-[10px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-1 text-[10px] text-neutral-600">
                  <Clock size={10} />
                  <span>{service.duration} min</span>
                </div>
                <span className="text-sm font-black" style={{ color: "var(--gold)" }}>${service.price}</span>
              </div>

              <Link href="/reservar" className="block mt-3">
                <button className="w-full py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 cursor-pointer"
                  style={{
                    color: "var(--gold)",
                    border: "1px solid rgba(0,200,255,0.2)",
                    background: "rgba(0,200,255,0.04)"
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
                    (e.currentTarget as HTMLButtonElement).style.color = "black";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,200,255,0.04)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
                  }}
                >
                  Reservar
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
