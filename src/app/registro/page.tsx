"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Sparkles, Award } from "lucide-react";
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
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title Header */}
      <div className="text-center mb-6 px-1 flex flex-col items-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 active:scale-95 transition-transform">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[var(--gold)]/30">
            <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover scale-115" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold tracking-widest text-[var(--foreground)] uppercase block leading-none">Brickell</span>
            <span className="text-[9px] tracking-[0.25em] text-[var(--gold)] uppercase font-semibold leading-none mt-0.5">Barber&apos;s</span>
          </div>
        </Link>
        
        <h1 className="text-xl font-black text-white tracking-wide flex items-center gap-1.5 justify-center">
          <Sparkles size={14} className="text-[var(--gold)]" /> Crear Cuenta
        </h1>
        <p className="text-xs text-neutral-400 mt-1 max-w-[85%]">
          Regístrate gratis y obtén 100 puntos VIP al instante.
        </p>
      </div>

      <div className="space-y-4 px-1">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-flat rounded-3xl p-5 border border-[var(--border)]"
        >
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}

            {[
              { key: "name", label: "Nombre completo", icon: User, placeholder: "Carlos García", type: "text" },
              { key: "email", label: "Correo electrónico", icon: Mail, placeholder: "carlos@gmail.com", type: "email" },
              { key: "phone", label: "Teléfono", icon: Phone, placeholder: "+1 (305) 555-0100", type: "tel" },
            ].map(({ key, label, icon: Icon, placeholder, type }) => (
              <div key={key}>
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">{label}</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Icon size={13} />
                  </div>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required={key !== "phone"}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">Contraseña</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock size={13} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* Welcome Gift Banner */}
            <div className="p-3.5 rounded-2xl bg-[var(--gold-glow)] border border-[var(--gold)]/15 flex items-start gap-2.5 mt-4">
              <Award size={15} className="text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-white uppercase leading-none">Regalo de Bienvenida</h4>
                <p className="text-[9px] text-neutral-400 mt-1 leading-normal">
                  Recibes <strong className="text-[var(--gold)] font-bold">100 puntos Club VIP</strong> al completar tu registro para canjear en tu próxima visita.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              icon={<UserPlus size={13} />}
              className="!rounded-xl font-bold bg-[var(--gold)] text-black mt-2 pt-3"
            >
              Crear cuenta
            </Button>
          </form>

          <p className="text-center text-[10px] text-neutral-500 mt-5 leading-none">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[var(--gold)] font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
