"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, Wine, Grape, TreeDeciduous, UtensilsCrossed } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";
import ParallaxHero from "@/components/portfolio/ParallaxHero";
import { BRAND } from "@/lib/portfolioThemes";

/* ─────────────────────────────────────────────────────────────
   TUSCANY VINEYARD THEME
   Italian countryside elegance with rolling hills, olive groves,
   terracotta warmth, and rustic romance.
───────────────────────────────────────────────────────────────── */

const PALETTE = {
  bg: "#faf6f1",
  cream: "#f5efe6",
  terracotta: "#c67b5c",
  olive: "#6b7c5a",
  wine: "#722f37",
  gold: "#c9a227",
  ink: "#3d3229",
  muted: "#7a6e62",
  white: "#ffffff",
};

const COUPLE = {
  bride: "Isabella",
  groom: "Marco",
  date: "12 October 2025",
  venue: "Villa Medicea",
  city: "Tuscany, Italy",
  monogram: "I&M",
  tagline: "Amore per sempre",
};

const STORY = [
  {
    year: "2017",
    title: "A Vineyard Encounter",
    text: "She was lost among the vines, he offered to show her the way. They ended up sharing a bottle of Brunello and watching the sunset.",
    icon: "🍷",
  },
  {
    year: "2019",
    title: "Under the Olive Trees",
    text: "A picnic in the Chianti hills, homemade pasta, and the first time he said 'Ti amo' — she still has the olive branch he gave her.",
    icon: "🫒",
  },
  {
    year: "2024",
    title: "The Proposal",
    text: "In the same vineyard where they met, surrounded by golden light and the scent of ripe grapes, he asked her to be his forever.",
    icon: "💍",
  },
];

