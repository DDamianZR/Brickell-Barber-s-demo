import { Barber } from "@/types";

export const barbers: Barber[] = [
  {
    id: "b1",
    name: "Jordan Méndez",
    slug: "jordan",
    photo: "/images/corte-2.png",
    specialties: ["Fade Artístico", "Diseños", "Corte Clásico"],
    bio: "Con más de 8 años de experiencia, Jordan es el fundador y maestro barbero de Brickell Barber's. Su especialidad son los fades de alta precisión y los diseños artísticos que han ganado reconocimiento en la industria.",
    rating: 4.9,
    cuts: 3200,
    experience: "8 años",
    available: true,
    schedule: [
      { day: "Lunes", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Martes", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Miércoles", slots: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
      { day: "Jueves", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Viernes", slots: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"] },
      { day: "Sábado", slots: ["09:00", "10:00", "11:00", "12:00", "13:00"] },
    ],
  },
  {
    id: "b2",
    name: "Miguel Herrera",
    slug: "miguel",
    photo: "/images/corte-4.png",
    specialties: ["Texturizado", "Barba Premium", "Tratamientos"],
    bio: "Miguel es un artista del cabello especializado en técnicas de texturización y tratamientos capilares premium. Su manejo experto de la barba y los tratamientos faciales lo convierten en el favorito de quienes buscan la experiencia completa.",
    rating: 4.8,
    cuts: 2800,
    experience: "6 años",
    available: true,
    schedule: [
      { day: "Lunes", slots: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"] },
      { day: "Martes", slots: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"] },
      { day: "Miércoles", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Jueves", slots: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"] },
      { day: "Viernes", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Sábado", slots: ["10:00", "11:00", "12:00", "13:00", "14:00"] },
    ],
  },
];
