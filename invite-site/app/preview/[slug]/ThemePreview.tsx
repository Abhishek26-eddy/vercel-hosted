"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart, MapPin, Calendar, Clock, Sparkles, Music,
  ArrowRight, MessageCircle, Star, Camera, Gift,
} from "lucide-react";
import type { PortfolioTheme } from "@/lib/portfolioThemes";
import { BRAND } from "@/lib/portfolioThemes";

/* ── Helpers ──────────────────────────────────────────────── */
const fadeUp = (d: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: d } },
});

function isDarkBg(hex: string) {
  const c = hex.replace("#", "");
  const rgb = c.match(/.{2}/g)?.map((h) => parseInt(h, 16)) || [0, 0, 0];
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 < 128;
}

/* ── Sample data ──────────────────────────────────────────── */
const SAMPLE_EVENTS = [
  { name: "Haldi", date: "2025-02-14", time: "10:00 AM" },
  { name: "Mehendi", date: "2025-02-14", time: "4:00 PM" },
  { name: "Sangeet", date: "2025-02-15", time: "7:00 PM" },
  { name: "Wedding", date: "2025-02-16", time: "11:00 AM" },
  { name: "Reception", date: "2025-02-16", time: "7:00 PM" },
];

const SAMPLE_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80",
];

/* ═══════════════════════════════════════════════════════════
   ThemePreview — universal preview for any theme
   ═══════════════════════════════════════════════════════════ */
