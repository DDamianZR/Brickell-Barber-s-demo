"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-[var(--foreground)] mb-4">
              <span className="text-gradient-gold">Hablemos</span>
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-50 max-w-lg mx-auto">
              Estamos aquí para cualquier consulta, sugerencia o simplemente para saludar.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Información de contacto</h2>
            <div className="space-y-4 mb-8">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold-glow)] border border-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[var(--gold)]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)] opacity-40 uppercase tracking-wide">{label}</p>
                    <p className="text-sm text-[var(--foreground)] mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-48 bg-[var(--surface)] rounded-3xl border border-[var(--border)] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <MapPin size={32} className="text-[var(--gold)] mx-auto mb-2" />
                <p className="text-sm text-[var(--foreground)] opacity-50">Brickell, Miami, FL</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Envíanos un mensaje</h2>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--surface)] rounded-3xl p-12 border border-[var(--border)] text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">¡Mensaje enviado!</h3>
                <p className="text-sm text-[var(--foreground)] opacity-50">
                  Gracias por escribirnos. Te responderemos en menos de 24 horas.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[var(--surface)] rounded-3xl p-8 border border-[var(--border)] space-y-5">
                <div>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Tu nombre</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Carlos García"
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Correo electrónico</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Mensaje</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full px-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 resize-none focus:border-[var(--gold)]/50 transition-colors" />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={<Send size={16} />}>
                  Enviar mensaje
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
