"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Search } from "lucide-react";
import { services } from "@/data/services";

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
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Catálogo</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Nuestros <span className="text-gradient-gold">Servicios</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed max-w-xs">
          Precisión y arte para renovar tu imagen.
        </p>
      </motion.div>

      {/* Search Input */}
      <div className="mb-5 relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar servicios..."
          className="w-full pl-11 pr-4 py-3.5 neo-input text-sm rounded-2xl text-[var(--foreground)] placeholder:text-neutral-500"
        />
      </div>

      {/* Category Pills */}
      <div className="mb-7 -mx-5 px-5 overflow-x-auto scrollbar-none flex gap-2 py-1">
        {categories.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "bg-[var(--gold)] text-black shadow-[0_0_10px_rgba(0,200,255,0.16)]"
                  : "text-neutral-400 border border-[var(--border)] hover:text-white hover:border-[var(--gold)]/30"
              }`}
              style={!isActive ? { background: "var(--surface)" } : undefined}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services Listing */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 rounded-3xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-sm text-neutral-400">No encontramos servicios.</p>
              <button
                onClick={() => { setSelectedCat("all"); setSearchQuery(""); }}
                className="mt-3 text-sm font-bold text-[var(--gold)] underline"
              >
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-2xl p-4 flex gap-4 active:scale-[0.99] transition-transform"
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.012)"
                }}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {service.popular && (
                    <div className="absolute top-1.5 left-1.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black"
                        style={{ background: "var(--gold)", boxShadow: "0 0 8px rgba(0,200,255,0.5)" }}>
                        ★
                      </span>
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-sm text-white leading-tight pr-1">{service.name}</h3>
                      <span className="text-base font-black text-[var(--gold)] shrink-0 leading-none">${service.price}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <Clock size={11} />
                      <span className="font-medium">{service.duration} min</span>
                    </div>

                    <Link href="/reservar">
                      <button className="flex items-center gap-1 text-[11px] font-bold text-[var(--gold)] active:translate-x-0.5 transition-transform cursor-pointer">
                        Reservar <ArrowRight size={11} />
                      </button>
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
