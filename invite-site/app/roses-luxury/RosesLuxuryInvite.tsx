"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, MapPin, Volume2, VolumeX } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";

const PALETTE = {
  bg: "#fbf5ef",
  bgSoft: "#f5e8df",
  ink: "#3a1524",
  body: "#6b4a55",
  accent: "#b8864a",
  accentSoft: "#e9c9a3",
  deep: "#2a0f1a",
};

const hero =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=90";
const portrait =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=90";
const closing =
  "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=2000&q=90";
const venueImage =
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=90";

const gallery = [
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=1200&q=90",
];

const story = [
  {
    year: "2021",
    kicker: "How we met",
    title: "A Rooftop Beginning",
    text:
      "A mutual friend's terrace dinner in Bombay. One stolen chair, a shared dessert, and a conversation that refused to end until sunrise.",
  },
  {
    year: "2024",
    kicker: "Our quiet promise",
    title: "Every Ordinary Sunday",
    text:
      "Hand-written notes on the fridge, flowers on Fridays, late-night drives to Bandstand, and the kind of love that feels like home.",
  },
  {
    year: "2025",
    kicker: "He asked, she cried (yes)",
    title: "Candles by the Lake",
    text:
      "A private terrace in Udaipur, three hundred candles, a single ring tied to a letter written over a year.",
  },
];

