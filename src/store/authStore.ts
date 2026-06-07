"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoyaltyLevel } from "@/types";
import { mockUsers } from "@/data/mockUsers";

function getLevelFromPoints(points: number): LoyaltyLevel {
  if (points >= 1000) return "Black";
  if (points >= 400) return "Gold";
  return "Silver";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  register: (name: string, email: string, password: string, phone?: string) => { success: boolean; error?: string };
  addPoints: (points: number) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const allUsers: User[] = JSON.parse(localStorage.getItem("brickell-users") || "null") || mockUsers;
        const found = allUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) return { success: false, error: "Credenciales incorrectas" };
        set({ user: found, isAuthenticated: true });
        return { success: true };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      register: (name, email, password, phone) => {
        const allUsers: User[] = JSON.parse(localStorage.getItem("brickell-users") || "null") || mockUsers;
        const exists = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return { success: false, error: "Este email ya está registrado" };

        const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email,
          password,
          role: "client",
          phone,
          points: 100,
          level: "Silver",
          createdAt: new Date().toISOString().split("T")[0],
          appointments: [],
        };
        const updated = [...allUsers, newUser];
        localStorage.setItem("brickell-users", JSON.stringify(updated));
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },

      addPoints: (points) => {
        const { user } = get();
        if (!user) return;
        const newPoints = user.points + points;
        const newLevel = getLevelFromPoints(newPoints);
        const updated = { ...user, points: newPoints, level: newLevel };
        set({ user: updated });

        const allUsers: User[] = JSON.parse(localStorage.getItem("brickell-users") || "null") || mockUsers;
        const updatedUsers = allUsers.map((u) => (u.id === user.id ? updated : u));
        localStorage.setItem("brickell-users", JSON.stringify(updatedUsers));
      },

      updateUser: (data) => {
        const { user } = get();
        if (!user) return;
        const updated = { ...user, ...data };
        set({ user: updated });
        const allUsers: User[] = JSON.parse(localStorage.getItem("brickell-users") || "null") || mockUsers;
        const updatedUsers = allUsers.map((u) => (u.id === user.id ? updated : u));
        localStorage.setItem("brickell-users", JSON.stringify(updatedUsers));
      },
    }),
    { name: "brickell-auth" }
  )
);
