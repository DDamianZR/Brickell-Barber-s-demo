"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const totalVal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[301] w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[var(--gold)]" />
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  Carrito ({items.length})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 rounded-xl hover:bg-red-500/10 transition-colors"
                    title="Vaciar carrito"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition-colors"
                >
                  <X size={18} className="text-[var(--foreground)] opacity-60" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center gap-4 py-20"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-[var(--surface-2)] flex items-center justify-center">
                      <ShoppingBag size={32} className="text-[var(--foreground)] opacity-20" />
                    </div>
                    <p className="text-sm text-[var(--foreground)] opacity-40">Tu carrito está vacío</p>
                    <Link href="/tienda" onClick={() => setCartOpen(false)}>
                      <Button variant="outline" size="sm">Ver tienda</Button>
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 bg-[var(--background)] rounded-2xl p-4 border border-[var(--border)]"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--foreground)] truncate">{item.product.name}</p>
                        <p className="text-xs text-[var(--foreground)] opacity-40 mt-0.5">{item.product.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[var(--gold)]">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
                            >
                              <Minus size={12} className="text-[var(--foreground)]" />
                            </button>
                            <span className="text-sm font-medium text-[var(--foreground)] w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
                            >
                              <Plus size={12} className="text-[var(--foreground)]" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors ml-1"
                            >
                              <X size={12} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--foreground)] opacity-60">Subtotal</span>
                  <span className="text-2xl font-bold text-[var(--foreground)]">{formatCurrency(totalVal)}</span>
                </div>
                <Link href="/tienda/checkout" onClick={() => setCartOpen(false)}>
                  <Button variant="primary" size="lg" fullWidth iconRight={<ArrowRight size={16} />}>
                    Proceder al pago
                  </Button>
                </Link>
                <Link href="/tienda" onClick={() => setCartOpen(false)}>
                  <Button variant="ghost" size="md" fullWidth>
                    Seguir comprando
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
