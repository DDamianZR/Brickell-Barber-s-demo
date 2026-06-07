"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, X, Check, CheckCheck, Trash2 } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import { formatDistanceToNow } from "@/lib/utils";

export default function NotificationPanel() {
  const { notifications, isOpen, toggleNotifications, markAllRead, markRead, deleteNotification } = useNotificationStore();

  const typeColors: Record<string, string> = {
    success: "bg-emerald-500",
    info: "bg-blue-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[200]" onClick={toggleNotifications} />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-24 z-[201] w-96 max-h-[80vh] glass rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-[var(--gold)]" />
                <h3 className="font-semibold text-[var(--foreground)]">Notificaciones</h3>
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="w-5 h-5 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllRead}
                  className="p-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors"
                  title="Marcar todo como leído"
                >
                  <CheckCheck size={15} className="text-[var(--foreground)] opacity-50" />
                </button>
                <button onClick={toggleNotifications} className="p-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors">
                  <X size={15} className="text-[var(--foreground)] opacity-50" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3">
                  <Bell size={32} className="text-[var(--foreground)] opacity-20" />
                  <p className="text-sm text-[var(--foreground)] opacity-40">Sin notificaciones</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 border-b border-[var(--border)] transition-colors ${
                      !n.read ? "bg-[var(--gold-glow)]" : ""
                    } hover:bg-[var(--surface)] group`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${typeColors[n.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)]">{n.title}</p>
                      <p className="text-xs text-[var(--foreground)] opacity-60 mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-[var(--foreground)] opacity-30 mt-1">
                        {formatDistanceToNow(n.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="p-1 rounded hover:bg-[var(--surface-2)]">
                          <Check size={13} className="text-emerald-400" />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(n.id)} className="p-1 rounded hover:bg-[var(--surface-2)]">
                        <Trash2 size={13} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
