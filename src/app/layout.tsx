import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileTabBar from "@/components/layout/MobileTabBar";
import PageTransitionEffect from "@/components/layout/PageTransitionEffect";
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
  title: "Brickell Barber's | Premium Mobile Experience",
  description: "Más que un corte. Una experiencia premium. El barbershop más exclusivo de Miami rediseñado para móviles.",
  keywords: ["barbershop", "barbería premium", "Miami", "cortes", "fade", "Brickell"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`} data-theme="dark" suppressHydrationWarning>
      <body className="h-full min-h-screen bg-[#07080A] text-white antialiased overflow-x-hidden font-sans">
        <ThemeProvider>
          {/* Main Layout Wrapper */}
          <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#07080A]">
            
            {/* 1. Presentation Sidebar - Desktop Only */}
            <aside className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-10 xl:p-12 overflow-y-auto shrink-0 select-none relative"
              style={{ background: "linear-gradient(160deg, #0A0C10 0%, #070A0D 60%, #09080D 100%)", borderRight: "1px solid rgba(0,200,255,0.07)" }}>

              {/* Ambient glow decorations */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[140px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-[120px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,17,51,0.05) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                {/* Brand */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden shrink-0"
                    style={{ border: "1px solid rgba(0,200,255,0.2)", boxShadow: "0 0 12px rgba(0,200,255,0.08)" }}>
                    <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-base font-black tracking-widest text-white uppercase block leading-none">
                      BRICKELL
                    </span>
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase leading-none"
                      style={{ color: "var(--gold)" }}>
                      BARBER'S
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{ border: "1px solid rgba(0,200,255,0.2)", background: "rgba(0,200,255,0.06)", color: "var(--gold)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                    Propuesta Digital VIP
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl xl:text-5xl font-black leading-[1.08] text-white mb-5">
                  Diseño<br />
                  <span className="text-gradient-gold">Ultra Premium</span><br />
                  para Móvil
                </h1>

                <p className="text-sm text-neutral-500 leading-relaxed max-w-sm mb-10">
                  Interfaz táctil de precisión con estética neon-noir, optimizada para la experiencia Brickell.
                </p>

                {/* Features */}
                <div className="space-y-5">
                  {[
                    { title: "Neomorfismo Oscuro", desc: "Relieves táctiles sobre fondos profundos que invitan a interactuar.", icon: "◆" },
                    { title: "Reserva en 3 Clics", desc: "Flujo optimizado para elegir servicio, barbero y hora al instante.", icon: "◆" },
                    { title: "Club VIP Digital", desc: "Tarjeta de sellos y puntos acumulables con beneficios premium.", icon: "◆" }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-3.5 group">
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 shrink-0 text-[8px]"
                        style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)", color: "var(--gold)" }}>
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-200">{feat.title}</h4>
                        <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code & footer */}
              <div className="relative z-10 mt-10 pt-7 flex items-center gap-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="relative w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 overflow-hidden"
                  style={{ boxShadow: "0 0 16px rgba(0,200,255,0.15)" }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                    <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                    <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                    <rect x="40" y="5" width="10" height="10" fill="currentColor" />
                    <rect x="55" y="10" width="5" height="15" fill="currentColor" />
                    <rect x="45" y="25" width="15" height="5" fill="currentColor" />
                    <rect x="35" y="40" width="30" height="30" fill="currentColor" />
                    <rect x="40" y="45" width="20" height="20" fill="white" />
                    <rect x="80" y="40" width="15" height="15" fill="currentColor" />
                    <rect x="75" y="65" width="20" height="10" fill="currentColor" />
                    <rect x="40" y="80" width="10" height="15" fill="currentColor" />
                    <rect x="55" y="85" width="15" height="5" fill="currentColor" />
                    <rect x="85" y="85" width="10" height="10" fill="currentColor" />
                  </svg>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--gold)] animate-[float_2s_ease-in-out_infinite]"
                    style={{ boxShadow: "0 0 6px var(--gold)" }} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>
                    Escanea en tu celular
                  </h5>
                  <p className="text-[10px] text-neutral-600 leading-relaxed">
                    Abre la URL en tu móvil para ver la experiencia real sin simulador.
                  </p>
                </div>
              </div>
            </aside>

            {/* 2. Interactive Phone Viewport (Right Column on Desktop, Full screen on Mobile) */}
            <main className="flex-1 flex items-center justify-center bg-[#07080A] lg:bg-[#07080A]/40 p-0 lg:p-6 overflow-hidden">
              
              {/* iPhone 16 Pro Style Bezel Frame - Desktop Only styling, expands on mobile */}
              <div className="w-full h-full lg:w-[393px] lg:h-[844px] lg:rounded-[44px] lg:border-[10px] lg:border-neutral-900 lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] lg:relative lg:overflow-hidden lg:flex lg:flex-col lg:bg-[#090A0C]">
                
                {/* Dynamic Island Screen Cutout - Desktop Only */}
                <div className="hidden lg:block absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6.5 bg-black rounded-full z-50 border border-neutral-900/50" />
                
                {/* Content Container (Acts as the mobile screen) */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative pb-20 select-text">
                  
                  {/* Mobile header (top bar navigation) */}
                  <MobileHeader />

                  {/* Page contents (Children render here) */}
                  <div className="flex-1 w-full bg-[var(--background)]">
                    <PageTransitionEffect>
                      {children}
                    </PageTransitionEffect>
                  </div>

                  {/* Mobile tab bar (bottom navigation) */}
                  <MobileTabBar />
                </div>
              </div>
            </main>
          </div>

          {/* Core modals and utilities (absolute panels) */}
          <CartDrawer />
          <NotificationPanel />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
