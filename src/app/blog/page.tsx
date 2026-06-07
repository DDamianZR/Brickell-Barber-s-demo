"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Badge from "@/components/ui/Badge";

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow)] mb-6">
              <BookOpen size={12} className="text-[var(--gold)]" />
              <span className="text-xs font-medium text-[var(--gold)] tracking-widest uppercase">Blog</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[var(--foreground)] mb-4">
              El arte del <span className="text-gradient-gold">grooming</span>
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-50 max-w-xl mx-auto">
              Consejos, tendencias y guías para el hombre moderno que cuida su imagen.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="group mb-10 bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300 cursor-pointer">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--surface)] hidden lg:block" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="gold">{featured.category}</Badge>
                <span className="text-xs text-[var(--foreground)] opacity-40">Destacado</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm text-[var(--foreground)] opacity-60 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--foreground)] opacity-40">
                <span>{featured.author}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{featured.readTime} min lectura</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rest */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post, i) => (
            <motion.div key={post.id}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all duration-300 cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="sm">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--foreground)] opacity-50 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[var(--foreground)] opacity-40">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--gold)] text-xs font-medium group-hover:gap-2 transition-all">
                    Leer <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
