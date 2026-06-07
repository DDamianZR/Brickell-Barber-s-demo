"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star, Package } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const categories = ["Todos", "Pomadas", "Ceras", "Shampoo", "Barba", "Tratamientos"];

export default function TiendaPage() {
  const [active, setActive] = useState("Todos");
  const { addItem, toggleCart } = useCartStore();
  const { showToast } = useNotificationStore();

  const filtered = active === "Todos" ? products : products.filter((p) => p.category === active);

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    showToast({ title: "¡Añadido!", message: `${product.name} en tu carrito.`, type: "success" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
              <Package size={12} className="text-[var(--gold)]" />
              <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Tienda Premium</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[var(--foreground)] mb-4">
              Productos <span className="text-gradient-gold">de élite</span>
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto leading-relaxed">
              Los mismos productos que usamos en la barbería, ahora disponibles para ti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                active === cat ? "bg-[var(--gold)] text-black" : "bg-[var(--surface)] text-[var(--foreground)] opacity-60 hover:opacity-100 border border-[var(--border)]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300">
              <div className="relative h-52 overflow-hidden bg-[var(--surface-2)]">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="sm">{product.category}</Badge>
                </div>
                {product.stock < 20 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="warning" size="sm">Pocas unidades</Badge>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < Math.floor(product.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-[var(--foreground)] opacity-20"} />
                  ))}
                  <span className="text-xs text-[var(--foreground)] opacity-40 ml-1">({product.reviews})</span>
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors">{product.name}</h3>
                <p className="text-xs text-[var(--foreground)] opacity-50 leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <span className="text-2xl font-bold text-[var(--gold)]">{formatCurrency(product.price)}</span>
                  <Button variant="primary" size="sm" icon={<ShoppingBag size={14} />} onClick={() => handleAdd(product)}>
                    Añadir
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
