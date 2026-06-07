"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";

const tiers = [
  { label: "Silver", pts: "0–399 pts", benefit: "5% descuento en servicios" },
  { label: "Gold", pts: "400–999 pts", benefit: "10% dto. + Reserva prioritaria" },
  { label: "Black", pts: "1000+ pts", benefit: "20% dto. en todo + VIP lounge" },
];

export default function LoyaltySection() {
  return (
    <section className="py-9 px-4 mb-10"
      style={{ background: "var(--background)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-3 h-px" style={{ background: "var(--gold)" }} />
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>Fidelidad</span>
        </div>
        <h2 className="text-xl font-black text-[var(--foreground)] leading-tight">
          Club <span className="text-gradient-gold">VIP</span>
        </h2>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #0C0F14 0%, #10141A 100%)",
          border: "1px solid rgba(0,200,255,0.1)",
          boxShadow: "0 0 30px rgba(0,200,255,0.04), 6px 6px 14px rgba(0,0,0,0.6)"
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)" }} />

        {/* Background crown */}
        <div className="absolute right-4 top-4 opacity-[0.04]" style={{ color: "var(--gold)" }}>
          <Crown size={90} />
        </div>

        <div className="p-5 relative z-10">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.18)" }}>
              <Crown size={16} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Brickell VIP Club</p>
              <p className="text-[9px] text-neutral-500 mt-0.5">Gana cortes gratis en cada visita</p>
            </div>
          </div>

          {/* Tiers */}
          <div className="space-y-2 mb-5">
            {tiers.map((tier, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-neutral-300">{tier.label}</span>
                  <span className="text-[9px] text-neutral-600 ml-1.5">{tier.pts}</span>
                  <p className="text-[9px] text-neutral-500 mt-0.5">{tier.benefit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <Link href="/registro" className="flex-1">
              <button className="w-full py-2.5 rounded-2xl text-[11px] font-bold text-black flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
                style={{ background: "var(--gold)", boxShadow: "0 0 16px rgba(0,200,255,0.3)" }}>
                Unirse al Club <ArrowRight size={11} />
              </button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <button className="w-full py-2.5 rounded-2xl text-[11px] font-semibold text-neutral-300 neo-btn border-0 transition-all duration-200 cursor-pointer">
                Ver mi Tarjeta
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
