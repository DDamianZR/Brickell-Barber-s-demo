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
                <div className="flex items-center justify-between pb-5 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full border border-[var(--gold)]/30 overflow-hidden">
                      <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-wider text-white uppercase leading-none">BRICKELL</span>
                      <span className="text-[7px] tracking-[0.2em] text-[var(--gold)] uppercase font-semibold leading-none mt-0.5">BARBER'S</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { playHapticClick(); setIsMenuOpen(false); }}
                    className="p-1 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    <X size={15} className="text-neutral-400" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="py-5 space-y-1 overflow-y-auto max-h-[60vh] scrollbar-none">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { playHapticClick(); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--surface-light)] transition-all group cursor-pointer"
                      >
                        <Icon size={15} className="text-neutral-500 group-hover:text-[var(--gold)] transition-colors" />
                        <span className="text-xs font-bold text-neutral-300 group-hover:text-white transition-colors tracking-wide">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer / Account section */}
              <div className="pt-4 border-t border-[var(--border)]">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[var(--gold)] text-black flex items-center justify-center font-bold text-xs border border-[var(--gold)]/50">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate leading-none">{user.name}</p>
                        <span className="text-[8px] font-bold text-[var(--gold)] uppercase tracking-wider block mt-1">
                          Miembro {user.level} · {user.points} pts
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => { playHapticClick(); logout(); setIsMenuOpen(false); }}
                      className="w-full py-2 text-center text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-xl transition-all cursor-pointer"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => { playHapticClick(); setIsMenuOpen(false); }} className="block">
                    <button className="w-full py-2.5 text-center text-xs font-bold text-black bg-[var(--gold)] rounded-xl hover:bg-[var(--gold-light)] transition-colors tracking-wide cursor-pointer">
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
