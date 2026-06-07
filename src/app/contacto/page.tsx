"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import Button from "@/components/ui/Button";

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
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 px-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Contacto</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-wide">
          Hablemos <span className="text-gradient-gold">VIP</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Estamos aquí para atender cualquier consulta o sugerencia.
        </p>
      </motion.div>

      <div className="space-y-6 px-1">
        {/* Info Rows */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3.5 p-3.5 neo-flat rounded-2xl border border-[var(--border)]">
              <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 text-[var(--gold)]">
                <Icon size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider leading-none">{label}</p>
                <p className="text-xs font-bold text-neutral-300 mt-1 truncate">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Message Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="neo-flat rounded-3xl p-5 border border-[var(--border)]"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-black" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">¡Mensaje Enviado!</h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-[85%] mx-auto">
                  Gracias por escribirnos. Te responderemos en menos de 24 horas a tu correo.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setSent(false)} className="mt-4 !rounded-xl neo-btn border-0 text-white font-bold">
                  Enviar otro mensaje
                </Button>
              </motion.div>
            ) : (
              <form key="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Tu nombre</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Carlos García"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600"
                  />
                </div>
                
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Correo electrónico</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600"
                  />
                </div>
                
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Mensaje</label>
                  <textarea
                    required
                    rows={3.5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte hoy?"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={loading}
                  icon={<Send size={13} />}
                  className="!rounded-xl font-bold bg-[var(--gold)] text-black pt-3"
                >
                  Enviar mensaje
                </Button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
