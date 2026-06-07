"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos R.",
    role: "Cliente Gold",
    text: "Vine buscando un corte y encontré una experiencia completa. Jordan tiene un nivel de detalle que no había visto en otro lugar. Cada visita es perfecta.",
    rating: 5,
    initial: "C",
  },
  {
    name: "Alex M.",
    role: "Cliente Black",
    text: "El ambiente, el trato, la precisión... todo es de otro nivel. Llevo 2 años viniendo y nunca me ha decepcionado. Es mi sitio de confianza.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Rodrigo P.",
    role: "Cliente Silver",
    text: "Miguel me hizo el mejor corte de mi vida. El tratamiento de barba fue una experiencia increíble. Vale cada centavo y más.",
    rating: 5,
    initial: "R",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[var(--surface)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)] opacity-[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
            <Star size={12} className="text-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Testimonios</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            Lo que dicen <span className="text-gradient-gold">nuestros clientes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[var(--background)] rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300 relative"
            >
              <Quote size={24} className="text-[var(--gold)] opacity-40 mb-4" />
              <p className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-black">{t.initial}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                  <p className="text-xs text-[var(--foreground)] opacity-40">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-[var(--gold)] fill-[var(--gold)]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