export default function ThemePreview({ theme }: { theme: PortfolioTheme }) {
  const dark = isDarkBg(theme.background);
  const bg = theme.background;
  const accent = theme.accent;
  const ink = dark ? "#faf8f5" : "#1a1816";
  const body = dark ? "rgba(255,255,255,0.7)" : "#57504a";
  const muted = dark ? "rgba(255,255,255,0.45)" : "#9a9189";
  const surface = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.025)";
  const line = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";

  const couple = theme.couple || "Aarav & Meera";
  const [groom, bride] = couple.includes("&") ? couple.split("&").map((s) => s.trim()) : [couple, ""];
  const location = theme.location || "Udaipur, Rajasthan";
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20the%20${encodeURIComponent(theme.name)}%20invitation.`;

  return (
    <div className="min-h-screen" style={{ background: bg, color: ink }}>
      {/* ─── Top bar ─── */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-xl" style={{ background: `${bg}E0`, borderBottom: `1px solid ${line}` }}>
        <Link href="/" className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: muted }}>
          ← Back to collection
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full px-2.5 py-1 text-[8px] font-bold tracking-[0.15em] uppercase" style={{ background: `${accent}20`, color: accent }}>
            {theme.tier} · Preview
          </span>
        </div>
        <Link href={`/builder?template=${theme.slug}`}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-wide"
          style={{ background: accent, color: "white" }}
        >
          Use This Design <ArrowRight size={10} />
        </Link>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <motion.div className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${theme.image})` }}
          initial={{ scale: 1.1 }} animate={{ scale: 1.05 }} transition={{ duration: 12, ease: "easeOut" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, ${bg}F0 100%)` }} />

        {/* Dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${accent} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <motion.div {...fadeUp(0.2)} className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 backdrop-blur-md" style={{ borderColor: `${accent}60`, background: "rgba(255,255,255,0.08)" }}>
            <Heart size={22} style={{ color: accent }} />
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="text-[9px] font-semibold uppercase tracking-[0.55em]" style={{ color: accent }}>
            Together With Their Families
          </motion.p>

          <motion.h1 {...fadeUp(0.6)} className="mt-6 font-serif leading-[1]" style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            {groom}
          </motion.h1>
          <motion.span {...fadeUp(0.7)} className="my-3 block font-serif italic" style={{ color: accent, fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>&amp;</motion.span>
          <motion.h1 {...fadeUp(0.8)} className="font-serif leading-[1]" style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            {bride}
          </motion.h1>

          <motion.div {...fadeUp(1)} className="mt-10 flex items-center gap-3">
            <span className="h-px w-12" style={{ background: accent }} />
            <Sparkles size={12} style={{ color: accent }} />
            <span className="h-px w-12" style={{ background: accent }} />
          </motion.div>

          <motion.p {...fadeUp(1.1)} className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-white/80">
            Saturday, 16 February 2025
          </motion.p>
          <motion.p {...fadeUp(1.2)} className="mt-2 flex items-center gap-1.5 text-[11px] text-white/55">
            <MapPin size={10} /> {location}
          </motion.p>

          <motion.div {...fadeUp(1.4)} className="mt-10">
            <div className="animate-bounce text-white/40">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COUNTDOWN ─── */}
      <section className="px-6 py-16 text-center" style={{ background: surface }}>
        <motion.div {...fadeUp(0)}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Counting Down To</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: ink }}>The Big Day</h2>
          <div className="mt-8 flex justify-center gap-4 sm:gap-6">
            {[
              { n: "128", l: "Days" }, { n: "14", l: "Hours" }, { n: "32", l: "Minutes" }, { n: "08", l: "Seconds" },
            ].map((u) => (
              <div key={u.l} className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: accent }}>{u.n}</span>
                <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.3em]" style={{ color: muted }}>{u.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="px-6 py-16 sm:px-10" style={{ background: bg }}>
        <motion.div {...fadeUp(0)} className="mx-auto max-w-lg text-center">
          <Heart size={20} className="mx-auto mb-4" style={{ color: accent }} />
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Our Story</p>
          <p className="mx-auto mt-5 font-serif text-xl sm:text-2xl italic leading-relaxed" style={{ color: ink }}>
            &ldquo;From a chance meeting to forever — two souls destined to write their story together in the stars.&rdquo;
          </p>
          <div className="mx-auto mt-8 h-px w-20" style={{ background: accent }} />
        </motion.div>
      </section>

      {/* ─── EVENTS ─── */}
      <section className="relative overflow-hidden px-6 py-16 sm:px-10" style={{ background: dark ? surface : "#0d0b0a" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${accent} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Celebrations</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: dark ? ink : "#faf8f5" }}>Wedding Festivities</h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {SAMPLE_EVENTS.map((e, i) => (
              <motion.div key={e.name} {...fadeUp(i * 0.1)}
                className="rounded-2xl border p-5 backdrop-blur"
                style={{ borderColor: `${accent}40`, background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${accent}20` }}>
                    <Calendar size={14} style={{ color: accent }} />
                  </div>
                  <h3 className="font-serif text-lg" style={{ color: dark ? ink : "#faf8f5" }}>{e.name}</h3>
                </div>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: accent }}>
                  {new Date(e.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })} · {e.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="px-6 py-16 sm:px-10" style={{ background: bg }}>
        <div className="mb-10 text-center">
          <Camera size={20} className="mx-auto mb-3" style={{ color: accent }} />
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Gallery</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: ink }}>Captured Moments</h2>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {SAMPLE_GALLERY.map((src, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}
              className="overflow-hidden rounded-xl sm:rounded-2xl"
              style={{ border: `1px solid ${line}` }}
            >
              <div className="aspect-square bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${src})` }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── VENUE ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})`, filter: "brightness(0.35)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
        <div className="relative z-10 flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>The Venue</p>
          <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-white">{location.split(",")[0] || "Grand Venue"}</h3>
          <p className="mt-2 text-[11px] text-white/50">{location}</p>
          <div className="mt-5 rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: accent, color: accent }}>
            <MapPin size={10} className="mr-1 inline" /> Open in Maps
          </div>
        </div>
      </section>

      {/* ─── RSVP ─── */}
      <section className="px-6 py-16 text-center sm:px-10" style={{ background: dark ? surface : "#0d0b0a" }}>
        <Gift size={20} className="mx-auto mb-3" style={{ color: accent }} />
        <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>RSVP</p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: dark ? ink : "#faf8f5" }}>We&apos;d be honoured.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[12px] leading-relaxed" style={{ color: dark ? muted : "rgba(255,255,255,0.55)" }}>
          Kindly let us know if you can join us for this celebration of love.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <div className="rounded-full px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] shadow-lg" style={{ background: accent, color: "white" }}>
            Joyfully Accept
          </div>
          <div className="rounded-full px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] border" style={{ borderColor: `${accent}50`, color: dark ? ink : "white" }}>
            Regretfully Decline
          </div>
        </div>
      </section>

      {/* ─── Theme features ─── */}
      {theme.tier !== "basic" && (
        <section className="px-6 py-10 text-center" style={{ background: surface }}>
          <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-5">
            {[
              { icon: Music, label: "Background Music" },
              { icon: Clock, label: "Live Countdown" },
              { icon: MapPin, label: "Venue Map" },
              { icon: Star, label: "Premium Animations" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wide" style={{ color: muted }}>
                <Icon size={11} style={{ color: accent }} /> {label}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA Footer ─── */}
      <section className="px-6 py-16 text-center" style={{ background: bg }}>
        <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Love This Design?</p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: ink }}>Make it yours.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[12px] leading-relaxed" style={{ color: body }}>
          Customize this {theme.name} design with your own details, photos, and events.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href={`/builder?template=${theme.slug}`}
            className="group flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-semibold tracking-wide shadow-lg transition-all hover:scale-[1.02]"
            style={{ background: accent, color: "white" }}
          >
            Customize This Invite <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={cta} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium border transition-all"
            style={{ borderColor: line, color: muted }}
          >
            <MessageCircle size={11} /> Chat With Us
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <div className="py-6 text-center" style={{ background: dark ? "rgba(0,0,0,0.3)" : "#0d0b0a" }}>
        <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.3)" }}>
          Sample Preview · {theme.name} · The Digital Inviters
        </p>
      </div>
    </div>
  );
}
