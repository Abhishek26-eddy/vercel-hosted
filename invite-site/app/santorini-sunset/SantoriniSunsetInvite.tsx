"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, Ship, Sun, Waves } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";
import ParallaxHero from "@/components/portfolio/ParallaxHero";
import { BRAND } from "@/lib/portfolioThemes";

/* ─────────────────────────────────────────────────────────────
   SANTORINI SUNSET THEME
   Greek island elegance with Aegean blues, whitewashed domes,
   golden sunsets, and Mediterranean romance.
───────────────────────────────────────────────────────────────── */

const PALETTE = {
  bg: "#ffffff",
  cream: "#faf9f7",
  blue: "#1e3a5f",
  aegean: "#4a90a4",
  gold: "#d4a574",
  sunset: "#e8a87c",
  ink: "#1a2634",
  muted: "#5a6978",
  white: "#ffffff",
};

const COUPLE = {
  bride: "Elena",
  groom: "Nikos",
  date: "20 September 2025",
  venue: "Canaves Oia",
  city: "Santorini, Greece",
  monogram: "E&N",
  tagline: "Αγάπη για πάντα",
};

const STORY = [
  {
    year: "2018",
    title: "A Chance Encounter",
    text: "She was photographing the sunset at Oia. He asked if she could capture one for him too. That photo still hangs in their home.",
    icon: "📸",
  },
  {
    year: "2020",
    title: "Dancing in Mykonos",
    text: "A summer night, barefoot on the beach, with only the stars and waves as witnesses to their first 'I love you.'",
    icon: "💃",
  },
  {
    year: "2024",
    title: "The Question",
    text: "On a private yacht at sunset, surrounded by the caldera's embrace, he asked her to be his forever.",
    icon: "💍",
  },
];

