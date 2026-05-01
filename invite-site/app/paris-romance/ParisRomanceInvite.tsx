"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, Plane, Wine, Camera } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";
import ParallaxHero from "@/components/portfolio/ParallaxHero";
import { BRAND } from "@/lib/portfolioThemes";

/* ─────────────────────────────────────────────────────────────
   PARIS ROMANCE THEME
   Dreamy Parisian elegance with Eiffel Tower, champagne blush,
   French typography, and cinematic romance.
───────────────────────────────────────────────────────────────── */

const PALETTE = {
  bg: "#faf8f5",
  cream: "#f5f0e8",
  blush: "#e8d4d0",
  champagne: "#c9a87c",
  gold: "#b8956e",
  ink: "#2c2420",
  muted: "#6b5c52",
  accent: "#d4a574",
};

const COUPLE = {
  bride: "Amélie",
  groom: "Étienne",
  date: "15 June 2025",
  venue: "Château de Chantilly",
  city: "Paris, France",
  monogram: "A&É",
  tagline: "Un amour éternel",
};

const STORY = [
  {
    year: "2019",
    title: "Un Café à Montmartre",
    text: "A rainy afternoon in Paris. She was sketching at a corner café, he asked to share her table. Three espressos later, neither wanted to leave.",
    icon: "☕",
  },
  {
    year: "2021",
    title: "The Louvre at Midnight",
    text: "A private tour, just for two. Standing before the Winged Victory, he whispered that she was his greatest masterpiece.",
    icon: "🎨",
  },
  {
    year: "2023",
    title: "Sous la Tour Eiffel",
    text: "A thousand lights above, a single ring below. She said yes before he finished asking.",
    icon: "💍",
  },
];

const EVENTS = [
  {
    name: "Welcome Soirée",
    date: "Fri · 13 June",
    time: "7:00 pm",
    venue: "Rooftop at Le Meurice",
    icon: Wine,
    description: "Champagne & canapés with the Eiffel Tower glittering behind us",
  },
  {
    name: "The Ceremony",
    date: "Sun · 15 June",
    time: "4:00 pm",
    venue: "Gardens of Château de Chantilly",
    icon: Heart,
    description: "Exchange of vows beneath centuries-old oak trees",
  },
  {
    name: "Le Grand Dîner",
    date: "Sun · 15 June",
    time: "7:30 pm",
    venue: "Grand Ballroom",
    icon: Calendar,
    description: "A five-course French feast with live orchestra",
  },
  {
    name: "Farewell Brunch",
    date: "Mon · 16 June",
    time: "11:00 am",
    venue: "Orangerie Terrace",
    icon: Camera,
    description: "Croissants, memories, and au revoirs",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
];

/* ─────────────────────────────────────────────────────────────
   FLOATING ELEMENTS - Eiffel sparkles & rose petals
───────────────────────────────────────────────────────────────── */
function FloatingSparkles() {
  const reduce = useReducedMotion();
  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 13.7) % 100}%`,
        size: 3 + (i % 4) * 2,
        delay: (i % 8) * 0.6,
        duration: 8 + (i % 5) * 2,
        opacity: 0.3 + (i % 3) * 0.2,
      })),
    []
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, s.opacity, s.opacity * 0.5, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "linear" }}
          className="absolute top-0"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle, ${PALETTE.champagne} 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EIFFEL TOWER SVG ILLUSTRATION
───────────────────────────────────────────────────────────────── */
function EiffelTowerIcon({ className = "", color = PALETTE.champagne }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 150" className={className} fill="none" stroke={color} strokeWidth="1.5">
      <path d="M50 5 L50 145" />
      <path d="M50 5 L30 45 L50 40 L70 45 Z" />
      <path d="M30 45 L20 95 L50 85 L80 95 L70 45" />
      <path d="M20 95 L10 145 L50 130 L90 145 L80 95" />
      <path d="M35 60 L65 60" />
      <path d="M30 80 L70 80" />
      <path d="M25 100 L75 100" />
      <path d="M20 120 L80 120" />
      <ellipse cx="50" cy="10" rx="8" ry="4" fill={color} opacity="0.3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <ParallaxHero
      image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85"
      overlay="linear-gradient(180deg, rgba(44,36,32,0.5), rgba(44,36,32,0.3) 50%, rgba(44,36,32,0.6))"
      minHeight="100vh"
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <EiffelTowerIcon className="w-16 h-24 mx-auto mb-6 opacity-80" color="#f5f0e8" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: PALETTE.blush }}
        >
          {COUPLE.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-script text-6xl sm:text-8xl md:text-9xl text-white mb-6"
        >
          {COUPLE.bride} <span className="text-4xl sm:text-5xl opacity-60">&</span> {COUPLE.groom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center gap-3 text-white/80"
        >
          <MapPin size={16} />
          <span className="text-sm tracking-widest uppercase">{COUPLE.city}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-display text-xl sm:text-2xl text-white/90 mt-4 tracking-wide"
        >
          {COUPLE.date}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-white/40 mx-auto mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </ParallaxHero>
  );
}

/* ─────────────────────────────────────────────────────────────
   INVITATION LETTER
───────────────────────────────────────────────────────────────── */
function Invitation() {
  return (
    <section className="relative px-6 py-28 sm:py-36" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.champagne }}>
            You are cordially invited
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script mt-6 text-4xl sm:text-5xl" style={{ color: PALETTE.gold }}>
            to celebrate l&apos;amour
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p
            className="font-display mt-8 text-lg sm:text-xl leading-relaxed italic"
            style={{ color: PALETTE.muted }}
          >
            Two hearts, one city of lights. We invite you to witness our love story unfold 
            in the most romantic city in the world. From the cobblestone streets of Le Marais 
            to the gardens of Versailles, join us as we begin our forever.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Plane size={20} style={{ color: PALETTE.champagne }} />
            <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.muted }}>
              Destination Wedding
            </span>
          </div>
        </SectionReveal>

        <OrnamentDivider symbol="diamond" color={PALETTE.champagne} className="mt-12" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   OUR STORY TIMELINE
───────────────────────────────────────────────────────────────── */
function Story() {
  return (
    <section className="relative px-6 py-28" style={{ background: PALETTE.cream }}>
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.champagne }}>
            Notre Histoire
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            How We Met
          </h2>
        </SectionReveal>

        <div className="mt-16 space-y-16">
          {STORY.map((chapter, i) => (
            <SectionReveal key={chapter.year} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
                <div className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: PALETTE.blush }}>
                  {chapter.icon}
                </div>
                <div className={`text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.champagne }}>
                    {chapter.year}
                  </span>
                  <h3 className="font-display text-2xl mt-2" style={{ color: PALETTE.ink }}>
                    {chapter.title}
                  </h3>
                  <p className="mt-3 leading-relaxed" style={{ color: PALETTE.muted }}>
                    {chapter.text}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EVENTS
