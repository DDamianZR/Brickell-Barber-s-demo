"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ServicesSection() {
  const featured = services.slice(0, 4);

  return (
    <section className="py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
            <Sparkles size={12} className="text-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Servicios</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            Arte aplicado al <span className="text-gradient-gold">estilo masculino</span>
          </h2>
          <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
            Cada servicio es una experiencia diseñada con precisión milimétrica y los mejores productos del mercado.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/20 to-transparent" />
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="gold" size="sm">Popular</Badge>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-[var(--foreground)] opacity-50 leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[var(--foreground)] opacity-40">
                    <Clock size={12} />
                    <span className="text-xs">{service.duration} min</span>
                  </div>
                  <span className="text-xl font-bold text-[var(--gold)]">
                    ${service.price}
                  </span>
                </div>
                <Link href="/reservar" className="block mt-4">
                  <Button variant="outline" size="sm" fullWidth>
                    Reservar
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/servicios">
            <Button variant="secondary" size="lg" iconRight={<ArrowRight size={16} />}>
              Ver todos los servicios
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
