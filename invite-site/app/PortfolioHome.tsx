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
  Check,
  Eye,
  Heart,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import { LocaleSelectors } from "@/components/LocaleSelectors";
import { useLocale } from "@/components/LocaleProvider";

/* ─────────────────────────────────────────────────────────────
   PREMIUM BOUTIQUE PALETTE
   Warm ivory, antique gold, charcoal — restrained luxury
───────────────────────────────────────────────────────────────── */
const P = {
  bg: "#faf8f4",
  bgAlt: "#f4f0ea",
  bgDeep: "#eae5dc",
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
const CATEGORIES = ["All", "Romantic", "Royal", "Editorial", "Coastal", "Floral", "Dramatic", "Rustic"];

const TESTIMONIALS = [
  {
    quote: "Our guests didn't just open it — they screenshot it, talked about it, and kept coming back. It felt like a trailer for our wedding.",
    couple: "Shreya & Dev",
    loc: "Mumbai",
    detail: "Royal Theme",
  },
  {
    quote: "The attention to detail was extraordinary. Every animation, every word felt intentional. Our families were genuinely impressed.",
    couple: "Ananya & Karthik",
    loc: "Chennai",
    detail: "Monsoon Romance",
  },
];

const FAQ = [
  {
    q: "What's the difference between Basic and Luxe?",
    a: "Basic (₹1,499) gives you a beautiful template with your details, event schedule, RSVP collection, and photo gallery — everything you need. Luxe (₹3,499) adds background music, countdown timer, love story section, interactive venue map, and unlimited design refinements for a truly bespoke feel.",
  },
  {
    q: "How does the process work?",
    a: "Choose a design from our collection, fill in your wedding details, preview your invite, and pay via UPI. We finalize your invite within 24–48 hours and send you a unique shareable link.",
  },
  {
    q: "How do guests view the invitation?",
    a: "Each guest receives a unique URL. They simply tap to open — no app downloads, no sign-ups. Works beautifully on WhatsApp, Instagram, email, or any platform.",
  },
  {
    q: "Is hosting included?",
    a: "Yes, lifetime hosting is included in every plan at no extra cost. Your invite stays live forever — a digital keepsake for you and your guests.",
  },
  {
    q: "Can I make changes after the invite is live?",
    a: "Absolutely. Need to update a venue, date, or add a new event? Just message us. Free edits are included in both plans.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "Your satisfaction is our priority. If the invite doesn't feel right, we'll rework it. If we still can't get it right, we offer a full refund — no questions asked.",
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
   NAV — Refined, confident, boutique
───────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10"
        style={{ background: `${P.bg}F0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${P.lineSoft}` }}
      >
        <Link href="/" className="flex items-center gap-2.5" style={{ color: P.ink }}>
          <Heart size={16} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-[17px] tracking-tight">The Digital Inviters</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {[
            { label: "Catalogue", href: "#catalogue" },
            { label: "Pricing", href: "#pricing" },
            { label: "How It Works", href: "#process" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="text-[12px] tracking-[0.04em] transition-colors hover:text-[#9a7b4f]" style={{ color: P.body }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block"><LocaleSelectors /></div>
          <Link
            href="/builder"
            className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.06em] transition-all duration-300 hover:gap-3"
            style={{ background: P.ink, color: P.bg }}
          >
            Create Invitation
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — Cinematic, editorial, emotional
───────────────────────────────────────────────────────────────── */
function Hero() {
  const { prices } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY, opacity: imgOpacity }}>
        <div className="absolute inset-0 scale-110 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${P.bg} 0%, ${P.bg}F5 30%, ${P.bg}D0 55%, ${P.bg}80 80%, transparent 100%)` }} />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-20 pt-32 sm:px-10 sm:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
              <div className="h-px w-10" style={{ background: P.gold }} />
              <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Boutique Wedding Invitations</p>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="mt-7 font-display" style={{ color: P.ink, fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Your love story,
              <br />
              <span className="font-script" style={{ color: P.gold, fontSize: "0.9em" }}>beautifully told.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-6 max-w-md text-[15px] leading-[1.9]" style={{ color: P.body }}>
              We craft bespoke digital invitations that capture the essence of your story. Every detail, every animation — designed to move the people you love.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="#catalogue" className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-semibold tracking-[0.04em] transition-all duration-500 hover:gap-4" style={{ background: P.ink, color: P.bg }}>
                Explore Designs
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-[13px] font-medium" style={{ color: P.gold }}>from {prices.basic}</span>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-12 flex items-center gap-6">
              {[{ v: "10+", l: "Designs" }, { v: "100%", l: "Satisfaction" }, { v: "24h", l: "Delivery" }].map((s, i) => (
                <div key={s.l} className="flex items-baseline gap-1.5">
                  <span className="font-display text-base font-semibold" style={{ color: P.ink }}>{s.v}</span>
                  <span className="text-[10px] tracking-wide" style={{ color: P.muted }}>{s.l}</span>
                  {i < 2 && <span className="ml-4 text-[8px]" style={{ color: P.subtle }}>·</span>}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <div className="h-14 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${P.muted})` }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATALOGUE — Premium browsing experience
───────────────────────────────────────────────────────────────── */
function Catalogue() {
  const { prices } = useLocale();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredThemes = activeCategory === "All"
    ? PORTFOLIO_THEMES
    : PORTFOLIO_THEMES.filter(t => t.category === activeCategory);

  const tierPrice = (tier: string) => tier === "luxe" ? prices.luxe : prices.basic;

  return (
    <section id="catalogue" className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>✦ Catalogue</p>
            <h2 className="mx-auto mt-5 max-w-xl font-display" style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
              Explore our <span className="font-script" style={{ color: P.gold }}>exclusive</span> designs
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.8]" style={{ color: P.body }}>
              Each theme is a unique piece designed to move people. Discover the one that best tells your story.
            </p>
          </div>
        </SectionReveal>

        {/* Category filter chips */}
        <SectionReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300"
                style={{
                  background: activeCategory === cat ? P.ink : "transparent",
                  color: activeCategory === cat ? P.bg : P.muted,
                  border: `1px solid ${activeCategory === cat ? P.ink : P.line}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Collection grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredThemes.map((theme, i) => (
            <SectionReveal key={theme.slug} delay={i * 0.06}>
              <div className="group">
                <Link href={`/builder?template=${theme.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ background: P.bgDeep }}>
                    <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.7 }}
                      className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})` }}
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Badge */}
                    {theme.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.12em] shadow-md" style={{ background: "white", color: P.ink }}>
                          {theme.badge}
                        </span>
                      </div>
                    )}

                    {/* Preview eye icon */}
                    <Link href={`/${theme.slug}`} target="_blank" onClick={e => e.stopPropagation()}
                      className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full opacity-0 backdrop-blur-md transition-all group-hover:opacity-100"
                      style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                    >
                      <Eye size={14} />
                    </Link>

                    {/* Hover CTA */}
                    <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-semibold tracking-wide shadow-lg" style={{ background: "white", color: P.ink }}>
                        Start with this design
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Card info */}
                <div className="mt-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg tracking-tight transition-colors duration-300 group-hover:text-[#9a7b4f]" style={{ color: P.ink }}>
                        {theme.name}
                      </h3>
                      <span className="rounded-full px-2 py-0.5 text-[8px] font-bold tracking-[0.1em]"
                        style={{ background: theme.tier === "luxe" ? "#fef3c7" : P.lineSoft, color: theme.tier === "luxe" ? "#92400e" : P.muted }}
                      >
                        {theme.tier === "luxe" ? "LUXE" : "BASIC"}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: P.muted }}>{theme.tagline}</p>
                  </div>
                  <span className="text-[14px] font-semibold" style={{ color: P.ink }}>{tierPrice(theme.tier)}</span>
                </div>

                {/* Category tag + View link */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] tracking-wide" style={{ color: P.subtle }}>{theme.category}</span>
                  <Link href={`/${theme.slug}`} target="_blank" className="flex items-center gap-1 text-[11px] font-medium transition-colors hover:text-[#9a7b4f]" style={{ color: P.gold }}>
                    View theme <ArrowRight size={10} />
                  </Link>
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
   HOW IT WORKS — Clean, confident, 3 steps
───────────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose a design", desc: "Browse our curated collection and pick a theme that resonates with your story." },
    { n: "02", title: "Add your details", desc: "Fill in names, dates, venues, and events. Preview your invite in real time." },
    { n: "03", title: "Pay & share", desc: "Complete payment via UPI. We deliver your sharable invite link within 24 hours." },
  ];

  return (
    <section id="process" className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>How It Works</p>
            <h2 className="mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15 }}>
              Three simple steps to
              <br />
              <span className="font-script" style={{ color: P.gold }}>your perfect invite.</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.1}>
              <div className="relative rounded-2xl p-7" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                <span className="font-display text-5xl" style={{ color: P.goldMuted }}>{s.n}</span>
                <h3 className="mt-4 font-display text-lg tracking-tight" style={{ color: P.ink }}>{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.8]" style={{ color: P.body }}>{s.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS — Editorial, emotional
───────────────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Love Notes</p>
            <h2 className="mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>
              From our couples.
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-7" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                <div className="flex gap-0.5 mb-5">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} size={13} fill={P.gold} style={{ color: P.gold }} />)}
                </div>
                <p className="text-[15px] leading-[1.8] italic" style={{ color: P.body }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <p className="font-display text-sm" style={{ color: P.ink }}>{t.couple}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: P.muted }}>{t.loc} · {t.detail}</p>
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
   PRICING — 2 tiers: Basic & Luxe
───────────────────────────────────────────────────────────────── */
function Pricing({ cta }: { cta: string }) {
  const { prices } = useLocale();

  const plans = [
    {
      name: "Basic",
      price: prices.basic,
      originalPrice: prices.basicOriginal,
      tagline: "Everything you need, beautifully done",
      popular: false,
      features: [
        "Choose from our template collection",
        "Your names, date & venue details",
        "Complete event schedule",
        "Photo gallery (up to 8 photos)",
        "Built-in RSVP collection",
        "WhatsApp & Instagram sharing",
        "Mobile-first responsive design",
        "Lifetime hosting — link never expires",
        "Free edits for date or venue changes",
      ],
    },
    {
      name: "Luxe",
      price: prices.luxe,
      originalPrice: prices.luxeOriginal,
      tagline: "For couples who want it all",
      popular: true,
      features: [
        "Everything in Basic, plus:",
        "Background music",
        "Live countdown timer",
        "Your love story timeline",
        "Interactive venue map & directions",
        "Unlimited photo gallery",
        "Custom guest names",
        "Premium animations & transitions",
        "Priority delivery within 24 hours",
      ],
    },
  ];

  return (
    <section id="pricing" className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bg }}>
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Pricing</p>
            <h2 className="mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
              One price. <span className="font-script" style={{ color: P.gold }}>No surprises.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.8]" style={{ color: P.body }}>
              One-time payment. No subscriptions. No hidden charges. Lifetime hosting included.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <SectionReveal key={plan.name} delay={i * 0.1}>
              <div className="relative flex h-full flex-col rounded-2xl p-8"
                style={{
                  background: plan.popular ? P.ink : P.surface,
                  border: plan.popular ? "none" : `1px solid ${P.lineSoft}`,
                  boxShadow: plan.popular ? "0 30px 80px rgba(20,18,14,0.2)" : "none",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-wide" style={{ background: P.gold, color: "white" }}>
                    <Star size={10} fill="white" /> Most Popular
                  </div>
                )}

                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: plan.popular ? P.goldSoft : P.gold }}>{plan.name}</p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-sm line-through opacity-50" style={{ color: plan.popular ? "#fff" : P.muted }}>{plan.originalPrice}</span>
                  <span className="font-display text-4xl tracking-tight" style={{ color: plan.popular ? "#fff" : P.ink }}>{plan.price}</span>
                </div>

                <p className="mt-1.5 text-[12px]" style={{ color: plan.popular ? "rgba(255,255,255,0.6)" : P.muted }}>{plan.tagline}</p>

                <div className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: plan.popular ? P.goldSoft : P.gold }} />
                      <span className="text-[12px] leading-snug" style={{ color: plan.popular ? "rgba(255,255,255,0.85)" : P.body }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href="/builder"
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[12px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: plan.popular ? P.gold : P.ink, color: "white" }}
                >
                  Choose {plan.name}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a href={cta} target="_blank" rel="noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full py-2 text-[10px] font-medium tracking-wide border transition-all"
                  style={{ borderColor: plan.popular ? "rgba(255,255,255,0.2)" : P.line, color: plan.popular ? "rgba(255,255,255,0.6)" : P.muted }}
                >
                  <MessageCircle size={11} /> Have questions? Chat first
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2" style={{ background: `${P.gold}10`, border: `1px solid ${P.gold}20` }}>
              <Shield size={14} style={{ color: P.gold }} />
              <span className="text-[12px]" style={{ color: P.ink }}><strong>100% Satisfaction Guarantee.</strong> Full refund if you&apos;re not happy.</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ — Clean accordion
───────────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: P.bgAlt }}>
      <div className="mx-auto max-w-2xl">
        <SectionReveal>
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.gold }}>Questions</p>
          <h2 className="mt-5 font-display" style={{ color: P.ink, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>
            Frequently asked.
          </h2>
        </SectionReveal>

        <div className="mt-12 space-y-1">
          {FAQ.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.04}>
              <div style={{ borderBottom: `1px solid ${P.line}` }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left">
                  <span className="font-display text-[17px] pr-4" style={{ color: P.ink }}>{item.q}</span>
                  <ChevronDown size={16} style={{ color: P.muted }} className={`flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                  <p className="pb-5 text-[14px] leading-[1.8]" style={{ color: P.body }}>{item.a}</p>
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
   CTA — Dark cinematic contact
───────────────────────────────────────────────────────────────── */
function CtaSection({ cta }: { cta: string }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0" style={{ background: `${P.noir}F0` }} />

      <div className="relative px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <div className="text-center">
              <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: P.goldSoft }}>Ready to Begin?</p>
              <h2 className="mt-5 font-display tracking-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
                Let&apos;s create something
                <br />
                <span className="font-script" style={{ color: P.goldSoft }}>unforgettable.</span>
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="mt-14 grid gap-10 md:grid-cols-2">
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
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#9a7b4f]" style={{ borderColor: "#3a3835" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#9a7b4f]" style={{ borderColor: "#3a3835" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>Tell us about your wedding</label>
                      <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} rows={3}
                        className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#9a7b4f]" style={{ borderColor: "#3a3835" }} />
                    </div>
                    <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[12px] font-semibold tracking-wide" style={{ background: P.gold, color: "white" }}>
                      <Send size={14} /> Send Inquiry
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 size={36} style={{ color: P.gold }} />
                    <p className="mt-4 font-display text-xl text-white">Thank you!</p>
                    <p className="mt-2 text-[13px]" style={{ color: P.muted }}>We&apos;ll be in touch within 24 hours.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: P.goldSoft }}>Or reach us directly</p>
                <div className="mt-6 space-y-4 w-full">
                  <a href={cta} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-[12px] font-semibold tracking-wide" style={{ background: "#25D366", color: "white" }}>
                    <MessageCircle size={16} /> Message on WhatsApp
                  </a>
                  <a href="mailto:abhishekprajapatiad@gmail.com?subject=Wedding%20Invitation%20Inquiry" className="flex w-full items-center justify-center gap-3 rounded-full border py-3.5 text-[12px] font-medium tracking-wide hover:border-[#9a7b4f]" style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}>
                    <Send size={14} /> Email Us
                  </a>
                </div>
                <p className="mt-4 text-[11px]" style={{ color: P.muted }}>abhishekprajapatiad@gmail.com</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER — Minimal, warm
───────────────────────────────────────────────────────────────── */
function Footer({ cta }: { cta: string }) {
  return (
    <footer className="px-6 py-14 sm:px-10" style={{ background: P.bg, borderTop: `1px solid ${P.line}` }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Heart size={14} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-lg tracking-tight" style={{ color: P.ink }}>The Digital Inviters</span>
        </div>
        <p className="mt-2 font-script text-base" style={{ color: P.gold }}>Crafted with love.</p>
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
   MAIN
───────────────────────────────────────────────────────────────── */
export default function PortfolioHome() {
  const { prices } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20wedding%20invitation.`;

  return (
    <main className="relative" style={{ background: P.bg, color: P.ink }}>
      <Nav />
      <Hero />
      <Catalogue />
      <HowItWorks />
      <Testimonials />
      <Pricing cta={cta} />
      <Faq />
      <CtaSection cta={cta} />
      <Footer cta={cta} />

      {/* Mobile bottom spacer */}
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
