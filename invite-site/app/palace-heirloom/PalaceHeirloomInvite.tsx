"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Music,
  ChevronDown,
  Star,
  MessageCircle,
} from "lucide-react";

/* ─── PALETTE ─── */
const C = {
  bg: "#0d0907",
  bgSoft: "#1a1510",
  surface: "#241e16",
  gold: "#c9a14a",
  goldSoft: "#e0c87a",
  goldMuted: "#8a7340",
  cream: "#fdf4e3",
  creamSoft: "#f5e6c8",
  ruby: "#7a1f2b",
  rubySoft: "#a83245",
  text: "#fdf4e3",
  textMuted: "rgba(253,244,227,0.55)",
  textSubtle: "rgba(253,244,227,0.3)",
  line: "rgba(201,161,74,0.15)",
};

const BRAND_WA = "https://wa.me/917240345334?text=";

/* ─── DATA ─── */
const COUPLE = { groom: "Vikram", bride: "Padmini", groomFull: "Prince Vikram Singh Rathore", brideFull: "Maharani Padmini Devi" };
const WEDDING_DATE = new Date("2026-02-14T18:00:00+05:30");

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2400&q=90",
  couple: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85",
  venue: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
  ],
};

const EVENTS = [
  { name: "Mehendi Ceremony", date: "12 February 2026", time: "4:00 PM", venue: "Palace Courtyard", icon: Heart },
  { name: "Sangeet Night", date: "13 February 2026", time: "7:00 PM", venue: "Royal Ballroom", icon: Music },
  { name: "Wedding Ceremony", date: "14 February 2026", time: "6:00 PM", venue: "Lake Palace Pavilion", icon: Star },
  { name: "Grand Reception", date: "14 February 2026", time: "9:00 PM", venue: "Durbar Hall", icon: Calendar },
];

const STORY = [
  { year: "2019", title: "A chance meeting", text: "At a gallery opening in Jaipur, their eyes met across a room full of art — and neither could look away." },
  { year: "2021", title: "The first trip together", text: "A spontaneous drive to Udaipur turned into the week that changed everything. They knew." },
  { year: "2024", title: "The proposal", text: "Under the stars at the Taj Lake Palace, with a ring hidden in a book of Mughal poetry." },
  { year: "2026", title: "Forever begins", text: "Now they invite you to witness the beginning of their forever." },
];

/* ─── HELPERS ─── */
function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay } } }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PALACE HEIRLOOM — Flagship Signature Invite
   ═══════════════════════════════════════════════════════════ */
