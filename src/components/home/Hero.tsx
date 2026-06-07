"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/ui/Button";

const haircutStyles = [
  { name: "Corte Premium", image: "/images/corte-3.png", price: "$35", duration: "45m", popular: true },
  { name: "Corte + Barba", image: "/images/corte-1.png", price: "$55", duration: "75m", popular: true },
  { name: "Fade Artístico", image: "/images/corte-2.png", price: "$45", duration: "60m", popular: false },
  { name: "Texturizado Premium", image: "/images/corte-4.png", price: "$50", duration: "60m", popular: false }
];

export default function Hero() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <section className="relative px-4 pt-6 pb-12 overflow-hidden bg-[var(--background)]">
      {/* Background soft glow */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-[var(--gold)] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Welcome & Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={13} className="text-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase">
            Miami's Elite Grooming
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)] leading-tight">
          {isAuthenticated && user ? (
            <>
              Hola, <span className="text-gradient-gold">{user.name.split(" ")[0]}</span> 👋
            </>
          ) : (
            <>
              Estilo <span className="text-gradient-gold">Sin Límites</span>
            </>
          )}
        </h1>
        <p className="text-xs text-[var(--foreground)] opacity-50 mt-1 max-w-sm">
          Arte, precisión y detalle. Rediseña tu imagen con los barberos más exclusivos de Brickell.
        </p>
      </motion.div>

      {/* 2. Interactive Booking Banner (Neomorphic Convex Card) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="neo-convex p-5 rounded-3xl mb-8 border border-[var(--gold)]/10 relative overflow-hidden"
      >
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[var(--gold)]/5 rounded-full blur-xl pointer-events-none" />
        
        <h3 className="text-lg font-bold text-white leading-tight">
          Reserva tu Experiencia VIP
        </h3>
        <p className="text-[11px] text-neutral-400 mt-1 mb-4 leading-relaxed max-w-[85%]">
          Gana <strong className="text-[var(--gold)] font-bold">+100 puntos</strong> de fidelidad hoy. Tu primer corte incluye lavado y bebida de cortesía.
        </p>
        
        <div className="flex gap-2">
          <Link href="/reservar" className="flex-1">
            <Button variant="primary" size="sm" fullWidth iconRight={<ArrowRight size={13} />} className="!py-2.5 !text-xs !rounded-xl shadow-md shadow-[var(--gold)]/10 font-bold">
              Reservar Cita
            </Button>
          </Link>
          <Link href="/servicios">
            <Button variant="secondary" size="sm" className="!py-2.5 !text-xs !rounded-xl neo-btn border-0 text-white font-semibold">
              Servicios
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* 3. Haircut Styles Horizontal Swipeable Gallery */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Estilos y Tendencias
          </h4>
          <span className="text-[10px] text-[var(--gold)] font-medium">Desliza para ver ›</span>
        </div>
        
        {/* Horizontal Scroll wrapper */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-1">
          {haircutStyles.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-44 shrink-0 snap-start rounded-2xl overflow-hidden neo-flat border border-[var(--border)]"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-transparent to-transparent" />
                
                {style.popular && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--gold)]/90 text-[8px] font-black text-black uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                )}
              </div>
              
              {/* Details card content */}
              <div className="p-3 bg-[#0F1013]/90">
                <h5 className="font-bold text-xs text-white truncate">{style.name}</h5>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <Clock size={10} />
                    <span>{style.duration}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--gold)]">{style.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Quick stats indicators */}
      <div className="grid grid-cols-3 gap-2.5 px-1">
        {[
          { label: "Rating VIP", val: "4.9 ★", desc: "En Google" },
          { label: "Atención", val: "1 a 1", desc: "Sin esperas" },
          { label: "Bebidas", val: "Gratis", desc: "Con cada cita" }
        ].map((stat) => (
          <div key={stat.label} className="p-2.5 rounded-2xl neo-flat border border-neutral-900 text-center">
            <span className="block text-[8px] font-semibold uppercase tracking-wider text-neutral-500">{stat.label}</span>
            <span className="block text-sm font-black text-[var(--gold)] mt-0.5">{stat.val}</span>
            <span className="block text-[8px] text-neutral-500 leading-none mt-0.5">{stat.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
