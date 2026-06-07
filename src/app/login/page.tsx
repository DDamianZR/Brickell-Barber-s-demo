"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";

const demoAccounts = [
  { label: "Cliente", email: "cliente@brickell.com", password: "cliente123" },
  { label: "Barbero", email: "jordan@brickell.com", password: "barber123" },
  { label: "Admin", email: "admin@brickell.com", password: "admin123" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const { showToast, addNotification } = useNotificationStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      showToast({ title: "¡Bienvenido!", message: "Sesión iniciada correctamente.", type: "success" });
      addNotification({ title: "Inicio de sesión", message: "Has iniciado sesión exitosamente.", type: "success" });
      router.push("/");
    } else {
      setError(result.error || "Error al iniciar sesión");
    }
  };

  const fillDemo = (e: string, p: string) => { setEmail(e); setPassword(p); };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-24 px-5 select-none relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 -left-10 w-56 h-56 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,17,51,0.06) 0%, transparent 70%)" }} />

      {/* Brand */}
      <div className="text-center mb-8 flex flex-col items-center relative z-10">
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
          Bienvenido de <span className="text-gradient-gold">Vuelta</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-[85%]">
          Ingresa al Club VIP y agenda tu próxima cita.
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Demo Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,200,255,0.1)",
            boxShadow: "4px 4px 10px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.01)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Acceso Rápido Demo
            </span>
          </div>
          <div className="flex gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.label}
                onClick={() => fillDemo(acc.email, acc.password)}
                className="flex-1 py-2.5 rounded-xl text-[11px] font-bold text-neutral-300 neo-btn border-0 active:scale-95 cursor-pointer transition-all"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,200,255,0.08)",
            boxShadow: "6px 6px 14px rgba(0,0,0,0.6), -6px -6px 14px rgba(255,255,255,0.01)"
          }}
        >
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.22), transparent)" }} />

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2">Correo</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cliente@brickell.com"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl neo-input text-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 mt-1"
              style={{ background: "var(--gold)", boxShadow: "0 0 14px rgba(0,200,255,0.18)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={14} />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-neutral-500 mt-5">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-bold hover:underline" style={{ color: "var(--gold)" }}>
              Regístrate gratis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
