"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Calendar,
  Heart,
  Music,
  MessageCircle,
  Sparkles,
  User,
  Lock,
  Shield,
  Eye,
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  Play,
  Film,
} from "lucide-react";
import { PORTFOLIO_THEMES, BRAND } from "@/lib/portfolioThemes";
import { useLocale } from "@/components/LocaleProvider";
import { BASE_PRICES } from "@/lib/i18n";

/* ── Palette ────────────────────────────────────────────── */
const P = {
  bg: "#faf8f4", bgAlt: "#f4f0ea", bgDeep: "#eae5dc", surface: "#fffdfb",
  ink: "#1a1816", body: "#57504a", muted: "#9a9189",
  gold: "#9c7f54", goldSoft: "#bfa97c", goldMuted: "#e0d6c4",
  line: "#e8e3db", lineSoft: "#f2efe9", noir: "#110f0d",
};

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string; description: string }> = {
  basic: { label: "BASIC", color: "#6b7280", bg: "#f3f4f6", description: "Beautiful design, RSVP, gallery, events" },
  luxe: { label: "LUXE", color: "#92400e", bg: "#fef3c7", description: "Music, countdown, love story, venue map, unlimited" },
};

type WeddingDetails = {
  groomName: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  venueAddress: string;
  city: string;
  events: { name: string; date: string; time: string; venue: string }[];
  loveStory: string;
  message: string;
  phone: string;
  email: string;
  groomFamily: string;
  brideFamily: string;
  dressCode: string;
  musicPreference: string;
  rsvpContact: string;
};

const STEPS = [
  { id: "design", label: "Design", icon: Sparkles },
  { id: "details", label: "Details", icon: User },
  { id: "events", label: "Events", icon: Calendar },
  { id: "review", label: "Review", icon: Eye },
  { id: "payment", label: "Payment", icon: CreditCard },
];

/* ══════════════════════════════════════════════════════════
   MAIN BUILDER — Premium editorial ordering experience
   ══════════════════════════════════════════════════════════ */
