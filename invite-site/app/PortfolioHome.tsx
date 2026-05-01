"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import OrnamentDivider from "@/components/portfolio/OrnamentDivider";
import { BRAND, PORTFOLIO_THEMES } from "@/lib/portfolioThemes";

const PALETTE = {
  bg: "#f7f2ec",
  bgSoft: "#ece3d7",
  ink: "#241b1f",
  body: "#6c5a5c",
  accent: "#9b7b4a",
  accentSoft: "#d7b985",
  deep: "#14100f",
};

const heroImage =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90";

export default function PortfolioHome() {
  const whatsappHref = `${BRAND.whatsappBase}your%20themes%20and%20would%20like%20a%20custom%20wedding%20invite.`;

  return (
    <main
      className="relative overflow-hidden"
      style={{ background: PALETTE.bg, color: PALETTE.body }}
    >
      {/* ── Top nav ─────────────────────────── */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-10">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: PALETTE.ink, color: PALETTE.accentSoft }}
            >
              <Sparkles size={16} />
            </span>
            <div style={{ color: PALETTE.ink }}>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>
                Est. 2026
              </p>
              <p className="font-display -mt-0.5 text-lg">The Digital Inviters</p>
            </div>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-medium tracking-[0.35em] uppercase transition hover:-translate-y-0.5 sm:inline-flex"
            style={{ borderColor: PALETTE.ink, color: PALETTE.ink }}
          >
            <MessageCircle size={13} /> Enquire
          </a>
        </div>
      </header>

      {/* ── Editorial hero ──────────────────── */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-10 sm:px-10 sm:pb-32 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="flex flex-col justify-center" style={{ color: PALETTE.ink }}>
            <SectionReveal>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>
                A premium digital wedding invite studio
              </p>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <p
                className="font-script mt-6 text-5xl leading-none sm:text-6xl"
                style={{ color: PALETTE.accent }}
              >
                your love story,
              </p>
            </SectionReveal>
            <SectionReveal delay={0.18}>
              <h1 className="font-display mt-3 text-[clamp(3rem,8vw,6.5rem)] leading-[0.98]">
                told with
                <span className="block italic">quiet luxury.</span>
              </h1>
            </SectionReveal>
            <SectionReveal delay={0.32}>
              <div
                className="luxury-hairline mt-10 w-24"
                style={{ background: PALETTE.accent }}
              />
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <p
                className="lux-lead mt-8 max-w-xl"
                style={{ color: PALETTE.body }}
              >
                {BRAND.tagline}. We design the kind of invitations guests screenshot,
                share and remember — custom-crafted for every couple, every ceremony, every promise.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.5}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#collection"
                  className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[11px] font-medium tracking-[0.35em] uppercase shadow-[0_16px_40px_rgba(36,27,31,0.2)] transition hover:-translate-y-0.5"
                  style={{ background: PALETTE.ink, color: "#ffffff" }}
                >
                  View the collection
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.35em] uppercase"
                  style={{ color: PALETTE.ink }}
                >
                  <MessageCircle size={14} /> Message on WhatsApp
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.6}>
              <dl
                className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t pt-8"
                style={{ borderColor: `${PALETTE.ink}1A` }}
              >
                {[
                  ["07", "Signature themes"],
                  ["24h", "First draft"],
                  ["∞", "Revisions, with love"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt
                      className="font-display text-3xl sm:text-4xl"
                      style={{ color: PALETTE.ink }}
                    >
                      {value}
                    </dt>
                    <dd className="eyebrow mt-2 text-[9px]" style={{ color: PALETTE.accent }}>
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </SectionReveal>
          </div>

          {/* Hero image stack */}
          <SectionReveal delay={0.2} direction="right">
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_120px_rgba(36,27,31,0.25)]"
                style={{ aspectRatio: "4/5" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100f]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>
                    A digital inviter
                  </p>
                  <p className="font-display mt-3 text-4xl leading-tight">
                    Cinematic. Animated.
                    <span className="font-script block" style={{ color: PALETTE.accentSoft }}>
                      truly yours.
                    </span>
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-6 hidden w-52 overflow-hidden rounded-[1.5rem] border shadow-2xl sm:block"
                style={{ borderColor: `${PALETTE.ink}20` }}
              >
                <div
                  className="aspect-[4/5] bg-cover bg-center"
                  style={{ backgroundImage: `url(${PORTFOLIO_THEMES[2].image})` }}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-6 hidden w-40 overflow-hidden rounded-[1.25rem] border shadow-xl sm:block"
                style={{ borderColor: `${PALETTE.ink}20` }}
              >
                <div
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url(${PORTFOLIO_THEMES[4].image})` }}
                />
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Marquee ribbon ──────────────────── */}
      <section
        className="overflow-hidden border-y"
        style={{ borderColor: `${PALETTE.ink}15`, background: PALETTE.bgSoft }}
      >
        <div className="relative py-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 whitespace-nowrap"
          >
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex gap-14">
                {[
                  "Custom design",
                  "Cinematic animation",
                  "Editorial typography",
                  "Guest-wise personalization",
                  "Mobile-first",
                  "RSVP & WhatsApp",
                  "Music & Map",
                ].map((word) => (
                  <span
                    key={`${copy}-${word}`}
                    className="font-display flex items-center gap-6 text-2xl italic"
                    style={{ color: PALETTE.ink }}
                  >
                    {word}
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: PALETTE.accent }}
                    />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Collection ─────────────────────── */}
      <section id="collection" className="relative px-5 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <div className="flex flex-col items-center text-center" style={{ color: PALETTE.ink }}>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>
                The collection
              </p>
              <h2 className="font-display lux-h2 mt-5 max-w-3xl">
                Seven signature themes.
                <span className="font-script block" style={{ color: PALETTE.accent }}>
                  one unforgettable invite.
                </span>
              </h2>
              <p className="lux-lead mt-8 max-w-2xl" style={{ color: PALETTE.body }}>
                Each sample is a fully working mini-site. Explore the theme your heart already knows
                — we will tailor the rest.
              </p>
              <OrnamentDivider color={PALETTE.accent} symbol="diamond" className="mt-10" />
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PORTFOLIO_THEMES.map((theme, index) => (
              <SectionReveal key={theme.slug} delay={0.05 + (index % 3) * 0.08}>
                <Link
                  href={`/${theme.slug}`}
                  className="group block overflow-hidden rounded-[2rem] border transition hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(20,16,15,0.25)]"
                  style={{
                    borderColor: `${PALETTE.ink}15`,
                    background: "#ffffff",
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] group-hover:scale-110"
                      style={{ backgroundImage: `url(${theme.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14100f]/70 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 flex gap-1.5">
                      {theme.palette.map((color) => (
                        <span
                          key={color}
                          className="h-2 w-2 rounded-full ring-2 ring-white/70"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p
                        className="eyebrow text-[9px]"
                        style={{ color: PALETTE.accentSoft }}
                      >
                        {String(index + 1).padStart(2, "0")} · {theme.location}
                      </p>
                      <p className="font-display mt-2 text-3xl leading-tight">{theme.name}</p>
                      <p className="font-script mt-1 text-xl" style={{ color: PALETTE.accentSoft }}>
                        {theme.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-6" style={{ color: PALETTE.ink }}>
                    <p className="eyebrow text-[9px]" style={{ color: PALETTE.accent }}>
                      {theme.couple}
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-[1.75]" style={{ color: PALETTE.body }}>
                      {theme.shortDescription}
                    </p>
                    <div
                      className="mt-7 flex items-center justify-between border-t pt-5"
                      style={{ borderColor: `${PALETTE.ink}15` }}
                    >
                      <span className="eyebrow text-[9px]" style={{ color: PALETTE.accent }}>
                        View sample
                      </span>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border transition group-hover:bg-[#14100f] group-hover:text-white"
                        style={{ borderColor: `${PALETTE.ink}30`, color: PALETTE.ink }}
                      >
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────── */}
      <section
        className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-40"
        style={{ background: PALETTE.bgSoft }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <div className="text-center" style={{ color: PALETTE.ink }}>
              <p className="eyebrow" style={{ color: PALETTE.accent }}>
                The process
              </p>
              <h2 className="font-display lux-h2 mt-5">A calm, considered craft.</h2>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {[
              {
                no: "01",
                title: "Choose a theme",
                text: "Browse the collection and find the one your story deserves.",
              },
              {
                no: "02",
                title: "Share the details",
                text: "Names, photos, dates, venue, ceremonies — we'll do the storytelling.",
              },
              {
                no: "03",
                title: "Your invite, live",
                text: "A bespoke link, animated and ready to share with family, guests and future memories.",
              },
            ].map((step, index) => (
              <SectionReveal key={step.no} delay={index * 0.08}>
                <div style={{ color: PALETTE.ink }}>
                  <p className="font-display text-6xl leading-none" style={{ color: PALETTE.accent }}>
                    {step.no}
                  </p>
                  <h3 className="font-display mt-6 text-3xl">{step.title}</h3>
                  <div className="luxury-hairline mt-5 w-14" style={{ background: PALETTE.accent }} />
                  <p className="mt-5 leading-[1.85]" style={{ color: PALETTE.body }}>
                    {step.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────── */}
      <section className="relative px-5 py-28 sm:px-10 sm:py-40" style={{ background: PALETTE.bg }}>
        <SectionReveal>
          <figure className="mx-auto max-w-4xl text-center" style={{ color: PALETTE.ink }}>
            <p className="font-script text-6xl leading-none" style={{ color: PALETTE.accent }}>
              &ldquo;
            </p>
            <blockquote
              className="font-display mt-2 text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.35] italic"
            >
              Our guests didn&apos;t just open the invite. They screenshot it, voice-noted about it, and kept coming
              back to it. It felt like a teaser for the actual wedding — and honestly, we loved that more than
              any printed card we could have sent.
            </blockquote>
            <OrnamentDivider color={PALETTE.accent} symbol="diamond" className="mt-10" />
            <figcaption className="eyebrow mt-6 text-[10px]" style={{ color: PALETTE.accent }}>
              Shreya &amp; Dev · Couple, 2026
            </figcaption>
          </figure>
        </SectionReveal>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${PALETTE.deep}D9 0%, ${PALETTE.deep}F2 100%)`,
          }}
        />
        <div
          className="relative mx-auto max-w-4xl px-5 py-32 text-center sm:px-8 sm:py-40"
          style={{ color: "#f7f2ec" }}
        >
          <SectionReveal>
            <p className="eyebrow" style={{ color: PALETTE.accentSoft }}>
              Ready when you are
            </p>
            <p
              className="font-script mt-6 text-5xl sm:text-6xl"
              style={{ color: PALETTE.accentSoft }}
            >
              like a design?
            </p>
            <h2 className="font-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
              Share the sample link with us and we&apos;ll customize it for your wedding.
            </h2>
            <OrnamentDivider color={PALETTE.accentSoft} symbol="diamond" className="mt-10" />
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-[11px] font-medium tracking-[0.35em] uppercase shadow-2xl transition hover:-translate-y-0.5"
                style={{ background: PALETTE.accentSoft, color: PALETTE.deep }}
              >
                <MessageCircle size={14} /> Message on WhatsApp
              </a>
              <Link
                href="#collection"
                className="inline-flex items-center gap-3 rounded-full border px-10 py-5 text-[11px] font-medium tracking-[0.35em] uppercase transition hover:-translate-y-0.5"
                style={{ borderColor: `${PALETTE.accentSoft}60`, color: "#f7f2ec" }}
              >
                Browse again
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Footer ─────────────────────────── */}
      <footer
        className="border-t px-5 py-14 text-center sm:px-8"
        style={{ borderColor: `${PALETTE.ink}15`, background: PALETTE.bg }}
      >
        <p className="font-display text-2xl" style={{ color: PALETTE.ink }}>
          The Digital Inviters
        </p>
        <p className="font-script mt-2 text-2xl" style={{ color: PALETTE.accent }}>
          invitations, made with love.
        </p>
        <p className="eyebrow mt-6 text-[9px]" style={{ color: PALETTE.accent }}>
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </footer>
    </main>
  );
}
