"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import Button from "@/components/ui/Button";

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

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title */}
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
          <Sparkles size={14} className="text-[var(--gold)]" /> Iniciar Sesión
        </h1>
        <p className="text-xs text-neutral-400 mt-1 max-w-[85%]">
          Ingresa al Club VIP y agenda tu próxima experiencia.
        </p>
      </div>

      <div className="space-y-5 px-1">
        {/* Demo Accounts Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-flat rounded-2xl p-4 border border-[var(--border)]"
        >
          <span className="text-[8px] font-black text-[var(--gold)] tracking-widest uppercase block mb-3">
            Acceso Rápido Demo
          </span>
          <div className="flex gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.label}
                onClick={() => fillDemo(acc.email, acc.password)}
                className="flex-1 py-2 rounded-xl neo-btn text-[10px] font-bold text-white border border-[var(--border)] active:scale-95"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Inputs Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-flat rounded-3xl p-5 border border-[var(--border)]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Correo electrónico</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Mail size={13} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cliente@brickell.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Contraseña</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock size={13} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              icon={<LogIn size={13} />}
              className="!rounded-xl font-bold bg-[var(--gold)] text-black mt-2 pt-3"
            >
              Iniciar sesión
            </Button>
          </form>

          <p className="text-center text-[10px] text-neutral-500 mt-5 leading-none">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-[var(--gold)] font-bold hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
