"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Palette,
  Smartphone,
  Users,
  Clock,
  Heart,
  CheckCircle2,
  ChevronDown,
  Send,
  Play,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";

/* ─────────────────────────────────────────────────────────────
   REFINED LUXURY PALETTE
   Warmer, more sophisticated, less generic
───────────────────────────────────────────────────────────────── */
const P = {
  // Backgrounds - warmer, richer
  bg: "#f9f7f3",
  bgAlt: "#f3efe7",
  bgDeep: "#ebe5d9",
  surface: "#ffffff",
  
  // Typography - deeper, more contrast
  ink: "#1c1917",
  body: "#57534e",
  muted: "#a8a29e",
  subtle: "#d6d3d1",
  
  // Accent - refined champagne gold
  gold: "#9a7b4f",
  goldSoft: "#c4a97d",
  goldMuted: "#ddd0b8",
  
  // Borders - barely there
  line: "#e7e5e4",
  lineSoft: "#f5f5f4",
  
  // Dark sections
  noir: "#0c0a09",
  noirSoft: "#1c1917",
};

const HERO_IMG = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90";

/* ─────────────────────────────────────────────────────────────
   REFINED DATA - Tighter copy
───────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Palette,
    title: "Bespoke Design",
    desc: "Crafted around your story, not a template.",
  },
  {
    icon: Play,
    title: "Cinematic Motion",
    desc: "Editorial animation that feels intentional.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    desc: "Each guest sees their own named invitation.",
  },
  {
    icon: Smartphone,
    title: "Mobile Perfect",
    desc: "Stunning on WhatsApp, where sharing happens.",
  },
  {
    icon: MessageCircle,
    title: "Built-in RSVP",
    desc: "Collect responses without the spreadsheet.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    desc: "First draft in 24 hours. Unlimited revisions.",
  },
];

const STEPS = [
  { n: "01", title: "Choose", desc: "Find your aesthetic in our collection." },
  { n: "02", title: "Share", desc: "Send us your story and details." },
  { n: "03", title: "Refine", desc: "Review, revise, perfect together." },
  { n: "04", title: "Celebrate", desc: "Share your invite with the world." },
];

const TESTIMONIALS = [
  {
    quote: "Our guests didn't just open it — they screenshot it, talked about it, kept coming back. It felt like a trailer for our wedding.",
    couple: "Shreya & Dev",
    loc: "Mumbai",
  },
  {
    quote: "Every animation, every word felt intentional. Our families were genuinely impressed.",
    couple: "Ananya & Karthik", 
    loc: "Chennai",
  },
];

const FAQ = [
  { q: "How long does it take?", a: "First draft in 24 hours. Most invites finalized in 3-5 days." },
  { q: "Can I make changes?", a: "Unlimited revisions until you're completely satisfied." },
  { q: "How do guests view it?", a: "A unique URL they tap to open — works everywhere." },
  { q: "Is it hosted forever?", a: "Yes. A digital keepsake you can revisit anytime." },
];

/* ─────────────────────────────────────────────────────────────
   SMOOTH ANIMATION VARIANTS
───────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────────────────────────────────────────────────────
   NAVIGATION - Minimal, confident
───────────────────────────────────────────────────────────────── */
function Nav({ cta }: { cta: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div 
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10"
        style={{ background: `${P.bg}F0`, backdropFilter: "blur(12px)" }}
      >
        <Link href="/" className="font-display text-xl tracking-tight" style={{ color: P.ink }}>
          The Digital Inviters
        </Link>
        
        <nav className="hidden items-center gap-10 md:flex">
          {["Collection", "Process", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] tracking-wide transition-colors hover:text-[#9a7b4f]"
              style={{ color: P.muted }}
            >
              {item}
            </Link>
          ))}
        </nav>

        <a
          href={cta}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 hover:gap-3"
          style={{ background: P.ink, color: P.bg }}
        >
          Enquire
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO - Editorial, cinematic, confident
───────────────────────────────────────────────────────────────── */
function Hero({ cta }: { cta: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, ${P.bg}E8 0%, ${P.bg}D0 30%, ${P.bg}B0 60%, ${P.bg}90 100%)`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-24 pb-16 sm:px-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-[11px] font-medium tracking-[0.3em] uppercase"
              style={{ color: P.gold }}
            >
              Boutique Wedding Invitations
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 font-display leading-[0.92] tracking-tight"
              style={{ 
                color: P.ink,
                fontSize: "clamp(3rem, 10vw, 7rem)",
              }}
            >
              Your love story,
              <br />
              <span className="font-script" style={{ color: P.gold }}>
                beautifully told.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 max-w-xl text-[17px] leading-[1.8]"
              style={{ color: P.body }}
            >
              We craft bespoke digital wedding invitations that guests screenshot, 
              share, and remember. Designed around your story. Animated with intention.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
              <a
                href={cta}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-500 hover:gap-4"
                style={{ 
                  background: P.ink, 
                  color: P.bg,
                  boxShadow: "0 20px 50px rgba(28,25,23,0.15)",
                }}
              >
                Start Your Invite
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="#collection"
                className="inline-flex items-center gap-2 px-6 py-4 text-[12px] font-medium tracking-wide transition-colors"
                style={{ color: P.body }}
              >
                View Collection
                <ChevronDown size={14} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating preview - desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-10 top-1/2 hidden w-72 -translate-y-1/2 xl:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden rounded-[1.75rem]"
              style={{ 
                boxShadow: "0 40px 100px rgba(28,25,23,0.2)",
              }}
            >
              <div
                className="aspect-[3/4] bg-cover bg-center"
                style={{ backgroundImage: `url(${PORTFOLIO_THEMES[0]?.image})` }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: P.muted }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURES - Clean grid, no boxes
───────────────────────────────────────────────────────────────── */
function Features() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
            The Difference
          </p>
          <h2 
            className="mt-5 font-display tracking-tight"
            style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
          >
            Not a template.
            <br />
            <span className="font-script" style={{ color: P.gold }}>An experience.</span>
          </h2>
        </SectionReveal>

        <div className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.06}>
              <div className="group">
                <div 
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
                  style={{ background: P.bgAlt, color: P.gold }}
                >
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl tracking-tight" style={{ color: P.ink }}>
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: P.body }}>
                  {f.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLLECTION - Editorial cards
───────────────────────────────────────────────────────────────── */
function Collection() {
  return (
    <section id="collection" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
                The Collection
              </p>
              <h2 
                className="mt-5 font-display tracking-tight"
                style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
              >
                Signature themes.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed" style={{ color: P.body }}>
              Each is a fully working invite. Find your aesthetic — we'll customize every detail.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIO_THEMES.map((theme, i) => (
            <SectionReveal key={theme.slug} delay={i * 0.05}>
              <Link
                href={`/${theme.slug}`}
                className="group block overflow-hidden rounded-2xl transition-all duration-700 hover:shadow-2xl"
                style={{ background: P.surface }}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${theme.image})` }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(12,10,9,0.75) 0%, rgba(12,10,9,0.1) 50%, transparent 100%)" }}
                  />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[10px] font-medium tracking-[0.25em] uppercase opacity-70">
                      {theme.location}
                    </p>
                    <h3 className="mt-2 font-display text-2xl tracking-tight">
                      {theme.name}
                    </h3>
                    <p className="mt-1 font-script text-lg" style={{ color: P.goldSoft }}>
                      {theme.tagline}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-5" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <span className="text-[11px] font-medium tracking-wide" style={{ color: P.gold }}>
                    View Sample
                  </span>
                  <span 
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[#1c1917] group-hover:text-white"
                    style={{ background: P.bgAlt, color: P.ink }}
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROCESS - Horizontal timeline feel
───────────────────────────────────────────────────────────────── */
function Process() {
  return (
    <section id="process" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
            How It Works
          </p>
          <h2 
            className="mt-5 font-display tracking-tight"
            style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
          >
            A calm, considered craft.
          </h2>
        </SectionReveal>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.1}>
              <div>
                <span 
                  className="font-display text-5xl"
                  style={{ color: P.goldMuted }}
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: P.ink }}>
                  {s.title}
                </h3>
                <div className="mt-3 h-px w-10" style={{ background: P.gold }} />
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: P.body }}>
                  {s.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS - Single elegant quote
───────────────────────────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
            From Our Couples
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 font-display text-[clamp(1.25rem,3.5vw,2rem)] leading-[1.4] tracking-tight italic"
            style={{ color: P.ink }}
          >
            "{TESTIMONIALS[active].quote}"
          </motion.blockquote>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-8">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <p className="font-display text-sm" style={{ color: P.ink }}>{t.couple}</p>
                <p className="text-[11px]" style={{ color: P.muted }}>{t.loc}</p>
              </button>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICING - Confident, minimal
───────────────────────────────────────────────────────────────── */
function Pricing({ cta }: { cta: string }) {
  return (
    <section id="pricing" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
            Investment
          </p>
          <h2 
            className="mt-5 font-display tracking-tight"
            style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
          >
            Premium quality.
            <br />
            <span className="font-script" style={{ color: P.gold }}>Thoughtful pricing.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div 
            className="mt-14 rounded-3xl p-10 sm:p-14"
            style={{ background: P.surface, boxShadow: "0 30px 80px rgba(28,25,23,0.06)" }}
          >
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase" style={{ color: P.gold }}>
              Bespoke Digital Invite
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="font-display text-5xl tracking-tight" style={{ color: P.ink }}>₹4,999</span>
              <span className="text-sm" style={{ color: P.muted }}>starting</span>
            </div>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: P.body }}>
              Fully customized to your story. First draft in 24 hours. Unlimited revisions. Lifetime hosting.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={cta}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-500 hover:gap-4"
                style={{ background: P.gold, color: "white" }}
              >
                <MessageCircle size={15} />
                Get Started
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-10 flex justify-center gap-10 border-t pt-8" style={{ borderColor: P.lineSoft }}>
              {[["24h", "First Draft"], ["3-5 days", "Delivery"], ["∞", "Revisions"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="font-display text-lg" style={{ color: P.ink }}>{v}</p>
                  <p className="mt-1 text-[10px] tracking-wide uppercase" style={{ color: P.muted }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ - Minimal accordion
───────────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-2xl">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
            Questions
          </p>
          <h2 
            className="mt-5 font-display tracking-tight"
            style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Frequently asked.
          </h2>
        </SectionReveal>

        <div className="mt-12 space-y-1">
          {FAQ.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div style={{ borderBottom: `1px solid ${P.line}` }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="font-display text-lg" style={{ color: P.ink }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{ color: P.muted }}
                    className={`flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-[15px] leading-relaxed" style={{ color: P.body }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA - Dark, cinematic
───────────────────────────────────────────────────────────────── */
function Cta({ cta }: { cta: string }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0" style={{ background: `${P.noir}F2` }} />
      
      <div className="relative px-6 py-28 sm:px-10 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <div className="text-center">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.goldSoft }}>
                Ready to Begin?
              </p>
              <h2 
                className="mt-5 font-display tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
              >
                Let's create something
                <br />
                <span className="font-script" style={{ color: P.goldSoft }}>unforgettable.</span>
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="mt-14 grid gap-10 md:grid-cols-2">
              {/* Form */}
              <div className="rounded-2xl p-8" style={{ background: P.noirSoft }}>
                {!sent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                    <div>
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3.5 text-white outline-none transition-colors focus:border-[#9a7b4f]"
                        style={{ borderColor: "#3f3f46" }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3.5 text-white outline-none transition-colors focus:border-[#9a7b4f]"
                        style={{ borderColor: "#3f3f46" }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>
                        Tell us about your wedding
                      </label>
                      <textarea
                        value={form.msg}
                        onChange={(e) => setForm({ ...form, msg: e.target.value })}
                        rows={3}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3.5 text-white outline-none transition-colors focus:border-[#9a7b4f]"
                        style={{ borderColor: "#3f3f46" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-[12px] font-medium tracking-wide transition-all duration-300"
                      style={{ background: P.gold, color: "white" }}
                    >
                      <Send size={14} />
                      Send Inquiry
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 size={40} style={{ color: P.gold }} />
                    <p className="mt-4 font-display text-xl text-white">Thank you!</p>
                    <p className="mt-2 text-sm" style={{ color: P.muted }}>We'll be in touch within 24 hours.</p>
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>
                  Or reach us directly
                </p>
                <p className="mt-4 font-display text-2xl text-white">Prefer WhatsApp?</p>
                <p className="mt-3 text-[15px]" style={{ color: P.muted }}>
                  Message us for a faster response.
                </p>
                <a
                  href={cta}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-300"
                  style={{ background: "#25D366", color: "white" }}
                >
                  <MessageCircle size={16} />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER - Minimal
───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="px-6 py-14 sm:px-10" style={{ background: P.bg, borderTop: `1px solid ${P.line}` }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <p className="font-display text-xl tracking-tight" style={{ color: P.ink }}>
          The Digital Inviters
        </p>
        <p className="mt-2 font-script text-lg" style={{ color: P.gold }}>
          Invitations, made with love.
        </p>
        <p className="mt-6 text-[10px] tracking-wide" style={{ color: P.muted }}>
          © {new Date().getFullYear()} The Digital Inviters
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────── */
export default function PortfolioHome() {
  const cta = `${BRAND.whatsappBase}your%20themes%20and%20would%20like%20a%20custom%20wedding%20invite.`;

  return (
    <main style={{ background: P.bg, color: P.body }}>
      <Nav cta={cta} />
      <Hero cta={cta} />
      <Features />
      <Collection />
      <Process />
      <Testimonials />
      <Pricing cta={cta} />
      <Faq />
      <Cta cta={cta} />
      <Footer />

      {/* Mobile sticky CTA */}
      <a
        href={cta}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl md:hidden"
        style={{ background: "#25D366", color: "white" }}
      >
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
