"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioTheme } from "@/lib/portfolioThemes";

export default function ThemeCard({ theme, index }: { theme: PortfolioTheme; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_24px_80px_rgba(30,16,22,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_30px_110px_rgba(30,16,22,0.18)]"
    >
      <Link href={`/${theme.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
            style={{ backgroundImage: `url(${theme.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a14]/70 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 flex gap-1.5">
            {theme.palette.map((color) => (
              <span
                key={color}
                className="h-2.5 w-2.5 rounded-full ring-2 ring-white/70"
                style={{ background: color }}
              />
            ))}
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/80">{theme.location}</p>
            <h3 className="font-serif text-3xl">{theme.name}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
            {theme.couple}
          </p>
          <p className="mt-3 font-serif text-xl text-neutral-800">{theme.tagline}</p>
          <p className="mt-3 text-sm leading-7 text-neutral-600">{theme.shortDescription}</p>
          <span
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white shadow-md transition group-hover:gap-3"
            style={{ background: theme.accent === "#ffffff" ? "#111111" : theme.accent }}
          >
            View Sample <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