export default function PalaceHeirloomInvite() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const countdown = useCountdown(WEDDING_DATE);

  const ctaLink = `${BRAND_WA}We%20are%20honored%20to%20attend%20${COUPLE.groom}%20%26%20${COUPLE.bride}%27s%20wedding!`;

  return (
    <main className="relative overflow-x-hidden" style={{ background: C.bg, color: C.text }}>

      {/* ═══ HERO — Cinematic fullscreen ═══ */}
      <div ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,9,7,0.3) 0%, rgba(13,9,7,0.5) 50%, rgba(13,9,7,0.95) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Decorative top */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>
            <div className="mx-auto mb-6 h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.5em] uppercase" style={{ color: C.goldSoft }}>The Royal Wedding of</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 0.95, color: C.cream }}
          >
            {COUPLE.bride}
            <br />
            <span className="font-script" style={{ color: C.goldSoft, fontSize: "0.45em", lineHeight: 2 }}>&amp;</span>
            <br />
            {COUPLE.groom}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <p className="mt-6 text-[12px] sm:text-[14px] tracking-[0.2em]" style={{ color: C.textMuted }}>
              14 · 02 · 2026 &nbsp;·&nbsp; Udaipur, Rajasthan
            </p>
            <div className="mx-auto mt-4 h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: C.textSubtle }}>Scroll</p>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={14} style={{ color: C.goldMuted }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ COUNTDOWN ═══ */}
      <section className="relative py-16 sm:py-20" style={{ background: C.bgSoft }}>
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at center, rgba(201,161,74,0.04) 0%, transparent 70%)` }} />
        <div className="relative mx-auto max-w-2xl text-center px-6">
          <Section>
            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>Counting Down To</p>
            <div className="mt-6 flex items-center justify-center gap-4 sm:gap-8">
              {([["days", countdown.days], ["hours", countdown.hours], ["minutes", countdown.minutes], ["seconds", countdown.seconds]] as const).map(([label, value]) => (
                <div key={label} className="text-center">
                  <span className="font-display text-3xl sm:text-5xl" style={{ color: C.goldSoft }}>{String(value).padStart(2, "0")}</span>
                  <p className="mt-1 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase" style={{ color: C.textSubtle }}>{label}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ═══ THE COUPLE ═══ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Section>
            <div className="text-center">
              <div className="mx-auto h-px w-12 mb-6" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>With Love & Joy</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.1, color: C.cream }}>
                Two families, one celebration.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[13px] leading-[2]" style={{ color: C.textMuted }}>
                Together with their families, <strong style={{ color: C.goldSoft }}>{COUPLE.brideFull}</strong> and <strong style={{ color: C.goldSoft }}>{COUPLE.groomFull}</strong> request the honour of your presence at their wedding celebration.
              </p>
            </div>
          </Section>

          <Section delay={0.15}>
            <div className="mt-12 sm:mt-16 relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden rounded-2xl sm:rounded-3xl" style={{ border: `1px solid ${C.line}` }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.couple})` }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,9,7,0.7) 0%, transparent 50%)" }} />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8">
                <p className="font-script text-lg sm:text-2xl" style={{ color: C.goldSoft }}>{COUPLE.bride} &amp; {COUPLE.groom}</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="py-20 sm:py-28" style={{ background: C.bgSoft }}>
        <div className="mx-auto max-w-2xl px-6">
          <Section>
            <div className="text-center">
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>Our Story</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", lineHeight: 1.15, color: C.cream }}>
                How we found <span className="font-script" style={{ color: C.goldSoft }}>each other.</span>
              </h2>
            </div>
          </Section>

          <div className="mt-12 space-y-0">
            {STORY.map((s, i) => (
              <Section key={s.year} delay={i * 0.08}>
                <div className="flex gap-5 sm:gap-8 pb-10" style={{ borderLeft: `1px solid ${C.line}` }}>
                  <div className="relative -ml-px flex-shrink-0 w-12 sm:w-16">
                    <div className="absolute top-0 left-0 h-3 w-3 rounded-full" style={{ background: C.gold, boxShadow: `0 0 12px ${C.gold}40` }} />
                    <span className="block mt-5 text-[11px] font-bold tracking-wide" style={{ color: C.goldSoft }}>{s.year}</span>
                  </div>
                  <div className="pt-0">
                    <h3 className="font-display text-[15px] sm:text-[17px]" style={{ color: C.cream }}>{s.title}</h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] leading-[1.9]" style={{ color: C.textMuted }}>{s.text}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVENTS ═══ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Section>
            <div className="text-center">
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>The Celebrations</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", lineHeight: 1.15, color: C.cream }}>
                Join us for every <span className="font-script" style={{ color: C.goldSoft }}>moment.</span>
              </h2>
            </div>
          </Section>

          <div className="mt-10 sm:mt-14 grid gap-4 sm:grid-cols-2">
            {EVENTS.map((ev, i) => (
              <Section key={ev.name} delay={i * 0.08}>
                <div className="relative rounded-xl sm:rounded-2xl p-5 sm:p-6 overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                  <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${C.gold}15` }}>
                      <ev.icon size={15} style={{ color: C.gold }} />
                    </div>
                    <div>
                      <h3 className="font-display text-[14px] sm:text-[16px]" style={{ color: C.cream }}>{ev.name}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={10} style={{ color: C.goldMuted }} />
                          <span className="text-[11px]" style={{ color: C.textMuted }}>{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={10} style={{ color: C.goldMuted }} />
                          <span className="text-[11px]" style={{ color: C.textMuted }}>{ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={10} style={{ color: C.goldMuted }} />
                          <span className="text-[11px]" style={{ color: C.textMuted }}>{ev.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VENUE ═══ */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: C.bgSoft }}>
        <div className="mx-auto max-w-5xl px-6">
          <Section>
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>The Venue</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.15, color: C.cream }}>
                Taj Lake Palace, <span className="font-script" style={{ color: C.goldSoft }}>Udaipur</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[12px] sm:text-[13px] leading-[1.9]" style={{ color: C.textMuted }}>
                A floating marble palace on Lake Pichola — where every view is a painting, and every moment is timeless.
              </p>
            </div>
          </Section>

          <Section delay={0.1}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl" style={{ border: `1px solid ${C.line}` }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.venue})` }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,9,7,0.6) 0%, transparent 40%)" }} />
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-2">
                <MapPin size={14} style={{ color: C.goldSoft }} />
                <span className="text-[11px] sm:text-[13px] font-medium" style={{ color: C.creamSoft }}>Taj Lake Palace, Pichola, Udaipur, Rajasthan</span>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Section>
            <div className="text-center mb-10">
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>Gallery</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.25rem, 3.5vw, 2rem)", lineHeight: 1.15, color: C.cream }}>
                A glimpse of our <span className="font-script" style={{ color: C.goldSoft }}>journey.</span>
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {IMAGES.gallery.map((img, i) => (
              <Section key={i} delay={i * 0.05}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-lg sm:rounded-xl" style={{ border: `1px solid ${C.line}` }}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RSVP / CTA ═══ */}
      <section className="relative overflow-hidden" style={{ background: C.bgSoft }}>
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at center, rgba(201,161,74,0.06) 0%, transparent 60%)` }} />
        <div className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-lg text-center">
            <Section>
              <div className="mx-auto h-px w-16 mb-8" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
              <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: C.goldMuted }}>Your Presence Is Requested</p>
              <h2 className="mt-5 font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.1, color: C.cream }}>
                Will you join us in
                <br />
                <span className="font-script" style={{ color: C.goldSoft }}>celebration?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-sm text-[12px] sm:text-[13px] leading-[1.9]" style={{ color: C.textMuted }}>
                Your presence would mean the world to us. Kindly confirm your attendance by sending a message — we can&apos;t wait to celebrate with you.
              </p>
            </Section>

            <Section delay={0.15}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a href={ctaLink} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-3 rounded-full px-8 py-4 text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                  style={{ background: C.gold, color: C.bg }}
                >
                  <MessageCircle size={15} />
                  Confirm via WhatsApp
                </a>
                <p className="text-[10px]" style={{ color: C.textSubtle }}>Kindly RSVP by 1 February 2026</p>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 py-12 sm:py-16 text-center" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="mx-auto h-px w-12 mb-6" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
        <p className="font-script text-lg sm:text-xl" style={{ color: C.goldSoft }}>{COUPLE.bride} &amp; {COUPLE.groom}</p>
        <p className="mt-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: C.textSubtle }}>14 February 2026 · Udaipur</p>
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Heart size={10} style={{ color: C.goldMuted }} />
          <span className="text-[9px] tracking-wide" style={{ color: C.textSubtle }}>Crafted by The Digital Inviters</span>
        </div>
      </footer>
    </main>
  );
}
