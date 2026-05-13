"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Camera,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Scroll,
  Sparkles,
  Users,
} from "lucide-react";
import type { PortfolioTheme } from "@/lib/portfolioThemes";
import { BRAND } from "@/lib/portfolioThemes";
import { getStoryBySlug } from "@/lib/sampleStories";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function isDarkBg(hex: string) {
  const cleaned = hex.replace("#", "");
  const rgb = cleaned.match(/.{2}/g)?.map((chunk) => parseInt(chunk, 16)) || [0, 0, 0];
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 < 128;
}

function parseEventDate(dateString: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(`${dateString}T12:00:00`);
  }

  const normalized = dateString
    .replace(/\b(\d{1,2})(st|nd|rd|th)\b/g, "$1")
    .replace(/,/g, "");
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function formatEventDate(dateString: string, options: Intl.DateTimeFormatOptions) {
  const parsed = parseEventDate(dateString);
  if (!parsed) {
    return dateString;
  }

  return parsed.toLocaleDateString("en-IN", options);
}

function buildMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function groupEventsByDate(events: Array<{
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
}>) {
  return events.reduce<Array<{
    key: string;
    label: string;
    items: typeof events;
  }>>((groups, event) => {
    const parsed = parseEventDate(event.date);
    const key = parsed ? parsed.toISOString().slice(0, 10) : event.date;
    const label = formatEventDate(event.date, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const currentGroup = groups[groups.length - 1];
    if (currentGroup && currentGroup.key === key) {
      currentGroup.items.push(event);
      return groups;
    }

    groups.push({ key, label, items: [event] });
    return groups;
  }, []);
}

const FALLBACK_EVENTS = [
  {
    name: "Mehendi and Sangeet",
    date: "2026-02-13",
    time: "6:00 PM",
    venue: "Grand Ballroom",
    description: "An evening of music, laughter, and dancing with our favourite people.",
  },
  {
    name: "Wedding Ceremony",
    date: "2026-02-14",
    time: "7:00 PM",
    venue: "The Garden Pavilion",
    description: "Join us as we exchange vows beneath candlelight and flowers.",
  },
  {
    name: "Reception Dinner",
    date: "2026-02-14",
    time: "9:00 PM",
    venue: "The Terrace",
    description: "Dinner, toasts, and a dance floor that stays full all night.",
  },
];

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85",
];

const GALLERY_LAYOUTS = [
  "sm:col-span-2 lg:col-span-7 min-h-[21rem] lg:min-h-[38rem]",
  "lg:col-span-5 min-h-[16rem] lg:min-h-[18rem]",
  "lg:col-span-3 min-h-[14rem] lg:min-h-[18rem]",
  "lg:col-span-4 min-h-[14rem] lg:min-h-[18rem]",
  "lg:col-span-5 min-h-[14rem] lg:min-h-[18rem]",
];