const EVENTS = [
  {
    name: "Welcome Dinner",
    date: "Thu · 18 Sept",
    time: "8:00 pm",
    venue: "Ammoudi Bay Taverna",
    icon: Ship,
    description: "Fresh seafood by the water as the sun dips below the horizon",
  },
  {
    name: "The Ceremony",
    date: "Sat · 20 Sept",
    time: "5:30 pm",
    venue: "Canaves Oia Chapel",
    icon: Heart,
    description: "Vows exchanged overlooking the infinite blue",
  },
  {
    name: "Reception",
    date: "Sat · 20 Sept",
    time: "7:30 pm",
    venue: "Cliffside Terrace",
    icon: Sun,
    description: "Dinner, dancing, and the most spectacular sunset in the world",
  },
  {
    name: "Pool Party",
    date: "Sun · 21 Sept",
    time: "2:00 pm",
    venue: "Villa Katikies",
    icon: Waves,
    description: "Champagne, music, and one last celebration before goodbye",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1601581875039-e899893d520c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=800&q=80",
];

/* ─────────────────────────────────────────────────────────────
   FLOATING ELEMENTS - Gentle waves
───────────────────────────────────────────────────────────────── */
function FloatingWaves() {
  const reduce = useReducedMotion();
  const waves = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: i * 2,
        duration: 8 + i * 2,
      })),
    []
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 overflow-hidden" aria-hidden>
      {waves.map((w) => (
        <motion.div
          key={w.id}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: w.duration, delay: w.delay, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 h-1 w-full opacity-20"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${PALETTE.aegean}, transparent)`,
            bottom: `${w.id * 8}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GREEK DOME SVG
───────────────────────────────────────────────────────────────── */
function GreekDomeIcon({ className = "", color = PALETTE.aegean }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} fill={color}>
      <ellipse cx="50" cy="30" rx="35" ry="30" />
      <rect x="15" y="30" width="70" height="50" />
      <rect x="40" y="50" width="20" height="30" fill="white" opacity="0.3" />
      <circle cx="50" cy="15" r="8" fill="white" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <ParallaxHero
      image="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=85"
      overlay="linear-gradient(180deg, rgba(30,58,95,0.3), rgba(30,58,95,0.1) 50%, rgba(30,58,95,0.5))"
      minHeight="100vh"
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <GreekDomeIcon className="w-20 h-16 mx-auto mb-6 opacity-90" color={PALETTE.white} />
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
            <span className="text-xs tracking-widest uppercase">Discover</span>
            <div className="w-px h-8 bg-white/40 mx-auto mt-2" />
          </motion.div>
        </motion.div>
      </div>
      <FloatingWaves />
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
          <p className="eyebrow" style={{ color: PALETTE.aegean }}>
            You are invited
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script mt-6 text-4xl sm:text-5xl" style={{ color: PALETTE.blue }}>
            to witness our love story
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p
            className="font-display mt-8 text-lg sm:text-xl leading-relaxed italic"
            style={{ color: PALETTE.muted }}
          >
            Where the whitewashed walls meet the endless blue, where every sunset feels like the first, 
            we invite you to celebrate the beginning of our forever. Join us on the magical island of 
            Santorini as we say &quot;I do&quot; against the most breathtaking backdrop in the world.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Ship size={20} style={{ color: PALETTE.aegean }} />
            <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.muted }}>
              Greek Island Wedding
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
          <p className="eyebrow text-center" style={{ color: PALETTE.aegean }}>
            Our Journey
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.blue }}>
            How We Found Each Other
          </h2>
        </SectionReveal>

        <div className="mt-16 space-y-16">
          {STORY.map((chapter, i) => (
            <SectionReveal key={chapter.year} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
                <div className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: `${PALETTE.aegean}20` }}>
                  {chapter.icon}
                </div>
                <div className={`text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-sm tracking-widest uppercase" style={{ color: PALETTE.gold }}>
                    {chapter.year}
                  </span>
                  <h3 className="font-display text-2xl mt-2" style={{ color: PALETTE.blue }}>
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
          <p className="eyebrow text-center" style={{ color: PALETTE.aegean }}>
            The Celebration
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.blue }}>
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
                  borderColor: `${PALETTE.aegean}30`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${PALETTE.aegean}15` }}
                  >
                    <event.icon size={24} style={{ color: PALETTE.aegean }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl" style={{ color: PALETTE.blue }}>
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
                    <p className="mt-2 text-sm" style={{ color: PALETTE.gold }}>
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
          <p className="eyebrow text-center" style={{ color: PALETTE.aegean }}>
            The Island
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.blue }}>
            Santorini Awaits
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
                  alt={`Santorini gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${PALETTE.blue}80, transparent)` }}
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
          <p className="eyebrow text-center" style={{ color: PALETTE.aegean }}>
            The Venue
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.blue }}>
            {COUPLE.venue}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1600&q=85"
              alt="Canaves Oia Santorini"
              className="w-full h-80 object-cover"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-lg" style={{ color: PALETTE.muted }}>
              Perched on the cliffs of Oia, Canaves offers unparalleled views of the caldera, 
              the volcanic islands, and the most famous sunset in the Mediterranean.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <MapPin size={18} style={{ color: PALETTE.aegean }} />
              <span style={{ color: PALETTE.blue }}>Oia, Santorini 847 02, Greece</span>
            </div>
            <a
              href="https://maps.google.com/?q=Canaves+Oia+Santorini"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
              style={{ background: PALETTE.aegean, color: "#fff" }}
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
          <p className="eyebrow text-center" style={{ color: PALETTE.aegean }}>
            RSVP
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4" style={{ color: PALETTE.blue }}>
            Will You Join Us?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12">
            <RSVPForm
              accent={PALETTE.aegean}
              bg={PALETTE.bg}
              text={PALETTE.blue}
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
  const whatsappUrl = `${BRAND.whatsappBase}Santorini%20Sunset%20theme%20and%20would%20like%20to%20discuss%20my%20wedding%20invite.`;

  return (
    <section className="relative px-6 py-28 text-center" style={{ background: PALETTE.blue }}>
      <div className="relative z-20 mx-auto max-w-2xl">
        <SectionReveal>
          <GreekDomeIcon className="w-16 h-12 mx-auto mb-6" color={PALETTE.gold} />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-script text-4xl sm:text-5xl" style={{ color: PALETTE.white }}>
            See you in Santorini
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg" style={{ color: `${PALETTE.white}cc` }}>
            Where the sun meets the sea, we&apos;ll begin our forever.
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
            style={{ background: PALETTE.gold, color: PALETTE.blue }}
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
export default function SantoriniSunsetInvite() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <OpeningScreen
        groom={COUPLE.groom}
        bride={COUPLE.bride}
        subtitle="You are cordially invited"
        script={COUPLE.tagline}
        onOpen={() => setOpened(true)}
        image="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=85"
        bg={PALETTE.blue}
        text={PALETTE.white}
        accent={PALETTE.gold}
      />
    );
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: PALETTE.bg }}>
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
