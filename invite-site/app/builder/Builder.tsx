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
} from "lucide-react";
import { PORTFOLIO_THEMES, BRAND } from "@/lib/portfolioThemes";
import { useLocale } from "@/components/LocaleProvider";

/* ── Palette ────────────────────────────────────────────── */
const P = {
  bg: "#faf8f4", bgAlt: "#f5f1eb", bgDeep: "#ede8e0", surface: "#fffcfa",
  ink: "#1a1816", body: "#5c5650", muted: "#9a9189",
  gold: "#a68b5b", goldSoft: "#c9b896", goldMuted: "#e5dcc8",
  line: "#ebe7e0", lineSoft: "#f5f3ef", noir: "#141210",
};

const TIER_CONFIG = {
  basic: { label: "BASIC", color: "#6b7280", bg: "#f3f4f6", features: ["RSVP", "Gallery", "Events", "WhatsApp sharing"] },
  luxe: { label: "LUXE", color: "#92400e", bg: "#fef3c7", features: ["Everything in Basic", "Background music", "Countdown", "Love story", "Venue map"] },
  custom: { label: "PREMIUM", color: "#7c2d12", bg: "#fed7aa", features: [] },
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
};

const STEPS = [
  { id: "template", label: "Template", icon: Sparkles },
  { id: "details", label: "Details", icon: User },
  { id: "events", label: "Events", icon: Calendar },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "checkout", label: "Checkout", icon: CreditCard },
];

/* ══════════════════════════════════════════════════════════
   MAIN BUILDER COMPONENT
   ══════════════════════════════════════════════════════════ */
