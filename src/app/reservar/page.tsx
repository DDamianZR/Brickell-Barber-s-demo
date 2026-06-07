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
import { playHapticClick, playHapticSuccess } from "@/lib/haptics";

const STEPS = ["Servicio", "Barbero", "Fecha", "Horario", "Confirmar", "Pago"];

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
  
  // Card Flip State
  const [isFlipped, setIsFlipped] = useState(false);

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
    // Add timezone adjustment offset
    const dayIndex = date.getUTCDay();
    const dayName = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][dayIndex];
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
    playHapticSuccess();
    setSuccessModal(true);
  };

  const today = new Date();
  const daysInMonth = getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth());
  const firstDayOffset = getDayOfWeek(calendarDate.getFullYear(), calendarDate.getMonth(), 1);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Header Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Reserva</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          Agenda tu <span className="text-gradient-gold">Cita</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2">Sigue los pasos para agendar tu servicio VIP.</p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="mb-7">
        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest mb-2.5">
          <span className="text-neutral-300">Paso {step}: <span style={{ color: "var(--gold)" }}>{STEPS[step - 1]}</span></span>
          <span style={{ color: "var(--gold)" }}>{Math.round((step / STEPS.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--surface-dark)", boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.6), inset -2px -2px 4px rgba(255,255,255,0.01)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / STEPS.length) * 100}%` }}
            transition={{ duration: 0.35 }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--gold), var(--red-accent))", boxShadow: "0 0 8px rgba(0,200,255,0.5)" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Service Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Selecciona tu servicio</h2>
            
            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
              {services.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <motion.div
                    key={service.id}
                    onClick={() => { playHapticClick(); setSelectedServiceId(service.id); }}
                    whileTap={{ scale: 0.99 }}
                    className="p-4 rounded-2xl cursor-pointer select-none transition-all"
                    style={isSelected ? {
                      background: "linear-gradient(135deg, rgba(0,200,255,0.06), rgba(255,17,51,0.04))",
                      border: "1px solid rgba(0,200,255,0.35)",
                      boxShadow: "0 0 18px rgba(0,200,255,0.12), inset 4px 4px 8px rgba(0,0,0,0.5)"
                    } : {
                      background: "var(--surface)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.012)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <h3 className="font-bold text-sm text-white leading-tight">
                        {service.name}
                      </h3>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "var(--gold)", boxShadow: "0 0 10px rgba(0,200,255,0.5)" }}>
                          <Check size={12} className="text-black stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full shrink-0"
                          style={{ border: "1.5px solid rgba(255,255,255,0.15)" }} />
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">{service.description}</p>

                    <div className="flex items-center justify-between pt-2.5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-medium">
                        <Clock size={11} />
                        <span>{service.duration} min</span>
                      </div>
                      <span className="text-base font-black" style={{ color: "var(--gold)" }}>
                        ${service.price}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" disabled={!selectedServiceId} onClick={() => { playHapticClick(); setStep(2); }} iconRight={<ChevronRight size={14} />} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Barber Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Selecciona tu barbero</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {barbers.map((barber) => {
                const isSelected = selectedBarberId === barber.id;
                return (
                  <motion.div
                    key={barber.id}
                    onClick={() => { playHapticClick(); setSelectedBarberId(barber.id); }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-2xl overflow-hidden cursor-pointer select-none flex flex-col justify-between transition-all"
                    style={isSelected ? {
                      background: "linear-gradient(135deg, rgba(0,200,255,0.06), rgba(255,17,51,0.04))",
                      border: "1px solid rgba(0,200,255,0.4)",
                      boxShadow: "0 0 18px rgba(0,200,255,0.15)"
                    } : {
                      background: "var(--surface)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.012)"
                    }}
                  >
                    <div className="relative h-40 w-full">
                      <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-transparent" />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "var(--gold)", boxShadow: "0 0 12px rgba(0,200,255,0.6)" }}>
                          <Check size={13} className="text-black stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="p-3.5">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="font-bold text-sm text-white">
                          {barber.name.split(" ")[0]}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star size={11} className="text-[var(--gold)] fill-[var(--gold)]" />
                          <span className="text-[11px] font-bold text-white">{barber.rating}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                        {barber.experience} exp.
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="pt-2 flex justify-between">
              <Button variant="secondary" size="md" onClick={() => { playHapticClick(); setStep(1); }} icon={<ArrowLeft size={14} />} className="!rounded-xl neo-btn border-0 text-white">
                Atrás
              </Button>
              <Button variant="primary" size="md" disabled={!selectedBarberId} onClick={() => { playHapticClick(); setStep(3); }} iconRight={<ChevronRight size={14} />} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Date Calendar */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Selecciona la fecha</h2>
            
            <div className="neo-flat rounded-3xl p-4 border border-[var(--border)] w-full max-w-sm mx-auto">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => { playHapticClick(); const d = new Date(calendarDate); d.setMonth(d.getMonth() - 1); setCalendarDate(d); }}
                  className="p-1.5 rounded-xl neo-btn flex items-center justify-center text-xs font-bold text-neutral-400 active:scale-90 cursor-pointer"
                >
                  ‹
                </button>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                </span>
                <button
                  onClick={() => { playHapticClick(); const d = new Date(calendarDate); d.setMonth(d.getMonth() + 1); setCalendarDate(d); }}
                  className="p-1.5 rounded-xl neo-btn flex items-center justify-center text-xs font-bold text-neutral-400 active:scale-90 cursor-pointer"
                >
                  ›
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2 text-center">
                {dayNames.map((d) => (
                  <span key={d} className="text-[9px] font-bold text-neutral-500 uppercase py-1">{d}</span>
                ))}
              </div>

              {/* Day Grid cells */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isPast = new Date(dateStr) < new Date(today.toDateString());
                  const isSunday = getDayOfWeek(calendarDate.getFullYear(), calendarDate.getMonth(), day) === 0;
                  const isSelected = selectedDate === dateStr;
                  const isDisabled = isPast || isSunday;
                  
                  return (
                    <button
                      key={day}
                      disabled={isDisabled}
                      onClick={() => { playHapticClick(); setSelectedDate(dateStr); }}
                      className="aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all cursor-pointer active:scale-90 disabled:cursor-not-allowed"
                      style={isSelected ? {
                        background: "var(--gold)",
                        color: "black",
                        boxShadow: "0 0 14px rgba(0,200,255,0.45)",
                        border: "1px solid rgba(0,200,255,0.6)"
                      } : isDisabled ? {
                        opacity: 0.18,
                        color: "var(--foreground)"
                      } : {
                        background: "var(--surface)",
                        color: "var(--foreground)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        boxShadow: "3px 3px 6px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.01)"
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <p className="text-center text-[10px] text-[var(--gold)] mt-4 font-bold uppercase tracking-wider">
                  {new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })}
                </p>
              )}
            </div>
            
            <div className="pt-2 flex justify-between">
              <Button variant="secondary" size="md" onClick={() => { playHapticClick(); setStep(2); }} icon={<ArrowLeft size={14} />} className="!rounded-xl neo-btn border-0 text-white">
                Atrás
              </Button>
              <Button variant="primary" size="md" disabled={!selectedDate} onClick={() => { playHapticClick(); setStep(4); }} iconRight={<ChevronRight size={14} />} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Time Selection */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Selecciona el horario</h2>
              <p className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider mt-1">
                {selectedDate && new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>

            {getAvailableSlots().length === 0 ? (
              <div className="text-center py-10 neo-flat rounded-2xl p-4 border border-[var(--border)]">
                <Calendar size={32} className="mx-auto text-neutral-600 mb-3" />
                <p className="text-xs text-neutral-400">No hay horarios disponibles para este día.</p>
                <Button variant="secondary" size="sm" className="mt-3 !rounded-xl" onClick={() => { playHapticClick(); setStep(3); }}>Cambiar fecha</Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-[360px] overflow-y-auto pr-1 py-1">
                {getAvailableSlots().map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => { playHapticClick(); setSelectedTime(slot); }}
                      className="py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer active:scale-95"
                      style={isSelected ? {
                        background: "var(--gold)",
                        color: "black",
                        boxShadow: "0 0 16px rgba(0,200,255,0.4)",
                        border: "1px solid rgba(0,200,255,0.6)"
                      } : {
                        background: "var(--surface)",
                        color: "var(--foreground)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        boxShadow: "3px 3px 8px rgba(0,0,0,0.55), -3px -3px 8px rgba(255,255,255,0.01)"
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
            
            <div className="pt-2 flex justify-between">
              <Button variant="secondary" size="md" onClick={() => { playHapticClick(); setStep(3); }} icon={<ArrowLeft size={14} />} className="!rounded-xl neo-btn border-0 text-white">
                Atrás
              </Button>
              <Button variant="primary" size="md" disabled={!selectedTime} onClick={() => { playHapticClick(); setStep(5); }} iconRight={<ChevronRight size={14} />} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Confirm Summary */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Confirma tu reserva</h2>
            
            <div className="neo-flat rounded-3xl p-5 border border-[var(--border)] relative overflow-hidden">
              <span className="text-[9px] font-black text-[var(--gold)] tracking-widest uppercase block mb-3 border-b border-neutral-900 pb-2">
                Resumen de Cita
              </span>
              
              <div className="space-y-3">
                {[
                  { label: "Servicio", val: selectedService?.name },
                  { label: "Barbero", val: selectedBarber?.name },
                  { label: "Fecha", val: selectedDate && new Date(selectedDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) },
                  { label: "Horario", val: selectedTime },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-neutral-900/30 last:border-0">
                    <span className="text-[10px] text-neutral-500 uppercase">{item.label}</span>
                    <span className="text-xs font-bold text-white">{item.val}</span>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-3 mt-1">
                  <span className="text-xs font-bold text-white uppercase">Total</span>
                  <span className="text-lg font-black text-[var(--gold)]">
                    {selectedService && formatCurrency(selectedService.price)}
                  </span>
                </div>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-[10px] text-amber-400 leading-normal">
                  <Link href="/login" className="font-bold underline">Inicia sesión</Link> para poder completar tu pago y acumular tus sellos VIP.
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">Notas especiales (opcional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2.5}
                placeholder="Indica si tienes alergias, cabello delicado o indicaciones..."
                className="w-full px-4 py-3 neo-input text-xs rounded-xl text-white placeholder:text-neutral-600 resize-none"
              />
            </div>
            
            <div className="pt-2 flex justify-between">
              <Button variant="secondary" size="md" onClick={() => { playHapticClick(); setStep(4); }} icon={<ArrowLeft size={14} />} className="!rounded-xl neo-btn border-0 text-white">
                Atrás
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={!isAuthenticated}
                onClick={() => { playHapticClick(); setStep(6); }}
                iconRight={<CreditCard size={14} />}
                className="!rounded-xl font-bold bg-[var(--gold)] text-black"
              >
                {isAuthenticated ? "Pagar Cita" : "Inicia sesión"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Payment Pass */}
        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="space-y-4"
          >
            <h2 className="text-base font-bold uppercase tracking-[0.15em] text-neutral-300">Pago seguro</h2>
            
            {/* 3D Credit Card Flip Showcase */}
            <div className="perspective-1000 w-full h-44 relative mb-4">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full relative preserve-3d"
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl p-5 bg-gradient-to-br from-[#1B1D22] to-[#0D0E10] border border-white/5 shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center border border-[var(--gold)]/20">
                        <span className="text-[10px] font-black text-[var(--gold)]">B</span>
                      </div>
                      <span className="text-[9px] font-bold text-white tracking-widest">BRICKELL VIP</span>
                    </div>
                    <CreditCard size={20} className="text-[var(--gold)]" />
                  </div>
                  
                  <p className="text-sm font-mono text-white tracking-widest my-3 text-center">
                    {cardData.number || "•••• •••• •••• ••••"}
                  </p>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] text-neutral-500 uppercase block">Titular</span>
                      <p className="text-[11px] font-bold text-neutral-200 truncate max-w-[140px]">
                        {cardData.name || "Tu Nombre"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] text-neutral-500 uppercase block">Expira</span>
                      <p className="text-[11px] font-bold text-neutral-200">
                        {cardData.expiry || "MM/AA"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] w-full h-full rounded-2xl bg-gradient-to-br from-[#1B1D22] to-[#0D0E10] border border-white/5 shadow-xl flex flex-col justify-between py-4">
                  <div className="w-full h-8 bg-black/80 mt-2" />
                  
                  <div className="px-5 flex items-center justify-between mt-4">
                    <div className="flex-1 h-7 bg-neutral-800 rounded px-2 flex items-center justify-end">
                      <span className="text-[9px] font-mono text-neutral-500 italic">Signature</span>
                    </div>
                    <div className="w-12 h-7 bg-white text-black flex items-center justify-center font-mono font-bold text-xs rounded-r">
                      {cardData.cvv || "•••"}
                    </div>
                  </div>
                  
                  <div className="px-5 text-right mt-2">
                    <span className="text-[7px] text-neutral-500 uppercase tracking-widest">Premium Card</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">Titular de la tarjeta</label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  placeholder="Juan García"
                  onFocus={() => setIsFlipped(false)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600"
                />
              </div>
              
              <div>
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onFocus={() => setIsFlipped(false)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600 font-mono tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">Vencimiento</label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                    placeholder="MM/AA"
                    maxLength={5}
                    onFocus={() => setIsFlipped(false)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide block mb-1">CVV</label>
                  <input
                    type="password"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                    placeholder="•••"
                    maxLength={3}
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-input text-white placeholder:text-neutral-600 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-950 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">Monto Total</span>
                <span className="text-xl font-black text-[var(--gold)]">
                  {selectedService && formatCurrency(selectedService.price)}
                </span>
              </div>
              
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={loading}
                  disabled={!cardData.name || cardData.number.length < 19 || !cardData.expiry || cardData.cvv.length < 3}
                  icon={<Lock size={13} />}
                  onClick={() => { playHapticClick(); handlePayment(); }}
                  className="!rounded-xl font-bold bg-[var(--gold)] text-black"
                >
                  Confirmar y Pagar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => { playHapticClick(); setStep(5); }}
                  icon={<ArrowLeft size={12} />}
                  className="!text-neutral-500 !bg-transparent text-xs"
                >
                  Volver al resumen
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <Modal isOpen={successModal} onClose={() => { playHapticClick(); setSuccessModal(false); router.push("/dashboard"); }} size="sm">
        <div className="text-center py-3 select-none">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-black" />
          </motion.div>
          <h2 className="text-xl font-black text-white mb-1.5">¡Cita Confirmada!</h2>
          <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed">
            Tu cita con <strong>{selectedBarber?.name}</strong> está lista. Te esperamos.
          </p>
          
          <div className="py-3 px-4 bg-[var(--gold-glow)] border border-[var(--gold)]/20 rounded-2xl mb-5 text-center">
            <p className="text-xs text-[var(--gold)] font-bold">🎯 +100 Puntos Acumulados</p>
            <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider font-semibold">
              {selectedDate} · {selectedTime}
            </p>
          </div>
          
          <Button variant="primary" size="md" fullWidth onClick={() => { playHapticClick(); setSuccessModal(false); router.push("/dashboard"); }} className="!rounded-xl font-bold bg-[var(--gold)] text-black">
            Ver mis citas
          </Button>
        </div>
      </Modal>
    </div>
  );
}