export default function ThemePreview({ theme }: { theme: PortfolioTheme }) {
  const story = getStoryBySlug(theme.slug);

  const dark = isDarkBg(theme.background);
  const accent = theme.accent;
  const ink = dark ? "#f8efe6" : "#2d241d";
  const body = dark ? "rgba(248,239,230,0.76)" : "#51443a";
  const muted = dark ? "rgba(248,239,230,0.55)" : "#736459";
  const pageBg = dark ? "#120f0d" : "#f4eadf";
  const shell = dark ? "rgba(30,24,20,0.9)" : "rgba(255,250,245,0.98)";
  const shellAlt = dark ? "rgba(255,255,255,0.04)" : "#f2e8db";
  const line = dark ? "rgba(255,255,255,0.12)" : "rgba(45,36,29,0.08)";
  const deepOverlay = dark ? "rgba(10,8,7,0.82)" : "rgba(33,22,16,0.62)";
  const names = theme.couple.split("&").map((part) => part.trim());

  const groom = story?.groomName || names[0] || "Groom";
  const bride = story?.brideName || names[1] || "Bride";
  const heroTitle = story?.heroTitle || `${groom} & ${bride}`;
  const heroSubtitle = story?.heroSubtitle || "Together with their families";
  const heroImage = story?.heroImage || theme.image;
  const heroImagePosition = story?.heroImagePosition || "center center";
  const venue = story?.venue || theme.location;
  const venueAddress = story?.venueAddress || venue;
  const events = story?.events || FALLBACK_EVENTS;
  const gallery = (story?.galleryImages || FALLBACK_GALLERY).slice(0, 5);
  const galleryImagePositions = story?.galleryImagePositions || [];
  const groupedEvents = groupEventsByDate(events);
  const firstEvent = events[0];
  const ceremonyDate = firstEvent
    ? formatEventDate(firstEvent.date, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "A beautiful day to remember";
  const ceremonyDay = firstEvent ? formatEventDate(firstEvent.date, { day: "2-digit" }) : "--";
  const ceremonyMonth = firstEvent ? formatEventDate(firstEvent.date, { month: "short" }) : "Date";
  const ceremonyYear = firstEvent ? formatEventDate(firstEvent.date, { year: "numeric" }) : "";
  const cardTeaser = story?.cardTeaser || theme.shortDescription;
  const invitationNote =
    story?.welcomeNote ||
    `Together with their families, ${groom} and ${bride} invite you to a celebration of love, beauty, and a lifetime of shared memories.`;
  const proposalTitle = story?.proposalTitle || "The Proposal";
  const ourStoryTitle = story?.ourStoryTitle || "Our Story";
  const littleThings =
    story?.littleThings ||
    "The most unforgettable celebrations feel intimate, thoughtful, and full of tenderness in every detail.";
  const proposalStory =
    story?.proposalStory ||
    "Every beautiful celebration deserves an invitation that carries atmosphere, romance, and a sense of occasion from the very first glance.";
  const dressCode =
    story?.dressCode ||
    "Elegant festive wear that feels camera-ready, comfortable, and celebration-worthy.";
  const closingNote =
    story?.closingNote ||
    "Thank you for being part of our story. Your presence, blessings, and joy would mean everything to us.";
  const storyCTA = story?.cardCTA || "Reserve this design";
  const mapsUrl = buildMapsUrl(venueAddress);
  const whatsappUrl = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20reserve%20the%20${encodeURIComponent(theme.name)}%20design%20for%20my%20wedding.`;
  const monogram = `${bride.charAt(0)}${groom.charAt(0)}`;

  return (
    <div style={{ background: pageBg, color: ink }}>
      <div
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{ background: dark ? "rgba(18,15,13,0.82)" : "rgba(246,239,231,0.82)", borderColor: line }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: muted }}
          >
            Back to collection
          </Link>
          <span
            className="hidden rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] sm:inline-flex"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
          >
            {theme.tier} collection
          </span>
          <Link
            href={`/builder?template=${theme.slug}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-5"
            style={{ background: accent, color: "#fff" }}
          >
            Reserve
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: heroImagePosition }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.18) 0%, ${deepOverlay} 60%, ${pageBg} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at top left, ${accent} 0, transparent 28%), radial-gradient(circle at bottom right, rgba(255,255,255,0.18) 0, transparent 24%)`,
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <div className="w-full">
            <motion.div {...fadeUp(0)} className="max-w-3xl">
              <div
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border text-lg font-semibold sm:h-20 sm:w-20 sm:text-xl"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", background: "rgba(255,255,255,0.08)" }}
              >
                {monogram}
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.36em]" style={{ color: `${accent}` }}>
                Wedding invitation
              </p>
              <h1
                className="mt-5 font-display text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.75rem)", lineHeight: 0.96 }}
              >
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-[14px] leading-[1.85] sm:text-[15px]" style={{ color: "rgba(255,255,255,0.78)" }}>
                {heroSubtitle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-white/80">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <Calendar size={12} />
                  {ceremonyDate}
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <MapPin size={12} />
                  {venue}
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.12)}
              className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div
                className="rounded-[30px] border p-6 sm:p-8"
                style={{ background: "rgba(255,250,245,0.12)", borderColor: "rgba(255,255,255,0.14)", backdropFilter: "blur(16px)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: `${accent}` }}>
                  Wedding story
                </p>
                <p className="mt-4 max-w-2xl text-[14px] leading-[1.9] text-white/84 sm:text-[15px]">
                  {cardTeaser}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{ background: "#fff", color: "#241c16" }}
                  >
                    <MessageCircle size={13} />
                    Discuss this look
                  </a>
                  <a
                    href="#preview-story"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{ border: "1px solid rgba(255,255,255,0.16)", color: "#fff" }}
                  >
                    <Heart size={13} />
                    Explore the card
                  </a>
                </div>
              </div>

              <div
                className="rounded-[30px] border p-6 sm:p-8"
                style={{ background: "rgba(20,14,11,0.42)", borderColor: "rgba(255,255,255,0.14)", backdropFilter: "blur(16px)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: `${accent}` }}>
                  Save the date
                </p>
                <div className="mt-5 flex items-end gap-4">
                  <span className="font-display text-[4rem] leading-none text-white sm:text-[5rem]">
                    {ceremonyDay}
                  </span>
                  <div className="pb-2">
                    <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/88">
                      {ceremonyMonth}
                    </p>
                    <p className="text-[12px] uppercase tracking-[0.24em] text-white/58">
                      {ceremonyYear}
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
                <p className="mt-5 text-[13px] leading-[1.8] text-white/78">
                  A beautifully paced celebration of vows, atmosphere, and cherished memory.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main id="preview-story" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.section {...fadeUp(0)} className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Invitation
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl" style={{ lineHeight: 1.02 }}>
              Come celebrate
              <br />
              <span className="font-script" style={{ color: accent }}>
                their forever.
              </span>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
              {invitationNote}
            </p>
            <div className="mt-7 rounded-[24px] p-5" style={{ background: shellAlt }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: muted }}>
                Celebration details
              </p>
              <div className="mt-4 space-y-3 text-[13px]" style={{ color: body }}>
                <div className="flex items-start gap-3">
                  <Calendar size={15} style={{ color: accent }} />
                  <span>{ceremonyDate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} style={{ color: accent }} />
                  <span>{venue}</span>
                </div>
                {firstEvent?.time && (
                  <div className="flex items-start gap-3">
                    <Clock size={15} style={{ color: accent }} />
                    <span>{firstEvent.time}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Hosted with love
                </p>
                <p className="mt-4 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
                  Together with their families, they invite you into a celebration shaped with intimacy, elegance, and heartfelt intention.
                </p>
              </div>
              <div className="grid gap-4">
                {story?.groomFamily && (
                  <div className="rounded-[24px] p-5" style={{ background: shellAlt }}>
                    <div className="flex items-center gap-2">
                      <Users size={15} style={{ color: accent }} />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: muted }}>
                        {groom}&apos;s family
                      </p>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.8]" style={{ color: body }}>
                      {story.groomFamily}
                    </p>
                  </div>
                )}
                {story?.brideFamily && (
                  <div className="rounded-[24px] p-5" style={{ background: shellAlt }}>
                    <div className="flex items-center gap-2">
                      <Users size={15} style={{ color: accent }} />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: muted }}>
                        {bride}&apos;s family
                      </p>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.8]" style={{ color: body }}>
                      {story.brideFamily}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp(0.04)} className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
              {ourStoryTitle}
            </p>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl">How they found each other</h3>
            <p className="mt-5 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
              {story?.howWeMet || invitationNote}
            </p>
            <div className="mt-6 rounded-[24px] p-5" style={{ background: shellAlt }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: muted }}>
                The little things
              </p>
              <p className="mt-3 text-[14px] leading-[1.9] italic" style={{ color: body }}>
                {littleThings}
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div
              className="min-h-[17rem] overflow-hidden rounded-[32px] border bg-cover bg-center"
              style={{
                backgroundImage: `url(${gallery[0] || heroImage})`,
                backgroundPosition: galleryImagePositions[0] || heroImagePosition,
                borderColor: line,
              }}
            />
            <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
              <div className="flex items-center gap-2">
                <Scroll size={16} style={{ color: accent }} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  {proposalTitle}
                </p>
              </div>
              <p className="mt-4 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
                {proposalStory}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp(0.08)} className="mt-6 rounded-[34px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Camera size={16} style={{ color: accent }} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Moments
                </p>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl">A gallery that feels personal</h3>
            </div>
            <p className="max-w-md text-[13px] leading-[1.8]" style={{ color: body }}>
              A sequence of images chosen to let the atmosphere, fashion, and tenderness of the day speak for themselves.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {gallery.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={`overflow-hidden rounded-[28px] border bg-cover bg-center ${GALLERY_LAYOUTS[index] || "min-h-[16rem]"}`}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: galleryImagePositions[index] || heroImagePosition,
                  borderColor: line,
                }}
              />
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp(0.12)} className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[32px] border" style={{ background: shell, borderColor: line }}>
            <div
              className="min-h-[18rem] bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.4)), url(${gallery[1] || heroImage})`,
                backgroundPosition: galleryImagePositions[1] || heroImagePosition,
              }}
            />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: accent }} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Venue
                </p>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl">{venue}</h3>
              <p className="mt-3 text-[14px] leading-[1.9]" style={{ color: body }}>
                {venueAddress}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}2f` }}
              >
                <MapPin size={13} />
                View map
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: accent }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Wedding itinerary
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {groupedEvents.map((group, groupIndex) => (
                <div key={group.key} className="rounded-[26px] p-5 sm:p-6" style={{ background: shellAlt }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: muted }}>
                    Day {groupIndex + 1}
                  </p>
                  <h4 className="mt-2 font-display text-xl">{group.label}</h4>
                  <div className="mt-5 space-y-4">
                    {group.items.map((event) => (
                      <div key={`${group.key}-${event.name}`} className="border-l pl-4" style={{ borderColor: `${accent}55` }}>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{event.name}</p>
                          <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: accent }}>
                            {event.time}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px]" style={{ color: body }}>
                          {event.venue}
                        </p>
                        {event.description && (
                          <p className="mt-2 text-[13px] leading-[1.8]" style={{ color: body }}>
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp(0.16)} className="mt-6 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Attire note
            </p>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl">Dress for the mood</h3>
            <p className="mt-5 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
              {dressCode}
            </p>
          </div>
          <div className="rounded-[32px] border p-6 sm:p-8" style={{ background: shell, borderColor: line }}>
            <div className="flex items-center gap-2">
              <Heart size={16} style={{ color: accent }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Closing note
              </p>
            </div>
            <p className="mt-5 text-[14px] leading-[1.95] sm:text-[15px]" style={{ color: body }}>
              {closingNote}
            </p>
          </div>
        </motion.section>

        <motion.section
          {...fadeUp(0.2)}
          className="mt-6 rounded-[36px] border px-6 py-8 text-center sm:px-8 sm:py-10"
          style={{
            background: `linear-gradient(135deg, ${shell}, ${shellAlt})`,
            borderColor: line,
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: accent }}>
            {story?.rsvpText || "Join us"}
          </p>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl" style={{ lineHeight: 1.02 }}>
            {storyCTA}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-[1.9] sm:text-[15px]" style={{ color: body }}>
            If this world feels like yours, we would be delighted to shape your own invitation with the same romance, detail, and atmosphere.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`/builder?template=${theme.slug}`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: accent, color: "#fff" }}
            >
              Reserve this design
              <ArrowRight size={13} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ border: `1px solid ${accent}40`, color: accent }}
            >
              <MessageCircle size={13} />
              WhatsApp us
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
