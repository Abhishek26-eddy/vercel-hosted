"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Send,
  Shield,
  Sparkles,
  Star,
  Zap,
  RefreshCw,
  HeartHandshake,
  Check,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import { LocaleSelectors } from "@/components/LocaleSelectors";
import { useLocale } from "@/components/LocaleProvider";

/* ─────────────────────────────────────────────────────────────
   LUXURY ART DIRECTION PALETTE
   Soft, romantic, editorial - inspired by fine art wedding photography
───────────────────────────────────────────────────────────────── */
const P = {
  // Backgrounds - warm parchment, soft cream
  bg: "#faf8f4",
  bgAlt: "#f5f1eb",
  bgDeep: "#ede8e0",
  surface: "#fffcfa",
  
  // Typography - soft ink, warm body
  ink: "#1a1816",
  body: "#5c5650",
  muted: "#9a9189",
  subtle: "#d4cfc7",
  
  // Accent - muted gold, antique bronze
  gold: "#a68b5b",
  goldSoft: "#c9b896",
  goldMuted: "#e5dcc8",
  
  // Borders - whisper soft
  line: "#ebe7e0",
  lineSoft: "#f5f3ef",
  
  // Dark sections - soft charcoal
  noir: "#141210",
  noirSoft: "#1f1c19",
};

const HERO_IMG = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90";


/* ─────────────────────────────────────────────────────────────
   TRUST-FOCUSED DATA
───────────────────────────────────────────────────────────────── */

const TRUST_STATS = [
  { value: "3–5", label: "Days to perfect" },
  { value: "∞", label: "Revisions" },
  { value: "100%", label: "Love it or refund" },
];

const WHY_CHOOSE = [
  {
    icon: HeartHandshake,
    title: "One Dedicated Designer",
    desc: "A single designer walks with you from first conversation to final invitation. Intimate, personal, seamless.",
  },
  {
    icon: Zap,
    title: "Thoughtfully Fast",
    desc: "Your first draft arrives within a day. We move quickly, but never rush the romance.",
  },
  {
    icon: RefreshCw,
    title: "Until It's Perfect",
    desc: "Refine as many times as you need. No limits, no extra charges, no compromise on your vision.",
  },
  {
    icon: Shield,
    title: "Complete Peace of Mind",
    desc: "If the direction doesn't feel right, we'll return every rupee. Your trust matters more than anything.",
  },
];

const WHATS_INCLUDED = [
  "Fully custom design based on your theme",
  "Animated hero with your names & date",
  "Your love story timeline",
  "Event schedule with all ceremonies",
  "Interactive venue map & directions",
  "Photo gallery section",
  "Built-in RSVP collection",
  "Personalized guest names",
  "WhatsApp-optimized sharing",
  "Lifetime hosting included",
  "Mobile-first responsive design",
  "Countdown timer to your wedding",
];

const STEPS = [
  { 
    n: "01", 
    title: "Share Your Vision", 
    desc: "Tell us about your wedding — the theme, colors, story, and what makes your love unique.",
    time: "15 min call or message"
  },
  { 
    n: "02", 
    title: "Review First Draft", 
    desc: "Within 24 hours, you'll receive a fully designed invite preview to review.",
    time: "24 hours"
  },
  { 
    n: "03", 
    title: "Refine Together", 
    desc: "We'll iterate on every detail — colors, copy, photos, animations — until it's perfect.",
    time: "2-3 days"
  },
  { 
    n: "04", 
    title: "Launch & Share", 
    desc: "Get your unique link and start sharing with guests. We handle hosting forever.",
    time: "Same day"
  },
];

const TESTIMONIALS = [
  {
    quote: "Our guests didn't just open it — they screenshot it, talked about it, kept coming back. It felt like a trailer for our wedding.",
    couple: "Shreya & Dev",
    loc: "Mumbai",
    detail: "Royal Palace Theme",
  },
  {
    quote: "The attention to detail was extraordinary. Every animation, every word felt intentional. Our families were genuinely impressed.",
    couple: "Ananya & Karthik", 
    loc: "Chennai",
    detail: "South Indian Temple Theme",
  },
];

