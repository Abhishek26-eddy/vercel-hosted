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
  CheckCircle2,
  ChevronDown,
  Send,
  Play,
  Shield,
  Sparkles,
  Star,
  Zap,
  Gift,
  RefreshCw,
  Globe,
  HeartHandshake,
  Award,
  Check,
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
   TRUST-FOCUSED DATA
───────────────────────────────────────────────────────────────── */

const TRUST_STATS = [
  { value: "150+", label: "Couples Served" },
  { value: "24h", label: "First Draft" },
  { value: "100%", label: "Satisfaction" },
];

const WHY_CHOOSE = [
  {
    icon: HeartHandshake,
    title: "Dedicated Designer",
    desc: "One designer works with you from start to finish. No handoffs, no miscommunication.",
  },
  {
    icon: Zap,
    title: "Rapid Turnaround",
    desc: "First draft in 24 hours. Most couples have their final invite within 3-5 days.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    desc: "We refine until you're completely satisfied. No revision limits, no extra charges.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    desc: "If you're not happy with the direction, we'll refund you. No questions asked.",
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
    loc: "Mumbai · December 2024",
    detail: "Royal Palace Theme",
  },
  {
    quote: "The attention to detail was extraordinary. Every animation, every word felt intentional. Our families were genuinely impressed.",
    couple: "Ananya & Karthik", 
    loc: "Chennai · November 2024",
    detail: "South Indian Temple Theme",
  },
  {
    quote: "We wanted something that felt like us — modern but rooted in tradition. They nailed it on the first try.",
    couple: "Priya & Rohan",
    loc: "Bangalore · January 2025",
    detail: "Minimal Elegant Theme",
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
   NAVIGATION - Premium, confident
───────────────────────────────────────────────────────────────── */
function Nav({ cta }: { cta: string }) {
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
          {[
            ["Collection", "#collection"],
            ["How It Works", "#process"],
            ["What's Included", "#included"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] tracking-wide transition-colors hover:text-[#9a7b4f]"
              style={{ color: P.body }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={cta}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 hover:border-[#9a7b4f] sm:flex"
            style={{ borderColor: P.line, color: P.ink }}
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <a
            href="#pricing"
            className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 hover:gap-3"
            style={{ background: P.ink, color: P.bg }}
          >
            Get Started
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
              We design bespoke digital wedding invitations that guests screenshot, 
              share, and remember. Crafted around your unique story. Animated with cinematic intention.
            </motion.p>

            {/* Trust indicators */}
            <motion.div 
              variants={fadeUp} 
              custom={2.5}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-display text-xl" style={{ color: P.ink }}>{stat.value}</span>
                  <span className="text-[11px] tracking-wide uppercase" style={{ color: P.muted }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium tracking-wide transition-all duration-500 hover:gap-4"
                style={{ 
                  background: P.ink, 
                  color: P.bg,
                  boxShadow: "0 20px 50px rgba(28,25,23,0.15)",
                }}
              >
                Start Your Invite — ₹4,999
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="#collection"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-4 text-[12px] font-medium tracking-wide transition-colors hover:border-[#9a7b4f]"
                style={{ color: P.body, borderColor: P.line }}
              >
                View Sample Invites
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
   WHY CHOOSE US - Trust building
───────────────────────────────────────────────────────────────── */
function WhyChooseUs() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              Why Couples Choose Us
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
            >
              A boutique studio approach.
              <br />
              <span className="font-script" style={{ color: P.gold }}>Not a template factory.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: P.body }}>
              We work with a limited number of couples each month to ensure every invitation 
              receives the attention it deserves. Your wedding is unique — your invite should be too.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-20 grid gap-8 sm:grid-cols-2">
          {WHY_CHOOSE.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.08}>
              <div 
                className="rounded-2xl p-8 transition-shadow duration-300 hover:shadow-lg"
                style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}
              >
                <div 
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `${P.gold}15`, color: P.gold }}
                >
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl tracking-tight" style={{ color: P.ink }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: P.body }}>
                  {item.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Social proof bar */}
        <SectionReveal delay={0.3}>
          <div 
            className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl px-8 py-6"
            style={{ background: P.bgAlt }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div 
                    key={n}
                    className="h-8 w-8 rounded-full border-2"
                    style={{ 
                      background: `hsl(${n * 40}, 30%, 85%)`,
                      borderColor: P.bgAlt,
                    }}
                  />
                ))}
              </div>
              <span className="ml-2 text-[13px]" style={{ color: P.body }}>
                <strong style={{ color: P.ink }}>150+ couples</strong> have trusted us
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={14} fill={P.gold} style={{ color: P.gold }} />
              ))}
              <span className="ml-1 text-[13px]" style={{ color: P.body }}>
                <strong style={{ color: P.ink }}>5.0</strong> average rating
              </span>
            </div>
          </div>
        </SectionReveal>
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

                {/* Footer with CTA */}
                <div className="flex items-center justify-between p-5" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <div>
                    <span className="text-[11px] font-medium tracking-wide" style={{ color: P.gold }}>
                      Preview This Style
                    </span>
                    <p className="mt-0.5 text-[10px]" style={{ color: P.muted }}>
                      Tap to explore the full invite
                    </p>
                  </div>
                  <span 
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[#1c1917] group-hover:text-white"
                    style={{ background: P.bgAlt, color: P.ink }}
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Collection CTA */}
        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-[15px]" style={{ color: P.body }}>
              Don't see your style? <strong style={{ color: P.ink }}>We design custom themes too.</strong>
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
              Trusted by 150+ Couples
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
          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
   PRICING - Premium positioning with guarantee
