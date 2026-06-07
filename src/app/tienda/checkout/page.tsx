"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Lock, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function CheckoutPage() {
  const { items, total, clearCart, setCartOpen } = useCartStore();
  const { showToast } = useNotificationStore();
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const totalVal = total();

  const formatCardNumber = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    showToast({ title: "¡Pedido confirmado!", message: "Tu pedido está en camino.", type: "success" });
    setLoading(false);
    setSuccess(true);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-[var(--foreground)] opacity-20 mb-4" />
          <p className="text-[var(--foreground)] opacity-50 mb-4">Tu carrito está vacío</p>
          <Link href="/tienda">
            <Button variant="primary" size="md">Ver tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/tienda" className="flex items-center gap-2 text-sm text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity mb-4">
            <ArrowLeft size={14} /> Volver a la tienda
          </Link>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Order summary */}
          <div>
            <h2 className="text-sm font-bold text-[var(--gold)] tracking-widest uppercase mb-4">Resumen del pedido</h2>
            <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)] space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">{item.product.name}</p>
                    <p className="text-xs text-[var(--foreground)] opacity-40">Cantidad: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--gold)]">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-[var(--border)] flex justify-between">
                <span className="font-bold text-[var(--foreground)]">Total</span>
                <span className="text-2xl font-bold text-[var(--gold)]">{formatCurrency(totalVal)}</span>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div>
            <h2 className="text-sm font-bold text-[var(--gold)] tracking-widest uppercase mb-4">Datos de pago</h2>
            <form onSubmit={handleCheckout} className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)] space-y-5">
              {[
                { key: "name", label: "Nombre en la tarjeta", placeholder: "Juan García" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">{label}</label>
                  <input required value={cardData[key as keyof typeof cardData]}
                    onChange={(e) => setCardData({ ...cardData, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Número de tarjeta</label>
                <input required value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456" maxLength={19}
                  className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono tracking-widest" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Expiración</label>
                  <input required value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                    placeholder="MM/AA" maxLength={5}
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">CVV</label>
                  <input required value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    placeholder="•••" type="password" maxLength={4}
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono" />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Lock size={12} className="text-emerald-400" />
                <span className="text-xs text-emerald-400">Pago seguro y encriptado</span>
              </div>
              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={<CreditCard size={16} />}>
                Pagar {formatCurrency(totalVal)}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Modal isOpen={success} onClose={() => router.push("/")} size="sm">
        <div className="text-center py-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-black" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">¡Pedido confirmado!</h2>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-6">Tu pedido está en camino. Recibirás una confirmación en tu correo.</p>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </Modal>
    </div>
  );
}
