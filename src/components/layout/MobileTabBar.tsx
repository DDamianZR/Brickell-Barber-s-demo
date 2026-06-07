"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scissors, Calendar, Crown, MessageSquare } from "lucide-react";
import { playHapticClick } from "@/lib/haptics";

export default function MobileTabBar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/servicios", label: "Servicios", icon: Scissors },
    { href: "/reservar", label: "Reservar", icon: Calendar, isCenter: true },
    { href: "/dashboard", label: "Club VIP", icon: Crown },
    { href: "/contacto", label: "Contacto", icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[95] lg:absolute">
      {/* Soft gradient backdrop behind the tab bar to fade the page content */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
      
      {/* Main Tab Bar Container */}
      <div className="w-full px-6 py-2 bg-[var(--background)]/90 backdrop-blur-lg border-t border-[var(--border)] flex items-center justify-between pb-safe">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          
          if (tab.isCenter) {
            return (
              <Link key={tab.href} href={tab.href} className="relative -mt-6" onClick={playHapticClick}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark,#A07B10)] flex items-center justify-center text-black shadow-lg shadow-[var(--gold)]/20 border border-[var(--gold-light,#E0B84A)]/30 active:shadow-inner cursor-pointer"
                >
                  <Icon size={22} className="stroke-[2.5]" />
                  
                  {/* Subtle pulsing outer ring */}
                  <div className="absolute inset-0 rounded-full border border-[var(--gold)] animate-ping opacity-15 pointer-events-none" />
                </motion.div>
                <span className="block text-[8px] font-bold text-center text-[var(--gold)] uppercase tracking-wider mt-1 leading-none">
                  Cita
                </span>
              </Link>
            );
          }

          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center py-1 flex-1 cursor-pointer" onClick={playHapticClick}>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative p-1 rounded-lg flex items-center justify-center ${isActive ? "text-[var(--gold)]" : "text-[var(--foreground)] opacity-50"}`}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.22, 1] } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Icon size={20} className={isActive ? "stroke-[2.2]" : "stroke-[1.8]"} />
                </motion.div>
                {isActive && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--gold)] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={`text-[9px] font-medium mt-1 leading-none transition-colors ${
                isActive ? "text-[var(--gold)] font-bold" : "text-[var(--foreground)] opacity-55"
              }`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