const EVENTS = [
  {
    name: "Welcome Aperitivo",
    date: "Fri · 10 Oct",
    time: "6:00 pm",
    venue: "Villa Gardens",
    icon: Wine,
    description: "Prosecco, bruschetta, and the golden hour over the hills",
  },
  {
    name: "The Ceremony",
    date: "Sun · 12 Oct",
    time: "4:00 pm",
    venue: "The Olive Grove",
    icon: TreeDeciduous,
    description: "Vows exchanged beneath centuries-old olive trees",
  },
  {
    name: "La Festa",
    date: "Sun · 12 Oct",
    time: "7:00 pm",
    venue: "The Vineyard Terrace",
    icon: UtensilsCrossed,
    description: "A seven-course Italian feast under the stars",
  },
  {
    name: "Grape Harvest Brunch",
    date: "Mon · 13 Oct",
    time: "11:00 am",
    venue: "The Winery",
    icon: Grape,
    description: "Fresh pastries, espresso, and one last toast to love",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
];

/* ─────────────────────────────────────────────────────────────
   FLOATING ELEMENTS - Falling leaves
───────────────────────────────────────────────────────────────── */
function FallingLeaves() {
  const reduce = useReducedMotion();
  const leaves = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${(i * 17.3) % 100}%`,
        size: 12 + (i % 4) * 6,
        delay: (i % 6) * 1.2,
        duration: 15 + (i % 5) * 3,
        rotate: 180 + (i % 4) * 90,
        opacity: 0.25 + (i % 3) * 0.1,
      })),
    []
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {leaves.map((l) => (
        <motion.span
          key={l.id}
          initial={{ y: -40, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", rotate: l.rotate, opacity: [0, l.opacity, l.opacity * 0.6, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
          className="absolute top-0"
          style={{
            left: l.left,
            width: l.size,
            height: l.size * 0.7,
          }}
        >
          <svg viewBox="0 0 20 14" fill={l.id % 2 === 0 ? PALETTE.olive : PALETTE.terracotta} style={{ opacity: l.opacity }}>
            <ellipse cx="10" cy="7" rx="10" ry="7" />
            <path d="M10 0 L10 14" stroke={PALETTE.cream} strokeWidth="0.5" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GRAPE VINE SVG
───────────────────────────────────────────────────────────────── */
function GrapeVineIcon({ className = "", color = PALETTE.wine }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill={color}>
      <circle cx="30" cy="20" r="8" />
      <circle cx="22" cy="32" r="8" />
      <circle cx="38" cy="32" r="8" />
      <circle cx="18" cy="46" r="8" />
      <circle cx="30" cy="44" r="8" />
      <circle cx="42" cy="46" r="8" />
      <circle cx="24" cy="58" r="8" />
      <circle cx="36" cy="58" r="8" />
      <circle cx="30" cy="70" r="8" />
      <path d="M30 0 Q35 5 30 12" stroke={PALETTE.olive} strokeWidth="2" fill="none" />
      <ellipse cx="42" cy="5" rx="8" ry="5" fill={PALETTE.olive} transform="rotate(30 42 5)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <ParallaxHero
      image="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=2000&q=85"
      overlay="linear-gradient(180deg, rgba(61,50,41,0.4), rgba(61,50,41,0.2) 50%, rgba(61,50,41,0.6))"
      minHeight="100vh"
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <GrapeVineIcon className="w-14 h-20 mx-auto mb-6 opacity-90" color={PALETTE.cream} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: PALETTE.gold }}
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
            <span className="text-xs tracking-widest uppercase">Explore</span>
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
          <p className="eyebrow" style={{ color: PALETTE.terracotta }}>
            You are invited
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script mt-6 text-4xl sm:text-5xl" style={{ color: PALETTE.wine }}>
            to celebrate amore
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p
            className="font-display mt-8 text-lg sm:text-xl leading-relaxed italic"
            style={{ color: PALETTE.muted }}
          >
            Among the rolling hills of Tuscany, where the cypress trees stand guard and the vineyards 
            stretch to the horizon, we invite you to witness the beginning of our forever. Come for the 
            wine, stay for the love, and leave with memories that taste like Italy.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Wine size={20} style={{ color: PALETTE.wine }} />
            <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.muted }}>
              Destination Wedding
            </span>
          </div>
        </SectionReveal>

        <OrnamentDivider symbol="diamond" color={PALETTE.gold} className="mt-12" />
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
          <p className="eyebrow text-center" style={{ color: PALETTE.terracotta }}>
            La Nostra Storia
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Our Love Story
          </h2>
        </SectionReveal>

        <div className="mt-16 space-y-16">
          {STORY.map((chapter, i) => (
            <SectionReveal key={chapter.year} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
                <div className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: `${PALETTE.terracotta}20` }}>
                  {chapter.icon}
                </div>
                <div className={`text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.gold }}>
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
          <p className="eyebrow text-center" style={{ color: PALETTE.terracotta }}>
            Il Programma
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
                  borderColor: `${PALETTE.terracotta}30`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${PALETTE.terracotta}15` }}
                  >
                    <event.icon size={24} style={{ color: PALETTE.terracotta }} />
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
                    <p className="mt-2 text-sm" style={{ color: PALETTE.wine }}>
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
          <p className="eyebrow text-center" style={{ color: PALETTE.terracotta }}>
            La Toscana
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Tuscany Awaits
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
                  alt={`Tuscany gallery ${i + 1}`}
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
          <p className="eyebrow text-center" style={{ color: PALETTE.terracotta }}>
            La Location
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            {COUPLE.venue}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&w=1600&q=85"
              alt="Villa Medicea Tuscany"
              className="w-full h-80 object-cover"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-lg" style={{ color: PALETTE.muted }}>
              A Renaissance villa nestled in the heart of Chianti, surrounded by vineyards and olive groves. 
              The perfect setting for an Italian love story.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <MapPin size={18} style={{ color: PALETTE.terracotta }} />
              <span style={{ color: PALETTE.ink }}>Chianti, Tuscany 50022, Italy</span>
            </div>
            <a
              href="https://maps.google.com/?q=Chianti+Tuscany+Italy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
              style={{ background: PALETTE.terracotta, color: "#fff" }}
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
          <p className="eyebrow text-center" style={{ color: PALETTE.terracotta }}>
            RSVP
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.ink }}>
            Will You Join Us?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12">
            <RSVPForm
              accent={PALETTE.terracotta}
              bg={PALETTE.bg}
              text={PALETTE.ink}
              cardBg={PALETTE.white}
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
  const whatsappUrl = `${BRAND.whatsappBase}Tuscany%20Vineyard%20theme%20and%20would%20like%20to%20discuss%20my%20wedding%20invite.`;

  return (
    <section className="relative px-6 py-28 text-center" style={{ background: PALETTE.wine }}>
      <FallingLeaves />
      <div className="relative z-20 mx-auto max-w-2xl">
        <SectionReveal>
          <GrapeVineIcon className="w-12 h-16 mx-auto mb-6" color={PALETTE.gold} />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script text-4xl sm:text-5xl" style={{ color: PALETTE.cream }}>
            Ci vediamo in Toscana
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg" style={{ color: `${PALETTE.cream}cc` }}>
            Where every glass of wine tells a story, ours begins with you.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <p className="font-display text-2xl mt-8" style={{ color: PALETTE.gold }}>
            {COUPLE.bride} & {COUPLE.groom}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: PALETTE.gold, color: PALETTE.wine }}
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
export default function TuscanyVineyardInvite() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <OpeningScreen
        groom={COUPLE.groom}
        bride={COUPLE.bride}
        subtitle="You are cordially invited"
        script={COUPLE.tagline}
        onOpen={() => setOpened(true)}
        image="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=2000&q=85"
        bg={PALETTE.ink}
        text={PALETTE.cream}
        accent={PALETTE.gold}
      />
    );
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: PALETTE.bg }}>
      <FallingLeaves />
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
