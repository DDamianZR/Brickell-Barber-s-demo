"use client";
import { create } from "zustand";
import { Notification } from "@/types";

interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface NotificationState {
  notifications: Notification[];
  toasts: ToastItem[];
  isOpen: boolean;

  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  toggleNotifications: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: "n1",
      title: "Bienvenido a Brickell Barber's",
      message: "Tu cuenta ha sido creada exitosamente. ¡Reserva tu primera cita!",
      type: "success",
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "n2",
      title: "Oferta Especial",
      message: "Este fin de semana 20% de descuento en todos los servicios combo.",
      type: "info",
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  toasts: [],
  isOpen: false,

  addNotification: (n) => {
    const notification: Notification = {
      ...n,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    set({ notifications: [notification, ...get().notifications] });
  },

  markAllRead: () =>
    set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),

  markRead: (id) =>
    set({
      notifications: get().notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }),

  deleteNotification: (id) =>
    set({ notifications: get().notifications.filter((n) => n.id !== id) }),

  showToast: (toast) => {
    const id = `toast-${Date.now()}`;
    set({ toasts: [...get().toasts, { ...toast, id }] });
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) =>
    set({ toasts: get().toasts.filter((t) => t.id !== id) }),

  toggleNotifications: () => set({ isOpen: !get().isOpen }),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
