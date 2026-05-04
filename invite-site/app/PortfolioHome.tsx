"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Shield,
  Star,
  Check,
  Heart,
  Clock,
  Palette,
  Users,
  Award,
  Sparkles,
  MapPin,
  Music,
  Image as ImageIcon,
  Gift,
  Smartphone,
  Menu,
  X,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import type { ThemeFamily } from "@/lib/portfolioThemes";
import { LocaleSelectors } from "@/components/LocaleSelectors";
import { useLocale } from "@/components/LocaleProvider";

/* ─────────────────────────────────────────────────────────────
   PREMIUM BOUTIQUE PALETTE
───────────────────────────────────────────────────────────────── */
const P = {
  bg: "#faf8f4",
  bgAlt: "#f5f1eb",
  bgDeep: "#ece7de",
  surface: "#fffdfb",
  ink: "#1a1816",
  body: "#57504a",
  muted: "#9a9189",
  subtle: "#d4cfc7",
  gold: "#9c7f54",
  goldSoft: "#bfa97c",
  goldMuted: "#e0d6c4",
  line: "#e8e3db",
  lineSoft: "#f2efe9",
  noir: "#110f0d",
  noirSoft: "#1c1a17",
};

const HERO_IMG = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90";

/* ─── DATA ─── */
const FAMILIES: { key: ThemeFamily | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "floral", label: "Floral" },
  { key: "royal", label: "Royal" },
  { key: "editorial", label: "Editorial" },
  { key: "destination", label: "Destination" },
  { key: "festive", label: "Festive" },
  { key: "traditional", label: "Traditional" },
  { key: "dramatic", label: "Dramatic" },
  { key: "romantic", label: "Romantic" },
];

const TESTIMONIALS = [
  { quote: "Our guests didn't just open it — they screenshot it, talked about it at the wedding, and kept coming back to it. It genuinely felt like the trailer for our wedding.", couple: "Shreya & Dev", loc: "Mumbai", detail: "Royal Palace · Luxe", rating: 5 },
  { quote: "The attention to detail was extraordinary. Every animation, every word felt intentional. Our families — including the skeptical ones — were genuinely impressed.", couple: "Ananya & Karthik", loc: "Chennai", detail: "Soft Botanical · Basic", rating: 5 },
  { quote: "We got compliments for months. People thought we hired a full design agency. It was just The Digital Inviters and their magic.", couple: "Simran & Aryan", loc: "Delhi", detail: "Modern Gold · Basic", rating: 5 },
  { quote: "Worth every rupee. The love story section made my fiancé cry. Our guests said it was the most beautiful invite they'd ever received.", couple: "Meera & Aarav", loc: "Udaipur", detail: "Paris Romance · Luxe", rating: 5 },
  { quote: "From choosing the design to getting the final link — everything was seamless. They even made last-minute venue changes for free. True professionals.", couple: "Priya & Rahul", loc: "Delhi", detail: "Traditional Red & Gold · Basic", rating: 5 },
  { quote: "We compared 5 different services before choosing The Digital Inviters. No one else had this level of design quality at this price. Absolutely stunning.", couple: "Kavya & Rohan", loc: "Bangalore", detail: "Cherry Blossom · Luxe", rating: 5 },
];

const STATS = [
  { value: "1,200+", label: "Invites Delivered", icon: Gift },
  { value: "80+", label: "Cities Across India", icon: MapPin },
  { value: "24h", label: "Average Delivery", icon: Clock },
  { value: "4.9★", label: "Couple Rating", icon: Star },
];

const FAQ = [
  { q: "What's the difference between Basic, Luxe, and Signature?", a: "Basic (₹1,499) gives you a beautifully designed invite with your details, event schedule, RSVP, and photo gallery — everything you need. Luxe (₹3,499) adds background music, countdown timer, love story, venue map, custom guest names, and premium animations. Signature (₹9,999) is fully bespoke — custom design, domain, unlimited revisions, and a dedicated designer." },
  { q: "How does the process work?", a: "Choose a design from our collection, fill in your wedding details, preview your invite, and pay via UPI. We finalize and deliver your unique shareable link within 24 hours (Basic) or same day (Luxe)." },
  { q: "How do guests view the invitation?", a: "Each guest receives a unique URL. They simply tap to open — no app downloads, no sign-ups. Works beautifully on WhatsApp, Instagram, email, or any platform." },
  { q: "Is hosting included?", a: "Yes, lifetime hosting is included in every plan at no extra cost. Your invite stays live forever — a digital keepsake for you and your guests." },
  { q: "Can I make changes after it's live?", a: "Absolutely. Need to update a venue, date, or add a new event? Just message us. Free edits are included in all plans." },
  { q: "What's your revision policy?", a: "Basic includes 3 free revisions. Luxe includes unlimited revisions until you're delighted. Signature comes with a dedicated designer and unlimited iterations." },
  { q: "What if I'm not happy with the result?", a: "Your satisfaction is our priority. If the invite doesn't feel right, we'll rework it. If we still can't get it right, full refund — no questions asked." },
  { q: "Can I upgrade later?", a: "Yes! If you start with Basic and decide you want Luxe features later, just pay the difference. We'll upgrade your invite seamlessly." },
];

