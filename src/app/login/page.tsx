"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import Button from "@/components/ui/Button";

const demoAccounts = [
  { label: "Cliente", email: "cliente@brickell.com", password: "cliente123" },
  { label: "Barbero Jordan", email: "jordan@brickell.com", password: "barber123" },
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
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
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
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Bienvenido de nuevo</h1>
            <p className="text-sm text-[var(--foreground)] opacity-50">Inicia sesión para continuar tu experiencia premium</p>
          </div>

          {/* Demo accounts */}
          <div className="glass rounded-2xl p-4 border border-[var(--border)] mb-6">
            <p className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase mb-3">Cuentas Demo</p>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.label}
                  onClick={() => fillDemo(acc.email, acc.password)}
                  className="px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--foreground)] opacity-70 hover:opacity-100 hover:border-[var(--gold)]/30 transition-all"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[var(--surface)] rounded-3xl p-8 border border-[var(--border)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400 text-center"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-12 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-30 hover:opacity-60 transition-opacity"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                icon={<LogIn size={16} />}
              >
                Iniciar sesión
              </Button>
            </form>

            <p className="text-center text-sm text-[var(--foreground)] opacity-40 mt-6">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="text-[var(--gold)] hover:underline font-medium opacity-100">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