const FAQ = [
  { 
    q: "How long does the entire process take?", 
    a: "Most couples receive their final invite within 3-5 days. We send the first draft within 24 hours of receiving your details, then refine based on your feedback. Rush delivery is available if you need it sooner." 
  },
  { 
    q: "What if I don't like the first design?", 
    a: "We offer unlimited revisions until you're completely satisfied. If after revisions you're still not happy with the direction, we offer a full refund — no questions asked." 
  },
  { 
    q: "How do guests view the invitation?", 
    a: "Each guest receives a unique URL (like yourwedding.thedigitalinviters.com/guest-name). They simply tap to open — no app downloads, no sign-ups. Works perfectly on WhatsApp, Instagram, email, or any platform." 
  },
  { 
    q: "Is hosting included? For how long?", 
    a: "Yes, lifetime hosting is included in every package. Your invite stays live forever — a digital keepsake you and your guests can revisit anytime." 
  },
  { 
    q: "Can I make changes after the invite is live?", 
    a: "Absolutely. Need to update a venue, time, or add a new event? Just message us and we'll update it within hours — at no extra cost." 
  },
  { 
    q: "Do you offer video invitations?", 
    a: "Our invites are interactive web experiences with cinematic animations — more engaging than a video because guests can interact, RSVP, and explore. If you specifically need a video file, we can discuss options." 
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes. Our Signature plan includes a custom domain like meera-and-aarav.com. We handle DNS setup and SSL certificates — your invite gets its own professional web address."
  },
];