const events = [
  { kicker: "Day one", name: "Mehendi", date: "Thu · 10 Dec", time: "4:30 pm", venue: "Courtyard Pavilion" },
  { kicker: "Day two", name: "Sangeet", date: "Fri · 11 Dec", time: "7:30 pm", venue: "The Lakeside Lawns" },
  { kicker: "The wedding", name: "Pheras & Dinner", date: "Sat · 12 Dec", time: "6:30 pm", venue: "Rose Mandap, Main Palace" },
  { kicker: "A final celebration", name: "Reception", date: "Sat · 12 Dec", time: "9:30 pm", venue: "The Grand Hall" },
];

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 11.7) % 100}%`,
        size: 8 + (index % 5) * 5,
        delay: (index % 9) * 0.45,
        duration: 12 + (index % 6) * 1.4,
        rotate: 180 + (index % 5) * 60,
        opacity: 0.35 + (index % 3) * 0.15,
      })),
    []
  );
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -60, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", rotate: p.rotate, opacity: [0, p.opacity, p.opacity * 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.3,
            borderRadius: "70% 30% 70% 30%",
            background: `linear-gradient(135deg, ${PALETTE.accentSoft}, ${PALETTE.accent}99)`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "24%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.16]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh", background: PALETTE.deep }}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,15,26,0.55) 0%, rgba(42,15,26,0.25) 45%, rgba(251,245,239,0.95) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-between px-5 pb-16 pt-10 sm:px-8">
        <div className="flex items-center justify-between text-white/90">
          <div className="eyebrow">Udaipur · India</div>
          <div className="eyebrow">MMXXVI</div>
        </div>

        <motion.div style={{ opacity }} className="relative mx-auto max-w-4xl text-center text-white">
          <SectionReveal delay={0.1}>
            <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>
              The wedding of
            </p>
          </SectionReveal>
          <SectionReveal delay={0.25}>
            <p className="font-script mt-6 text-4xl sm:text-5xl" style={{ color: PALETTE.accentSoft }}>
              forever begins with
            </p>
          </SectionReveal>
          <SectionReveal delay={0.4}>
            <h1 className="font-display lux-hero mt-2 drop-shadow-2xl">
              Meera
              <span className="font-script mx-4 block text-5xl sm:text-6xl" style={{ color: PALETTE.accentSoft }}>
                &amp;
              </span>
              Aarav
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.6}>
            <OrnamentDivider color={PALETTE.accentSoft} symbol="rose" className="mt-10" />
          </SectionReveal>
          <SectionReveal delay={0.75}>
            <div className="mt-8 grid gap-6 text-white/90 sm:grid-cols-3">
              <div>
                <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Date</p>
                <p className="font-display mt-2 text-2xl">12 · 12 · 2026</p>
              </div>
              <div>
                <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Celebration</p>
                <p className="font-display mt-2 text-2xl italic">A Royal Garden Wedding</p>
              </div>
              <div>
                <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Location</p>
                <p className="font-display mt-2 text-2xl">The Lake Palace</p>
              </div>
            </div>
          </SectionReveal>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="mx-auto flex flex-col items-center text-white/80"
        >
          <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Scroll</p>
          <ChevronDown size={16} className="mt-2" />
        </motion.div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-36" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-3xl text-center" style={{ color: PALETTE.ink }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accent }}>A letter to you</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <p className="font-script mt-6 text-4xl sm:text-5xl" style={{ color: PALETTE.accent }}>
            with joyful hearts
          </p>
        </SectionReveal>
        <SectionReveal delay={0.25}>
          <p
            className="font-display mt-8 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.7] italic"
            style={{ color: PALETTE.body }}
          >
            Two families, woven together by love and little coincidences, invite you to witness a quiet promise
            becoming a lifetime. Come for the candles, the laughter, the slow dances — and the part where we say
            yes in front of the people we love most.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.45}>
          <OrnamentDivider color={PALETTE.accent} symbol="rose" className="mt-14" />
        </SectionReveal>
      </div>
    </section>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const target = new Date("2026-12-12T18:30:00+05:30").getTime();
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTime({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff / 3_600_000) % 24),
        m: Math.floor((diff / 60_000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    const frame = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(id);
    };
  }, []);

  const units = [
    ["Days", time?.d],
    ["Hours", time?.h],
    ["Minutes", time?.m],
    ["Seconds", time?.s],
  ] as const;

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32" style={{ background: PALETTE.bgSoft }}>
      <div className="mx-auto max-w-5xl text-center" style={{ color: PALETTE.ink }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accent }}>The countdown</p>
          <h2 className="font-display lux-h2 mt-4">Every second closer to forever.</h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-4 gap-3 sm:gap-6">
            {units.map(([label, value]) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-[1.25rem] border px-2 py-6 sm:rounded-[1.75rem] sm:px-6 sm:py-9"
                style={{ borderColor: `${PALETTE.accent}33`, background: "#ffffffE6" }}
              >
                <p className="font-display text-[clamp(2rem,6vw,3.75rem)] leading-none" style={{ color: PALETTE.ink }}>
                  {value !== undefined ? String(value).padStart(2, "0") : "--"}
                </p>
                <p className="eyebrow mt-3 text-[9px]" style={{ color: PALETTE.accent }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="eyebrow text-center" style={{ color: PALETTE.accent }}>Our story</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2
            className="font-display lux-h2 mx-auto mt-5 max-w-3xl text-center"
            style={{ color: PALETTE.ink }}
          >
            Written in little moments,
            <span className="font-script block text-[0.8em]" style={{ color: PALETTE.accent }}>
              and one very big yes.
            </span>
          </h2>
        </SectionReveal>

        <div className="relative mt-20 space-y-24">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px md:block"
            style={{ background: `${PALETTE.accent}33` }}
            aria-hidden
          />
          {story.map((moment, index) => (
            <SectionReveal key={moment.title} delay={index * 0.08} direction={index % 2 === 0 ? "left" : "right"}>
              <div
                className={`relative grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_90px_rgba(58,21,36,0.18)]">
                  <div
                    className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-[1400ms] hover:scale-105"
                    style={{ backgroundImage: `url(${gallery[index]})` }}
                  />
                </div>
                <div style={{ color: PALETTE.ink }}>
                  <p className="font-script text-3xl" style={{ color: PALETTE.accent }}>
                    {moment.year}
                  </p>
                  <p className="eyebrow mt-4" style={{ color: PALETTE.accent }}>
                    {moment.kicker}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.1]">
                    {moment.title}
                  </h3>
                  <div className="luxury-hairline mt-6 w-20" style={{ background: PALETTE.accent }} />
                  <p className="mt-6 text-[1.05rem] leading-[1.85]" style={{ color: PALETTE.body }}>
                    {moment.text}
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

