"use client";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

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
    text: "El ambiente, la precisión... todo es de otro nivel. Llevo 2 años viniendo y nunca me decepcionan. Es mi sitio de confianza.",
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
    <section className="py-10 bg-[var(--surface-dark)] border-t border-neutral-900 px-4 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <MessageSquare size={11} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Club</span>
        </div>
        <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
          La opinión de <span className="text-gradient-gold">los VIPs</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Clientes reales que confían su imagen en nuestras manos.
        </p>
      </motion.div>

      {/* Horizontal Scroll Testimonials */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-1">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="w-64 shrink-0 snap-start bg-[#0F1013] rounded-2xl p-5 border border-[var(--border)] flex flex-col justify-between"
          >
            <div>
              <Quote size={18} className="text-[var(--gold)] opacity-30 mb-2.5" />
              <p className="text-[11px] text-[var(--foreground)] opacity-70 leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 pt-3 border-t border-neutral-900/60">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-black">{t.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{t.name}</p>
                <p className="text-[9px] text-neutral-500 truncate">{t.role}</p>
              </div>
              <div className="flex shrink-0">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={9} className="text-[var(--gold)] fill-[var(--gold)]" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
