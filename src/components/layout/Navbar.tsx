"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sun, Moon, Bell, ShoppingBag, Menu, X, ChevronDown,
  User, LogOut, Settings, Calendar, Shield
} from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/barberos", label: "Barberos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { count, toggleCart } = useCartStore();
  const { unreadCount, toggleNotifications } = useNotificationStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const cartCount = count();
  const notifCount = unreadCount();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[var(--border)] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[var(--gold)]/30 group-hover:border-[var(--gold)]/60 transition-colors">
                <Image src="/images/logo.jpg" alt="Brickell Barber's" fill className="object-cover scale-110" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest text-[var(--foreground)] uppercase">
                  Brickell
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase font-medium">
                  Barber&apos;s
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[var(--foreground)] opacity-70 hover:opacity-100 hover:text-[var(--gold)] transition-all duration-200 rounded-lg hover:bg-[var(--surface)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-[var(--foreground)] opacity-70" />
                ) : (
                  <Moon size={18} className="text-[var(--foreground)] opacity-70" />
                )}
              </motion.button>

              {/* Notifications */}
              {isAuthenticated && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleNotifications}
                  className="relative p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
                >
                  <Bell size={18} className="text-[var(--foreground)] opacity-70" />
                  {notifCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                      {notifCount}
                    </span>
                  )}
                </motion.button>
              )}

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
              >
                <ShoppingBag size={18} className="text-[var(--foreground)] opacity-70" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Auth */}
              {isAuthenticated && user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[var(--gold)] flex items-center justify-center">
                      <span className="text-xs font-bold text-black">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[var(--foreground)] hidden md:block">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown size={14} className="text-[var(--foreground)] opacity-50" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-12 w-52 glass rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-[var(--border)]">
                          <p className="text-sm font-semibold text-[var(--foreground)]">{user.name}</p>
                          <p className="text-xs text-[var(--foreground)] opacity-50 truncate">{user.email}</p>
                          <div className="mt-1">
                            <Badge variant={user.level === "Gold" ? "gold" : user.level === "Black" ? "black" : "silver"} size="sm">
                              {user.level} · {user.points} pts
                            </Badge>
                          </div>
                        </div>
                        <div className="p-2">
                          {user.role === "client" && (
                            <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--surface)] transition-all">
                              <User size={15} /> Mi Perfil
                            </Link>
                          )}
                          {user.role === "client" && (
                            <Link href="/dashboard/citas" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--surface)] transition-all">
                              <Calendar size={15} /> Mis Citas
                            </Link>
                          )}
                          {user.role === "barber" && (
                            <Link href="/barber" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--surface)] transition-all">
                              <Settings size={15} /> Panel Barbero
                            </Link>
                          )}
                          {user.role === "admin" && (
                            <Link href="/admin" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--surface)] transition-all">
                              <Shield size={15} /> Admin Panel
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all mt-1"
                          >
                            <LogOut size={15} /> Cerrar Sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Iniciar sesión</Button>
                  </Link>
                  <Link href="/reservar">
                    <Button variant="primary" size="sm">Reservar cita</Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
              >
                {mobileOpen ? (
                  <X size={20} className="text-[var(--foreground)]" />
                ) : (
                  <Menu size={20} className="text-[var(--foreground)]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-[var(--border)]"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--surface)] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 flex flex-col gap-2">
                  {!isAuthenticated ? (
                    <>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth>Iniciar sesión</Button>
                      </Link>
                      <Link href="/reservar" onClick={() => setMobileOpen(false)}>
                        <Button variant="primary" size="md" fullWidth>Reservar cita</Button>
                      </Link>
                    </>
                  ) : (
                    <Button variant="danger" size="md" fullWidth onClick={handleLogout}>
                      Cerrar Sesión
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-[99]" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}
