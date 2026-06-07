"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, Star, Zap, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const tiers = [
  {
    name: "Silver",
    icon: Star,
    points: "0 – 399",
    color: "from-gray-400 to-gray-500",
    textColor: "text-gray-300",
    borderColor: "border-gray-500/30",
    bg: "bg-gray-500/10",
    perks: ["Descuento 5% en servicios", "Puntos x1 por cita", "Acceso a promociones mensuales"],
  },
  {
    name: "Gold",
    icon: Crown,
    points: "400 – 999",
    color: "from-[#C9A227] to-[#E0B84A]",
    textColor: "text-[var(--gold)]",
    borderColor: "border-[var(--gold)]/30",
    bg: "var(--gold-glow)",
    perks: ["Descuento 10% en servicios", "Puntos x1.5 por cita", "Reserva prioritaria", "1 servicio gratis al año"],
    featured: true,
  },
  {
    name: "Black",
    icon: Zap,
    points: "1,000+",
    color: "from-white to-gray-200",
    textColor: "text-white",
    borderColor: "border-white/20",
    bg: "bg-white/5",
    perks: ["Descuento 20% en todo", "Puntos x2 por cita", "Acceso VIP sin espera", "Productos exclusivos incluidos"],
  },
];

export default function LoyaltySection() {
  return (
    <section className="py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
            <Crown size={12} className="text-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Programa de Fidelización</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            Cada visita te acerca a{" "}
            <span className="text-gradient-gold">beneficios exclusivos</span>
          </h2>
          <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
            Acumula puntos con cada cita y desbloquea un mundo de beneficios diseñados para los que valoran la excelencia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 border ${tier.borderColor} transition-all duration-300 ${
                  tier.featured ? "scale-[1.03] shadow-2xl shadow-[var(--gold)]/10" : ""
                }`}
                style={{ background: tier.featured ? "var(--gold-glow)" : "var(--surface)" }}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Más popular
                    </span>
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6`}>
                  <Icon size={24} className="text-black" />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${tier.textColor}`}>{tier.name}</h3>
                <p className="text-xs text-[var(--foreground)] opacity-40 mb-6">{tier.points} puntos</p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <span className={`mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-[8px] font-bold text-black">✓</span>
                      </span>
                      <span className="text-sm text-[var(--foreground)] opacity-70">{perk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-[var(--foreground)] opacity-40 mb-4">
            Gana +100 puntos por cada cita. Empieza hoy.
          </p>
          <Link href="/registro">
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={16} />}>
              Crear cuenta gratis
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
