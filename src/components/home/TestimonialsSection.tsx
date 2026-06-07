"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos R.",
    role: "Cliente Gold",
    text: "Vine buscando un corte y encontré una experiencia de lujo. Jordan tiene un nivel de detalle increíble. Cada visita es perfecta.",
    rating: 5,
    initial: "C",
  },
  {
    name: "Alex M.",
    role: "Cliente Black",
    text: "El ambiente, la precisión... todo es de otro nivel. Llevo 2 años viniendo y nunca me decepcionan. Mi sitio de confianza.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Rodrigo P.",
    role: "Cliente Silver",
    text: "Miguel me hizo el mejor degradado. El tratamiento de barba con toalla caliente fue excelente. Vale cada centavo.",
    rating: 5,
    initial: "R",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-9 px-4 relative overflow-hidden"
      style={{ background: "var(--surface-dark)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-3 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>Clientes</span>
        </div>
        <h2 className="text-xl font-black text-[var(--foreground)] leading-tight">
          La voz de los <span className="text-gradient-gold">VIPs</span>
        </h2>
      </motion.div>

      {/* Scroll */}
      <div className="flex gap-3.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="w-60 shrink-0 snap-start rounded-2xl p-4.5 flex flex-col justify-between"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.01)",
              padding: "18px"
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={10} className="fill-[var(--gold)] text-[var(--gold)]" />
              ))}
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed italic flex-1 mb-4">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-2.5 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-black"
                style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))" }}>
                {t.initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate leading-tight">{t.name}</p>
                <p className="text-[9px] text-neutral-600 truncate mt-0.5">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
