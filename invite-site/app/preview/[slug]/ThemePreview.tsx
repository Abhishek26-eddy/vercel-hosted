"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart, MapPin, Calendar, Sparkles,
  ArrowRight, MessageCircle, Camera, Users, Scroll,
} from "lucide-react";
import type { PortfolioTheme } from "@/lib/portfolioThemes";
import { BRAND } from "@/lib/portfolioThemes";
import { getStoryBySlug } from "@/lib/sampleStories";

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

/* ── Fallback sample data for themes without stories ────── */
const FALLBACK_EVENTS = [
  { name: "Mehendi & Sangeet", date: "2026-02-13", time: "6:00 PM", venue: "Grand Ballroom", description: "An evening of music and celebration" },
  { name: "Wedding Ceremony", date: "2026-02-14", time: "7:00 PM", venue: "The Garden", description: "Join us as we exchange vows" },
  { name: "Reception", date: "2026-02-14", time: "9:00 PM", venue: "The Terrace", description: "Dinner and dancing under the stars" },
];

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
];

/* ═══════════════════════════════════════════════════════════
   ThemePreview — Story-driven wedding microsite preview
   Rich, emotional, aspirational sample previews for luxury studio
   ═══════════════════════════════════════════════════════════ */
export default function ThemePreview({ theme }: { theme: PortfolioTheme }) {
  // Get story data if available, otherwise use theme defaults
  const story = getStoryBySlug(theme.slug);
  
  const dark = isDarkBg(theme.background);
  const bg = theme.background;
  const accent = theme.accent;
  const ink = dark ? "#faf8f5" : "#1a1816";
  const body = dark ? "rgba(255,255,255,0.7)" : "#57504a";
  const muted = dark ? "rgba(255,255,255,0.45)" : "#9a9189";
  const surface = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.025)";
  const line = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";

  // Use story data if available, fallback to theme data
  const groom = story?.groomName || theme.couple.split("&")[0]?.trim() || "Groom";
  const bride = story?.brideName || theme.couple.split("&")[1]?.trim() || "Bride";
  const heroTitle = story?.heroTitle || `${groom} & ${bride}`;
  const heroSubtitle = story?.heroSubtitle || "Together with their families";
  const venue = story?.venue || theme.location;
  const events = story?.events || FALLBACK_EVENTS;
  const gallery = story?.galleryImages || FALLBACK_GALLERY;
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20reserve%20the%20${encodeURIComponent(theme.name)}%20invitation%20design.`;

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
          Reserve This Invite <ArrowRight size={10} />
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
            {heroSubtitle}
          </motion.p>

          <motion.h1 {...fadeUp(0.6)} className="mt-6 font-serif leading-[1.1] px-4" style={{ color: "#ffffff", fontSize: "clamp(2rem, 7vw, 4.5rem)" }}>
            {heroTitle}
          </motion.h1>

          <motion.div {...fadeUp(1)} className="mt-10 flex items-center gap-3">
            <span className="h-px w-12" style={{ background: accent }} />
            <Sparkles size={12} style={{ color: accent }} />
            <span className="h-px w-12" style={{ background: accent }} />
          </motion.div>

          {events && events.length > 0 && (
            <motion.p {...fadeUp(1.1)} className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-white/80">
              {new Date(events[0].date).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </motion.p>
          )}
          <motion.p {...fadeUp(1.2)} className="mt-2 flex items-center gap-1.5 text-[11px] text-white/55">
            <MapPin size={10} /> {venue}
          </motion.p>

          <motion.div {...fadeUp(1.4)} className="mt-10">
            <div className="animate-bounce text-white/40">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WELCOME NOTE ─── */}
      {story?.welcomeNote && (
        <section className="px-6 py-16 text-center" style={{ background: surface }}>
          <motion.div {...fadeUp(0)} className="mx-auto max-w-2xl">
            <Sparkles size={20} className="mx-auto mb-3" style={{ color: accent }} />
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>You Are Invited</p>
            <p className="mx-auto mt-5 text-[13px] sm:text-[14px] leading-[1.9]" style={{ color: body }}>
              {story.welcomeNote}
            </p>
          </motion.div>
        </section>
      )}

      {/* ─── OUR STORY ─── */}
      {story && (
        <section className="px-6 py-16 sm:px-10" style={{ background: bg }}>
          <motion.div {...fadeUp(0)} className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <Heart size={20} className="mx-auto mb-3" style={{ color: accent }} />
              <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>{story.ourStoryTitle || "Our Story"}</p>
            </div>
            
            {/* How We Met */}
            {story.howWeMet && (
              <div className="mb-8">
                <h3 className="font-serif text-xl sm:text-2xl mb-3" style={{ color: ink }}>How We Met</h3>
                <p className="text-[13px] sm:text-[14px] leading-[1.9]" style={{ color: body }}>
                  {story.howWeMet}
                </p>
              </div>
            )}

            {/* Little Things */}
            {story.littleThings && (
              <div className="mb-8">
                <p className="text-[13px] sm:text-[14px] leading-[1.9] italic" style={{ color: body }}>
                  {story.littleThings}
                </p>
              </div>
            )}

            {/* Proposal */}
            {story.proposalStory && (
              <div className="mt-12 p-6 sm:p-8 rounded-2xl" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                <Scroll size={20} className="mx-auto mb-3" style={{ color: accent }} />
                <h3 className="text-center font-serif text-xl sm:text-2xl mb-4" style={{ color: ink }}>{story.proposalTitle || "The Proposal"}</h3>
                <p className="text-[13px] sm:text-[14px] leading-[1.9]" style={{ color: body }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ─── EVENTS ─── */}
      <section className="relative overflow-hidden px-6 py-16 sm:px-10" style={{ background: dark ? surface : "#0d0b0a" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${accent} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Celebrations</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: dark ? ink : "#faf8f5" }}>Wedding Festivities</h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {events.map((e: any, i: number) => (
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
                {e.venue && <p className="mt-1 text-[11px]" style={{ color: dark ? muted : "rgba(255,255,255,0.5)" }}>{e.venue}</p>}
                {e.description && <p className="mt-2 text-[10px] leading-relaxed" style={{ color: dark ? body : "rgba(255,255,255,0.6)" }}>{e.description}</p>}
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
          {gallery.map((src: string, i: number) => (
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
      <section className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})`, filter: "brightness(0.35)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
        <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>The Venue</p>
          <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-white px-4">{story?.venue || venue}</h3>
          {story?.venueAddress && <p className="mt-2 text-[11px] text-white/50 max-w-md">{story.venueAddress}</p>}
          <div className="mt-5 rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: accent, color: accent }}>
            <MapPin size={10} className="mr-1 inline" /> View Location
          </div>
        </div>
      </section>

      {/* ─── FAMILY ─── */}
      {story && (story.groomFamily || story.brideFamily) && (
        <section className="px-6 py-16 text-center" style={{ background: surface }}>
          <motion.div {...fadeUp(0)} className="mx-auto max-w-xl">
            <Users size={20} className="mx-auto mb-3" style={{ color: accent }} />
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Our Families</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {story.groomFamily && (
                <div>
                  <h4 className="font-serif text-lg mb-2" style={{ color: ink }}>{story.groomName}&apos;s Family</h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: body }}>{story.groomFamily}</p>
                </div>
              )}
              {story.brideFamily && (
                <div>
                  <h4 className="font-serif text-lg mb-2" style={{ color: ink }}>{story.brideName}&apos;s Family</h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: body }}>{story.brideFamily}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── CLOSING NOTE / RSVP ─── */}
      <section className="px-6 py-16 text-center sm:px-10" style={{ background: dark ? surface : "#0d0b0a" }}>
        <Heart size={20} className="mx-auto mb-3" style={{ color: accent }} />
        <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>{story?.rsvpText || "Join Us"}</p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: dark ? ink : "#faf8f5" }}>We&apos;d be honoured by your presence</h3>
        {story?.closingNote && (
          <p className="mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px] leading-relaxed" style={{ color: dark ? body : "rgba(255,255,255,0.65)" }}>
            {story.closingNote}
          </p>
        )}
      </section>


      {/* ─── CTA Footer ─── */}
      <section className="px-6 py-20 text-center" style={{ background: bg }}>
        <Sparkles size={20} className="mx-auto mb-3" style={{ color: accent }} />
        <p className="text-[9px] font-semibold uppercase tracking-[0.45em]" style={{ color: accent }}>Inspired by this design?</p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: ink }}>Let us craft yours.</h3>
        <p className="mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px] leading-[1.9]" style={{ color: body }}>
          Reserve the {theme.name} design and we&apos;ll personalize it with your love story, photos, and celebration details. Premium, boutique, unforgettable.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href={`/builder?template=${theme.slug}`}
            className="group flex items-center gap-2 rounded-full px-10 py-4 text-[12px] font-semibold tracking-wide shadow-xl transition-all hover:scale-[1.02]"
            style={{ background: accent, color: "white" }}
          >
            Reserve This Design <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={cta} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-medium border transition-all hover:border-opacity-70"
            style={{ borderColor: `${accent}40`, color: muted }}
          >
            <MessageCircle size={11} /> Speak to Our Team
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <div className="py-8 text-center" style={{ background: dark ? "rgba(0,0,0,0.3)" : "#0d0b0a" }}>
        <p className="text-[9px] uppercase tracking-[0.25em] mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
          Sample Preview · {theme.name}
        </p>
        <p className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.2)" }}>
          Crafted by The Digital Inviters · Boutique Wedding Invitations
        </p>
      </div>
    </div>
  );
}
