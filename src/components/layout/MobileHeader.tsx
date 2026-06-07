"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Bell, ShoppingBag, User, Sun, Moon, Menu, X, Home, Scissors, Award, Calendar, BookOpen, MessageSquare } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import { playHapticClick } from "@/lib/haptics";

export default function MobileHeader() {
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { count, toggleCart } = useCartStore();
  const { unreadCount, toggleNotifications } = useNotificationStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = count();
  const notifCount = unreadCount();

  const menuItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/barberos", label: "Nuestros Barberos", icon: Scissors },
    { href: "/servicios", label: "Servicios VIP", icon: Award },
    { href: "/reservar", label: "Reserva Online", icon: Calendar },
    { href: "/tienda", label: "Tienda Premium", icon: ShoppingBag },
    { href: "/blog", label: "Blog de Estilo", icon: BookOpen },
    { href: "/contacto", label: "Contacto & Ubicación", icon: MessageSquare },
  ];

  return (
    <>
      <header className="sticky top-0 z-[90] w-full px-4 py-2.5 bg-[var(--background)]/92 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between select-none" style={{ boxShadow: "0 1px 0 rgba(0,200,255,0.06)" }}>
        {/* Brand logo & name with hamburger Menu toggle */}
        <div className="flex items-center gap-2.5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { playHapticClick(); setIsMenuOpen(true); }}
            className="p-2 rounded-xl neo-btn flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={15} className="text-[var(--foreground)] opacity-70" />
          </motion.button>

          <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-transform" onClick={playHapticClick}>
            <div className="relative w-8 h-8 rounded-full border border-[var(--gold)]/30 overflow-hidden">
              <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest text-[var(--foreground)] uppercase leading-none">
                BRICKELL
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[var(--gold)] uppercase font-medium leading-none mt-0.5">
                BARBER'S
              </span>
            </div>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { playHapticClick(); toggleTheme(); }}
            className="p-1.5 rounded-xl neo-btn flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={15} className="text-[var(--gold)]" />
            ) : (
              <Moon size={15} className="text-[var(--foreground)] opacity-70" />
            )}
          </motion.button>

          {/* Notifications */}
          {isAuthenticated && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { playHapticClick(); toggleNotifications(); }}
              className="relative p-1.5 rounded-xl neo-btn flex items-center justify-center cursor-pointer"
            >
              <Bell size={15} className="text-[var(--foreground)] opacity-75" />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] text-black text-[8px] font-black rounded-full flex items-center justify-center animate-pulse-gold">
                  {notifCount}
                </span>
              )}
            </motion.button>
          )}

          {/* Cart */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { playHapticClick(); toggleCart(); }}
            className="relative p-1.5 rounded-xl neo-btn flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag size={15} className="text-[var(--foreground)] opacity-75" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] text-black text-[8px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Account Avatar */}
          <Link href={isAuthenticated ? "/dashboard" : "/login"} onClick={playHapticClick}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold overflow-hidden cursor-pointer ${
                isAuthenticated && user
                  ? "bg-[var(--gold)] text-black border border-[var(--gold)]/50"
                  : "neo-btn text-[var(--foreground)] opacity-75"
              }`}
            >
              {isAuthenticated && user ? (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <User size={14} />
              )}
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay - fixed on mobile, absolute inside simulated phone on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] lg:absolute"
            />

            {/* Main Drawer panel - fixed on mobile, absolute inside simulated phone on desktop */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-[270px] bg-[var(--background)]/95 backdrop-blur-xl border-r border-[var(--border)] shadow-2xl z-[251] p-5 flex flex-col justify-between select-none lg:absolute"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-5"
                  style={{ borderBottom: "1px solid rgba(0,200,255,0.08)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden"
                      style={{ border: "1px solid rgba(0,200,255,0.25)", boxShadow: "0 0 10px rgba(0,200,255,0.1)" }}>
                      <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black tracking-widest text-white uppercase leading-none">BRICKELL</span>
                      <span className="text-[9px] tracking-[0.25em] font-bold uppercase leading-none mt-1"
                        style={{ color: "var(--gold)" }}>BARBER&apos;S</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { playHapticClick(); setIsMenuOpen(false); }}
                    className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
                  >
                    <X size={16} className="text-neutral-400" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="py-5 space-y-0.5 overflow-y-auto max-h-[60vh] scrollbar-none">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { playHapticClick(); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all group cursor-pointer hover:bg-white/[0.03]"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                          style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.1)" }}>
                          <Icon size={15} className="text-neutral-500 group-hover:text-[var(--gold)] transition-colors" />
                        </div>
                        <span className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors tracking-wide">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4"
                style={{ borderTop: "1px solid rgba(0,200,255,0.08)" }}>
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.1)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                        style={{ background: "var(--gold)", color: "black", boxShadow: "0 0 10px rgba(0,200,255,0.3)" }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate leading-none">{user.name}</p>
                        <span className="text-[9px] font-bold uppercase tracking-wider block mt-1.5"
                          style={{ color: "var(--gold)" }}>
                          {user.level} · {user.points} pts
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => { playHapticClick(); logout(); setIsMenuOpen(false); }}
                      className="w-full py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-red-400 rounded-xl transition-all cursor-pointer"
                      style={{ background: "rgba(255,17,51,0.05)", border: "1px solid rgba(255,17,51,0.15)" }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => { playHapticClick(); setIsMenuOpen(false); }} className="block">
                    <button className="w-full py-3 text-center text-sm font-bold text-black rounded-2xl transition-all cursor-pointer"
                      style={{ background: "var(--gold)", boxShadow: "0 0 18px rgba(0,200,255,0.3)" }}>
                      Iniciar Sesión
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
