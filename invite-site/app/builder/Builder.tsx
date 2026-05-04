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

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  basic: { label: "BASIC", color: "#6b7280", bg: "#f3f4f6" },
  luxe: { label: "LUXE", color: "#92400e", bg: "#fef3c7" },
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
  { id: "checkout", label: "Pay", icon: CreditCard },
];

/* ══════════════════════════════════════════════════════════
   MAIN BUILDER COMPONENT
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
  const tierPrice = tier === "luxe" ? prices.luxe : prices.basic;
  const tierPriceINR = tier === "luxe" ? BASE_PRICES.luxe : BASE_PRICES.basic;

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
  const upiLink = `upi://pay?pa=${BRAND.upiId}&pn=The%20Digital%20Inviters&am=${tierPriceINR}&cu=INR&tn=${tierLabel}%20Wedding%20Invite%20-%20${encodeURIComponent(details.groomName)}%20%26%20${encodeURIComponent(details.brideName)}`;

  // After payment — send order via WhatsApp
  const handlePaymentDone = () => {
    const orderLines = [
      `*New Order — ${tierLabel} (₹${tierPriceINR})*`,
      `Template: ${selectedTheme?.name}`,
      `Couple: ${details.groomName} & ${details.brideName}`,
      `Date: ${fmtDate(details.weddingDate)}`,
      `Venue: ${details.venue}${details.city ? `, ${details.city}` : ""}`,
      `Events: ${activeEvents.filter(e => e.date).map(e => e.name).join(", ")}`,
      details.phone ? `Phone: ${details.phone}` : "",
      details.email ? `Email: ${details.email}` : "",
      ``,
      `Payment: ₹${tierPriceINR} via UPI`,
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
      <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between" style={{ background: `${P.bg}F0`, backdropFilter: "blur(16px)", borderBottom: `1px solid ${P.line}` }}>
        <Link href="/" className="flex items-center gap-2 text-[12px] font-medium" style={{ color: P.muted }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <Heart size={13} strokeWidth={1.5} style={{ color: P.gold }} />
          <span className="font-display text-lg" style={{ color: P.ink }}>Create Invitation</span>
        </div>
        {selectedTheme ? (
          <span className="text-[11px] font-semibold" style={{ color: P.gold }}>{tierPrice}</span>
        ) : <div className="w-12" />}
      </header>

      {/* ─── Stepper ─── */}
      <div className="px-4 py-3 overflow-x-auto" style={{ borderBottom: `1px solid ${P.lineSoft}` }}>
        <div className="flex items-center justify-center gap-0.5 min-w-max mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => i <= step && setStep(i)}
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
              <p className="mt-2 text-[14px]" style={{ color: P.body }}>Each design is customizable with your details, events, and photos.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PORTFOLIO_THEMES.map((theme) => {
                  const tc = TIER_CONFIG[theme.tier];
                  const tp = theme.tier === "luxe" ? prices.luxe : prices.basic;
                  const sel = selectedTemplate === theme.slug;
                  return (
                    <button key={theme.slug} onClick={() => setSelectedTemplate(theme.slug)}
                      className="group relative text-left overflow-hidden rounded-xl transition-all"
                      style={{ border: sel ? `2px solid ${P.gold}` : `1px solid ${P.lineSoft}`, boxShadow: sel ? `0 0 0 3px ${P.gold}30` : "none" }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${theme.image})` }} />
                        <div className="absolute top-2 left-2">
                          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.1em]" style={{ background: tc?.bg, color: tc?.color }}>{tc?.label}</span>
                        </div>
                        {theme.badge && <div className="absolute top-2 right-2"><span className="rounded-full px-2 py-0.5 text-[8px] font-bold tracking-[0.08em] shadow" style={{ background: "white", color: P.ink }}>{theme.badge}</span></div>}
                        {sel && <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full" style={{ background: P.gold }}><Check size={12} color="white" /></div>}
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
                  <p className="mt-2 text-[14px]" style={{ color: P.body }}>Remove any that don&apos;t apply. Add more if needed.</p>
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
                <h2 className="font-display text-2xl" style={{ color: P.ink }}>Here&apos;s your invite</h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  This is what your guests will see. Happy? Proceed to payment.
                </p>
              </div>
              <FullInvitePreview details={details} theme={selectedTheme} tier={tier} />
              <div className="mt-8 flex flex-col items-center gap-3">
                <button onClick={() => setStep(4)}
                  className="group flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                  style={{ background: P.gold, color: "white" }}
                >
                  Looks great — Pay {tierPrice}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => setStep(1)} className="text-[12px] font-medium" style={{ color: P.muted }}>Edit my details</button>
              </div>
            </StepWrapper>
          )}

          {/* ═══ STEP 4: UPI CHECKOUT ═══ */}
          {step === 4 && !paymentDone && (
            <StepWrapper key="checkout">
              <div className="mx-auto max-w-lg">
                <h2 className="font-display text-2xl text-center" style={{ color: P.ink }}>Complete Payment</h2>
                <p className="mt-2 text-center text-[14px]" style={{ color: P.body }}>Pay via UPI. We&apos;ll finalize your invite within 24 hours.</p>

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
                    <span className="font-display text-xl" style={{ color: P.ink }}>₹{tierPriceINR}</span>
                  </div>

                  <div className="pt-3 space-y-1.5" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <Row label="Couple" value={`${details.groomName} & ${details.brideName}`} />
                    <Row label="Date" value={fmtDate(details.weddingDate)} />
                    <Row label="Venue" value={`${details.venue}${details.city ? `, ${details.city}` : ""}`} />
                    <Row label="Events" value={activeEvents.filter(e => e.date).map(e => e.name).join(", ")} />
                  </div>

                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${P.lineSoft}` }}>
                    <span className="text-[14px] font-semibold" style={{ color: P.body }}>Total</span>
                    <span className="font-display text-2xl" style={{ color: P.ink }}>₹{tierPriceINR}</span>
                  </div>
                </div>

                {/* UPI Payment section */}
                <div className="mt-6 rounded-xl p-6 space-y-5" style={{ background: `${P.gold}08`, border: `1px solid ${P.gold}20` }}>
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-center" style={{ color: P.gold }}>Pay via UPI</p>

                  {/* UPI ID with copy */}
                  <div className="flex items-center justify-between rounded-lg p-3" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                    <div>
                      <p className="text-[9px] font-medium tracking-wide uppercase" style={{ color: P.muted }}>UPI ID</p>
                      <p className="mt-0.5 text-[14px] font-mono font-semibold" style={{ color: P.ink }}>{BRAND.upiId}</p>
                    </div>
                    <button onClick={copyUpi} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold transition-all" style={{ background: upiCopied ? "#dcfce7" : P.bgDeep, color: upiCopied ? "#16a34a" : P.ink }}>
                      {upiCopied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>

                  {/* Pay now button — opens UPI app */}
                  <a href={upiLink}
                    className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-[14px] font-semibold tracking-wide transition-all hover:scale-[1.02]"
                    style={{ background: P.ink, color: P.bg }}
                  >
                    <Lock size={14} />
                    Pay ₹{tierPriceINR} via UPI App
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>

                  <p className="text-center text-[11px] leading-relaxed" style={{ color: P.muted }}>
                    Tap above to open your UPI app (GPay, PhonePe, Paytm).
                    <br />Or scan QR / enter UPI ID manually in any UPI app.
                  </p>
                </div>

                {/* After payment */}
                <button onClick={handlePaymentDone}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[13px] font-semibold tracking-wide transition-all"
                  style={{ background: "#25D366", color: "white" }}
                >
                  <CheckCircle2 size={15} />
                  I&apos;ve Paid — Confirm via WhatsApp
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Shield size={10} style={{ color: P.muted }} />
                    <span className="text-[9px]" style={{ color: P.muted }}>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock size={10} style={{ color: P.muted }} />
                    <span className="text-[9px]" style={{ color: P.muted }}>100% Refund Guarantee</span>
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

          {/* ═══ CONFIRMATION ═══ */}
          {step === 4 && paymentDone && (
            <StepWrapper key="confirmed">
              <div className="mx-auto max-w-lg text-center py-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: `${P.gold}15` }}>
                  <CheckCircle2 size={40} style={{ color: P.gold }} />
                </div>
                <h2 className="mt-6 font-display text-3xl" style={{ color: P.ink }}>Order Confirmed!</h2>
                <p className="mt-3 text-[15px] leading-[1.8]" style={{ color: P.body }}>
                  Thank you, {details.groomName} & {details.brideName}. We&apos;ve received your order and will finalize your <strong>{selectedTheme?.name}</strong> invite within 24 hours.
                </p>

                <div className="mt-8 rounded-xl p-5 text-left space-y-3" style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: P.gold }}>What happens next</p>
                  {[
                    "We verify your payment and start building your invite.",
                    "Your unique invite link will be sent via WhatsApp within 24 hours.",
                    "Share the link with your guests — it works on all platforms.",
                    "Need edits? Just message us anytime. Free edits included.",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${P.gold}15`, color: P.gold }}>{i + 1}</span>
                      <span className="text-[13px] leading-relaxed" style={{ color: P.body }}>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/" className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold tracking-wide" style={{ background: P.ink, color: P.bg }}>
                    <Heart size={13} /> Back to Home
                  </Link>
                  <a href={cta} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium border" style={{ borderColor: P.line, color: P.muted }}>
                    <MessageCircle size={13} /> Message Us
                  </a>
                </div>
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