function BuilderInner() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "";

  const { prices } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20wedding%20invitation.`;

  const [step, setStep] = useState(initialTemplate ? 1 : 0);
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [showFullPreview, setShowFullPreview] = useState(false);
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
  });

  const selectedTheme = PORTFOLIO_THEMES.find((t) => t.slug === selectedTemplate);
  const tier = selectedTheme?.tier || "basic";
  const tierLabel = TIER_CONFIG[tier]?.label || "BASIC";
  const tierPrice = tier === "basic" ? prices.basic : tier === "luxe" ? prices.luxe : prices.custom;

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

  // Razorpay checkout — opens payment in a new tab
  const handleCheckout = () => {
    // Build the order message for WhatsApp confirmation after payment
    const orderLines = [
      `*New Order — ${tierLabel} (${tierPrice})*`,
      `Template: ${selectedTheme?.name}`,
      `Couple: ${details.groomName} & ${details.brideName}`,
      `Date: ${fmtDate(details.weddingDate)}`,
      `Venue: ${details.venue}${details.city ? `, ${details.city}` : ""}`,
      `Events: ${activeEvents.filter(e => e.date).map(e => e.name).join(", ")}`,
      details.phone ? `Phone: ${details.phone}` : "",
      details.email ? `Email: ${details.email}` : "",
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(orderLines);
    // Open WhatsApp with order details — Razorpay link will be sent back
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <main className="min-h-screen" style={{ background: P.bg, color: P.ink }}>
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between" style={{ background: `${P.bg}F8`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${P.line}` }}>
        <Link href="/" className="flex items-center gap-2 text-[12px] font-medium" style={{ color: P.muted }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: P.gold }} />
          <span className="font-display text-lg" style={{ color: P.ink }}>Invite Builder</span>
        </div>
        {selectedTheme && (
          <span className="text-[11px] font-semibold" style={{ color: P.gold }}>{tierPrice}</span>
        )}
        {!selectedTheme && <div className="w-12" />}
      </header>

      {/* ─── Stepper ─── */}
      <div className="px-4 py-3 overflow-x-auto" style={{ borderBottom: `1px solid ${P.lineSoft}` }}>
        <div className="flex items-center justify-center gap-0.5 min-w-max mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => i <= step && setStep(i)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all"
                style={{
                  background: i === step ? P.ink : i < step ? `${P.gold}20` : "transparent",
                  color: i === step ? P.bg : i < step ? P.gold : P.muted,
                  cursor: i <= step ? "pointer" : "default",
                }}
              >
                {i < step ? <Check size={10} /> : <s.icon size={10} />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && <div className="mx-0.5 h-px w-4 sm:w-6" style={{ background: i < step ? P.gold : P.line }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AnimatePresence mode="wait">

          {/* ═══ STEP 0: Choose Template ═══ */}
          {step === 0 && (
            <StepWrapper key="template">
              <h2 className="font-display text-2xl" style={{ color: P.ink }}>Pick a design you love</h2>
              <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                Your invite is generated instantly with your details. No waiting.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PORTFOLIO_THEMES.map((theme) => {
                  const tc = TIER_CONFIG[theme.tier];
                  const tp = theme.tier === "basic" ? prices.basic : prices.luxe;
                  const sel = selectedTemplate === theme.slug;
                  return (
                    <button key={theme.slug} onClick={() => setSelectedTemplate(theme.slug)}
                      className="group relative text-left overflow-hidden rounded-xl transition-all"
                      style={{ border: sel ? `2px solid ${P.gold}` : `1px solid ${P.lineSoft}`, boxShadow: sel ? `0 0 0 3px ${P.gold}30` : "none" }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${theme.image})` }} />
                        <div className="absolute top-2 left-2">
                          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.1em]" style={{ background: tc.bg, color: tc.color }}>{tc.label}</span>
                        </div>
                        {sel && <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full" style={{ background: P.gold }}><Check size={12} color="white" /></div>}
                        {/* Hover: preview link */}
                        <Link href={`/${theme.slug}`} target="_blank" onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
                        >
                          <Eye size={10} /> Preview
                        </Link>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-base" style={{ color: P.ink }}>{theme.name}</h3>
                          <span className="text-[13px] font-semibold" style={{ color: P.gold }}>{tp}</span>
                        </div>
                        <p className="mt-0.5 text-[11px]" style={{ color: P.muted }}>{theme.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 1: Details ═══ */}
          {step === 1 && (
            <StepWrapper key="details">
              <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <div>
                  <h2 className="font-display text-2xl" style={{ color: P.ink }}>Tell us about the couple</h2>
                  <p className="mt-2 text-[14px]" style={{ color: P.body }}>This info goes directly onto your invite.</p>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Groom's Name" value={details.groomName} onChange={(v) => updateDetail("groomName", v)} placeholder="e.g. Aarav Sharma" required />
                      <InputField label="Bride's Name" value={details.brideName} onChange={(v) => updateDetail("brideName", v)} placeholder="e.g. Meera Patel" required />
                    </div>
                    <InputField label="Wedding Date" value={details.weddingDate} onChange={(v) => updateDetail("weddingDate", v)} type="date" required />
                    <InputField label="Venue Name" value={details.venue} onChange={(v) => updateDetail("venue", v)} placeholder="e.g. Taj Lake Palace" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Venue Address" value={details.venueAddress} onChange={(v) => updateDetail("venueAddress", v)} placeholder="Full address" />
                      <InputField label="City" value={details.city} onChange={(v) => updateDetail("city", v)} placeholder="e.g. Udaipur" />
                    </div>
                    {tier === "luxe" && (
                      <>
                        <TextareaField label="Your Love Story" value={details.loveStory} onChange={(v) => updateDetail("loveStory", v)} placeholder="How did you meet? Tell your story..." rows={3} />
                        <TextareaField label="Message to Guests" value={details.message} onChange={(v) => updateDetail("message", v)} placeholder="We can't wait to celebrate with you..." rows={2} />
                      </>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Your Phone" value={details.phone} onChange={(v) => updateDetail("phone", v)} placeholder="+91 98765 43210" type="tel" />
                      <InputField label="Your Email" value={details.email} onChange={(v) => updateDetail("email", v)} placeholder="you@email.com" type="email" />
                    </div>
                  </div>
                </div>
                <div className="lg:sticky lg:top-20 lg:self-start">
                  <LivePreview details={details} theme={selectedTheme} />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 2: Events ═══ */}
          {step === 2 && (
            <StepWrapper key="events">
              <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <div>
                  <h2 className="font-display text-2xl" style={{ color: P.ink }}>Add your ceremonies</h2>
                  <p className="mt-2 text-[14px]" style={{ color: P.body }}>Remove any that don't apply. Add more if needed.</p>
                  <div className="mt-6 space-y-3">
                    {details.events.map((event, i) => (
                      <div key={i} className="rounded-xl p-4 space-y-3" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <InputField label="Event" value={event.name} onChange={(v) => updateEvent(i, "name", v)} placeholder="e.g. Sangeet" />
                            <InputField label="Venue" value={event.venue} onChange={(v) => updateEvent(i, "venue", v)} placeholder="Same as main" />
                          </div>
                          <button onClick={() => removeEvent(i)} className="ml-2 mt-5 p-1 rounded-full hover:bg-red-50" style={{ color: "#ef4444" }}><X size={14} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <InputField label="Date" value={event.date} onChange={(v) => updateEvent(i, "date", v)} type="date" />
                          <InputField label="Time" value={event.time} onChange={(v) => updateEvent(i, "time", v)} type="time" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addEvent} className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium" style={{ border: `1px dashed ${P.line}`, color: P.gold }}>
                      + Add Event
                    </button>
                  </div>
                </div>
                <div className="lg:sticky lg:top-20 lg:self-start">
                  <LivePreview details={details} theme={selectedTheme} />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 3: FULL PREVIEW ═══ */}
          {step === 3 && (
            <StepWrapper key="preview">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl" style={{ color: P.ink }}>Here's your invite</h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  This is exactly what your guests will see. Happy with it? Proceed to checkout.
                </p>
              </div>
              {/* Full-width invite preview */}
              <FullInvitePreview details={details} theme={selectedTheme} tier={tier} />
              <div className="mt-8 flex flex-col items-center gap-3">
                <button onClick={() => setStep(4)}
                  className="group flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                  style={{ background: P.gold, color: "white" }}
                >
                  Looks great — Proceed to Checkout
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => setStep(1)} className="text-[12px] font-medium" style={{ color: P.muted }}>
                  Edit my details
                </button>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 4: CHECKOUT ═══ */}
          {step === 4 && (
            <StepWrapper key="checkout">
              <div className="mx-auto max-w-lg">
                <h2 className="font-display text-2xl text-center" style={{ color: P.ink }}>Complete Your Order</h2>
                <p className="mt-2 text-center text-[14px]" style={{ color: P.body }}>
                  Pay securely. Your invite link is generated instantly.
                </p>

                {/* Order summary */}
                <div className="mt-8 rounded-xl p-5 space-y-3" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedTheme && <div className="h-12 w-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${selectedTheme.image})` }} />}
                      <div>
                        <p className="font-display text-base" style={{ color: P.ink }}>{selectedTheme?.name}</p>
                        <span className="rounded-full px-2 py-0.5 text-[8px] font-bold tracking-[0.1em]" style={{ background: TIER_CONFIG[tier]?.bg, color: TIER_CONFIG[tier]?.color }}>{tierLabel}</span>
                      </div>
                    </div>
                    <span className="font-display text-xl" style={{ color: P.ink }}>{tierPrice}</span>
                  </div>

                  <div className="pt-3 space-y-1.5" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <Row label="Couple" value={`${details.groomName} & ${details.brideName}`} />
                    <Row label="Date" value={fmtDate(details.weddingDate)} />
                    <Row label="Venue" value={`${details.venue}${details.city ? `, ${details.city}` : ""}`} />
                    <Row label="Events" value={activeEvents.filter(e => e.date).map(e => e.name).join(", ")} />
                  </div>

                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <span className="text-[14px] font-medium" style={{ color: P.body }}>Total</span>
                    <span className="font-display text-2xl" style={{ color: P.ink }}>{tierPrice}</span>
                  </div>
                </div>

                {/* What you get */}
                <div className="mt-4 rounded-xl p-5 space-y-2.5" style={{ background: `${P.gold}08`, border: `1px solid ${P.gold}20` }}>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: P.gold }}>What you get</p>
                  {[
                    "Your invite link — ready to share on WhatsApp, Instagram, email",
                    "RSVP collection from guests",
                    tier === "luxe" ? "Background music, countdown, love story & venue map" : "Photo gallery & event schedule",
                    "Lifetime hosting — your link never expires",
                    "Free edits if you need to change a date or venue",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: P.gold }} />
                      <span className="text-[12px]" style={{ color: P.body }}>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Pay button */}
                <button onClick={handleCheckout}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[14px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                  style={{ background: P.ink, color: P.bg }}
                >
                  <Lock size={14} />
                  Pay {tierPrice} — Get Your Invite
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Shield size={10} style={{ color: P.muted }} />
                    <span className="text-[9px]" style={{ color: P.muted }}>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock size={10} style={{ color: P.muted }} />
                    <span className="text-[9px]" style={{ color: P.muted }}>Razorpay Protected</span>
                  </div>
                </div>

                <a href={cta} target="_blank" rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-medium border"
                  style={{ borderColor: P.line, color: P.muted }}
                >
                  <MessageCircle size={12} /> Have questions? Chat with us
                </a>
              </div>
            </StepWrapper>
          )}

        </AnimatePresence>

        {/* ─── Bottom nav ─── */}
        {step !== 3 && step !== 4 && (
          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium" style={{ border: `1px solid ${P.line}`, color: P.muted }}>
                <ArrowLeft size={13} /> Back
              </button>
            ) : <div />}
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-semibold tracking-wide transition-all disabled:opacity-40"
              style={{ background: canProceed() ? P.ink : P.bgDeep, color: canProceed() ? P.bg : P.muted }}
            >
              {step === 2 ? "Preview My Invite" : "Continue"}
              <ArrowRight size={13} />
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
        className="w-full rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
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
        className="w-full rounded-lg border px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
        style={{ borderColor: P.line, background: P.surface, color: P.ink }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-[12px]">
      <span style={{ color: P.muted }}>{label}</span>
      <span className="font-medium text-right max-w-[60%]" style={{ color: P.ink }}>{value}</span>
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

/* ── Full invite preview (Step 3) ──────────────────────── */
function FullInvitePreview({ details, theme, tier }: { details: WeddingDetails; theme?: (typeof PORTFOLIO_THEMES)[0]; tier: string }) {
  const activeEvents = details.events.filter(e => e.name && e.date);
  const accent = theme?.accent || P.gold;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl overflow-hidden" style={{ border: `1px solid ${P.lineSoft}`, boxShadow: "0 20px 80px rgba(0,0,0,0.08)" }}>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-cover bg-center" style={{ backgroundImage: theme ? `url(${theme.image})` : "linear-gradient(135deg, #e8d4d0, #c9a87c)" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.55))" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-medium">Together with their families</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-white leading-tight">
            {details.groomName || "Groom"}
            <span className="block font-script text-2xl sm:text-3xl mt-1" style={{ color: accent }}>&</span>
            {details.brideName || "Bride"}
          </h2>
          <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-white/70">{fmtDate(details.weddingDate)}</p>
          <p className="mt-2 text-[12px] text-white/50 flex items-center gap-1"><MapPin size={10} /> {details.venue}{details.city ? `, ${details.city}` : ""}</p>
        </div>
      </div>

      {/* Events schedule */}
      <div className="px-8 py-8" style={{ background: P.surface }}>
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-center mb-6" style={{ color: accent }}>Celebrations</p>
        <div className="space-y-4">
          {(activeEvents.length > 0 ? activeEvents : details.events.filter(e => e.name)).map((e, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: P.bgAlt }}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${accent}15`, color: accent }}>
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium" style={{ color: P.ink }}>{e.name}</p>
                {e.venue && <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{e.venue}</p>}
              </div>
              <div className="text-right">
                <p className="text-[12px] font-medium" style={{ color: P.body }}>
                  {e.date ? new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "TBD"}
                </p>
                {e.time && <p className="text-[10px] flex items-center justify-end gap-1 mt-0.5" style={{ color: P.muted }}><Clock size={9} />{e.time}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Love story (Luxe only) */}
      {tier === "luxe" && details.loveStory && (
        <div className="px-8 py-8 text-center" style={{ background: P.bgAlt }}>
          <Heart size={20} className="mx-auto mb-3" style={{ color: accent }} />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4" style={{ color: accent }}>Our Story</p>
          <p className="text-[14px] leading-relaxed italic max-w-md mx-auto" style={{ color: P.body }}>{details.loveStory}</p>
        </div>
      )}

      {/* Personal message */}
      {details.message && (
        <div className="px-8 py-6 text-center" style={{ background: P.surface, borderTop: `1px solid ${P.lineSoft}` }}>
          <p className="text-[14px] leading-relaxed italic" style={{ color: P.body }}>"{details.message}"</p>
          <p className="mt-2 text-[12px] font-medium" style={{ color: P.ink }}>— {details.groomName} & {details.brideName}</p>
        </div>
      )}

      {/* Luxe extras indicator */}
      {tier === "luxe" && (
        <div className="px-8 py-4 flex items-center justify-center gap-6" style={{ background: P.bgAlt }}>
          {[
            { icon: Music, label: "Music" },
            { icon: Clock, label: "Countdown" },
            { icon: MapPin, label: "Venue Map" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px]" style={{ color: P.muted }}>
              <Icon size={12} style={{ color: accent }} /> {label}
            </div>
          ))}
        </div>
      )}

      {/* RSVP section */}
      <div className="px-8 py-6 text-center" style={{ background: P.ink }}>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">RSVP</p>
        <p className="text-[14px] text-white/80">Will you join us?</p>
        <div className="mt-4 flex justify-center gap-3">
          <div className="rounded-full px-6 py-2 text-[12px] font-medium" style={{ background: accent, color: "white" }}>Accept with Joy</div>
          <div className="rounded-full px-6 py-2 text-[12px] font-medium border" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>Decline</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-4 text-center text-[10px]" style={{ background: P.noir, color: "rgba(255,255,255,0.4)" }}>
        Made with love · The Digital Inviters
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