function BuilderInner() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "";

  const { prices, price } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20wedding%20invitation.`;

  const [step, setStep] = useState(initialTemplate ? 1 : 0);
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [paymentDone, setPaymentDone] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);
  const [designFilter, setDesignFilter] = useState<"all" | "basic" | "luxe">("all");
  const [videoAddon, setVideoAddon] = useState(false);
  const [details, setDetails] = useState<WeddingDetails>({
    groomName: "", brideName: "", weddingDate: "",
    venue: "", venueAddress: "", city: "",
    events: [
      { name: "Haldi", date: "", time: "", venue: "" },
      { name: "Mehendi", date: "", time: "", venue: "" },
      { name: "Sangeet", date: "", time: "", venue: "" },
      { name: "Wedding", date: "", time: "", venue: "" },
      { name: "Reception", date: "", time: "", venue: "" },
    ],
    loveStory: "", message: "", phone: "", email: "",
    groomFamily: "", brideFamily: "", dressCode: "",
    musicPreference: "", rsvpContact: "",
  });

  const selectedTheme = PORTFOLIO_THEMES.find((t) => t.slug === selectedTemplate);
  const tier = selectedTheme?.tier || "basic";
  const tierLabel = TIER_CONFIG[tier]?.label || "BASIC";
  const tierPrice = tier === "luxe" ? prices.luxe : prices.basic;
  const tierPriceINR = tier === "luxe" ? BASE_PRICES.luxe : BASE_PRICES.basic;
  const totalINR = tierPriceINR + (videoAddon ? BASE_PRICES.videoAddon : 0);

  const filteredDesigns = PORTFOLIO_THEMES
    .filter(t => t.tier !== "signature")
    .filter(t => designFilter === "all" || t.tier === designFilter);

  const updateDetail = (key: keyof WeddingDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  const updateEvent = (index: number, field: string, value: string) => {
    setDetails((prev) => {
      const events = [...prev.events];
      events[index] = { ...events[index], [field]: value };
      return { ...prev, events };
    });
  };

  const addEvent = () => {
    setDetails((prev) => ({ ...prev, events: [...prev.events, { name: "", date: "", time: "", venue: "" }] }));
  };

  const removeEvent = (index: number) => {
    setDetails((prev) => ({ ...prev, events: prev.events.filter((_, i) => i !== index) }));
  };

  const activeEvents = useMemo(() => details.events.filter((e) => e.name), [details.events]);

  const canProceed = () => {
    if (step === 0) return !!selectedTemplate;
    if (step === 1) return !!details.groomName && !!details.brideName && !!details.weddingDate;
    if (step === 2) return activeEvents.some((e) => e.date);
    return true;
  };

  // UPI payment link
  const upiLink = `upi://pay?pa=${BRAND.upiId}&pn=The%20Digital%20Inviters&am=${totalINR}&cu=INR&tn=${tierLabel}%20Wedding%20Invite${videoAddon ? "%20%2B%20Video" : ""}%20-%20${encodeURIComponent(details.groomName)}%20%26%20${encodeURIComponent(details.brideName)}`;

  // After payment — send order via WhatsApp
  const handlePaymentDone = () => {
    const orderLines = [
      `*New Order — ${tierLabel}${videoAddon ? " + Video" : ""} (₹${totalINR})*`,
      `Template: ${selectedTheme?.name}`,
      `Couple: ${details.groomName} & ${details.brideName}`,
      `Date: ${fmtDate(details.weddingDate)}`,
      `Venue: ${details.venue}${details.city ? `, ${details.city}` : ""}`,
      `Events: ${activeEvents.filter(e => e.date).map(e => e.name).join(", ")}`,
      details.groomFamily ? `Groom Family: ${details.groomFamily}` : "",
      details.brideFamily ? `Bride Family: ${details.brideFamily}` : "",
      details.dressCode ? `Dress Code: ${details.dressCode}` : "",
      details.musicPreference ? `Music: ${details.musicPreference}` : "",
      details.phone ? `Phone: ${details.phone}` : "",
      details.email ? `Email: ${details.email}` : "",
      videoAddon ? `Video Invite: Yes (+₹${BASE_PRICES.videoAddon})` : "",
      ``,
      `Payment: ₹${totalINR} via UPI`,
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(orderLines);
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`, "_blank");
    setPaymentDone(true);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(BRAND.upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  return (
    <main className="min-h-screen" style={{ background: P.bg, color: P.ink }}>
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-50 px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between" style={{ background: `${P.bg}F2`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${P.line}` }}>
        <Link href="/" className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide" style={{ color: P.muted }}>
          <ArrowLeft size={12} /> Home
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Heart size={11} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-[13px] sm:text-[15px] tracking-tight" style={{ color: P.ink }}>Your Invitation</span>
        </div>
        {selectedTheme ? (
          <div className="flex items-center gap-1.5">
            <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.1em]" style={{ background: TIER_CONFIG[tier]?.bg, color: TIER_CONFIG[tier]?.color }}>{tierLabel}</span>
            <span className="text-[11px] sm:text-[12px] font-semibold" style={{ color: P.gold }}>{tierPrice}</span>
          </div>
        ) : <div className="w-12 sm:w-16" />}
      </header>

      {/* ─── Stepper ─── */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 overflow-x-auto scrollbar-hide" style={{ borderBottom: `1px solid ${P.lineSoft}`, background: P.surface }}>
        <div className="flex items-center justify-center gap-0 min-w-max mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => i <= step && setStep(i)}
                className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wide transition-all"
                style={{
                  background: i === step ? P.ink : i < step ? `${P.gold}15` : "transparent",
                  color: i === step ? P.bg : i < step ? P.gold : P.muted,
                  cursor: i <= step ? "pointer" : "default",
                }}
              >
                {i < step ? <Check size={9} /> : <s.icon size={9} />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && <div className="mx-0.5 sm:mx-1 h-px w-4 sm:w-8" style={{ background: i < step ? P.gold : P.line }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">

          {/* ═══ STEP 0: Choose Your Design ═══ */}
          {step === 0 && (
            <StepWrapper key="design">
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: P.gold }}>Begin Here</p>
                <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl md:text-3xl" style={{ color: P.ink }}>Select your design language</h2>
                <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px]" style={{ color: P.body }}>Each design has its own personality — choose the one that feels most like you.</p>
              </div>

              {/* Tier filter */}
              <div className="flex items-center justify-center gap-2 flex-wrap mb-6 sm:mb-8">
                {([["all", "All Designs"], ["basic", `Basic · ${prices.basic}`], ["luxe", `Luxe · ${prices.luxe}`]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setDesignFilter(key)}
                    className="rounded-full px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wide transition-all"
                    style={{
                      background: designFilter === key ? P.ink : "transparent",
                      color: designFilter === key ? P.bg : P.muted,
                      border: `1px solid ${designFilter === key ? P.ink : P.line}`,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filteredDesigns.map((theme) => {
                  const tc = TIER_CONFIG[theme.tier];
                  const tp = theme.tier === "luxe" ? prices.luxe : prices.basic;
                  const sel = selectedTemplate === theme.slug;
                  const isLuxe = theme.tier === "luxe";
                  return (
                    <button key={theme.slug} onClick={() => setSelectedTemplate(theme.slug)}
                      className="group relative text-left overflow-hidden rounded-xl sm:rounded-2xl transition-all"
                      style={{ border: sel ? `2px solid ${P.gold}` : isLuxe ? `1px solid ${P.goldMuted}` : `1px solid ${P.lineSoft}`, boxShadow: sel ? `0 0 0 3px ${P.gold}20` : "none" }}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${theme.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        {/* Top-left badges */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
                          <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.12em] shadow-sm" style={{ background: isLuxe ? "linear-gradient(135deg, #1c1208, #3a2a14)" : tc?.bg, color: isLuxe ? "#e0c080" : tc?.color }}>{tc?.label}</span>
                          {theme.badge && <span className="rounded-full px-1.5 sm:px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.08em] shadow-sm backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.92)", color: P.ink }}>{theme.badge}</span>}
                        </div>

                        {/* Selected check */}
                        {sel && (
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full shadow-lg" style={{ background: P.gold }}>
                            <Check size={11} color="white" strokeWidth={3} />
                          </div>
                        )}

                        {/* Mood tag */}
                        {theme.mood && (
                          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                            <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-medium tracking-wide backdrop-blur-md" style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.85)" }}>{theme.mood}</span>
                          </div>
                        )}

                        {/* Preview link */}
                        <Link href={`/${theme.slug}`} target="_blank" onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
                          style={{ background: "rgba(255,255,255,0.9)", color: P.ink }}
                        >
                          <Eye size={9} /> Preview
                        </Link>
                      </div>

                      {/* Info strip — dark for Luxe */}
                      <div className="p-2.5 sm:p-3.5" style={{ background: sel ? `${P.gold}08` : isLuxe ? P.ink : P.surface }}>
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-display text-[12px] sm:text-[14px] truncate" style={{ color: isLuxe && !sel ? "#fff" : P.ink }}>{theme.name}</h3>
                          <span className="text-[10px] sm:text-[12px] font-semibold flex-shrink-0" style={{ color: isLuxe ? P.goldSoft : P.gold }}>{tp}</span>
                        </div>
                        <p className="mt-0.5 text-[9px] sm:text-[10px] italic truncate" style={{ color: isLuxe && !sel ? "rgba(255,255,255,0.5)" : P.muted }}>{theme.tagline}</p>
                        {isLuxe && theme.layoutStyle && (
                          <div className="mt-1 flex items-center gap-1 flex-wrap">
                            <span className="rounded px-1.5 py-0.5 text-[6px] tracking-wide uppercase" style={{ background: isLuxe && !sel ? "rgba(255,255,255,0.08)" : `${P.gold}08`, color: isLuxe && !sel ? "rgba(255,255,255,0.35)" : P.muted }}>{theme.layoutStyle.replace(/-/g, " ")}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 1: Your Details ═══ */}
          {step === 1 && (
            <StepWrapper key="details">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_360px]">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: P.gold }}>{tier === "luxe" ? "Your Premium Brief" : "Quick Details"}</p>
                  <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl" style={{ color: P.ink }}>{tier === "luxe" ? "Tell us about your celebration" : "Fill in and you're almost done"}</h2>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px]" style={{ color: P.body }}>{tier === "luxe" ? "These details become part of your cinematic invitation. Unlimited revisions included." : "Just the essentials. Takes about 3 minutes. Everything can be revised later."}</p>

                  <div className="mt-5 sm:mt-7 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>The Couple</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <InputField label="Groom's Name" value={details.groomName} onChange={(v) => updateDetail("groomName", v)} placeholder="e.g. Aarav Sharma" required />
                      <InputField label="Bride's Name" value={details.brideName} onChange={(v) => updateDetail("brideName", v)} placeholder="e.g. Meera Patel" required />
                    </div>
                    <InputField label="Wedding Date" value={details.weddingDate} onChange={(v) => updateDetail("weddingDate", v)} type="date" required />
                  </div>

                  <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>Families</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <InputField label="Groom's Family" value={details.groomFamily} onChange={(v) => updateDetail("groomFamily", v)} placeholder="e.g. Son of Mr. & Mrs. Sharma" />
                      <InputField label="Bride's Family" value={details.brideFamily} onChange={(v) => updateDetail("brideFamily", v)} placeholder="e.g. Daughter of Mr. & Mrs. Patel" />
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>The Venue</p>
                    <InputField label="Venue Name" value={details.venue} onChange={(v) => updateDetail("venue", v)} placeholder="e.g. Taj Lake Palace" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <InputField label="Address" value={details.venueAddress} onChange={(v) => updateDetail("venueAddress", v)} placeholder="Full address" />
                      <InputField label="City" value={details.city} onChange={(v) => updateDetail("city", v)} placeholder="e.g. Udaipur" />
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>More Details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <InputField label="Dress Code" value={details.dressCode} onChange={(v) => updateDetail("dressCode", v)} placeholder="e.g. Traditional / Semi-formal" />
                      <InputField label="RSVP Contact" value={details.rsvpContact} onChange={(v) => updateDetail("rsvpContact", v)} placeholder="e.g. +91 98765 43210" />
                    </div>
                    {tier === "luxe" && (
                      <InputField label="Music Preference" value={details.musicPreference} onChange={(v) => updateDetail("musicPreference", v)} placeholder="e.g. Instrumental, Bollywood classics, specific song" />
                    )}
                  </div>

                  {tier === "luxe" && (
                    <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} style={{ color: P.gold }} />
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>Luxe Extras</p>
                      </div>
                      <TextareaField label="Your Love Story" value={details.loveStory} onChange={(v) => updateDetail("loveStory", v)} placeholder="How did you meet? A few sentences that capture your journey..." rows={3} />
                      <TextareaField label="Message to Guests" value={details.message} onChange={(v) => updateDetail("message", v)} placeholder="We can't wait to celebrate with you..." rows={2} />
                    </div>
                  )}

                  <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>Contact (for our team only)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <InputField label="Phone" value={details.phone} onChange={(v) => updateDetail("phone", v)} placeholder="+91 98765 43210" type="tel" />
                      <InputField label="Email" value={details.email} onChange={(v) => updateDetail("email", v)} placeholder="you@email.com" type="email" />
                    </div>
                  </div>
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <LivePreview details={details} theme={selectedTheme} />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 2: Ceremonies ═══ */}
          {step === 2 && (
            <StepWrapper key="events">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_360px]">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: P.gold }}>The Celebrations</p>
                  <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl" style={{ color: P.ink }}>Map out your wedding week</h2>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px]" style={{ color: P.body }}>Each event gets its own beautiful section on your invite. Add or remove as needed.</p>
                  <div className="mt-5 sm:mt-7 space-y-3">
                    {details.events.map((event, i) => (
                      <div key={i} className="rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                        <div className="flex items-start gap-2">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InputField label="Event Name" value={event.name} onChange={(v) => updateEvent(i, "name", v)} placeholder="e.g. Sangeet" />
                            <InputField label="Venue" value={event.venue} onChange={(v) => updateEvent(i, "venue", v)} placeholder="Same as main venue" />
                          </div>
                          <button onClick={() => removeEvent(i)} className="mt-5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-red-50" style={{ color: "#ef4444" }}><X size={14} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <InputField label="Date" value={event.date} onChange={(v) => updateEvent(i, "date", v)} type="date" />
                          <InputField label="Time" value={event.time} onChange={(v) => updateEvent(i, "time", v)} type="time" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addEvent} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold transition-all hover:border-[#9a7b4f]" style={{ border: `1px dashed ${P.line}`, color: P.gold }}>
                      + Add Another Ceremony
                    </button>
                  </div>
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <LivePreview details={details} theme={selectedTheme} />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 3: Review Your Invitation ═══ */}
          {step === 3 && (
            <StepWrapper key="review">
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: P.gold }}>Almost There</p>
                <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl md:text-3xl" style={{ color: P.ink }}>Review your invitation</h2>
                <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px]" style={{ color: P.body }}>
                  This is exactly how your guests will experience it. Take a moment to make sure everything feels right.
                </p>
              </div>

              {/* Full order summary */}
              <div className="mx-auto max-w-2xl mb-6 sm:mb-8 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                <div className="flex items-center gap-3 sm:gap-4">
                  {selectedTheme && <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg sm:rounded-xl bg-cover bg-center shadow-sm" style={{ backgroundImage: `url(${selectedTheme.image})` }} />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[15px] sm:text-lg truncate" style={{ color: P.ink }}>{selectedTheme?.name}</h3>
                      <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.1em] flex-shrink-0" style={{ background: TIER_CONFIG[tier]?.bg, color: TIER_CONFIG[tier]?.color }}>{tierLabel}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] sm:text-[12px] truncate" style={{ color: P.muted }}>{details.groomName} & {details.brideName}</p>
                  </div>
                  <span className="font-display text-lg sm:text-xl flex-shrink-0" style={{ color: P.gold }}>{tierPrice}</span>
                </div>

                <div className="pt-3 space-y-2" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <Row label="Wedding Date" value={fmtDate(details.weddingDate)} />
                  <Row label="Venue" value={`${details.venue}${details.city ? `, ${details.city}` : ""}`} />
                  <Row label="Events" value={activeEvents.filter(e => e.date).map(e => e.name).join(", ")} />
                  <Row label="Delivery" value={tier === "luxe" ? "Same-day priority" : "Within 24 hours"} />
                  <Row label="Revisions" value={tier === "luxe" ? "Unlimited" : "3 free revisions"} />
                  <Row label="Hosting" value="Lifetime — link never expires" />
                </div>

                {/* Inclusions */}
                <div className="pt-3" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                  <p className="text-[8px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: P.gold }}>{tierLabel} Plan Includes</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {(tier === "luxe" ? [
                      "Background music", "Countdown timer", "Love story", "Venue map",
                      "Premium animations", "Unlimited gallery", "Custom guest names", "WhatsApp ready",
                    ] : [
                      "Event schedule", "Photo gallery (8)", "RSVP collection", "WhatsApp sharing",
                      "Mobile responsive", "Instagram ready", "QR code", "Digital keepsake",
                    ]).map(item => (
                      <div key={item} className="flex items-center gap-1.5">
                        <Check size={8} style={{ color: P.gold }} />
                        <span className="text-[9px] sm:text-[10px]" style={{ color: P.body }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Invite Add-On */}
              <div className="mx-auto max-w-2xl mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden" style={{ border: `1px solid ${videoAddon ? P.gold : P.lineSoft}`, transition: "border-color 0.3s" }}>
                <button onClick={() => setVideoAddon(!videoAddon)} className="w-full text-left p-4 sm:p-5 flex items-center gap-3 sm:gap-4" style={{ background: videoAddon ? `${P.gold}08` : P.surface }}>
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full" style={{ background: videoAddon ? `${P.gold}18` : P.bgDeep }}>
                    <Film size={16} style={{ color: videoAddon ? P.gold : P.muted }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-[13px] sm:text-[15px]" style={{ color: P.ink }}>Video Invite Add-on</p>
                      <span className="rounded-full px-2 py-0.5 text-[7px] font-bold tracking-[0.15em] uppercase" style={{ background: `${P.gold}15`, color: P.gold }}>New</span>
                    </div>
                    <p className="mt-0.5 text-[10px] sm:text-[11px]" style={{ color: P.muted }}>30-60s cinematic video for WhatsApp &amp; social media</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-display text-[14px] sm:text-base" style={{ color: P.gold }}>+{prices.videoAddon}</span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: videoAddon ? P.gold : P.bgDeep, border: videoAddon ? "none" : `1.5px solid ${P.line}`, transition: "all 0.2s" }}>
                      {videoAddon && <Check size={12} color="white" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              </div>

              <FullInvitePreview details={details} theme={selectedTheme} tier={tier} />

              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4">
                <button onClick={() => setStep(4)}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2.5 sm:gap-3 rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.02] shadow-lg"
                  style={{ background: P.gold, color: "white" }}
                >
                  <Lock size={13} />
                  Approve &amp; Proceed to Payment — ₹{totalINR}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[11px] sm:text-[12px] font-medium transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>
                  <ArrowLeft size={11} /> Edit my details
                </button>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 4: Boutique Payment ═══ */}
          {step === 4 && !paymentDone && (
            <StepWrapper key="payment">
              <div className="mx-auto max-w-lg">
                <div className="text-center mb-6 sm:mb-8">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: P.gold }}>Final Step</p>
                  <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl" style={{ color: P.ink }}>Reserve your design</h2>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px]" style={{ color: P.body }}>Secure one-time payment. {tier === "luxe" ? "Same-day" : "24-hour"} delivery. No subscriptions.</p>
                </div>

                {/* Order summary */}
                <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>Order Summary</p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    {selectedTheme && <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-lg sm:rounded-xl bg-cover bg-center shadow-sm" style={{ backgroundImage: `url(${selectedTheme.image})` }} />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-display text-[14px] sm:text-base truncate" style={{ color: P.ink }}>{selectedTheme?.name}</p>
                        <span className="rounded-full px-2 py-0.5 text-[6px] sm:text-[7px] font-bold tracking-[0.1em] flex-shrink-0" style={{ background: TIER_CONFIG[tier]?.bg, color: TIER_CONFIG[tier]?.color }}>{tierLabel}</span>
                      </div>
                      <p className="mt-0.5 text-[10px] sm:text-[11px]" style={{ color: P.muted }}>{details.groomName} & {details.brideName}</p>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <Row label="Wedding Date" value={fmtDate(details.weddingDate)} />
                    <Row label="Venue" value={`${details.venue}${details.city ? `, ${details.city}` : ""}`} />
                    <Row label="Events" value={activeEvents.filter(e => e.date).map(e => e.name).join(", ")} />
                  </div>

                  <div className="pt-3 space-y-2" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <div className="flex justify-between text-[11px] sm:text-[12px]">
                      <span style={{ color: P.body }}>{tierLabel} Invite</span>
                      <span className="font-medium" style={{ color: P.ink }}>₹{tierPriceINR}</span>
                    </div>
                    {videoAddon && (
                      <div className="flex justify-between text-[11px] sm:text-[12px]">
                        <span className="flex items-center gap-1" style={{ color: P.body }}><Film size={10} style={{ color: P.gold }} /> Video Add-on</span>
                        <span className="font-medium" style={{ color: P.ink }}>₹{BASE_PRICES.videoAddon}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <div>
                      <span className="text-[12px] sm:text-[13px] font-semibold" style={{ color: P.ink }}>Total</span>
                      <p className="text-[9px] sm:text-[10px]" style={{ color: P.muted }}>One-time · Lifetime hosting</p>
                    </div>
                    <span className="font-display text-xl sm:text-2xl" style={{ color: P.ink }}>₹{totalINR}</span>
                  </div>

                  {/* Timeline */}
                  <div className="pt-3 flex items-center gap-3" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <Clock size={12} style={{ color: P.gold }} />
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-medium" style={{ color: P.ink }}>{tier === "luxe" ? "Same-day delivery" : "Delivered within 24 hours"}</p>
                      <p className="text-[9px]" style={{ color: P.muted }}>{tier === "luxe" ? "Unlimited revisions included" : "3 free revisions included"} · Lifetime hosting</p>
                    </div>
                  </div>
                </div>

                {/* UPI Payment */}
                <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: `${P.gold}06`, border: `1px solid ${P.gold}18` }}>
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: P.gold }}>Secure UPI Payment</p>
                    <p className="mt-1 text-[10px] sm:text-[11px]" style={{ color: P.muted }}>Pay using any UPI app — GPay, PhonePe, Paytm, or any bank</p>
                  </div>

                  {/* UPI ID */}
                  <div className="flex items-center justify-between gap-2 rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: P.muted }}>UPI ID</p>
                      <p className="mt-1 font-mono text-[12px] sm:text-[14px] font-semibold tracking-wide truncate" style={{ color: P.ink }}>{BRAND.upiId}</p>
                    </div>
                    <button onClick={copyUpi} className="flex items-center gap-1 sm:gap-1.5 rounded-full px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-semibold transition-all flex-shrink-0" style={{ background: upiCopied ? "#dcfce7" : P.bgDeep, color: upiCopied ? "#16a34a" : P.ink }}>
                      {upiCopied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                    </button>
                  </div>

                  {/* Pay via UPI app */}
                  <a href={upiLink}
                    className="group flex w-full items-center justify-center gap-2 sm:gap-2.5 rounded-full py-3.5 sm:py-4 text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.01] shadow-md"
                    style={{ background: P.ink, color: P.bg }}
                  >
                    <Lock size={12} />
                    Pay ₹{totalINR} — Open UPI App
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </a>

                  <p className="text-center text-[9px] sm:text-[10px] leading-relaxed" style={{ color: P.muted }}>
                    Tapping above will open your default UPI app with amount pre-filled.
                    <br />You can also copy the UPI ID above and pay manually.
                  </p>
                </div>

                {/* Confirm reservation */}
                <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-center" style={{ color: P.gold }}>Confirm Your Reservation</p>
                  <p className="text-center text-[10px] sm:text-[11px] leading-relaxed" style={{ color: P.body }}>
                    Once you&apos;ve completed payment, tap below to confirm. We&apos;ll begin crafting your invite immediately.
                  </p>
                  <button onClick={handlePaymentDone}
                    className="group flex w-full items-center justify-center gap-2 rounded-full py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-semibold tracking-wide transition-all hover:scale-[1.01]"
                    style={{ background: P.ink, color: P.bg }}
                  >
                    <CheckCircle2 size={13} />
                    I&apos;ve Paid — Confirm My Order
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
                  {[
                    { icon: Shield, text: "Secure Payment" },
                    { icon: Lock, text: "100% Refund Guarantee" },
                    { icon: Clock, text: tier === "luxe" ? "Same-day Delivery" : "24h Delivery" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon size={10} style={{ color: P.goldSoft }} />
                      <span className="text-[8px] sm:text-[9px] font-medium" style={{ color: P.muted }}>{text}</span>
                    </div>
                  ))}
                </div>

                <a href={cta} target="_blank" rel="noreferrer"
                  className="mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-full py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-medium border transition-all hover:border-[#9a7b4f]"
                  style={{ borderColor: P.line, color: P.muted }}
                >
                  <MessageCircle size={11} /> Need help? Chat with us first
                </a>
              </div>
            </StepWrapper>
          )}

          {/* ═══ ORDER CONFIRMED — Polished thank-you ═══ */}
          {step === 4 && paymentDone && (
            <StepWrapper key="confirmed">
              <div className="mx-auto max-w-lg text-center py-4 sm:py-8">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full" style={{ background: `${P.gold}12` }}>
                  <CheckCircle2 size={32} style={{ color: P.gold }} />
                </div>
                <h2 className="mt-5 sm:mt-6 font-display text-2xl sm:text-3xl" style={{ color: P.ink }}>Order confirmed!</h2>
                <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] leading-[1.8]" style={{ color: P.body }}>
                  Thank you, {details.groomName} &amp; {details.brideName}. Your <strong>{selectedTheme?.name}</strong> ({tierLabel}{videoAddon ? " + Video" : ""}) invitation is now being crafted by our design team.
                </p>

                {/* Order receipt */}
                <div className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left" style={{ background: `${P.gold}06`, border: `1px solid ${P.gold}15` }}>
                  <p className="text-[8px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: P.gold }}>Order Receipt</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: P.body }}>{tierLabel} · {selectedTheme?.name}</span>
                      <span className="font-medium" style={{ color: P.ink }}>₹{tierPriceINR}</span>
                    </div>
                    {videoAddon && (
                      <div className="flex justify-between text-[11px]">
                        <span className="flex items-center gap-1" style={{ color: P.body }}><Film size={9} /> Video Invite</span>
                        <span className="font-medium" style={{ color: P.ink }}>₹{BASE_PRICES.videoAddon}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[12px] pt-2 mt-2" style={{ borderTop: `1px solid ${P.goldMuted}` }}>
                      <span className="font-semibold" style={{ color: P.ink }}>Total Paid</span>
                      <span className="font-display text-base" style={{ color: P.gold }}>₹{totalINR}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-7 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left space-y-3 sm:space-y-4" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>What happens next</p>
                  {[
                    { step: "1", text: "We verify your payment and begin crafting your invitation immediately." },
                    { step: "2", text: `Your unique invite link arrives via WhatsApp within ${tier === "luxe" ? "a few hours" : "24 hours"}.` },
                    ...(videoAddon ? [{ step: "2b", text: "Your video invite is delivered alongside your link — same theme, same elegance." }] : []),
                    { step: "3", text: "Share with guests — works on WhatsApp, Instagram, email, and everywhere." },
                    { step: "4", text: `Need changes? Message us anytime. ${tier === "luxe" ? "Unlimited" : "3 free"} revisions included.` },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] sm:text-[10px] font-bold" style={{ background: `${P.gold}12`, color: P.gold }}>{s.step.replace("b", "")}</span>
                      <span className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: P.body }}>{s.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 sm:mt-7 rounded-xl p-4 text-left" style={{ background: P.bgAlt, border: `1px solid ${P.lineSoft}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={12} style={{ color: P.gold }} />
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: P.gold }}>Our Promise</p>
                  </div>
                  <p className="text-[11px] sm:text-[12px] leading-[1.7]" style={{ color: P.body }}>
                    100% satisfaction guaranteed. If you&apos;re not happy with the result, we&apos;ll rework it. If we still can&apos;t get it right — full refund, no questions asked.
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/" className="flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-semibold tracking-wide" style={{ background: P.ink, color: P.bg }}>
                    <Heart size={12} /> Back to Home
                  </Link>
                  <a href={cta} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-medium border transition-all hover:border-[#9a7b4f]" style={{ borderColor: P.line, color: P.muted }}>
                    <MessageCircle size={12} /> Message Our Team
                  </a>
                </div>
              </div>
            </StepWrapper>
          )}

        </AnimatePresence>

        {/* ─── Bottom navigation — sticky on mobile ─── */}
        {step !== 3 && step !== 4 && (
          <div className="mt-6 sm:mt-10 flex items-center justify-between rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 sticky bottom-4 sm:static z-40" style={{ background: P.surface, border: `1px solid ${P.lineSoft}`, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-medium transition-colors hover:text-[#9a7b4f]" style={{ color: P.muted }}>
                <ArrowLeft size={11} /> Back
              </button>
            ) : <div />}
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-[12px] font-semibold tracking-wide transition-all disabled:opacity-35 hover:scale-[1.02]"
              style={{ background: canProceed() ? P.ink : P.bgDeep, color: canProceed() ? P.bg : P.muted }}
            >
              {step === 0 ? "Continue" : step === 2 ? "Preview" : "Continue"}
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function StepWrapper({ children, key: k }: { children: React.ReactNode; key: string }) {
  return (
    <motion.div key={k} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}

function InputField({ label, value, onChange, placeholder = "", type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5" style={{ color: P.gold }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
        style={{ borderColor: P.line, background: P.surface, color: P.ink }}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder = "", rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5" style={{ color: P.gold }}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        className="w-full rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
        style={{ borderColor: P.line, background: P.surface, color: P.ink }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-[11px] sm:text-[12px]">
      <span style={{ color: P.muted }}>{label}</span>
      <span className="font-medium text-right max-w-[60%] truncate" style={{ color: P.ink }}>{value}</span>
    </div>
  );
}

function fmtDate(d: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" });
  } catch { return d; }
}

/* ── Small live preview (sidebar) ──────────────────────── */
function LivePreview({ details, theme }: { details: WeddingDetails; theme?: (typeof PORTFOLIO_THEMES)[0] }) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: P.gold }}>Live Preview</p>
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${P.lineSoft}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
        <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: theme ? `url(${theme.image})` : "linear-gradient(135deg, #e8d4d0, #c9a87c)" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ background: "rgba(0,0,0,0.45)" }}>
            <p className="text-[9px] tracking-[0.25em] uppercase text-white/60">{fmtDate(details.weddingDate) || "Your Wedding Date"}</p>
            <h3 className="mt-2 font-display text-xl text-white">{details.groomName || "Groom"} & {details.brideName || "Bride"}</h3>
            <p className="mt-1 text-[10px] text-white/50">{details.venue || "Venue"}{details.city ? `, ${details.city}` : ""}</p>
          </div>
        </div>
        <div className="p-4 space-y-2" style={{ background: P.surface }}>
          <p className="text-[8px] font-medium tracking-[0.2em] uppercase" style={{ color: P.gold }}>Events</p>
          {details.events.filter(e => e.name).slice(0, 4).map((e, i) => (
            <div key={i} className="flex justify-between py-1.5 text-[11px]" style={{ borderBottom: `1px solid ${P.lineSoft}` }}>
              <span style={{ color: P.ink }}>{e.name}</span>
              <span style={{ color: P.muted }}>{e.date ? new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "TBD"}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 text-center text-[9px]" style={{ background: P.bgAlt, color: P.muted }}>
          {theme?.name || "Template"} · The Digital Inviters
        </div>
      </div>
    </div>
  );
}

/* ── Full invite preview (Step 3) — Premium quality matching actual invites ─── */
function FullInvitePreview({ details, theme, tier }: { details: WeddingDetails; theme?: (typeof PORTFOLIO_THEMES)[0]; tier: string }) {
  const activeEvents = details.events.filter(e => e.name && e.date);
  const allNamedEvents = details.events.filter(e => e.name);
  const eventsToShow = activeEvents.length > 0 ? activeEvents : allNamedEvents;
  const accent = theme?.accent || "#c9a87c";
  const bgColor = theme?.background || "#faf8f5";
  const isDark = bgColor.replace("#", "").match(/.{2}/g)?.reduce((sum, c) => sum + parseInt(c, 16), 0)! < 384;
  const inkColor = isDark ? "#faf8f5" : "#1a1816";
  const bodyColor = isDark ? "rgba(255,255,255,0.75)" : "#5c5650";
  const mutedColor = isDark ? "rgba(255,255,255,0.5)" : "#9a9189";
  const surfaceBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)";
  const cardBorder = isDark ? `rgba(255,255,255,0.12)` : `rgba(0,0,0,0.06)`;

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl shadow-2xl" style={{ background: bgColor }}>

      {/* ─── HERO — Full-screen cinematic like Royal Palace / South Indian Temple ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: theme ? `url(${theme.image})` : "linear-gradient(135deg, #2c2420, #1a1210)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, ${bgColor}F0 100%)` }} />
        
        {/* Decorative dots pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${accent} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

        <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-6 text-center">
          {/* Decorative icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 backdrop-blur-md" style={{ borderColor: `${accent}60`, background: "rgba(255,255,255,0.08)" }}>
            <Heart size={22} style={{ color: accent }} />
          </div>

          {/* Eyebrow */}
          <p className="text-[9px] font-semibold uppercase tracking-[0.55em]" style={{ color: accent }}>
            Together With Their Families
          </p>

          {/* Names — large serif like the real invites */}
          <h1 className="mt-6 font-serif leading-[1]" style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>
            {details.groomName || "Groom"}
          </h1>
          <span className="my-2 block font-serif italic" style={{ color: accent, fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>&amp;</span>
          <h1 className="font-serif leading-[1]" style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>
            {details.brideName || "Bride"}
          </h1>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-10" style={{ background: accent }} />
            <Sparkles size={12} style={{ color: accent }} />
            <span className="h-px w-10" style={{ background: accent }} />
          </div>

          {/* Date & Location */}
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-white/80">
            {fmtDate(details.weddingDate) || "Your Wedding Date"}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/60">
            <MapPin size={10} />
            {details.venue || "Venue"}{details.city ? `, ${details.city}` : ""}
          </p>
        </div>
      </section>

      {/* ─── EVENTS — Dark section like Royal Palace ─── */}
      <section className="relative overflow-hidden px-6 py-14 sm:px-10" style={{ background: isDark ? surfaceBg : P.noir }}>
        {/* Dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${accent} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
        
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.5em]" style={{ color: accent }}>Celebrations</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: isDark ? inkColor : "#faf8f5" }}>Wedding Festivities</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {eventsToShow.map((e, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border p-5 backdrop-blur" style={{ borderColor: `${accent}40`, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${accent}20` }}>
                    <Calendar size={14} style={{ color: accent }} />
                  </div>
                  <h3 className="font-serif text-xl" style={{ color: isDark ? inkColor : "#faf8f5" }}>{e.name}</h3>
                </div>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.35em]" style={{ color: accent }}>
                  {e.date ? new Date(e.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }) : "TBD"}
                  {e.time ? ` · ${e.time}` : ""}
                </p>
                {e.venue && <p className="mt-2 flex items-center gap-1 text-[11px]" style={{ color: isDark ? mutedColor : "rgba(255,255,255,0.6)" }}><MapPin size={9} />{e.venue}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOVE STORY (Luxe) — like the real story section with cards ─── */}
      {tier === "luxe" && details.loveStory && (
        <section className="px-6 py-14 sm:px-10" style={{ background: bgColor }}>
          <div className="mx-auto max-w-lg text-center">
            <Heart size={22} className="mx-auto mb-4" style={{ color: accent }} />
            <p className="text-[9px] font-semibold uppercase tracking-[0.5em]" style={{ color: accent }}>Our Story</p>
            <p className="mx-auto mt-5 font-serif text-2xl italic leading-relaxed sm:text-3xl" style={{ color: inkColor }}>
              &ldquo;{details.loveStory}&rdquo;
            </p>
            <div className="mx-auto mt-8 h-px w-20" style={{ background: accent }} />
          </div>
        </section>
      )}

      {/* ─── PERSONAL MESSAGE ─── */}
      {details.message && (
        <section className="px-6 py-10 text-center sm:px-10" style={{ background: surfaceBg }}>
          <p className="mx-auto max-w-md font-serif text-lg italic leading-relaxed" style={{ color: bodyColor }}>
            &ldquo;{details.message}&rdquo;
          </p>
          <p className="mt-4 text-[11px] font-medium" style={{ color: inkColor }}>
            — {details.groomName} & {details.brideName}
          </p>
        </section>
      )}

      {/* ─── VENUE — cinematic overlay like Royal Palace venue ─── */}
      {details.venue && (
        <section className="relative overflow-hidden" style={{ minHeight: "200px" }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: theme ? `url(${theme.image})` : "none", filter: "brightness(0.4)" }} />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)" }} />
          <div className="relative z-10 flex min-h-[200px] flex-col items-center justify-center px-6 py-10 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.5em]" style={{ color: accent }}>Venue</p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-white">{details.venue}</h3>
            {details.venueAddress && <p className="mt-2 text-[11px] text-white/60">{details.venueAddress}</p>}
            <p className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70">
              <MapPin size={10} /> {details.city || "Location"}
            </p>
            <div className="mt-5 rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ borderColor: accent, color: accent }}>
              Open in Maps
            </div>
          </div>
        </section>
      )}

      {/* ─── LUXE EXTRAS BADGE ─── */}
      {tier === "luxe" && (
        <div className="flex items-center justify-center gap-6 px-6 py-5" style={{ background: surfaceBg, borderTop: `1px solid ${cardBorder}` }}>
          {[
            { icon: Music, label: "Background Music" },
            { icon: Clock, label: "Countdown" },
            { icon: MapPin, label: "Venue Map" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wide" style={{ color: mutedColor }}>
              <Icon size={11} style={{ color: accent }} /> {label}
            </div>
          ))}
        </div>
      )}

      {/* ─── RSVP — like the real invites ─── */}
      <section className="px-6 py-12 text-center sm:px-10" style={{ background: isDark ? surfaceBg : P.noir }}>
        <p className="text-[9px] font-semibold uppercase tracking-[0.5em]" style={{ color: accent }}>RSVP</p>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: isDark ? inkColor : "#faf8f5" }}>We&apos;d be honoured.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[12px] leading-relaxed" style={{ color: isDark ? mutedColor : "rgba(255,255,255,0.6)" }}>
          Kindly let us know if you can join us for this celebration of love.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <div className="rounded-full px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg transition hover:-translate-y-0.5" style={{ background: accent, color: "white" }}>
            Joyfully Accept
          </div>
          <div className="rounded-full px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: isDark ? `${accent}50` : "rgba(255,255,255,0.25)", color: isDark ? inkColor : "white" }}>
            Regretfully Decline
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <div className="py-5 text-center" style={{ background: isDark ? "rgba(0,0,0,0.3)" : "#0d0b0a" }}>
        <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
          Made with love · The Digital Inviters
        </p>
      </div>
    </div>
  );
}

/* ── Wrapper with Suspense ─────────────────────────────── */
export default function Builder() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: P.bg }}>
        <Sparkles size={24} style={{ color: P.gold }} className="animate-pulse" />
      </div>
    }>
      <BuilderInner />
    </Suspense>
  );
}
