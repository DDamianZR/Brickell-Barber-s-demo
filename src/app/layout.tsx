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
            <aside className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 bg-gradient-to-b from-[#0C0D10] to-[#08090C] border-r border-neutral-900 overflow-y-auto shrink-0 select-none">
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] p-0.5 shadow-lg shadow-[var(--gold)]/15">
                    <div className="relative w-full h-full rounded-[14px] bg-[#0E0F12] overflow-hidden flex items-center justify-center">
                      <span className="text-xl font-black text-[var(--gold)] tracking-tighter">B</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-lg font-black tracking-widest text-[var(--foreground)] uppercase block">
                      BRICKELL
                    </span>
                    <span className="text-xs tracking-[0.3em] text-[var(--gold)] uppercase font-semibold leading-none">
                      BARBER'S
                    </span>
                  </div>
                </div>

                <div className="space-y-6 mt-12">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--gold)]/20 bg-[var(--gold-glow)] text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase">
                    Propuesta Digital VIP
                  </span>
                  
                  <h1 className="text-4xl xl:text-5xl font-black leading-tight text-white tracking-tight">
                    Experiencia Móvil <br />
                    <span className="text-gradient-gold">Ultra Premium</span>
                  </h1>
                  
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                    Diseñamos una interfaz táctil optimizada al píxel, fusionando minimalismo elegante con toques de neomorfismo para reflejar la excelencia física de Brickell Barber's en el entorno digital.
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-10 space-y-5">
                  {[
                    { title: "Minimalismo Neomórfico", desc: "Controles volumétricos y relieves táctiles que invitan a interactuar." },
                    { title: "Reserva Inteligente en 3 Clics", desc: "Un flujo ágil optimizado para reservar servicio, barbero y hora en segundos." },
                    { title: "Club VIP & Fidelidad Digital", desc: "Tarjeta digital con sellos acumulativos y simulación de visitas." }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] text-xs font-bold mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-200">{feat.title}</h4>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code & Scan Prompt */}
              <div className="mt-12 pt-8 border-t border-neutral-900 flex items-center gap-6">
                {/* Simulated QR Code SVG */}
                <div className="relative w-24 h-24 bg-white p-2 rounded-xl shrink-0 shadow-lg shadow-black/40 group overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    {/* QR Finder patterns */}
                    <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                    <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                    <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                    
                    {/* Fake data dots */}
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
                  
                  {/* Glowing Laser Scan Bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-[float_2s_ease-in-out_infinite]" />
                </div>
                
                <div>
                  <h5 className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider">Pruébalo en tu Celular</h5>
                  <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">
                    Escanea este código QR o abre la URL en tu celular para ver el rediseño responsivo sin simulador.
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