───────────────────────────────────────────────────────────────── */
function Pricing({ cta }: { cta: string }) {
  return (
    <section id="pricing" className="px-6 py-28 sm:px-10 sm:py-36" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: P.gold }}>
              Simple, Transparent Pricing
            </p>
            <h2 
              className="mt-5 font-display tracking-tight"
              style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}
            >
              One price. Everything included.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: P.body }}>
              No tiers to compare. No hidden fees. No upsells. Just a beautiful invite, crafted for you.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div 
            className="mt-14 rounded-3xl p-8 sm:p-12"
            style={{ background: P.surface, boxShadow: "0 30px 80px rgba(28,25,23,0.08)", border: `1px solid ${P.lineSoft}` }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: Price and CTA */}
              <div>
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase" style={{ color: P.gold }}>
                  Complete Digital Invitation
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl tracking-tight" style={{ color: P.ink }}>₹4,999</span>
                </div>
                <p className="mt-2 text-[13px]" style={{ color: P.muted }}>
                  One-time payment · No subscriptions
                </p>
                
                <p className="mt-6 text-[15px] leading-relaxed" style={{ color: P.body }}>
                  A fully bespoke digital wedding invitation, designed around your story, 
                  with unlimited revisions until you're completely satisfied.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={cta}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-[13px] font-medium tracking-wide transition-all duration-300"
                    style={{ background: P.ink, color: P.bg }}
                  >
                    <MessageCircle size={16} />
                    Start on WhatsApp
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="text-center text-[11px]" style={{ color: P.muted }}>
                    Usually responds within 2 hours
                  </p>
                </div>

                {/* Guarantee */}
                <div 
                  className="mt-8 flex items-start gap-3 rounded-xl p-4"
                  style={{ background: `${P.gold}08`, border: `1px solid ${P.gold}20` }}
                >
                  <Shield size={18} style={{ color: P.gold }} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: P.ink }}>
                      100% Satisfaction Guarantee
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: P.body }}>
                      Not happy with the direction? Full refund, no questions asked.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: What's included summary */}
              <div>
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase" style={{ color: P.gold }}>
                  What You Get
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Fully custom design based on your theme",
                    "Animated hero with names & countdown",
                    "Your love story timeline",
                    "Complete event schedule",
                    "Photo gallery section",
                    "Built-in RSVP collection",
                    "Personalized guest names",
                    "WhatsApp-optimized sharing",
                    "Lifetime hosting included",
                    "Unlimited revisions",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check size={14} style={{ color: P.gold }} />
                      <span className="text-[14px]" style={{ color: P.ink }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-6 border-t pt-6" style={{ borderColor: P.lineSoft }}>
                  {[["24h", "First Draft"], ["3-5 days", "Delivery"], ["∞", "Revisions"]].map(([v, l]) => (
                    <div key={l}>
                      <p className="font-display text-lg" style={{ color: P.ink }}>{v}</p>
                      <p className="text-[10px] tracking-wide uppercase" style={{ color: P.muted }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
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
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20wedding%20invitation.`;

  return (
    <main style={{ background: P.bg, color: P.body }}>
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
      <Footer />

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
          Start Your Invite — ₹4,999
          <ArrowRight size={14} />
        </a>
      </div>
    </main>
  );
}