/* ─── Motion ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12 } }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/* ─────────────────────────────────────────────────────────────
   NAV — Premium with mobile drawer
───────────────────────────────────────────────────────────────── */
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: "Collection", href: "#catalogue" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-10 sm:py-4"
        style={{ background: `${P.bg}F2`, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${P.lineSoft}` }}
      >
        <Link href="/" className="flex items-center gap-2" style={{ color: P.ink }}>
          <Heart size={15} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-[15px] sm:text-[17px] tracking-tight">The Digital Inviters</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-[12px] tracking-[0.04em] transition-colors hover:text-[#9a7b4f]" style={{ color: P.body }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:block"><LocaleSelectors /></div>
          <Link href="/builder"
            className="group hidden sm:flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.06em] transition-all duration-300 hover:gap-3"
            style={{ background: P.ink, color: P.bg }}
          >
            Create Invitation
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex items-center justify-center rounded-lg p-2 lg:hidden" style={{ color: P.ink }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="px-5 pb-6 pt-2 lg:hidden"
          style={{ background: P.bg, borderBottom: `1px solid ${P.line}` }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="text-[14px] font-medium" style={{ color: P.ink }}>
                {item.label}
              </Link>
            ))}
            <Link href="/builder" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold tracking-wide mt-2"
              style={{ background: P.ink, color: P.bg }}
            >
              Create Invitation <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — Cinematic, emotional, mobile-first
───────────────────────────────────────────────────────────────── */
function Hero() {
  const { prices } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY, opacity: imgOpacity }}>
        <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${P.bg} 0%, ${P.bg}F8 25%, ${P.bg}E0 50%, ${P.bg}90 75%, transparent 100%)` }} />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-24 pt-28 sm:px-10 sm:pb-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl sm:max-w-2xl">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
              <div className="h-px w-8 sm:w-10" style={{ background: P.gold }} />
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: P.gold }}>Boutique Wedding Invitations</p>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="mt-6 sm:mt-7 font-display" style={{ color: P.ink, fontSize: "clamp(2rem, 7vw, 4.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Your love story,
              <br />
              <span className="font-script" style={{ color: P.gold, fontSize: "0.9em" }}>beautifully told.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-5 sm:mt-6 max-w-md text-[14px] sm:text-[15px] leading-[1.85]" style={{ color: P.body }}>
              We craft bespoke digital invitations that capture the essence of your story. Every detail, every animation — designed to move the people you love.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <Link href="#catalogue" className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[12px] sm:text-[13px] font-semibold tracking-[0.04em] transition-all duration-500 hover:gap-4" style={{ background: P.ink, color: P.bg }}>
                Explore Collection
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-[13px] font-medium text-center sm:text-left" style={{ color: P.gold }}>Starting from {prices.basic}</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust stats bar */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pb-6 sm:pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5" style={{ background: `${P.surface}E8`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: `1px solid ${P.lineSoft}` }}>
                <s.icon size={16} style={{ color: P.gold }} />
                <div>
                  <p className="font-display text-[15px] sm:text-[17px] leading-none" style={{ color: P.ink }}>{s.value}</p>
                  <p className="text-[9px] sm:text-[10px] tracking-wide mt-0.5" style={{ color: P.muted }}>{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGNATURE SHOWCASE — Ultra-premium brand builder
───────────────────────────────────────────────────────────────── */
function SignatureShowcase() {
  const { prices } = useLocale();
  const signatureThemes = PORTFOLIO_THEMES.filter(t => t.tier === "signature");
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27m%20interested%20in%20a%20Signature%20bespoke%20invitation.`;

  return (
    <section className="relative overflow-hidden" style={{ background: P.noir }}>
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(156,127,84,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(191,169,124,0.05) 0%, transparent 50%)" }} />

      <div className="relative px-5 py-20 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2" style={{ border: `1px solid rgba(156,127,84,0.25)`, background: "rgba(156,127,84,0.06)" }}>
                <Sparkles size={11} style={{ color: P.goldSoft }} />
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.35em] uppercase" style={{ color: P.goldSoft }}>Signature Collection · By Appointment</span>
              </div>
              <h2 className="mt-7 sm:mt-8 font-display text-white" style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)", lineHeight: 1.05 }}>
                For the wedding that
                <br />
                <span className="font-script" style={{ color: P.goldSoft }}>refuses to be ordinary.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[13px] sm:text-[14px] leading-[1.9]" style={{ color: "rgba(255,255,255,0.45)" }}>
                Each Signature invite is a one-of-one creation — custom-designed, hand-directed, and built from the ground up for your story. No templates. No limitations.
              </p>
            </div>
          </SectionReveal>

          {/* Featured hero piece — first signature theme, editorial width */}
          {signatureThemes[0] && (
            <SectionReveal delay={0.15}>
              <div className="mt-14 sm:mt-20 group relative overflow-hidden rounded-2xl sm:rounded-3xl" style={{ border: "1px solid rgba(156,127,84,0.2)" }}>
                <div className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden">
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${signatureThemes[0].image})` }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)" }} />
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-8">
                    <span className="rounded-full px-3 py-1 text-[7px] sm:text-[8px] font-bold tracking-[0.25em] uppercase" style={{ background: P.gold, color: "white" }}>Flagship · Bespoke</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10">
                    <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: P.goldSoft }}>{signatureThemes[0].mood}</p>
                    <h3 className="mt-2 font-display text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", lineHeight: 1.1 }}>{signatureThemes[0].name}</h3>
                    <p className="mt-2 max-w-md text-[12px] sm:text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.6)" }}>{signatureThemes[0].shortDescription}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link href={`/palace-heirloom`} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-all hover:scale-[1.02]" style={{ background: P.gold, color: "white" }}>
                        Experience this design <ArrowRight size={11} />
                      </Link>
                      <span className="text-[11px] font-display" style={{ color: P.goldSoft }}>from {prices.signature}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Remaining signatures — side by side */}
          {signatureThemes.length > 1 && (
            <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2">
              {signatureThemes.slice(1).map((theme, i) => (
                <SectionReveal key={theme.slug} delay={0.2 + i * 0.1}>
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ border: "1px solid rgba(156,127,84,0.18)" }}>
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                      <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="rounded-full px-2.5 py-0.5 text-[7px] font-bold tracking-[0.2em] uppercase" style={{ background: P.gold, color: "white" }}>Bespoke</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                        <p className="text-[8px] font-bold tracking-[0.25em] uppercase" style={{ color: P.goldSoft }}>{theme.mood}</p>
                        <h3 className="mt-1.5 font-display text-lg sm:text-xl text-white">{theme.name}</h3>
                        <p className="mt-1.5 text-[11px] sm:text-[12px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.6)" }}>{theme.tagline}</p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          <SectionReveal delay={0.4}>
            <div className="mt-12 sm:mt-16 flex flex-col items-center gap-5">
              <div className="flex items-center gap-6 text-[10px] sm:text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {["Custom domain", "Dedicated designer", "Unlimited revisions", "2-week delivery"].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    {i > 0 && <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.15)" }}>·</span>}
                    <Check size={9} style={{ color: P.goldSoft }} /> {s}
                  </span>
                ))}
              </div>
              <a href={cta} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-[11px] sm:text-[12px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                style={{ background: P.gold, color: "white" }}
              >
                <MessageCircle size={13} />
                Book a Signature Consultation
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Only 3 Signature slots available this month</p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATALOGUE — Curated collection with family + tier filtering
───────────────────────────────────────────────────────────────── */
function Catalogue() {
  const { prices } = useLocale();
  const [activeFamily, setActiveFamily] = useState<ThemeFamily | "all">("all");
  const [activeTier, setActiveTier] = useState<"all" | "basic" | "luxe">("all");

  const filteredThemes = PORTFOLIO_THEMES
    .filter(t => t.tier !== "signature")
    .filter(t => activeTier === "all" || t.tier === activeTier)
    .filter(t => activeFamily === "all" || t.family === activeFamily);

  const tierPrice = (tier: string) => tier === "luxe" ? prices.luxe : prices.basic;
  const tierBadge = (tier: string) => tier === "luxe"
    ? { label: "LUXE", bg: "linear-gradient(135deg, #1c1208, #3a2a14)", color: "#e0c080" }
    : { label: "BASIC", bg: P.surface, color: P.muted };

  return (
    <section id="catalogue" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Our Collection</p>
            <h2 className="mx-auto mt-4 sm:mt-5 max-w-xl font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.1 }}>
              Find the design that <span className="font-script" style={{ color: P.gold }}>tells your story.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[13px] sm:text-[14px] leading-[1.7]" style={{ color: P.body }}>
              {PORTFOLIO_THEMES.filter(t => t.tier !== "signature").length} curated designs across {FAMILIES.length - 1} families. Every theme is individually art-directed.
            </p>
          </div>
        </SectionReveal>

        {/* Tier filter */}
        <SectionReveal delay={0.06}>
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 flex-wrap">
            {([["all", "All Designs"], ["basic", `Basic · ${prices.basic}`], ["luxe", `Luxe · ${prices.luxe}`]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setActiveTier(key)}
                className="rounded-full px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-semibold tracking-wide transition-all duration-300"
                style={{
                  background: activeTier === key ? P.ink : "transparent",
                  color: activeTier === key ? P.bg : P.body,
                  border: `1px solid ${activeTier === key ? P.ink : P.line}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Family filter — scrollable on mobile */}
        <SectionReveal delay={0.1}>
          <div className="mt-3 sm:mt-4 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 sm:flex-wrap min-w-max sm:min-w-0">
              {FAMILIES.map(f => (
                <button key={f.key} onClick={() => setActiveFamily(f.key)}
                  className="rounded-full px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide transition-all whitespace-nowrap"
                  style={{ color: activeFamily === f.key ? P.gold : P.muted, background: activeFamily === f.key ? `${P.gold}12` : "transparent" }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Collection grid — 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredThemes.map((theme, i) => {
            const isLuxe = theme.tier === "luxe";
            const tb = tierBadge(theme.tier);
            return (
            <SectionReveal key={theme.slug} delay={i * 0.03}>
              <div className="group">
                <Link href={`/builder?template=${theme.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ background: P.bgDeep, border: isLuxe ? `1px solid ${P.goldMuted}` : `1px solid ${P.lineSoft}` }}>
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
                        <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.12em]"
                          style={{ background: tb.bg, color: tb.color, border: !isLuxe ? `1px solid ${P.line}` : "none" }}
                        >
                          {tb.label}
                        </span>
                        {theme.badge && (
                          <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.08em] shadow-sm backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.92)", color: P.ink }}>{theme.badge}</span>
                        )}
                      </div>

                      {/* Mood tag — bottom-left over image */}
                      {theme.mood && (
                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                          <span className="rounded-full px-2 py-0.5 text-[7px] sm:text-[8px] font-medium tracking-wide backdrop-blur-md" style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.85)" }}>{theme.mood}</span>
                        </div>
                      )}

                      {/* Hover CTA — hidden on mobile (tap navigates) */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
                        <div className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[10px] font-semibold tracking-wide shadow-lg backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.95)", color: P.ink }}>
                          Choose this design <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>

                    {/* Info strip below image */}
                    <div className="p-2.5 sm:p-3.5" style={{ background: isLuxe ? `${P.ink}` : P.surface }}>
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-display text-[12px] sm:text-[14px] tracking-tight truncate" style={{ color: isLuxe ? "#fff" : P.ink }}>{theme.name}</h3>
                        <span className="text-[10px] sm:text-[12px] font-semibold flex-shrink-0" style={{ color: isLuxe ? P.goldSoft : P.gold }}>{tierPrice(theme.tier)}</span>
                      </div>
                      <p className="mt-0.5 text-[9px] sm:text-[11px] italic truncate" style={{ color: isLuxe ? "rgba(255,255,255,0.5)" : P.muted }}>{theme.tagline}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </SectionReveal>
            );
          })}
        </div>

        {filteredThemes.length === 0 && (
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-[13px] sm:text-[14px]" style={{ color: P.muted }}>No designs match this filter. Try a different combination.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHAT'S INCLUDED — Clear deliverables per tier
───────────────────────────────────────────────────────────────── */
function WhatsIncluded() {
  const basicFeatures = [
    { icon: Palette, text: "Curated design template" },
    { icon: Users, text: "Names, date & venue details" },
    { icon: Clock, text: "Complete event schedule" },
    { icon: ImageIcon, text: "Photo gallery (up to 8)" },
    { icon: MessageCircle, text: "Built-in RSVP collection" },
    { icon: Smartphone, text: "WhatsApp & Instagram sharing" },
    { icon: Shield, text: "Lifetime hosting included" },
    { icon: Gift, text: "3 free revisions" },
  ];
  const luxeExtras = [
    { icon: Music, text: "Background music & sound" },
    { icon: Clock, text: "Live countdown timer" },
    { icon: Heart, text: "Your love story timeline" },
    { icon: MapPin, text: "Interactive venue map" },
    { icon: ImageIcon, text: "Unlimited photo gallery" },
    { icon: Sparkles, text: "Premium animations" },
    { icon: Award, text: "Unlimited revisions" },
    { icon: Clock, text: "Same-day delivery" },
  ];

  return (
    <section id="process" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>What You Get</p>
            <h2 className="mt-4 sm:mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: 1.15 }}>
              Everything included.
              <br />
              <span className="font-script" style={{ color: P.gold }}>No surprises.</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2">
          <SectionReveal delay={0.05}>
            <div className="rounded-2xl p-6 sm:p-7 h-full" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
              <span className="inline-block rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ background: P.lineSoft, color: P.muted }}>Basic</span>
              <p className="mt-3 font-display text-[15px] sm:text-[17px]" style={{ color: P.ink }}>Everything you need, beautifully done</p>
              <div className="mt-5 space-y-3">
                {basicFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <f.icon size={14} style={{ color: P.gold }} />
                    <span className="text-[12px] sm:text-[13px]" style={{ color: P.body }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-2xl p-6 sm:p-7 h-full" style={{ background: P.ink }}>
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ background: P.gold, color: "white" }}>Luxe</span>
                <span className="text-[9px] font-semibold tracking-wide" style={{ color: P.goldSoft }}>Most Popular</span>
              </div>
              <p className="mt-3 font-display text-[15px] sm:text-[17px] text-white">Everything in Basic, plus:</p>
              <div className="mt-5 space-y-3">
                {luxeExtras.map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <f.icon size={14} style={{ color: P.goldSoft }} />
                    <span className="text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.8)" }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS — Process clarity
───────────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose a design", desc: "Browse our curated collection. Filter by style, tier, or family.", icon: Palette },
    { n: "02", title: "Fill in your details", desc: "Names, dates, venues, events. Preview live as you type.", icon: Users },
    { n: "03", title: "Pay via UPI", desc: "One-time payment. No subscriptions or hidden fees.", icon: Shield },
    { n: "04", title: "Receive & share", desc: "Your unique invite link delivered within 24 hours.", icon: Gift },
  ];

  return (
    <section className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>How It Works</p>
            <h2 className="mt-4 sm:mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: 1.15 }}>
              Four simple steps to <span className="font-script" style={{ color: P.gold }}>your invite.</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.08}>
              <div className="relative rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full" style={{ background: `${P.gold}12` }}>
                  <s.icon size={16} style={{ color: P.gold }} />
                </div>
                <span className="mt-3 block font-display text-3xl sm:text-4xl" style={{ color: P.goldMuted }}>{s.n}</span>
                <h3 className="mt-2 font-display text-[14px] sm:text-[16px] tracking-tight" style={{ color: P.ink }}>{s.title}</h3>
                <p className="mt-1.5 text-[11px] sm:text-[13px] leading-[1.7]" style={{ color: P.body }}>{s.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS — Horizontal scroll on mobile, grid on desktop
───────────────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bg }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Love Notes</p>
            <h2 className="mt-4 sm:mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)", lineHeight: 1.15 }}>
              From {TESTIMONIALS.length * 80}+ happy couples.
            </h2>
          </div>
        </SectionReveal>

        {/* Horizontal scroll on mobile, 2-col grid on desktop */}
        <div className="mt-10 sm:mt-14 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 min-w-max sm:min-w-0">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="w-[300px] sm:w-auto rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col h-full" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, n) => <Star key={n} size={11} fill={P.gold} style={{ color: P.gold }} />)}
                  </div>
                  <p className="text-[13px] sm:text-[14px] leading-[1.8] italic flex-1" style={{ color: P.body }}>&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <p className="font-display text-[13px]" style={{ color: P.ink }}>{t.couple}</p>
                    <p className="mt-0.5 text-[10px] sm:text-[11px]" style={{ color: P.muted }}>{t.loc} · {t.detail}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICING — 3 tiers with Signature