/* ─────────────────────────────────────────────────────────────
   CINEMATIC MOTION LANGUAGE
   Soft reveals, graceful fades, slow confidence
───────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.15 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

/* ─────────────────────────────────────────────────────────────
   NAVIGATION - Premium, confident
───────────────────────────────────────────────────────────────── */
function Nav({ cta }: { cta: string }) {
  const { t } = useLocale();
  
  const navItems = [
    { key: "nav.collection", href: "#collection" },
    { key: "nav.howItWorks", href: "#process" },
    { key: "nav.included", href: "#included" },
    { key: "nav.pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div 
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10"
        style={{ background: `${P.bg}F5`, backdropFilter: "blur(16px)" }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ color: P.ink }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: P.gold, color: "white" }}>
            <Sparkles size={14} />
          </span>
          <span className="font-display text-lg tracking-tight">The Digital Inviters</span>
        </Link>
        
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-[13px] tracking-wide transition-colors hover:text-[#9a7b4f]"
              style={{ color: P.body }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Currency & Language Selectors */}
          <div className="hidden md:block">
            <LocaleSelectors />
          </div>
          
          <a
            href={cta}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 hover:border-[#9a7b4f] sm:flex"
            style={{ borderColor: P.line, color: P.ink }}
          >
            <MessageCircle size={14} />
            {t("nav.whatsapp")}
          </a>
          <a
            href="#pricing"
            className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 hover:gap-3"
            style={{ background: P.ink, color: P.bg }}
          >
            {t("nav.getStarted")}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO - Editorial, cinematic, confident
───────────────────────────────────────────────────────────────── */
function Hero({ cta }: { cta: string }) {
  const { prices, t } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Full-bleed background image with parallax */}
      <motion.div 
        className="absolute inset-0" 
        style={{ y: imgY, opacity: imgOpacity }}
      >
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Strong gradient overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${P.bg} 0%, ${P.bg}F8 35%, ${P.bg}E0 55%, ${P.bg}90 75%, ${P.bg}40 100%)`,
          }}
        />
      </motion.div>

      {/* Content - editorial composition */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-24 pt-32 sm:px-10 sm:pb-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            {/* Soft eyebrow with ornament */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8" style={{ background: P.goldMuted }} />
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: P.gold }}>
                {t("hero.eyebrow")}
              </p>
            </motion.div>

            {/* Main headline - more poetic, less marketing */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-display"
              style={{ 
                color: P.ink,
                fontSize: "clamp(2.75rem, 7vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {t("hero.title1")}
              <br />
              <span className="font-script" style={{ color: P.gold, fontSize: "0.85em" }}>
                {t("hero.title2")}
              </span>
            </motion.h1>

            {/* Subhead - more intimate, less corporate */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-md text-[15px] leading-[1.9]"
              style={{ color: P.body }}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Trust indicators - softer presentation */}
            <motion.div 
              variants={fadeUp} 
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              {TRUST_STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="font-display text-lg" style={{ color: P.ink }}>{stat.value}</span>
                  <span className="text-[10px] tracking-wide" style={{ color: P.muted }}>{stat.label}</span>
                  {i < TRUST_STATS.length - 1 && (
                    <span className="ml-4 text-[10px]" style={{ color: P.line }}>|</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA - more elegant, less button-heavy */}
            <motion.div variants={fadeUp} custom={4} className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-3 text-[12px] font-medium tracking-wide transition-all duration-500"
                style={{ color: P.ink }}
              >
                <span 
                  className="flex items-center justify-center rounded-full transition-all duration-500 group-hover:gap-4"
                  style={{ 
                    background: P.ink, 
                    color: P.bg,
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <ArrowRight size={16} />
                </span>
                <span>{t("hero.cta")}</span>
                <span style={{ color: P.gold }}>{prices.essential}</span>
              </a>
              <Link
                href="#collection"
                className="text-[12px] tracking-wide transition-colors hover:text-[#9a7b4f]"
                style={{ color: P.muted }}
              >
                {t("hero.viewSamples")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${P.muted})` }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US - Elegant, editorial
───────────────────────────────────────────────────────────────── */
function WhyChooseUs() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: P.goldMuted }} />
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: P.gold }}>
                The Experience
              </p>
              <div className="h-px w-8" style={{ background: P.goldMuted }} />
            </div>
            <h2 
              className="mx-auto mt-6 max-w-2xl font-display"
              style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2 }}
            >
              A studio, not a factory.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8]" style={{ color: P.body }}>
              We take on a limited number of couples each month. Every invitation 
              receives the care and attention your wedding deserves.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {WHY_CHOOSE.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.1}>
              <div className="group flex gap-5">
                <div 
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500"
                  style={{ background: `${P.gold}10`, color: P.gold }}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 
                    className="font-display text-lg tracking-tight transition-colors duration-300 group-hover:text-[#9a7b4f]" 
                    style={{ color: P.ink }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.8]" style={{ color: P.body }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Refined social proof */}
        <SectionReveal delay={0.3}>
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={12} fill={P.gold} style={{ color: P.gold }} />
              ))}
            </div>
            <p className="text-center text-[13px]" style={{ color: P.muted }}>
              Trusted by couples across India
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLLECTION - Elegant, curated gallery
───────────────────────────────────────────────────────────────── */
function Collection() {
  return (
    <section id="collection" className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ background: P.goldMuted }} />
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: P.gold }}>
                The Collection
              </p>
              <div className="h-px w-8" style={{ background: P.goldMuted }} />
            </div>
            <h2 
              className="mx-auto mt-6 max-w-xl font-display"
              style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2 }}
            >
              Signature themes
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.8]" style={{ color: P.body }}>
              Each one is a fully working invitation. Find the style that speaks to you — we'll make it uniquely yours.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_THEMES.map((theme, i) => (
            <SectionReveal key={theme.slug} delay={i * 0.08}>
              <Link
                href={`/${theme.slug}`}
                className="group block overflow-hidden"
              >
                {/* Image - more elegant aspect ratio and reveal */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden rounded-xl"
                  style={{ background: P.bgDeep }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${theme.image})` }}
                  />
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(20,18,16,0.6) 0%, transparent 60%)" }}
                  />
                  
                  {/* Hover reveal content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-[10px] tracking-wide text-white/70">
                      {theme.couple}
                    </p>
                    <p className="text-[10px] tracking-wide text-white/50">
                      {theme.location}
                    </p>
                  </div>
                </div>

                {/* Card info - cleaner, more elegant */}
                <div className="mt-4">
                  <h3 
                    className="font-display text-lg tracking-tight transition-colors duration-300 group-hover:text-[#9a7b4f]" 
                    style={{ color: P.ink }}
                  >
                    {theme.name}
                  </h3>
                  <p className="mt-1 text-[13px]" style={{ color: P.muted }}>
                    {theme.tagline}
                  </p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Collection note */}
        <SectionReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-[14px]" style={{ color: P.body }}>
              Don't see your style? <Link href="#cta" className="transition-colors hover:text-[#9a7b4f]" style={{ color: P.ink }}>We design custom themes too.</Link>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROCESS - Clear timeline with expectations
───────────────────────────────────────────────────────────────── */
function Process() {
  return (
    <section id="process" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              How It Works
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
            >
              From vision to invite
              <br />
              <span className="font-script" style={{ color: P.gold }}>in under a week.</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.1}>
              <div 
                className="relative rounded-2xl p-6"
                style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}
              >
                <span 
                  className="font-display text-4xl"
                  style={{ color: P.goldMuted }}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg tracking-tight" style={{ color: P.ink }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: P.body }}>
                  {s.desc}
                </p>
                <div 
                  className="mt-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium tracking-wide"
                  style={{ background: `${P.gold}15`, color: P.gold }}
                >
                  {s.time}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Total timeline */}
        <SectionReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-[15px]" style={{ color: P.body }}>
              <strong style={{ color: P.ink }}>Total timeline:</strong> 3-5 days from first message to final invite
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHAT'S INCLUDED - Clear value
───────────────────────────────────────────────────────────────── */
function WhatsIncluded() {
  return (
    <section id="included" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              What's Included
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
            >
              Everything you need.
              <br />
              <span className="font-script" style={{ color: P.gold }}>Nothing you don't.</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHATS_INCLUDED.map((item, i) => (
            <SectionReveal key={item} delay={i * 0.03}>
              <div 
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: P.surface }}
              >
                <div 
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${P.gold}20`, color: P.gold }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-[14px]" style={{ color: P.ink }}>{item}</span>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4}>
          <div 
            className="mx-auto mt-12 max-w-2xl rounded-2xl p-6 text-center"
            style={{ background: `${P.gold}10`, border: `1px solid ${P.gold}30` }}
          >
            <p className="text-[14px]" style={{ color: P.ink }}>
              <strong>No hidden fees.</strong> Everything above is included in the base price. 
              Need something extra? Just ask — we're flexible.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS - Detailed social proof
