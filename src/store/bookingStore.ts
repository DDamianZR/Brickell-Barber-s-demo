"use client";
import { create } from "zustand";
import { Appointment, Service, Barber } from "@/types";

interface BookingState {
  appointments: Appointment[];
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: string | null;
  selectedTime: string | null;
  step: number;

  setSelectedService: (service: Service | null) => void;
  setSelectedBarber: (barber: Barber | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setStep: (step: number) => void;
  resetBooking: () => void;

  loadAppointments: () => void;
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  getUserAppointments: (userId: string) => Appointment[];
  getBarberAppointments: (barberId: string) => Appointment[];
  isSlotBooked: (barberId: string, date: string, time: string) => boolean;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  appointments: [],
  selectedService: null,
  selectedBarber: null,
  selectedDate: null,
  selectedTime: null,
  step: 1,

  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedBarber: (barber) => set({ selectedBarber: barber }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setStep: (step) => set({ step }),

  resetBooking: () =>
    set({
      selectedService: null,
      selectedBarber: null,
      selectedDate: null,
      selectedTime: null,
      step: 1,
    }),

  loadAppointments: () => {
    const stored = localStorage.getItem("brickell-appointments");
    if (stored) {
      set({ appointments: JSON.parse(stored) });
    }
  },

  addAppointment: (appointment) => {
    const { appointments } = get();
    const updated = [...appointments, appointment];
    set({ appointments: updated });
    localStorage.setItem("brickell-appointments", JSON.stringify(updated));
  },

  cancelAppointment: (id) => {
    const { appointments } = get();
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "cancelled" as const } : a
    );
    set({ appointments: updated });
    localStorage.setItem("brickell-appointments", JSON.stringify(updated));
  },

  getUserAppointments: (userId) =>
    get().appointments.filter((a) => a.clientId === userId),

  getBarberAppointments: (barberId) =>
    get().appointments.filter(
      (a) => a.barberId === barberId && a.status !== "cancelled"
    ),

  isSlotBooked: (barberId, date, time) =>
    get().appointments.some(
      (a) =>
        a.barberId === barberId &&
        a.date === date &&
        a.time === time &&
        a.status !== "cancelled"
    ),
}));
