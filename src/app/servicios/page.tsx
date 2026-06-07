"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles, Search } from "lucide-react";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";

const categories = [
  { id: "all", label: "Todos" },
  { id: "Corte", label: "Cortes" },
  { id: "Combo", label: "Combos" },
  { id: "Especialidad", label: "Especiales" },
  { id: "Barba", label: "Barba" },
  { id: "Tratamiento", label: "Tratamientos" }
];

export default function ServiciosPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCat = selectedCat === "all" || service.category === selectedCat;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-20 px-4">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Catálogo</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Nuestros <span className="text-gradient-gold">Servicios</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Precisión y arte para renovar tu imagen y confianza.
        </p>
      </motion.div>

      {/* Neomorphic Search Input */}
      <div className="mb-6 relative px-1">
        <div className="absolute left-4.5 top-1/2 -translate-y-1/2 text-neutral-500">
          <Search size={14} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar servicios (ej: fade, barba)..."
          className="w-full pl-10 pr-4 py-3 neo-input text-xs rounded-2xl text-[var(--foreground)] placeholder:text-neutral-500"
        />
      </div>

      {/* Neomorphic Category Scrollbar */}
      <div className="mb-6 overflow-x-auto scrollbar-none flex gap-2.5 py-1 px-1">
        {categories.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "neo-concave border border-[var(--gold)]/30 text-[var(--gold)] shadow-inner"
                  : "neo-convex border border-[var(--border)] text-neutral-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services Listing */}
      <div className="space-y-4 px-1">
        <AnimatePresence mode="popLayout">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 neo-flat rounded-3xl p-6 border border-neutral-900"
            >
              <p className="text-xs text-neutral-500">No encontramos servicios que coincidan con tu búsqueda.</p>
              <button
                onClick={() => { setSelectedCat("all"); setSearchQuery(""); }}
                className="mt-3 text-xs font-bold text-[var(--gold)] underline"
              >
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="neo-flat rounded-2xl p-4 border border-[var(--border)] flex gap-4"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  {service.popular && (
                    <div className="absolute top-1 left-1">
                      <span className="px-1.5 py-0.5 rounded bg-[var(--gold)] text-[7px] font-black text-black uppercase tracking-wide">
                        ★
                      </span>
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xs text-white truncate">{service.name}</h3>
                      <span className="text-xs font-black text-[var(--gold)] shrink-0">${service.price}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-900/40">
                    <div className="flex items-center gap-1 text-[9px] text-neutral-500">
                      <Clock size={10} />
                      <span>{service.duration} min</span>
                    </div>
                    
                    <Link href="/reservar">
                      <Button variant="ghost" size="sm" className="!p-0 !text-[10px] !text-[var(--gold)] !bg-transparent font-bold flex items-center gap-1 active:translate-x-1 transition-transform">
                        Reservar <ArrowRight size={10} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