───────────────────────────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              From Our Couples
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
            >
              What couples say about us.
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} fill={P.gold} style={{ color: P.gold }} />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed italic" style={{ color: P.body }}>
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <p className="font-display text-sm" style={{ color: P.ink }}>{t.couple}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: P.muted }}>{t.loc}</p>
                  <p className="mt-1 text-[10px] font-medium" style={{ color: P.gold }}>{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICING - Tiered, premium positioning
───────────────────────────────────────────────────────────────── */
const PLAN_FEATURES = {
  essential: [
    "Custom design from our collection",
    "Animated hero with your names",
    "Complete event schedule",
    "Photo gallery (up to 8 photos)",
    "Built-in RSVP collection",
    "WhatsApp-optimized sharing",
    "Mobile-first responsive design",
    "Lifetime hosting",
    "Up to 3 revisions included",
    "First draft in 3-5 days",
    "Delivered in 7 days",
  ],
  signature: [
    "Everything in Essential",
    "Fully bespoke design from scratch",
    "Your love story timeline",
    "Personalized guest names",
    "Custom domain (your-names.com)",
    "Countdown timer",
    "Interactive venue map",
    "Background music",
    "Unlimited photos",
    "Unlimited revisions",
    "First draft in 3-5 days",
    "Delivered in 7 days",
  ],
};

function Pricing({ cta }: { cta: string }) {
  const { prices, price, t } = useLocale();
  
  // Original prices (before discount) - ~20% higher
  const originalEssential = price(9999);
  const originalSignature = price(18999);
  
  const plans = [
    {
      name: t("pricing.essential"),
      price: prices.essential,
      originalPrice: originalEssential,
      tagline: t("pricing.essentialTag"),
      popular: true, // Most couples choose this
      discount: "20% OFF",
      features: PLAN_FEATURES.essential,
    },
    {
      name: t("pricing.signature"),
      price: prices.signature,
      originalPrice: originalSignature,
      tagline: t("pricing.signatureTag"),
      popular: false,
      discount: "21% OFF",
      features: PLAN_FEATURES.signature,
    },
  ];

  return (
    <section id="pricing" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              {t("nav.pricing")}
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
            >
              {t("pricing.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: P.body }}>
              {t("pricing.subtitle")}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <SectionReveal key={plan.name} delay={i * 0.08}>
              <div 
                className="relative flex h-full flex-col rounded-2xl p-7"
                style={{ 
                  background: plan.popular ? P.ink : P.surface, 
                  border: plan.popular ? "none" : `1px solid ${P.lineSoft}`,
                  boxShadow: plan.popular ? "0 30px 80px rgba(28,25,23,0.18)" : "none",
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-wide flex items-center gap-1.5"
                    style={{ background: P.gold, color: "white" }}
                  >
                    <Star size={10} fill="white" />
                    {t("pricing.mostPopular")}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <p 
                    className="text-[11px] font-medium tracking-[0.2em] uppercase"
                    style={{ color: plan.popular ? P.goldSoft : P.gold }}
                  >
                    {plan.name}
                  </p>
                  {plan.discount && (
                    <span 
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide"
                      style={{ background: "#e8f5e9", color: "#2e7d32" }}
                    >
                      {plan.discount}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span 
                    className="text-base line-through opacity-50"
                    style={{ color: plan.popular ? "#ffffff" : P.muted }}
                  >
                    {plan.originalPrice}
                  </span>
                  <span 
                    className="font-display text-4xl tracking-tight"
                    style={{ color: plan.popular ? "#ffffff" : P.ink }}
                  >
                    {plan.price}
                  </span>
                </div>
                <p 
                  className="mt-1 text-[13px]"
                  style={{ color: plan.popular ? "rgba(255,255,255,0.6)" : P.muted }}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check 
                        size={14} 
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: plan.popular ? P.goldSoft : P.gold }} 
                      />
                      <span 
                        className="text-[13px] leading-snug"
                        style={{ color: plan.popular ? "rgba(255,255,255,0.85)" : P.body }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={cta}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[12px] font-medium tracking-wide transition-all duration-300"
                  style={{ 
                    background: plan.popular ? P.gold : P.ink, 
                    color: plan.popular ? "white" : P.bg,
                  }}
                >
                  <MessageCircle size={14} />
                  {t("pricing.getStarted")}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Guarantee + Custom domain note */}
        <SectionReveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-5 py-2"
              style={{ background: `${P.gold}12`, border: `1px solid ${P.gold}25` }}
            >
              <Shield size={14} style={{ color: P.gold }} />
              <span className="text-[12px]" style={{ color: P.ink }}>
                <strong>100% Satisfaction Guarantee.</strong> Full refund if you're not happy.
              </span>
            </div>
            <p className="mt-4 text-[13px]" style={{ color: P.muted }}>
              Custom domain (like <strong style={{ color: P.body }}>meera-and-aarav.com</strong>) included in Signature.
            </p>
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
                  <form onSubmit={(e) => { 
                    e.preventDefault();
                    const subject = encodeURIComponent(`Wedding Inquiry from ${form.name}`);
                    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`);
                    window.open(`mailto:abhishekprajapatiad@gmail.com?subject=${subject}&body=${body}`);
                    setSent(true); 
                  }} className="space-y-5">
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

              {/* Contact options */}
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>
                  Or reach us directly
                </p>
                <div className="mt-6 space-y-4 w-full">
                  <a
                    href={cta}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-300"
                    style={{ background: "#25D366", color: "white" }}
                  >
                    <MessageCircle size={16} />
                    Message on WhatsApp
                  </a>
                  <a
                    href="mailto:abhishekprajapatiad@gmail.com?subject=Wedding%20Invitation%20Inquiry"
                    className="group flex w-full items-center justify-center gap-3 rounded-full border px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-300 hover:border-[#9a7b4f]"
                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
                  >
                    <Send size={14} />
                    Email Us
                  </a>
                </div>
                <p className="mt-4 text-[11px]" style={{ color: P.muted }}>
                  abhishekprajapatiad@gmail.com
                </p>
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
function Footer({ cta }: { cta: string }) {
  return (
    <footer className="px-6 py-16 sm:px-10" style={{ background: P.bg, borderTop: `1px solid ${P.line}` }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: P.gold, color: "white" }}>
            <Sparkles size={14} />
          </span>
          <span className="font-display text-xl tracking-tight" style={{ color: P.ink }}>The Digital Inviters</span>
        </div>
        <p className="mt-3 font-script text-lg" style={{ color: P.gold }}>
          Invitations, crafted with intention.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a href={cta} target="_blank" rel="noreferrer" className="text-[11px] tracking-wide transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>WhatsApp</a>
          <span style={{ color: P.line }}>·</span>
          <a href="mailto:abhishekprajapatiad@gmail.com" className="text-[11px] tracking-wide transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>Email</a>
        </div>
        <p className="mt-6 text-[10px] tracking-wide" style={{ color: P.muted }}>
          © {new Date().getFullYear()} The Digital Inviters. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────── */
export default function PortfolioHome() {
  const { prices, t } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20wedding%20invitation.`;

  return (
    <main className="relative" style={{ background: P.bg, color: P.ink }}>
      <Nav cta={cta} />
      <Hero cta={cta} />
      <WhyChooseUs />
      <Collection />
      <Process />
      <WhatsIncluded />
      <Testimonials />
      <Pricing cta={cta} />
      <Faq />
      <Cta cta={cta} />
      <Footer cta={cta} />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 md:hidden" />

      {/* Premium Mobile Sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:hidden" style={{ background: `linear-gradient(to top, ${P.bg} 80%, transparent)` }}>
        <a
          href={cta}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-3 rounded-full py-4 text-[13px] font-medium tracking-wide shadow-lg"
          style={{ background: P.ink, color: P.bg }}
        >
          <MessageCircle size={18} />
          {t("cta.mobile")} — {prices.essential}
          <ArrowRight size={14} />
        </a>
      </div>
    </main>
  );
}
