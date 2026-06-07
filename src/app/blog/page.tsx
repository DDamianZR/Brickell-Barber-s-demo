"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blog";

const categories = ["Todos", "Corte", "Consejos", "Barba", "Tendencias"];

export default function BlogPage() {
  const [active, setActive] = useState("Todos");

  const filtered = active === "Todos"
    ? blogPosts
    : blogPosts.filter((post) => post.category === active);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-6 pb-24 px-4 select-none">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 px-1"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <BookOpen size={12} className="text-[var(--gold)]" />
          <span className="text-[9px] font-bold tracking-widest text-[var(--gold)] uppercase">Blog</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-wide">
          El Arte del <span className="text-gradient-gold">Grooming</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Guías y consejos del hombre moderno para mantener su estilo.
        </p>
      </motion.div>

      {/* Category scroll bar */}
      <div className="mb-6 overflow-x-auto scrollbar-none flex gap-2.5 py-1 px-1">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? "neo-concave border border-[var(--gold)]/30 text-[var(--gold)] shadow-inner"
                  : "neo-convex border border-[var(--border)] text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Blog list */}
      <div className="space-y-4 px-1">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="neo-flat rounded-2xl p-4 border border-[var(--border)] flex gap-4"
            >
              {/* Post Thumbnail */}
              <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-1.5 py-0.5 rounded-md bg-[var(--gold)]/5 border border-[var(--gold)]/20 text-[8px] text-[var(--gold)] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-[8px] text-neutral-500 font-bold uppercase tracking-wider">
                      <Clock size={9} />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xs text-white truncate mt-1.5">{post.title}</h3>
                  <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-900/40">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase">{post.author}</span>
                  
                  <button className="flex items-center gap-1 text-[9px] font-bold text-[var(--gold)] hover:translate-x-0.5 transition-transform bg-transparent border-0 active:scale-95">
                    Leer artículo <ArrowRight size={10} />
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