───────────────────────────────────────────────────────────────── */
function Events() {
  return (
    <section className="relative px-6 py-28" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.champagne }}>
            Le Programme
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Wedding Weekend
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {EVENTS.map((event, i) => (
            <SectionReveal key={event.name} delay={i * 0.1}>
              <div
                className="group relative p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl"
                style={{ 
                  background: PALETTE.cream, 
                  borderColor: PALETTE.blush,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: PALETTE.blush }}
                  >
                    <event.icon size={24} style={{ color: PALETTE.gold }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl" style={{ color: PALETTE.ink }}>
                      {event.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm" style={{ color: PALETTE.muted }}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {event.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: PALETTE.champagne }}>
                      {event.venue}
                    </p>
                    <p className="mt-3 text-sm italic" style={{ color: PALETTE.muted }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────────────────────────── */
function Gallery() {
  return (
    <section className="relative px-6 py-28" style={{ background: PALETTE.cream }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.champagne }}>
            Galerie
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Paris Awaits
          </h2>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((src, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt={`Paris gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${PALETTE.ink}80, transparent)` }}
                />
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   VENUE
───────────────────────────────────────────────────────────────── */
function Venue() {
  return (
    <section className="relative px-6 py-28" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.champagne }}>
            Le Lieu
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            {COUPLE.venue}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=85"
              alt="Château de Chantilly"
              className="w-full h-80 object-cover"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-lg" style={{ color: PALETTE.muted }}>
              A 16th-century château with Renaissance gardens, just 50km north of Paris. 
              The perfect backdrop for our French fairy tale.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <MapPin size={18} style={{ color: PALETTE.champagne }} />
              <span style={{ color: PALETTE.ink }}>60500 Chantilly, France</span>
            </div>
            <a
              href="https://maps.google.com/?q=Château+de+Chantilly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
              style={{ background: PALETTE.champagne, color: "#fff" }}
            >
              View on Map
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RSVP SECTION
───────────────────────────────────────────────────────────────── */
function RSVPSection() {
  return (
    <section className="relative px-6 py-28" style={{ background: PALETTE.cream }}>
      <div className="mx-auto max-w-xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.champagne }}>
            Répondez S&apos;il Vous Plaît
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Will You Join Us?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12">
            <RSVPForm
              accent={PALETTE.champagne}
              bg={PALETTE.bg}
              text={PALETTE.ink}
              cardBg={PALETTE.cream}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLOSING
───────────────────────────────────────────────────────────────── */
function Closing() {
  const whatsappUrl = `${BRAND.whatsappBase}Paris%20Romance%20theme%20and%20would%20like%20to%20discuss%20my%20wedding%20invite.`;

  return (
    <section className="relative px-6 py-28 text-center" style={{ background: PALETTE.ink }}>
      <FloatingSparkles />
      <div className="relative z-20 mx-auto max-w-2xl">
        <SectionReveal>
          <EiffelTowerIcon className="w-12 h-20 mx-auto mb-6" color={PALETTE.champagne} />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script text-4xl sm:text-5xl" style={{ color: PALETTE.blush }}>
            À bientôt à Paris
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg" style={{ color: PALETTE.cream }}>
            We can&apos;t wait to celebrate with you in the City of Love.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <p className="font-display text-2xl mt-8" style={{ color: PALETTE.champagne }}>
            {COUPLE.bride} & {COUPLE.groom}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: PALETTE.champagne, color: PALETTE.ink }}
          >
            <Heart size={18} />
            Get This Theme
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function ParisRomanceInvite() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <OpeningScreen
        groom={COUPLE.groom}
        bride={COUPLE.bride}
        subtitle="You are cordially invited"
        script={COUPLE.tagline}
        onOpen={() => setOpened(true)}
        image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85"
        bg={PALETTE.ink}
        text={PALETTE.cream}
        accent={PALETTE.champagne}
      />
    );
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: PALETTE.bg }}>
      <FloatingSparkles />
      <Hero />
      <Invitation />
      <Story />
      <Events />
      <Gallery />
      <Venue />
      <RSVPSection />
      <Closing />
    </main>
  );
}
