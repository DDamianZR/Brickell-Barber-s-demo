import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ToastContainer from "@/components/ui/Toast";
import CartDrawer from "@/components/layout/CartDrawer";
import NotificationPanel from "@/components/layout/NotificationPanel";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brickell Barber's | Premium Barbershop Experience",
  description: "Más que un corte. Una experiencia premium. El barbershop más exclusivo de Miami con cortes de precisión y tratamientos de alto nivel.",
  keywords: ["barbershop", "barbería premium", "Miami", "cortes", "fade", "Brickell"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`} data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
          <NotificationPanel />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
