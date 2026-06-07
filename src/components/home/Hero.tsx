"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import Button from "@/components/ui/Button";

const stats = [
  { icon: Users, value: "3,200+", label: "Clientes satisfechos" },
  { icon: Star, value: "4.9", label: "Calificación promedio" },
  { icon: Award, value: "8+", label: "Años de experiencia" },
];

const images = ["/images/corte-1.png", "/images/corte-2.png", "/images/corte-3.png", "/images/corte-4.png"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--surface)]" />

      {/* Gold glow top-right */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--gold)] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-8">
                <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">
                  Miami&apos;s Premier Barbershop
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] mb-6"
            >
              Más que un corte.{" "}
              <span className="text-gradient-gold">Una experiencia</span>{" "}
              premium.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[var(--foreground)] opacity-60 leading-relaxed mb-10 max-w-lg"
            >
              Arte, precisión y detalle. Cada visita es una ceremonia diseñada para transformar no solo tu imagen, sino tu confianza.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link href="/reservar">
                <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                  Reservar cita
                </Button>
              </Link>
              <Link href="/servicios">
                <Button variant="secondary" size="lg">
                  Ver servicios
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-[var(--gold)]" />
                    <span className="text-2xl font-bold text-[var(--foreground)]">{value}</span>
                  </div>
                  <p className="text-xs text-[var(--foreground)] opacity-50 leading-tight">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4 h-[580px]">
              {/* Col 1 */}
              <div className="flex flex-col gap-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex-1 rounded-3xl overflow-hidden border border-[var(--border)] group"
                >
                  <Image src={images[0]} alt="Corte premium" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium text-white tracking-widest uppercase opacity-80">Corte Premium</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="relative h-44 rounded-3xl overflow-hidden border border-[var(--border)] group"
                >
                  <Image src={images[2]} alt="Fade" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              </div>
              {/* Col 2 */}
              <div className="flex flex-col gap-4 pt-10">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="relative h-44 rounded-3xl overflow-hidden border border-[var(--border)] group"
                >
                  <Image src={images[1]} alt="Artístico" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="relative flex-1 rounded-3xl overflow-hidden border border-[var(--border)] group"
                >
                  <Image src={images[3]} alt="Texturizado" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium text-white tracking-widest uppercase opacity-80">Texturizado</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-8 bottom-20 glass rounded-2xl p-4 border border-[var(--gold)]/20 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["C", "M", "R"].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-black text-xs font-bold border-2 border-[var(--background)]">
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-[var(--gold)] fill-[var(--gold)]" />)}
                  </div>
                  <p className="text-xs text-[var(--foreground)] opacity-60 mt-0.5">Calidad garantizada</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest text-[var(--foreground)] opacity-30 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
