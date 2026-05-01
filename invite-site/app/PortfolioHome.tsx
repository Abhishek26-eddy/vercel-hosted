"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  Palette,
  Smartphone,
  Users,
  Clock,
  Heart,
  CheckCircle2,
  ChevronDown,
  Send,
  Star,
  Play,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";

/* ─────────────────────────────────────────────────────────────
   LUXURY DESIGN SYSTEM
───────────────────────────────────────────────────────────────── */
const PALETTE = {
  bg: "#faf8f4",
  bgSoft: "#f4f0e8",
  bgWarm: "#efe9de",
  surface: "#ffffff",
  ink: "#1a1614",
  body: "#5c524a",
  muted: "#8a7e74",
  subtle: "#b8aea4",
  accent: "#a68b5b",
  accentSoft: "#c9b896",
  accentMuted: "#d8cbb4",
  border: "#e8e2d8",
  borderSoft: "#f0ebe4",
  dark: "#0f0d0c",
  darkSoft: "#1a1614",
};

const heroImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90";
const heroImage2 = "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85";
const heroImage3 = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85";

/* ─────────────────────────────────────────────────────────────
   PREMIUM FEATURES DATA
───────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Palette,
    title: "Bespoke Storytelling",
    description: "Every invite is designed around your unique love story — not a template with your names swapped in.",
  },
  {
    icon: Play,
    title: "Cinematic Animation",
    description: "Smooth, editorial motion that feels like a film trailer for your wedding day.",
  },
  {
    icon: Users,
    title: "Guest Personalization",
    description: "Each guest receives their own named invite link, making every share feel personal.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for WhatsApp sharing — stunning on every screen, especially the one in your pocket.",
  },
  {
    icon: MessageCircle,
    title: "RSVP & WhatsApp",
    description: "Built-in RSVP collection and one-tap WhatsApp sharing for effortless guest management.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "First draft within 24 hours. Unlimited revisions until it's perfect.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Choose Your Vision",
    description: "Browse our signature collection and find the aesthetic that speaks to your story. Or describe your dream — we'll bring it to life.",
  },
  {
    number: "02",
    title: "Share Your Story",
    description: "Send us your details: names, photos, dates, venues, ceremonies. We handle the storytelling and design.",
  },
  {
    number: "03",
    title: "Review & Refine",
    description: "Receive your first draft within 24 hours. Request unlimited revisions until every detail is perfect.",
  },
  {
    number: "04",
    title: "Share & Celebrate",
    description: "Your bespoke invite goes live with a custom link. Share it everywhere — WhatsApp, Instagram, email.",
  },
];

const DELIVERABLES = [
  "Custom-designed digital wedding invitation",
  "Animated opening screen with your names",
  "Your love story timeline section",
  "All ceremony & event details beautifully presented",
  "Interactive venue maps with directions",
  "Photo gallery with elegant transitions",
  "Built-in RSVP form with guest tracking",
  "WhatsApp share button for easy distribution",
  "Mobile-optimized for all devices",
  "Unlimited revisions until perfect",
  "Lifetime hosting on your custom link",
  "24-hour first draft delivery",
];

const TESTIMONIALS = [
  {
    quote: "Our guests didn't just open the invite — they screenshot it, voice-noted about it, and kept coming back to it. It felt like a teaser for the actual wedding.",
    couple: "Shreya & Dev",
    location: "Mumbai, 2026",
  },
  {
    quote: "We wanted something that felt as special as our relationship. This wasn't just an invite — it was the first chapter of our wedding story.",
    couple: "Priya & Arjun",
    location: "Bangalore, 2025",
  },
  {
    quote: "The attention to detail was incredible. Every animation, every word, every color felt intentional. Our families were genuinely impressed.",
    couple: "Ananya & Karthik",
    location: "Chennai, 2025",
  },
];

const FAQ_ITEMS = [
  {
    question: "How long does it take to create my invite?",
    answer: "You'll receive your first draft within 24 hours of sharing your details. Most invites are finalized within 3-5 days, depending on revisions.",
  },
  {
    question: "Can I make changes after seeing the first draft?",
    answer: "Absolutely. We offer unlimited revisions until you're completely satisfied. Your invite should feel perfect.",
  },
  {
    question: "How do guests access the invite?",
    answer: "Each invite has a unique URL that you can share via WhatsApp, SMS, email, or social media. Guests simply tap the link to view.",
  },
  {
    question: "Can each guest have a personalized link?",
    answer: "Yes! We can create individual links for each guest or family, so they see their own name when they open the invite.",
  },
  {
    question: "What if I want a completely custom design?",
    answer: "We love custom projects. Share your vision, mood boards, or references, and we'll create something entirely bespoke for you.",
  },
  {
    question: "Is the invite hosted permanently?",
    answer: "Yes. Your invite remains live on its custom link forever — a digital keepsake you can revisit anytime.",
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────── */