───────────────────────────────────────────────────────────────── */
function Pricing({ cta }: { cta: string }) {
  const { prices } = useLocale();

  const plans = [
    {
      name: "Basic",
      price: prices.basic,
      tagline: "A beautiful invitation. No compromises.",
      popular: false,
      dark: false,
      features: ["15+ curated designs to choose from", "Your names, date & venue details", "Complete event schedule", "Photo gallery (up to 8 photos)", "Built-in RSVP collection", "WhatsApp & Instagram ready", "Mobile-first responsive design", "Lifetime hosting included", "3 free revisions", "Delivered within 24 hours"],
      ctaText: "Start with Basic",
      ctaLink: "/builder",
    },
    {
      name: "Luxe",
      price: prices.luxe,
      tagline: "The full cinematic experience.",
      popular: true,
      dark: true,
      features: ["Everything in Basic, plus:", "Background music & atmosphere", "Live countdown timer", "Your love story timeline", "Interactive venue map", "Unlimited photo gallery", "Premium animations & transitions", "Custom guest names", "Unlimited revisions", "Same-day priority delivery"],
      ctaText: "Start with Luxe",
      ctaLink: "/builder",
    },
    {
      name: "Signature",
      price: prices.signature,
      tagline: "One-of-one. Designed from scratch.",
      popular: false,
      dark: false,
      features: ["Everything in Luxe, plus:", "Custom design — no templates", "Your own domain (your-names.com)", "Dedicated designer assigned", "Unlimited iterations until perfect", "Custom illustrations & motion", "Multi-page editorial experience", "Guest portal & RSVP dashboard", "Wedding day itinerary page", "2-week white-glove delivery"],
      ctaText: "Book Consultation",
      ctaLink: cta,
    },
  ];

  return (
    <section id="pricing" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Pricing</p>
            <h2 className="mt-4 sm:mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.1 }}>
              Choose your <span className="font-script" style={{ color: P.gold }}>experience.</span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-lg text-[13px] sm:text-[14px] leading-[1.8]" style={{ color: P.body }}>
              One-time payment. No subscriptions. No hidden charges. Lifetime hosting included in every plan.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 sm:mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <SectionReveal key={plan.name} delay={i * 0.1}>
              <div className="relative flex h-full flex-col rounded-xl sm:rounded-2xl p-5 sm:p-7"
                style={{
                  background: plan.dark ? P.ink : P.surface,
                  border: plan.dark ? "none" : `1px solid ${P.lineSoft}`,
                  boxShadow: plan.dark ? "0 30px 80px rgba(20,18,14,0.2)" : "none",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[9px] font-bold tracking-wide" style={{ background: P.gold, color: "white" }}>
                    <Star size={9} fill="white" /> MOST POPULAR
                  </div>
                )}

                <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: plan.dark ? P.goldSoft : P.gold }}>{plan.name}</p>

                <div className="mt-3">
                  <span className="font-display text-3xl tracking-tight" style={{ color: plan.dark ? "#fff" : P.ink }}>{plan.price}</span>
                  <span className="ml-2 text-[11px]" style={{ color: plan.dark ? "rgba(255,255,255,0.4)" : P.muted }}>one-time</span>
                </div>

                <p className="mt-1.5 text-[12px]" style={{ color: plan.dark ? "rgba(255,255,255,0.55)" : P.body }}>{plan.tagline}</p>

                <div className="mt-5 flex-1 space-y-2">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: plan.dark ? P.goldSoft : P.gold }} />
                      <span className="text-[11px] leading-snug" style={{ color: plan.dark ? "rgba(255,255,255,0.8)" : P.body }}>{f}</span>
                    </div>
                  ))}
                </div>

                {plan.name === "Signature" ? (
                  <a href={plan.ctaLink} target="_blank" rel="noreferrer"
                    className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[11px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                    style={{ background: P.gold, color: "white" }}
                  >
                    <MessageCircle size={12} /> {plan.ctaText}
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <Link href={plan.ctaLink}
                    className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[11px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                    style={{ background: plan.dark ? P.gold : P.ink, color: "white" }}
                  >
                    {plan.ctaText}
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2" style={{ background: `${P.gold}10`, border: `1px solid ${P.gold}20` }}>
              <Shield size={13} style={{ color: P.gold }} />
              <span className="text-[11px]" style={{ color: P.ink }}><strong>100% Satisfaction Guarantee.</strong> Full refund if you&apos;re not happy.</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: P.bg }}>
      <div className="mx-auto max-w-2xl">
        <SectionReveal>
          <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Questions</p>
          <h2 className="mt-4 sm:mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>
            Frequently asked.
          </h2>
        </SectionReveal>

        <div className="mt-8 sm:mt-12 space-y-0.5">
          {FAQ.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.03}>
              <div style={{ borderBottom: `1px solid ${P.line}` }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left">
                  <span className="font-display text-[13px] sm:text-[15px] pr-4" style={{ color: P.ink }}>{item.q}</span>
                  <ChevronDown size={15} style={{ color: P.muted }} className={`flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="pb-5 text-[13px] leading-[1.9]" style={{ color: P.body }}>{item.a}</p>
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
   CTA — Reserve your date
───────────────────────────────────────────────────────────────── */
function CtaSection({ cta }: { cta: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0" style={{ background: `${P.noir}F2` }} />

      <div className="relative px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.goldSoft }}>Reserve Your Date</p>
            <h2 className="mt-5 sm:mt-6 font-display text-white" style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)", lineHeight: 1.1 }}>
              Let&apos;s create something
              <br />
              <span className="font-script" style={{ color: P.goldSoft }}>unforgettable.</span>
            </h2>
            <p className="mx-auto mt-4 sm:mt-5 max-w-md text-[13px] sm:text-[14px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Wedding dates book fast. Secure your invite design today and we&apos;ll have it ready before your big day.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/builder"
                className="group flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                style={{ background: P.gold, color: "white" }}
              >
                <Heart size={14} />
                Start Creating Your Invite
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={cta} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 rounded-full border px-6 py-3.5 text-[12px] font-medium tracking-wide transition-all hover:border-[#9a7b4f]"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
              >
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {[{ v: "25+", l: "Designs" }, { v: "24h", l: "Delivery" }, { v: "100%", l: "Refund Guarantee" }, { v: "∞", l: "Free Edits" }].map(s => (
                <div key={s.l} className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg text-white">{s.v}</span>
                  <span className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
function Footer({ cta }: { cta: string }) {
  return (
    <footer className="px-5 py-12 sm:px-10 sm:py-14" style={{ background: P.bg, borderTop: `1px solid ${P.line}` }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Heart size={14} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-lg tracking-tight" style={{ color: P.ink }}>The Digital Inviters</span>
        </div>
        <p className="mt-2 font-script text-base" style={{ color: P.gold }}>Invitations, crafted with love.</p>
        <div className="mt-5 flex items-center gap-4">
          <a href={cta} target="_blank" rel="noreferrer" className="text-[11px] tracking-wide transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>WhatsApp</a>
          <span style={{ color: P.line }}>·</span>
          <a href="mailto:abhishekprajapatiad@gmail.com" className="text-[11px] tracking-wide transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>Email</a>
        </div>
        <p className="mt-5 text-[10px] tracking-wide" style={{ color: P.subtle }}>© {new Date().getFullYear()} The Digital Inviters. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN — Section ordering for luxury brand
───────────────────────────────────────────────────────────────── */
export default function PortfolioHome() {
  const { prices } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20wedding%20invitation.`;

  return (
    <main className="relative" style={{ background: P.bg, color: P.ink }}>
      <Nav />
      <Hero />
      <SignatureShowcase />
      <Catalogue />
      <WhatsIncluded />
      <HowItWorks />
      <Testimonials />
      <Pricing cta={cta} />
      <Faq />
      <CtaSection cta={cta} />
      <Footer cta={cta} />

      {/* Mobile spacer */}
      <div className="h-20 md:hidden" />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:hidden" style={{ background: `linear-gradient(to top, ${P.bg} 80%, transparent)` }}>
        <Link href="/builder" className="flex w-full items-center justify-center gap-3 rounded-full py-4 text-[13px] font-semibold tracking-wide shadow-lg" style={{ background: P.ink, color: P.bg }}>
          <Heart size={14} />
          Create Your Invitation — from {prices.basic}
          <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