function Events() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40" style={{ background: PALETTE.deep }}>
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${PALETTE.accentSoft} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-5xl text-center" style={{ color: "#fbf5ef" }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Celebrations</p>
          <h2 className="font-display lux-h2 mt-4">
            Four evenings of<span className="font-script ml-3 italic" style={{ color: PALETTE.accentSoft }}>joy</span>.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <OrnamentDivider color={PALETTE.accentSoft} symbol="diamond" className="mt-8" />
        </SectionReveal>

        <div className="mx-auto mt-16 max-w-4xl divide-y" style={{ borderColor: `${PALETTE.accentSoft}33` }}>
          {events.map((event, index) => (
            <SectionReveal key={event.name} delay={index * 0.06}>
              <div
                className="grid items-baseline gap-4 py-10 text-left md:grid-cols-[0.7fr_1.5fr_1fr]"
                style={{ borderColor: `${PALETTE.accentSoft}33` }}
              >
                <div>
                  <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>
                    {event.kicker}
                  </p>
                  <p className="font-display mt-2 text-2xl">{event.date}</p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight">{event.name}</h3>
                  <p className="mt-2 text-sm opacity-80">{event.venue}</p>
                </div>
                <div className="md:text-right">
                  <span
                    className="inline-block rounded-full px-4 py-2 text-xs font-medium tracking-[0.3em] uppercase"
                    style={{ background: `${PALETTE.accent}`, color: PALETTE.deep }}
                  >
                    {event.time}
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-40" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-6xl text-center" style={{ color: PALETTE.ink }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accent }}>Frames of us</p>
          <h2 className="font-display lux-h2 mt-4">An editorial in love.</h2>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <p className="lux-lead mx-auto mt-6 max-w-2xl" style={{ color: PALETTE.body }}>
            Unhurried portraits, stolen laughs, quiet corners of the palace — every frame a memory worth keeping.
          </p>
        </SectionReveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-6 gap-3 sm:gap-4">
        <SectionReveal delay={0.05} className="col-span-6 md:col-span-4 md:row-span-2">
          <div
            className="relative overflow-hidden rounded-[1.5rem] shadow-[0_30px_80px_rgba(58,21,36,0.14)]"
            style={{ aspectRatio: "4/5" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] hover:scale-105"
              style={{ backgroundImage: `url(${portrait})` }}
            />
          </div>
        </SectionReveal>
        {gallery.slice(1, 5).map((src, index) => (
          <SectionReveal key={src} delay={0.1 + index * 0.05} className="col-span-3 md:col-span-2">
            <div
              className="relative overflow-hidden rounded-[1.25rem] shadow-[0_20px_60px_rgba(58,21,36,0.1)]"
              style={{ aspectRatio: "3/4" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] hover:scale-110"
                style={{ backgroundImage: `url(${src})` }}
              />
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="relative overflow-hidden" style={{ background: PALETTE.bg }}>
      <div className="relative grid gap-0 lg:grid-cols-2">
        <SectionReveal direction="left">
          <div className="relative h-72 overflow-hidden sm:h-96 lg:h-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${venueImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fbf5ef]/60" />
          </div>
        </SectionReveal>

        <div className="relative flex items-center px-5 py-24 sm:px-12 sm:py-32 lg:px-20" style={{ color: PALETTE.ink }}>
          <div>
            <SectionReveal>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>The venue</p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="font-script mt-6 text-4xl" style={{ color: PALETTE.accent }}>
                by the lake
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <h2 className="font-display lux-h2 mt-3">The Lake Palace, Udaipur</h2>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <p className="mt-8 flex items-center gap-3 text-sm tracking-[0.25em] uppercase" style={{ color: PALETTE.body }}>
                <MapPin size={16} style={{ color: PALETTE.accent }} /> Udaipur · Rajasthan
              </p>
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <p className="lux-lead mt-6 max-w-lg" style={{ color: PALETTE.body }}>
                A heritage marble palace floating on Lake Pichola — draped in bougainvillea, lit by a thousand
                diyas, and held together by old-world romance.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=Lake+Palace+Udaipur"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-xs font-medium tracking-[0.35em] uppercase transition hover:-translate-y-0.5"
                  style={{ background: PALETTE.ink, color: "#fbf5ef" }}
                >
                  View on map
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-xs font-medium tracking-[0.35em] uppercase"
                  style={{ borderColor: PALETTE.ink, color: PALETTE.ink }}
                >
                  Plan your stay
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  return (
    <section id="rsvp" className="relative px-5 py-28 sm:px-8 sm:py-40" style={{ background: PALETTE.bgSoft }}>
      <div className="mx-auto max-w-3xl text-center" style={{ color: PALETTE.ink }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accent }}>Kindly respond</p>
          <p className="font-script mt-5 text-4xl sm:text-5xl" style={{ color: PALETTE.accent }}>
            will you celebrate with us?
          </p>
          <h2 className="font-display lux-h2 mt-3">Your reply, with love.</h2>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <OrnamentDivider color={PALETTE.accent} symbol="rose" className="mt-8" />
        </SectionReveal>
      </div>
      <SectionReveal delay={0.25} className="mt-14">
        <RSVPForm
          accent={PALETTE.accent}
          bg={PALETTE.bg}
          text={PALETTE.ink}
          cardBg="#ffffff"
          buttonLabel="Send RSVP"
          successMessage="We've saved your seat. The first dance already feels closer."
          displayClass="font-display"
        />
      </SectionReveal>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${closing})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${PALETTE.deep}CC 0%, ${PALETTE.deep}F2 100%)` }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-32 text-center sm:px-8 sm:py-40" style={{ color: "#fbf5ef" }}>
        <SectionReveal>
          <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>With all our love</p>
          <p className="font-script mt-6 text-5xl sm:text-6xl" style={{ color: PALETTE.accentSoft }}>
            thank you,
          </p>
          <h2 className="font-display mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
            for being part of our story.
          </h2>
          <OrnamentDivider color={PALETTE.accentSoft} symbol="rose" className="mt-10" />
          <p className="font-display mt-10 text-2xl italic">
            Meera
            <span className="font-script mx-3" style={{ color: PALETTE.accentSoft }}>&amp;</span>
            Aarav
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

export default function RosesLuxuryInvite() {
  const [muted, setMuted] = useState(true);

  return (
    <main className="relative overflow-hidden" style={{ background: PALETTE.bg, color: PALETTE.body }}>
      <OpeningScreen
        groom="Meera"
        bride="Aarav"
        subtitle="The wedding of"
        script="together with their families"
        bg={PALETTE.deep}
        text="#fbf5ef"
        accent={PALETTE.accentSoft}
        buttonLabel="Open Invitation"
        image={hero}
      />
      <Petals />
      <button
        onClick={() => setMuted((v) => !v)}
        className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition hover:-translate-y-0.5"
        style={{
          borderColor: `${PALETTE.accent}55`,
          background: "#fbf5efCC",
          color: PALETTE.ink,
        }}
        aria-label="Toggle music"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <Hero />
      <Invitation />
      <CountdownTimer />
      <Story />
      <Events />
      <Gallery />
      <Venue />
      <RSVPSection />
      <Closing />

      <WhatsAppButton
        label="Enquire"
        message="Hi%2C%20I%20loved%20the%20Roses%20Luxury%20invite%20and%20would%20like%20a%20custom%20one%20for%20my%20wedding."
        bg={PALETTE.ink}
        color="#fbf5ef"
      />
    </main>
  );
}
