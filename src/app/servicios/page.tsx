"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const categories = ["Todos", "Corte", "Combo", "Especialidad", "Barba", "Tratamiento"];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
              <Sparkles size={12} className="text-[var(--gold)]" />
              <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Catálogo</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[var(--foreground)] mb-4">
              Nuestros <span className="text-gradient-gold">Servicios</span>
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
              Cada servicio es una experiencia diseñada para transformar tu imagen con precisión y arte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image src={service.image} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" size="sm">{service.category}</Badge>
                  </div>
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="success" size="sm">Popular</Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-50 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mb-6 pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2 text-[var(--foreground)] opacity-40">
                      <Clock size={14} />
                      <span className="text-sm">{service.duration} minutos</span>
                    </div>
                    <span className="text-2xl font-bold text-[var(--gold)]">${service.price}</span>
                  </div>
                  <Link href="/reservar">
                    <Button variant="primary" size="md" fullWidth iconRight={<ArrowRight size={16} />}>
                      Reservar este servicio
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
