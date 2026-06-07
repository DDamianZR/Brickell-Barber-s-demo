export type UserRole = "client" | "barber" | "admin";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type LoyaltyLevel = "Silver" | "Gold" | "Black";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  points: number;
  level: LoyaltyLevel;
  createdAt: string;
  appointments: string[];
}

export interface Barber {
  id: string;
  name: string;
  slug: string;
  photo: string;
  specialties: string[];
  bio: string;
  rating: number;
  cuts: number;
  experience: string;
  available: boolean;
  schedule: DaySchedule[];
}

export interface DaySchedule {
  day: string;
  slots: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface BookingStep {
  id: number;
  title: string;
  completed: boolean;
}
