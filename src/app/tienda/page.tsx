"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import { formatCurrency } from "@/lib/utils";

const categories = ["Todos", "Pomadas", "Ceras", "Shampoo", "Barba", "Tratamientos"];

export default function TiendaPage() {
  const [active, setActive] = useState("Todos");
  const { addItem } = useCartStore();
  const { showToast } = useNotificationStore();

  const filtered = active === "Todos" ? products : products.filter((p) => p.category === active);

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    showToast({ title: "¡Añadido!", message: `${product.name} en tu carrito.`, type: "success" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Tienda</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Productos <span className="text-gradient-gold">Premium</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed max-w-xs">
          Lleva a casa los productos profesionales que usamos.
        </p>
      </motion.div>

      {/* Category Pills */}
      <div className="mb-7 -mx-5 px-5 overflow-x-auto scrollbar-none flex gap-2 py-1">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "bg-[var(--gold)] text-black shadow-[0_0_18px_rgba(0,200,255,0.3)]"
                  : "text-neutral-400 border border-[var(--border)] hover:text-white hover:border-[var(--gold)]/30"
              }`}
              style={!isActive ? { background: "var(--surface)" } : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="rounded-2xl p-4 flex gap-4"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.012)"
              }}
            >
              {/* Product Thumbnail */}
              <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden"
                style={{ background: "var(--surface-2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                {product.stock < 20 && (
                  <div className="absolute top-1.5 left-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-[8px] font-black text-black uppercase tracking-wide">
                      Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white leading-tight">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={10}
                        className={j < Math.floor(product.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-neutral-700"}
                      />
                    ))}
                    <span className="text-[10px] text-neutral-500 ml-1.5 font-medium">({product.reviews})</span>
                  </div>

                  <p className="text-[11px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-base font-black text-[var(--gold)] leading-none">{formatCurrency(product.price)}</span>

                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-black transition-all active:scale-95 cursor-pointer"
                    style={{ background: "var(--gold)", boxShadow: "0 0 12px rgba(0,200,255,0.2)" }}
                  >
                    <ShoppingBag size={11} /> Añadir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
