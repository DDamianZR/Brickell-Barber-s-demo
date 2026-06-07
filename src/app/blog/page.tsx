"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

const categories = ["Todos", "Corte", "Consejos", "Barba", "Tendencias"];

export default function BlogPage() {
  const [active, setActive] = useState("Todos");

  const filtered = active === "Todos"
    ? blogPosts
    : blogPosts.filter((post) => post.category === active);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-24 px-5 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[var(--gold)]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase">Blog</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-[1.1]">
          El Arte del <span className="text-gradient-gold">Grooming</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed max-w-xs">
          Guías y consejos para mantener tu estilo.
        </p>
      </motion.div>

      {/* Category Pills */}
      <div className="mb-7 -mx-5 px-5 overflow-x-auto scrollbar-none flex gap-2 py-1">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "bg-[var(--gold)] text-black shadow-[0_0_18px_rgba(0,200,255,0.3)]"
                  : "text-neutral-400 border border-[var(--border)] hover:text-white hover:border-[var(--gold)]/30"
              }`}
              style={!isActive ? { background: "var(--surface)" } : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Blog Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl p-4 flex gap-4 cursor-pointer active:scale-[0.99] transition-transform"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "5px 5px 12px rgba(0,0,0,0.55), -5px -5px 12px rgba(255,255,255,0.012)"
              }}
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                <Image src={post.image} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: "rgba(0,200,255,0.05)",
                        border: "1px solid rgba(0,200,255,0.18)",
                        color: "var(--gold)"
                      }}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium">
                      <Clock size={10} />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white leading-tight">{post.title}</h3>
                  <p className="text-[11px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide">{post.author}</span>
                  <button className="flex items-center gap-1 text-[11px] font-bold cursor-pointer active:translate-x-0.5 transition-transform"
                    style={{ color: "var(--gold)" }}>
                    Leer <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
