import Link from "next/link";
import Image from "next/image";
import { Share2, Globe, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[var(--gold)]/30">
                <Image src="/images/logo.jpg" alt="Brickell Barber's" fill className="object-cover scale-110" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest text-[var(--foreground)] uppercase block">Brickell</span>
                <span className="text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase font-medium">Barber&apos;s</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--foreground)] opacity-50 leading-relaxed mb-6">
              Más que un corte. Una experiencia premium diseñada para el hombre moderno que exige excelencia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--gold)] hover:text-black transition-all group">
                <Share2 size={16} className="text-[var(--foreground)] opacity-60 group-hover:opacity-100 group-hover:text-black" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--gold)] hover:text-black transition-all group">
                <Globe size={16} className="text-[var(--foreground)] opacity-60 group-hover:opacity-100 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase mb-4">Servicios</h4>
            <ul className="space-y-2">
              {["Corte Premium", "Corte + Barba", "Fade Artístico", "Texturizado", "Tratamiento Capilar"].map((s) => (
                <li key={s}>
                  <Link href="/servicios" className="text-sm text-[var(--foreground)] opacity-50 hover:opacity-100 hover:text-[var(--gold)] transition-all">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: "/barberos", label: "Nuestros Barberos" },
                { href: "/tienda", label: "Tienda" },
                { href: "/blog", label: "Blog" },
                { href: "/reservar", label: "Reservar Cita" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--foreground)] opacity-50 hover:opacity-100 hover:text-[var(--gold)] transition-all">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--foreground)] opacity-50">Brickell Ave, Miami, FL 33131</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-sm text-[var(--foreground)] opacity-50">+52 55 2181 8886</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-sm text-[var(--foreground)] opacity-50">hola@brickellbarbers.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-[var(--foreground)] opacity-50">
                  <p>Lun – Vie: 9am – 7pm</p>
                  <p>Sáb: 9am – 4pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--foreground)] opacity-30">
            © 2026 Brickell Barber&apos;s. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((t) => (
              <span key={t} className="text-xs text-[var(--foreground)] opacity-30 cursor-pointer hover:opacity-60 transition-opacity">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
