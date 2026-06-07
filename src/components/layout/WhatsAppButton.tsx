"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const phone = "5521818886";
  const message = encodeURIComponent(
    "¡Hola! Me gustaría reservar una cita en Brickell Barber's. ¿Tienen disponibilidad?"
  );

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-72 glass rounded-2xl border border-[var(--border)] p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Brickell Barber&apos;s</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  En línea
                </p>
              </div>
            </div>
            <p className="text-xs text-[var(--foreground)] opacity-60 mb-3 leading-relaxed">
              ¡Hola! 👋 ¿Listo para tu próxima experiencia premium? Chatea con nosotros.
            </p>
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle size={15} />
              Iniciar chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors animate-pulse-gold"
        style={{ animation: "none", boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] rounded-full flex items-center justify-center text-[9px] font-bold text-black">1</span>
      </motion.button>
    </div>
  );
}
