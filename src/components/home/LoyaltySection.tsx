"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, ArrowRight, Award } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LoyaltySection() {
  return (
    <section className="py-10 bg-[var(--background)] px-4 border-t border-neutral-900 mb-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Crown size={11} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Fidelidad</span>
        </div>
        <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
          Club de Beneficios <span className="text-gradient-gold">VIP</span>
        </h2>
      </motion.div>

      {/* VIP Promo Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden p-6 bg-[#0F1013] border border-[var(--border)] relative"
      >
        {/* Decorative gold vector crown in background */}
        <div className="absolute right-3 top-3 opacity-5 text-[var(--gold)]">
          <Crown size={80} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
            <Award size={14} />
          </div>
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
            Brickell VIP Club
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          Gana cortes gratis y beneficios en cada visita
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed mb-5">
          Acumula 100 puntos por cita y completa tu tarjeta de sellos digital para desbloquear servicios gratuitos, descuentos exclusivos y trato prioritario sin esperas.
        </p>

        <div className="space-y-2.5 mb-6">
          {[
            "Silver (0-399 pts): 5% de descuento en servicios.",
            "Gold (400-999 pts): 10% dto. + Reserva prioritaria.",
            "Black (1000+ pts): 20% dto. en todo + VIP lounge."
          ].map((tier, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
              <span className="text-[11px] text-neutral-300 font-medium">{tier}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/registro" className="flex-1">
            <Button variant="primary" size="sm" fullWidth iconRight={<ArrowRight size={13} />} className="!py-2.5 !text-xs !rounded-xl font-bold bg-[var(--gold)] text-black">
              Unirse al Club
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button variant="secondary" size="sm" fullWidth className="!py-2.5 !text-xs !rounded-xl neo-btn border-0 text-white font-semibold">
              Ver mi Tarjeta
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