function Navigation({ whatsappHref }: { whatsappHref: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b" style={{ borderColor: PALETTE.borderSoft }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: PALETTE.ink, color: PALETTE.accentSoft }}
            >
              <Sparkles size={15} />
            </span>
            <div>
              <p className="font-display text-lg" style={{ color: PALETTE.ink }}>
                The Digital Inviters
              </p>
            </div>
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#collection" className="eyebrow link-underline" style={{ color: PALETTE.muted }}>
              Collection
            </Link>
            <Link href="#process" className="eyebrow link-underline" style={{ color: PALETTE.muted }}>
              Process
            </Link>
            <Link href="#pricing" className="eyebrow link-underline" style={{ color: PALETTE.muted }}>
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden sm:inline-flex"
            >
              <MessageCircle size={14} />
              Start Your Invite
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full sm:hidden"
              style={{ background: PALETTE.ink, color: PALETTE.bg }}
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ whatsappHref }: { whatsappHref: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-20">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${PALETTE.bg}F2 0%, ${PALETTE.bg}E6 40%, ${PALETTE.bg}CC 100%)`,
          }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-32 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-24">
            {/* Left content */}
            <div className="flex flex-col justify-center">
              <SectionReveal>
                <p className="eyebrow" style={{ color: PALETTE.accent }}>
                  Boutique Digital Wedding Invitations
                </p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <h1 className="font-display lux-display mt-6" style={{ color: PALETTE.ink }}>
                  Your love story,
                  <span className="block font-script" style={{ color: PALETTE.accent }}>
                    beautifully told.
                  </span>
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <p className="lux-lead mt-8 max-w-xl" style={{ color: PALETTE.body }}>
                  We craft bespoke digital wedding invitations that guests screenshot, share, and remember. 
                  Each invite is a cinematic experience — designed around your story, animated with intention, 
                  and optimized for the way people actually share today.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary">
                    Start Your Invite
                    <ArrowUpRight size={14} />
                  </a>
                  <Link href="#collection" className="btn-secondary">
                    View Collection
                  </Link>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="mt-16 flex items-center gap-8">
                  <div className="flex -space-x-3">
                    {[heroImage2, heroImage3, heroImage].map((img, i) => (
                      <div
                        key={i}
                        className="h-12 w-12 rounded-full border-2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})`, borderColor: PALETTE.bg }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={PALETTE.accent} color={PALETTE.accent} />
                      ))}
                    </div>
                    <p className="mt-1 text-sm" style={{ color: PALETTE.muted }}>
                      Trusted by 100+ couples
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right - Hero image stack */}
            <SectionReveal delay={0.2} direction="right">
              <div className="relative hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative overflow-hidden rounded-[2.5rem]"
                  style={{ 
                    aspectRatio: "3/4",
                    boxShadow: "0 60px 140px rgba(26,22,20,0.25)",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0c]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>
                      Featured Sample
                    </p>
                    <p className="font-display mt-3 text-3xl leading-tight">
                      Cinematic. Animated.
                      <span className="font-script block" style={{ color: PALETTE.accentSoft }}>
                        truly yours.
                      </span>
                    </p>
                  </div>
                </motion.div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 w-48 overflow-hidden rounded-2xl border bg-white"
                  style={{ 
                    borderColor: PALETTE.borderSoft,
                    boxShadow: "0 24px 60px rgba(26,22,20,0.15)",
                  }}
                >
                  <div
                    className="aspect-[4/5] bg-cover bg-center"
                    style={{ backgroundImage: `url(${PORTFOLIO_THEMES[0]?.image})` }}
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-16 w-36 overflow-hidden rounded-xl border bg-white"
                  style={{ 
                    borderColor: PALETTE.borderSoft,
                    boxShadow: "0 16px 40px rgba(26,22,20,0.12)",
                  }}
                >
                  <div
                    className="aspect-square bg-cover bg-center"
                    style={{ backgroundImage: `url(${PORTFOLIO_THEMES[1]?.image})` }}
                  />
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} style={{ color: PALETTE.muted }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y py-6" style={{ background: PALETTE.bgSoft, borderColor: PALETTE.border }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center"
        >
          {[
            ["100+", "Couples Served"],
            ["24h", "First Draft"],
            ["∞", "Revisions"],
            ["4.9★", "Average Rating"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-display text-2xl" style={{ color: PALETTE.ink }}>{value}</span>
              <span className="eyebrow text-[10px]" style={{ color: PALETTE.muted }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>What Makes This Premium</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              Not just an invite.
              <span className="font-script block" style={{ color: PALETTE.accent }}>
                An experience.
              </span>
            </h2>
            <p className="lux-lead mx-auto mt-6 max-w-2xl" style={{ color: PALETTE.body }}>
              Every detail is intentional. Every animation is purposeful. Every word is crafted to make your guests feel the significance of your day.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <SectionReveal key={feature.title} delay={i * 0.08}>
              <div
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:border-transparent hover:shadow-xl"
                style={{ background: PALETTE.surface, borderColor: PALETTE.borderSoft }}
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-opacity-100"
                  style={{ background: `${PALETTE.accent}15`, color: PALETTE.accent }}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display text-xl" style={{ color: PALETTE.ink }}>
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed" style={{ color: PALETTE.body }}>
                  {feature.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionSection() {
  return (
    <section id="collection" className="relative py-24 sm:py-32" style={{ background: PALETTE.bgSoft }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>The Collection</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              Signature themes.
              <span className="font-script block" style={{ color: PALETTE.accent }}>
                Endless possibilities.
              </span>
            </h2>
            <p className="lux-lead mx-auto mt-6 max-w-2xl" style={{ color: PALETTE.body }}>
              Each sample is a fully working invite. Explore the aesthetic that speaks to you — we'll customize every detail for your story.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIO_THEMES.map((theme, index) => (
            <SectionReveal key={theme.slug} delay={0.05 + (index % 3) * 0.1}>
              <Link
                href={`/${theme.slug}`}
                className="group block overflow-hidden rounded-[2rem] border bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{ borderColor: PALETTE.borderSoft }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
                    style={{ backgroundImage: `url(${theme.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0c]/80 via-[#0f0d0c]/20 to-transparent" />
                  
                  {/* Palette dots */}
                  <div className="absolute left-5 top-5 flex gap-1.5">
                    {theme.palette.map((color) => (
                      <span
                        key={color}
                        className="h-2.5 w-2.5 rounded-full ring-2 ring-white/60"
                        style={{ background: color }}
                      />
                    ))}
                  </div>

                  {/* Theme info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="eyebrow text-[10px]" style={{ color: PALETTE.accentSoft }}>
                      {theme.location}
                    </p>
                    <h3 className="font-display mt-2 text-2xl">{theme.name}</h3>
                    <p className="font-script mt-1 text-lg" style={{ color: PALETTE.accentMuted }}>
                      {theme.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed" style={{ color: PALETTE.body }}>
                    {theme.shortDescription}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: PALETTE.borderSoft }}>
                    <span className="eyebrow text-[10px]" style={{ color: PALETTE.accent }}>
                      View Sample
                    </span>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-transparent group-hover:bg-[#1a1614] group-hover:text-white"
                      style={{ borderColor: PALETTE.border, color: PALETTE.ink }}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-sm" style={{ color: PALETTE.muted }}>
              Don't see your style? We create fully custom designs too.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative py-24 sm:py-32" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>How It Works</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              A calm, considered craft.
            </h2>
            <p className="lux-lead mx-auto mt-6 max-w-2xl" style={{ color: PALETTE.body }}>
              From first conversation to final share, we make the process effortless.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <SectionReveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <p className="font-display text-6xl" style={{ color: PALETTE.accentMuted }}>
                  {step.number}
                </p>
                <h3 className="font-display mt-4 text-xl" style={{ color: PALETTE.ink }}>
                  {step.title}
                </h3>
                <div className="luxury-hairline mt-4 w-12" style={{ background: PALETTE.accent }} />
                <p className="mt-4 leading-relaxed" style={{ color: PALETTE.body }}>
                  {step.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: PALETTE.bgWarm }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionReveal>
            <div>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>What You Receive</p>
              <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
                Everything you need.
                <span className="font-script block" style={{ color: PALETTE.accent }}>
                  Nothing you don't.
                </span>
              </h2>
              <p className="lux-lead mt-6" style={{ color: PALETTE.body }}>
                A complete digital wedding invitation experience, crafted with care and delivered with precision.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="grid gap-3 sm:grid-cols-2">
              {DELIVERABLES.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} style={{ color: PALETTE.accent }} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm" style={{ color: PALETTE.body }}>{item}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>Why Couples Choose Us</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              Words from our couples.
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div
                className="relative rounded-2xl border p-8"
                style={{ background: PALETTE.surface, borderColor: PALETTE.borderSoft }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill={PALETTE.accent} color={PALETTE.accent} />
                  ))}
                </div>
                <p className="font-display text-lg italic leading-relaxed" style={{ color: PALETTE.ink }}>
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 pt-6 border-t" style={{ borderColor: PALETTE.borderSoft }}>
                  <p className="font-display" style={{ color: PALETTE.ink }}>{testimonial.couple}</p>
                  <p className="eyebrow mt-1 text-[10px]" style={{ color: PALETTE.muted }}>{testimonial.location}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section id="pricing" className="relative py-24 sm:py-32" style={{ background: PALETTE.bgSoft }}>
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>Investment</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              Premium quality.
              <span className="font-script block" style={{ color: PALETTE.accent }}>
                Thoughtful pricing.
              </span>
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div
            className="mt-12 rounded-3xl border p-8 sm:p-12 text-center"
            style={{ background: PALETTE.surface, borderColor: PALETTE.borderSoft }}
          >
            <p className="eyebrow" style={{ color: PALETTE.accent }}>Bespoke Digital Invite</p>
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="font-display text-5xl" style={{ color: PALETTE.ink }}>₹4,999</span>
              <span style={{ color: PALETTE.muted }}>starting</span>
            </div>
            <p className="mt-4" style={{ color: PALETTE.body }}>
              Fully customized to your story. Includes everything in our deliverables list.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-accent">
                <MessageCircle size={14} />
                Get Started
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-secondary">
                Request Custom Quote
              </a>
            </div>

            <div className="mt-8 pt-8 border-t grid grid-cols-3 gap-4" style={{ borderColor: PALETTE.borderSoft }}>
              {[
                ["24h", "First Draft"],
                ["3-5 days", "Delivery"],
                ["∞", "Revisions"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-xl" style={{ color: PALETTE.ink }}>{value}</p>
                  <p className="eyebrow mt-1 text-[9px]" style={{ color: PALETTE.muted }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32" style={{ background: PALETTE.bg }}>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow" style={{ color: PALETTE.accent }}>Questions</p>
            <h2 className="font-display lux-h2 mt-4" style={{ color: PALETTE.ink }}>
              Frequently asked.
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-xl border overflow-hidden"
                style={{ background: PALETTE.surface, borderColor: PALETTE.borderSoft }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg" style={{ color: PALETTE.ink }}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{ color: PALETTE.muted }}
                    className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6" style={{ color: PALETTE.body }}>
                    {item.answer}
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

function InquirySection({ whatsappHref }: { whatsappHref: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: `${PALETTE.dark}F0` }} />
      
      <div className="relative mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionReveal>
          <div className="text-center" style={{ color: PALETTE.bgSoft }}>
            <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Ready to Begin?</p>
            <h2 className="font-display lux-h2 mt-4">
              Let's create something
              <span className="font-script block" style={{ color: PALETTE.accentSoft }}>
                unforgettable.
              </span>
            </h2>
            <p className="lux-lead mx-auto mt-6 max-w-xl" style={{ color: PALETTE.subtle }}>
              Share your vision with us. We'll get back to you within 24 hours with ideas and next steps.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Contact form */}
            <div
              className="rounded-2xl p-8"
              style={{ background: `${PALETTE.darkSoft}` }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="eyebrow text-[10px]" style={{ color: PALETTE.accentSoft }}>Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none focus:border-[#a68b5b]"
                      style={{ borderColor: PALETTE.muted }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-[10px]" style={{ color: PALETTE.accentSoft }}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none focus:border-[#a68b5b]"
                      style={{ borderColor: PALETTE.muted }}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-[10px]" style={{ color: PALETTE.accentSoft }}>Tell us about your wedding</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-white outline-none focus:border-[#a68b5b]"
                      style={{ borderColor: PALETTE.muted }}
                      placeholder="Wedding date, location, style preferences..."
                    />
                  </div>
                  <button type="submit" className="btn-accent w-full">
                    <Send size={14} />
                    Send Inquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} style={{ color: PALETTE.accent }} className="mx-auto" />
                  <p className="font-display text-xl mt-4 text-white">Thank you!</p>
                  <p className="mt-2" style={{ color: PALETTE.subtle }}>
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>

            {/* WhatsApp option */}
            <div className="flex flex-col justify-center text-center">
              <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>Or reach us directly</p>
              <p className="font-display text-2xl mt-4 text-white">Prefer WhatsApp?</p>
              <p className="mt-3" style={{ color: PALETTE.subtle }}>
                Message us directly for a faster response. We're usually online and happy to chat.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 mx-auto"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={16} />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-12" style={{ background: PALETTE.bg, borderColor: PALETTE.border }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: PALETTE.ink, color: PALETTE.accentSoft }}
            >
              <Sparkles size={15} />
            </span>
            <span className="font-display text-xl" style={{ color: PALETTE.ink }}>
              The Digital Inviters
            </span>
          </div>
          <p className="font-script mt-3 text-xl" style={{ color: PALETTE.accent }}>
            Invitations, made with love.
          </p>
          <p className="eyebrow mt-6 text-[10px]" style={{ color: PALETTE.muted }}>
            © {new Date().getFullYear()} The Digital Inviters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function PortfolioHome() {
  const whatsappHref = `${BRAND.whatsappBase}your%20themes%20and%20would%20like%20a%20custom%20wedding%20invite.`;

  return (
    <main className="relative" style={{ background: PALETTE.bg, color: PALETTE.body }}>
      <Navigation whatsappHref={whatsappHref} />
      <HeroSection whatsappHref={whatsappHref} />
      <TrustBar />
      <FeaturesSection />
      <CollectionSection />
      <ProcessSection />
      <DeliverablesSection />
      <TestimonialsSection />
      <PricingSection whatsappHref={whatsappHref} />
      <FAQSection />
      <InquirySection whatsappHref={whatsappHref} />
      <Footer />

      {/* Sticky mobile WhatsApp CTA */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:hidden"
        style={{ background: "#25D366", color: "white" }}
      >
        <MessageCircle size={24} />
      </a>
    </main>
  );
}
