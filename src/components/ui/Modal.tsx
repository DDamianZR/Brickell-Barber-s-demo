"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative z-10 w-full ${sizes[size]} glass rounded-3xl p-6 border border-[var(--border)] shadow-2xl`}
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-[var(--surface)] transition-colors"
                >
                  <X size={18} className="text-[var(--foreground)] opacity-60" />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-[var(--surface)] transition-colors z-10"
              >
                <X size={18} className="text-[var(--foreground)] opacity-60" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
