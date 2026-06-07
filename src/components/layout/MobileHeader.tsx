"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Bell, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";

export default function MobileHeader() {
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();
  const { count, toggleCart } = useCartStore();
  const { unreadCount, toggleNotifications } = useNotificationStore();

  const cartCount = count();
  const notifCount = unreadCount();

  return (
    <header className="sticky top-0 z-[90] w-full px-4 py-3 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between">
      {/* Brand logo & name */}
      <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-transform">
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

      {/* Action buttons */}
      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-1.5 rounded-xl neo-btn flex items-center justify-center"
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
            onClick={toggleNotifications}
            className="relative p-1.5 rounded-xl neo-btn flex items-center justify-center"
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
          onClick={toggleCart}
          className="relative p-1.5 rounded-xl neo-btn flex items-center justify-center"
        >
          <ShoppingBag size={15} className="text-[var(--foreground)] opacity-75" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] text-black text-[8px] font-black rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </motion.button>

        {/* Account Avatar */}
        <Link href={isAuthenticated ? "/dashboard" : "/login"}>
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
  );
}
