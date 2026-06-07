"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useNotificationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setForm({ name: "", email: "", message: "" });
    setSent(true);
    showToast({ title: "Mensaje enviado", message: "Te responderemos en menos de 24 horas.", type: "success" });
  };

  const info = [
    { icon: MapPin, label: "Dirección", value: "Brickell Ave, Miami, FL 33131" },
    { icon: Phone, label: "Teléfono", value: "+52 55 2181 8886" },
    { icon: Mail, label: "Email", value: "hola@brickellbarbers.com" },
    { icon: Clock, label: "Horarios", value: "Lun–Vie 9am–7pm · Sáb 9am–4pm" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Contacto</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Hablemos <span className="text-gradient-gold">VIP</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed max-w-xs">
          Estamos aquí para atender cualquier consulta.
        </p>
      </motion.div>

      <div className="space-y-5">
        {/* Info Rows */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2.5"
        >
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3.5 p-3.5 rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.01)"
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.18)", color: "var(--gold)" }}>
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none">{label}</p>
                <p className="text-sm font-semibold text-neutral-200 mt-1 leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map Card (Visual) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl overflow-hidden relative h-32"
          style={{
            background: "linear-gradient(135deg, #0C0F14 0%, #181D26 100%)",
            border: "1px solid rgba(0,200,255,0.12)"
          }}
        >
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,200,255,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,200,255,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px"
            }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-12 h-12 mx-auto mb-2">
                <div className="absolute inset-0 rounded-full bg-[var(--red-accent)] animate-ping opacity-30" />
                <div className="relative w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: "var(--red-accent)", boxShadow: "0 0 18px rgba(255,17,51,0.5)" }}>
                  <MapPin size={18} className="text-white" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Brickell, Miami</p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,200,255,0.08)",
            boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
          }}
        >
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)" }} />

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--gold)", boxShadow: "0 0 25px rgba(0,200,255,0.5)" }}>
                  <CheckCircle size={28} className="text-black" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-[85%] mx-auto">
                  Gracias por escribirnos. Te responderemos en menos de 24 horas.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-300 neo-btn border-0 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-3.5">
                <h3 className="text-base font-black text-white mb-3">Envíanos un mensaje</h3>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">Tu nombre</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Carlos García"
                    className="w-full px-4 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">Correo electrónico</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-4 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
                  style={{ background: "var(--gold)", boxShadow: "0 0 22px rgba(0,200,255,0.3)" }}
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
