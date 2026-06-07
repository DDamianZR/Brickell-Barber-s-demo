"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

const icons = {
  success: <CheckCircle size={18} className="text-emerald-400" />,
  info: <Info size={18} className="text-blue-400" />,
  warning: <AlertTriangle size={18} className="text-amber-400" />,
  error: <XCircle size={18} className="text-red-400" />,
};

const colors = {
  success: "border-emerald-500/30",
  info: "border-blue-500/30",
  warning: "border-amber-500/30",
  error: "border-red-500/30",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`pointer-events-auto glass rounded-2xl p-4 pr-10 max-w-sm border ${colors[toast.type]} shadow-2xl`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">{icons[toast.type]}</div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{toast.title}</p>
                <p className="text-xs text-[var(--foreground)] opacity-70 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={14} className="text-[var(--foreground)]" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
