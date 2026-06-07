"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import Button from "@/components/ui/Button";

export default function RegistroPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuthStore();
  const { showToast, addNotification } = useNotificationStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const result = register(form.name, form.email, form.password, form.phone);
    setLoading(false);
    if (result.success) {
      showToast({ title: "¡Cuenta creada!", message: "Bienvenido a Brickell Barber's. Has ganado 100 puntos de bienvenida.", type: "success" });
      addNotification({ title: "¡Bienvenido!", message: "Tu cuenta fue creada. Tienes 100 puntos de bienvenida.", type: "success" });
      router.push("/dashboard");
    } else {
      setError(result.error || "Error al crear cuenta");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-[var(--gold)]/30">
                <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover scale-110" />
              </div>
              <div className="text-left">
                <span className="text-base font-bold tracking-widest text-[var(--foreground)] uppercase block">Brickell</span>
                <span className="text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase font-medium">Barber&apos;s</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Crea tu cuenta</h1>
            <p className="text-sm text-[var(--foreground)] opacity-50">Únete y comienza a acumular puntos premium</p>
          </div>

          <div className="bg-[var(--surface)] rounded-3xl p-8 border border-[var(--border)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400 text-center">
                  {error}
                </motion.div>
              )}

              {[
                { key: "name", label: "Nombre completo", icon: User, placeholder: "Tu nombre", type: "text" },
                { key: "email", label: "Correo electrónico", icon: Mail, placeholder: "tu@email.com", type: "email" },
                { key: "phone", label: "Teléfono (opcional)", icon: Phone, placeholder: "+1 (305) 555-0100", type: "tel" },
              ].map(({ key, label, icon: Icon, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">{label}</label>
                  <div className="relative">
                    <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30" />
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      required={key !== "phone"}
                      className="w-full pl-11 pr-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Contraseña</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-12 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30 hover:opacity-60 transition-opacity">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="glass rounded-xl p-3 border border-[var(--gold)]/20">
                <p className="text-xs text-[var(--foreground)] opacity-60">
                  🎁 Al registrarte recibes <span className="text-[var(--gold)] font-bold">100 puntos de bienvenida</span> de regalo.
                </p>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={<UserPlus size={16} />}>
                Crear cuenta
              </Button>
            </form>

            <p className="text-center text-sm text-[var(--foreground)] opacity-40 mt-6">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-[var(--gold)] hover:underline font-medium opacity-100">
                Inicia sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
