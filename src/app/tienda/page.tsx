"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star, Package, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

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
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Package size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Tienda</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-wide">
          Productos <span className="text-gradient-gold">Premium</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Lleva a casa los productos profesionales que usamos en tus visitas.
        </p>
      </motion.div>

      {/* Neomorphic Category Selector */}
      <div className="mb-6 overflow-x-auto scrollbar-none flex gap-2.5 py-1 px-1">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "neo-concave border border-[var(--gold)]/30 text-[var(--gold)] shadow-inner"
                  : "neo-convex border border-[var(--border)] text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product List */}
      <div className="space-y-4 px-1">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="neo-flat rounded-2xl p-4 border border-[var(--border)] flex gap-4"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[var(--surface-2)] border border-neutral-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.stock < 20 && (
                  <div className="absolute top-1 left-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-[6px] font-black text-black uppercase tracking-wide">
                      Bajo Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-white truncate">{product.name}</h3>
                  
                  {/* Rating stars */}
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={8}
                        className={j < Math.floor(product.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-neutral-700"}
                      />
                    ))}
                    <span className="text-[8px] text-neutral-500 ml-1">({product.reviews})</span>
                  </div>
                  
                  <p className="text-[10px] text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-900/40">
                  <span className="text-xs font-black text-[var(--gold)]">{formatCurrency(product.price)}</span>
                  
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl neo-btn text-[9px] font-bold text-white border border-[var(--border)] active:scale-95"
                  >
                    <ShoppingBag size={10} className="text-[var(--gold)]" /> Añadir
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
