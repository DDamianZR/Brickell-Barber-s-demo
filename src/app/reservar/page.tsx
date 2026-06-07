"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check, ChevronRight, Clock, Star, Calendar,
  CreditCard, Lock, CheckCircle, ArrowLeft
} from "lucide-react";
import { services } from "@/data/services";
import { barbers } from "@/data/barbers";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useNotificationStore } from "@/store/notificationStore";
import { Appointment } from "@/types";
import { generateId, formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

const STEPS = ["Servicio", "Barbero", "Fecha", "Horario", "Datos", "Pago"];

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
      done ? "bg-[var(--gold)] text-black" : active ? "bg-[var(--gold)]/20 border-2 border-[var(--gold)] text-[var(--gold)]" : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] opacity-30"
    }`}>
      {done ? <Check size={14} /> : step}
    </div>
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay();
}

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const { user, isAuthenticated, addPoints } = useAuthStore();
  const { addAppointment, isSlotBooked } = useBookingStore();
  const { showToast, addNotification } = useNotificationStore();
  const router = useRouter();

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectedBarber = barbers.find((b) => b.id === selectedBarberId);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const getAvailableSlots = () => {
    if (!selectedBarber || !selectedDate) return [];
    const date = new Date(selectedDate);
    const dayName = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][date.getDay()];
    const scheduleDay = selectedBarber.schedule.find((d) => d.day === dayName);
    if (!scheduleDay) return [];
    return scheduleDay.slots.filter(
      (slot) => !isSlotBooked(selectedBarber.id, selectedDate, slot)
    );
  };

  const handlePayment = async () => {
    if (!user || !selectedService || !selectedBarber || !selectedDate || !selectedTime) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    const appointment: Appointment = {
      id: generateId(),
      clientId: user.id,
      clientName: user.name,
      barberId: selectedBarber.id,
      barberName: selectedBarber.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      status: "confirmed",
      notes,
      createdAt: new Date().toISOString(),
    };

    addAppointment(appointment);
    addPoints(100);
    addNotification({
      title: "¡Cita confirmada! ✨",
      message: `Tu cita con ${selectedBarber.name} el ${selectedDate} a las ${selectedTime} ha sido confirmada.`,
      type: "success",
    });
    showToast({ title: "¡Cita confirmada!", message: "Has ganado 100 puntos.", type: "success" });
    setLoading(false);
    setSuccessModal(true);
  };

  const today = new Date();
  const daysInMonth = getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth());
  const firstDayOffset = getDayOfWeek(calendarDate.getFullYear(), calendarDate.getMonth(), 1);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Reservar <span className="text-gradient-gold">cita</span>
          </h1>
          <p className="text-sm text-[var(--foreground)] opacity-50">Completa los pasos para agendar tu experiencia premium</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1 min-w-fit">
                <StepIndicator step={i + 1} current={step} />
                <span className={`text-[10px] uppercase tracking-wide hidden sm:block ${step === i + 1 ? "text-[var(--gold)] font-semibold" : "text-[var(--foreground)] opacity-30"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-8 sm:w-16 mx-2 transition-colors ${step > i + 1 ? "bg-[var(--gold)]" : "bg-[var(--border)]"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Service */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Elige tu servicio</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                      selectedServiceId === service.id
                        ? "border-[var(--gold)] bg-[var(--gold-glow)]"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-[var(--foreground)]">{service.name}</h3>
                      {selectedServiceId === service.id && (
                        <div className="w-6 h-6 rounded-full bg-[var(--gold)] flex items-center justify-center">
                          <Check size={12} className="text-black" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[var(--foreground)] opacity-50 leading-relaxed mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[var(--foreground)] opacity-40">
                        <Clock size={12} />
                        <span className="text-xs">{service.duration} min</span>
                      </div>
                      <span className="font-bold text-[var(--gold)]">${service.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="primary" size="lg" disabled={!selectedServiceId} onClick={() => setStep(2)} iconRight={<ChevronRight size={16} />}>
                  Continuar
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Barber */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Elige tu barbero</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {barbers.map((barber) => (
                  <motion.button
                    key={barber.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={`text-left rounded-2xl border overflow-hidden transition-all duration-200 ${
                      selectedBarberId === barber.id ? "border-[var(--gold)]" : "border-[var(--border)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      {selectedBarberId === barber.id && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--gold)] flex items-center justify-center">
                          <Check size={14} className="text-black" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-[var(--foreground)]">{barber.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-[var(--gold)] fill-[var(--gold)]" />
                          <span className="text-xs font-bold text-[var(--gold)]">{barber.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {barber.specialties.slice(0, 2).map((s) => (
                          <Badge key={s} variant="gold" size="sm">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)} icon={<ArrowLeft size={16} />}>Atrás</Button>
                <Button variant="primary" size="lg" disabled={!selectedBarberId} onClick={() => setStep(3)} iconRight={<ChevronRight size={16} />}>Continuar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Date */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Selecciona la fecha</h2>
              <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)] max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => { const d = new Date(calendarDate); d.setMonth(d.getMonth() - 1); setCalendarDate(d); }}
                    className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100">‹</button>
                  <span className="font-semibold text-[var(--foreground)]">
                    {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                  </span>
                  <button onClick={() => { const d = new Date(calendarDate); d.setMonth(d.getMonth() + 1); setCalendarDate(d); }}
                    className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100">›</button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-[10px] font-medium text-[var(--foreground)] opacity-30 uppercase py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isPast = new Date(dateStr) < new Date(today.toDateString());
                    const isSunday = getDayOfWeek(calendarDate.getFullYear(), calendarDate.getMonth(), day) === 0;
                    const isSelected = selectedDate === dateStr;
                    const isDisabled = isPast || isSunday;
                    return (
                      <button key={day} disabled={isDisabled}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                          isSelected ? "bg-[var(--gold)] text-black font-bold" :
                          isDisabled ? "text-[var(--foreground)] opacity-15 cursor-not-allowed" :
                          "text-[var(--foreground)] opacity-70 hover:bg-[var(--surface-2)] hover:opacity-100"
                        }`}>
                        {day}
                      </button>
                    );
                  })}
                </div>
                {selectedDate && (
                  <p className="text-center text-xs text-[var(--gold)] mt-3 font-medium">
                    Seleccionado: {new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="secondary" size="lg" onClick={() => setStep(2)} icon={<ArrowLeft size={16} />}>Atrás</Button>
                <Button variant="primary" size="lg" disabled={!selectedDate} onClick={() => setStep(4)} iconRight={<ChevronRight size={16} />}>Continuar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Time */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Selecciona el horario</h2>
              <p className="text-sm text-[var(--foreground)] opacity-50 mb-6">
                {selectedDate && new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
              {getAvailableSlots().length === 0 ? (
                <div className="text-center py-16">
                  <Calendar size={40} className="mx-auto text-[var(--foreground)] opacity-20 mb-4" />
                  <p className="text-[var(--foreground)] opacity-50">No hay horarios disponibles para este día.</p>
                  <Button variant="secondary" size="md" className="mt-4" onClick={() => setStep(3)}>Cambiar fecha</Button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {getAvailableSlots().map((slot) => (
                    <button key={slot} onClick={() => setSelectedTime(slot)}
                      className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                        selectedTime === slot ? "bg-[var(--gold)] text-black border-[var(--gold)] font-bold" : "bg-[var(--surface)] border-[var(--border)] text-[var(--foreground)] opacity-70 hover:border-[var(--gold)]/30 hover:opacity-100"
                      }`}>
                      {slot}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-between">
                <Button variant="secondary" size="lg" onClick={() => setStep(3)} icon={<ArrowLeft size={16} />}>Atrás</Button>
                <Button variant="primary" size="lg" disabled={!selectedTime} onClick={() => setStep(5)} iconRight={<ChevronRight size={16} />}>Continuar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Confirm */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Confirma tu reserva</h2>
              <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)] mb-6">
                <h3 className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase mb-4">Resumen</h3>
                {[
                  { label: "Servicio", value: selectedService?.name },
                  { label: "Barbero", value: selectedBarber?.name },
                  { label: "Fecha", value: selectedDate && new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
                  { label: "Hora", value: selectedTime },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <span className="text-sm text-[var(--foreground)] opacity-50">{label}</span>
                    <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 mt-2">
                  <span className="font-bold text-[var(--foreground)]">Total</span>
                  <span className="text-2xl font-bold text-[var(--gold)]">{selectedService && formatCurrency(selectedService.price)}</span>
                </div>
              </div>
              {!isAuthenticated && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4">
                  <p className="text-sm text-amber-400">
                    <Link href="/login" className="font-bold underline">Inicia sesión</Link> para completar la reserva y acumular puntos.
                  </p>
                </div>
              )}
              <div className="mb-4">
                <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Notas especiales (opcional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Alguna indicación especial para tu barbero..."
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 resize-none focus:border-[var(--gold)]/50 transition-colors" />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary" size="lg" onClick={() => setStep(4)} icon={<ArrowLeft size={16} />}>Atrás</Button>
                <Button variant="primary" size="lg" disabled={!isAuthenticated} onClick={() => setStep(6)} iconRight={<CreditCard size={16} />}>
                  {isAuthenticated ? "Proceder al pago" : "Inicia sesión primero"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Payment */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Pago seguro</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Card preview */}
                <div>
                  <motion.div
                    animate={{ rotateY: cardData.number.length > 0 ? 5 : 0 }}
                    className="relative h-48 rounded-3xl p-6 overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[var(--gold)]/20 shadow-2xl"
                  >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #C9A227 0%, transparent 60%)" }} />
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 overflow-hidden rounded-full">
                          <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                        <span className="text-xs font-bold text-white tracking-widest uppercase">Brickell</span>
                      </div>
                      <CreditCard size={24} className="text-[var(--gold)]" />
                    </div>
                    <p className="text-lg font-mono text-white tracking-widest mb-4">
                      {(cardData.number || "•••• •••• •••• ••••").padEnd(19, "•")}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wide">Titular</p>
                        <p className="text-sm font-medium text-white">{cardData.name || "Tu Nombre"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/40 uppercase tracking-wide">Expira</p>
                        <p className="text-sm font-medium text-white">{cardData.expiry || "MM/AA"}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mt-4 p-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={12} className="text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">Pago 100% seguro y encriptado</span>
                    </div>
                    <p className="text-xs text-[var(--foreground)] opacity-40">
                      Tu información de pago está protegida. No almacenamos datos de tarjeta.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Nombre en la tarjeta</label>
                    <input value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      placeholder="Juan García" className="w-full px-4 py-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Número de tarjeta</label>
                    <input value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                      placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">Expiración</label>
                      <input value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                        placeholder="MM/AA" maxLength={5} className="w-full px-4 py-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--foreground)] opacity-60 uppercase tracking-wide block mb-2">CVV</label>
                      <input value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        placeholder="•••" maxLength={4} type="password" className="w-full px-4 py-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-25 focus:border-[var(--gold)]/50 transition-colors font-mono" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--foreground)]">Total a pagar</span>
                    <span className="text-2xl font-bold text-[var(--gold)]">{selectedService && formatCurrency(selectedService.price)}</span>
                  </div>

                  <Button variant="primary" size="lg" fullWidth loading={loading}
                    disabled={!cardData.name || cardData.number.length < 19 || !cardData.expiry || !cardData.cvv}
                    icon={<Lock size={16} />}
                    onClick={handlePayment}>
                    Confirmar y pagar
                  </Button>
                  <Button variant="ghost" size="md" fullWidth onClick={() => setStep(5)} icon={<ArrowLeft size={14} />}>Volver</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success modal */}
      <Modal isOpen={successModal} onClose={() => { setSuccessModal(false); router.push("/dashboard"); }} size="sm">
        <div className="text-center py-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-black" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">¡Reserva confirmada!</h2>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-2">
            Tu cita con <strong>{selectedBarber?.name}</strong> ha sido confirmada.
          </p>
          <div className="py-4 px-6 bg-[var(--gold-glow)] border border-[var(--gold)]/30 rounded-2xl mb-6">
            <p className="text-sm text-[var(--gold)] font-semibold">🎯 +100 puntos acumulados</p>
            <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">
              {selectedDate} · {selectedTime} · {selectedService?.name}
            </p>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => { setSuccessModal(false); router.push("/dashboard"); }}>
            Ver mis citas
          </Button>
        </div>
      </Modal>
    </div>
  );
}
