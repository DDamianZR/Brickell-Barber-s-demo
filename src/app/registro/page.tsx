"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Award } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";

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
      showToast({ title: "¡Cuenta creada!", message: "Bienvenido a Brickell Barber's. Has ganado 100 puntos.", type: "success" });
      addNotification({ title: "¡Bienvenido!", message: "Tu cuenta fue creada. Tienes 100 puntos.", type: "success" });
      router.push("/dashboard");
    } else {
      setError(result.error || "Error al crear cuenta");
    }
  };

  const fields = [
    { key: "name", label: "Nombre completo", icon: User, placeholder: "Carlos García", type: "text" },
    { key: "email", label: "Correo electrónico", icon: Mail, placeholder: "carlos@gmail.com", type: "email" },
    { key: "phone", label: "Teléfono", icon: Phone, placeholder: "+1 (305) 555-0100", type: "tel" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-24 px-5 select-none relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />

      {/* Brand */}
      <div className="text-center mb-7 flex flex-col items-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-5 active:scale-95 transition-transform">
          <div className="relative w-12 h-12 overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(0,200,255,0.25)", boxShadow: "0 0 14px rgba(0,200,255,0.15)" }}>
            <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <div className="text-left">
            <span className="text-base font-black tracking-widest text-white uppercase block leading-none">Brickell</span>
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase leading-none mt-1 block"
              style={{ color: "var(--gold)" }}>Barber&apos;s</span>
          </div>
        </Link>

        <h1 className="text-2xl font-black text-white leading-tight">
          Únete al <span className="text-gradient-gold">Club VIP</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-[85%]">
          Regístrate gratis y obtén 100 puntos al instante.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 relative overflow-hidden z-10"
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(0,200,255,0.08)",
          boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.22), transparent)" }} />

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl text-xs font-bold text-red-400 text-center"
              style={{ background: "rgba(255,17,51,0.08)", border: "1px solid rgba(255,17,51,0.2)" }}
            >
              {error}
            </motion.div>
          )}

          {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
            <div key={key}>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{label}</label>
              <div className="relative">
                <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  required={key !== "phone"}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600"
                />
              </div>
            </div>
          ))}

          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">Contraseña</label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                className="w-full pl-11 pr-11 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-500 hover:text-white rounded-lg cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Welcome Gift */}
          <div className="p-3.5 rounded-2xl flex items-start gap-3 mt-3"
            style={{
              background: "linear-gradient(135deg, rgba(0,200,255,0.05), rgba(255,17,51,0.04))",
              border: "1px solid rgba(0,200,255,0.18)"
            }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <Award size={16} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <h4 className="text-xs font-black text-white">Regalo de Bienvenida</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Recibes <strong style={{ color: "var(--gold)" }}>100 puntos VIP</strong> al completar el registro.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 mt-2"
            style={{ background: "var(--gold)", boxShadow: "0 0 14px rgba(0,200,255,0.18)" }}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus size={14} />
                Crear cuenta
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-5">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-bold hover:underline" style={{ color: "var(--gold)" }}>
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
