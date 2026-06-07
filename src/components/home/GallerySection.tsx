"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn, Images } from "lucide-react";

const galleryImages = [
  { src: "/images/corte-1.png", title: "Corte Clásico Elevado", tag: "Corte" },
  { src: "/images/corte-2.png", title: "Fade Artístico", tag: "Arte" },
  { src: "/images/corte-3.png", title: "Precision Fade", tag: "Fade" },
  { src: "/images/corte-4.png", title: "Textura Premium", tag: "Texturizado" },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-10 bg-[var(--background)] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 px-1"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Images size={11} className="text-[var(--gold)]" />
            <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Galería</span>
          </div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-wide">
            Nuestros <span className="text-gradient-gold">Resultados</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Cada corte es una obra única. Explora trabajos reales.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden border border-[var(--border)] cursor-pointer"
              style={{ marginBottom: "1rem" }}
              onClick={() => setSelected(i)}
            >
              <div className={`relative ${i % 3 === 0 ? "h-72" : "h-52"} overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)] flex items-center justify-center">
                    <ZoomIn size={20} className="text-black" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] font-medium text-[var(--gold)] uppercase tracking-widest block mb-1">{img.tag}</span>
                  <p className="text-sm font-semibold text-white">{img.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--gold)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selected].src}
                alt={galleryImages[selected].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Badge className="mb-2">{galleryImages[selected].tag}</Badge>
                <p className="text-lg font-bold text-white">{galleryImages[selected].title}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/30 text-[var(--gold)] text-[10px] font-medium uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}
