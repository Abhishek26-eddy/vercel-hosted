"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  Calendar,
  MapPin,
  Heart,
  Image as ImageIcon,
  Music,
  MessageCircle,
  Sparkles,
  User,
  Clock,
  Send,
} from "lucide-react";
import { PORTFOLIO_THEMES, BRAND } from "@/lib/portfolioThemes";
import { useLocale } from "@/components/LocaleProvider";
import { BASE_PRICES } from "@/lib/i18n";

/* ── Palette (same as main site) ────────────────────────── */
const P = {
  bg: "#faf8f4",
  bgAlt: "#f5f1eb",
  bgDeep: "#ede8e0",
  surface: "#fffcfa",
  ink: "#1a1816",
  body: "#5c5650",
  muted: "#9a9189",
  gold: "#a68b5b",
  goldSoft: "#c9b896",
  goldMuted: "#e5dcc8",
  line: "#ebe7e0",
  lineSoft: "#f5f3ef",
  noir: "#141210",
};

const TIER_CONFIG = {
  basic: { label: "BASIC", color: "#6b7280", bg: "#f3f4f6" },
  luxe: { label: "LUXE", color: "#92400e", bg: "#fef3c7" },
  custom: { label: "PREMIUM", color: "#7c2d12", bg: "#fed7aa" },
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

const EMPTY_EVENT = { name: "", date: "", time: "", venue: "" };

const STEPS = [
  { id: "template", label: "Choose Template", icon: Sparkles },
  { id: "details", label: "Your Details", icon: User },
  { id: "events", label: "Events", icon: Calendar },
  { id: "extras", label: "Personal Touches", icon: Heart },
  { id: "review", label: "Review & Pay", icon: CreditCard },
];

function BuilderInner() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "";

  const { price, prices } = useLocale();
  const cta = `${BRAND.whatsappBase}Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20wedding%20invitation.`;

  const [step, setStep] = useState(initialTemplate ? 1 : 0);
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [details, setDetails] = useState<WeddingDetails>({
    groomName: "",
    brideName: "",
    weddingDate: "",
    venue: "",
    venueAddress: "",
    city: "",
    events: [
      { name: "Haldi", date: "", time: "", venue: "" },
      { name: "Mehendi", date: "", time: "", venue: "" },
      { name: "Sangeet", date: "", time: "", venue: "" },
      { name: "Wedding", date: "", time: "", venue: "" },
      { name: "Reception", date: "", time: "", venue: "" },
    ],
    loveStory: "",
    message: "",
    phone: "",
    email: "",
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
    setDetails((prev) => ({ ...prev, events: [...prev.events, { ...EMPTY_EVENT }] }));
  };

  const removeEvent = (index: number) => {
    setDetails((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  const canProceed = () => {
    if (step === 0) return !!selectedTemplate;
    if (step === 1) return !!details.groomName && !!details.brideName && !!details.weddingDate;
    if (step === 2) return details.events.some((e) => e.name && e.date);
    return true;
  };

  const handleSubmit = () => {
    const msg = [
      `Template: ${selectedTheme?.name || selectedTemplate} (${tierLabel})`,
      `Tier: ${tierLabel} — ${tierPrice}`,
      `Groom: ${details.groomName}`,
      `Bride: ${details.brideName}`,
      `Date: ${details.weddingDate}`,
      `Venue: ${details.venue}, ${details.city}`,
      details.events
        .filter((e) => e.name && e.date)
        .map((e) => `  ${e.name}: ${e.date} ${e.time} @ ${e.venue}`)
        .join("\n"),
      details.loveStory ? `Story: ${details.loveStory}` : "",
      details.message ? `Message: ${details.message}` : "",
      `Phone: ${details.phone}`,
      `Email: ${details.email}`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(
      `Hi! I'd like to order a wedding invite.\n\n${msg}`
    );
    window.open(
      `https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen" style={{ background: P.bg, color: P.ink }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ background: P.bg, borderBottom: `1px solid ${P.line}` }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[12px] font-medium tracking-wide"
          style={{ color: P.muted }}
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: P.gold }} />
          <span className="font-display text-lg" style={{ color: P.ink }}>
            Invite Builder
          </span>
        </div>
        <div className="w-16" />
      </header>

      {/* Stepper */}
      <div
        className="px-4 py-4 overflow-x-auto"
        style={{ borderBottom: `1px solid ${P.lineSoft}` }}
      >
        <div className="flex items-center justify-center gap-1 min-w-max mx-auto">
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
                {i < step ? (
                  <Check size={10} />
                ) : (
                  <s.icon size={10} />
                )}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className="mx-1 h-px w-6"
                  style={{ background: i < step ? P.gold : P.line }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AnimatePresence mode="wait">
          {/* STEP 0: Choose Template */}
          {step === 0 && (
            <motion.div
              key="template"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl tracking-tight" style={{ color: P.ink }}>
                Choose a Template
              </h2>
              <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                Pick a design you love. You can preview each template before deciding.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PORTFOLIO_THEMES.map((theme) => {
                  const tc = TIER_CONFIG[theme.tier];
                  const tp = theme.tier === "basic" ? prices.basic : prices.luxe;
                  const isSelected = selectedTemplate === theme.slug;
                  return (
                    <button
                      key={theme.slug}
                      onClick={() => setSelectedTemplate(theme.slug)}
                      className="group relative text-left overflow-hidden rounded-xl transition-all"
                      style={{
                        border: isSelected
                          ? `2px solid ${P.gold}`
                          : `1px solid ${P.lineSoft}`,
                        boxShadow: isSelected
                          ? `0 0 0 3px ${P.gold}30`
                          : "none",
                      }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${theme.image})` }}
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.1em]"
                            style={{ background: tc.bg, color: tc.color }}
                          >
                            {tc.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div
                            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ background: P.gold }}
                          >
                            <Check size={12} color="white" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3
                          className="font-display text-base"
                          style={{ color: P.ink }}
                        >
                          {theme.name}
                        </h3>
                        <p
                          className="mt-0.5 text-[11px]"
                          style={{ color: P.muted }}
                        >
                          {theme.tagline}
                        </p>
                        <p
                          className="mt-1 text-[13px] font-semibold"
                          style={{ color: P.ink }}
                        >
                          {tp}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Your Details */}
          {step === 1 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div>
                <h2 className="font-display text-2xl tracking-tight" style={{ color: P.ink }}>
                  Your Details
                </h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  Tell us about the happy couple.
                </p>
                <div className="mt-6 space-y-4">
                  <InputField
                    label="Groom's Full Name"
                    value={details.groomName}
                    onChange={(v) => updateDetail("groomName", v)}
                    placeholder="e.g. Aarav Sharma"
                    required
                  />
                  <InputField
                    label="Bride's Full Name"
                    value={details.brideName}
                    onChange={(v) => updateDetail("brideName", v)}
                    placeholder="e.g. Meera Patel"
                    required
                  />
                  <InputField
                    label="Wedding Date"
                    value={details.weddingDate}
                    onChange={(v) => updateDetail("weddingDate", v)}
                    type="date"
                    required
                  />
                  <InputField
                    label="Main Venue Name"
                    value={details.venue}
                    onChange={(v) => updateDetail("venue", v)}
                    placeholder="e.g. Taj Lake Palace"
                  />
                  <InputField
                    label="Venue Address"
                    value={details.venueAddress}
                    onChange={(v) => updateDetail("venueAddress", v)}
                    placeholder="Full address"
                  />
                  <InputField
                    label="City"
                    value={details.city}
                    onChange={(v) => updateDetail("city", v)}
                    placeholder="e.g. Udaipur"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <PreviewCard details={details} theme={selectedTheme} />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Events */}
          {step === 2 && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div>
                <h2 className="font-display text-2xl tracking-tight" style={{ color: P.ink }}>
                  Wedding Events
                </h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  Add all your ceremonies and celebrations. Remove any that don't apply.
                </p>
                <div className="mt-6 space-y-4">
                  {details.events.map((event, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 space-y-3"
                      style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}
                    >
                      <div className="flex items-center justify-between">
                        <InputField
                          label="Event Name"
                          value={event.name}
                          onChange={(v) => updateEvent(i, "name", v)}
                          placeholder="e.g. Sangeet"
                        />
                        <button
                          onClick={() => removeEvent(i)}
                          className="ml-3 mt-5 text-[10px] font-medium"
                          style={{ color: "#ef4444" }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          label="Date"
                          value={event.date}
                          onChange={(v) => updateEvent(i, "date", v)}
                          type="date"
                        />
                        <InputField
                          label="Time"
                          value={event.time}
                          onChange={(v) => updateEvent(i, "time", v)}
                          type="time"
                        />
                      </div>
                      <InputField
                        label="Venue"
                        value={event.venue}
                        onChange={(v) => updateEvent(i, "venue", v)}
                        placeholder="Event venue (if different)"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addEvent}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium tracking-wide"
                    style={{ border: `1px dashed ${P.line}`, color: P.gold }}
                  >
                    + Add Another Event
                  </button>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <PreviewCard details={details} theme={selectedTheme} />
              </div>
            </motion.div>
          )}

          {/* STEP 3: Extras */}
          {step === 3 && (
            <motion.div
              key="extras"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div>
                <h2 className="font-display text-2xl tracking-tight" style={{ color: P.ink }}>
                  Personal Touches
                </h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  Make it truly yours. All fields are optional.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5"
                      style={{ color: P.gold }}
                    >
                      Your Love Story (optional)
                    </label>
                    <textarea
                      value={details.loveStory}
                      onChange={(e) => updateDetail("loveStory", e.target.value)}
                      rows={4}
                      placeholder="How did you two meet? Share your favorite moments..."
                      className="w-full rounded-lg border px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
                      style={{ borderColor: P.line, background: P.surface, color: P.ink }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5"
                      style={{ color: P.gold }}
                    >
                      Personal Message to Guests (optional)
                    </label>
                    <textarea
                      value={details.message}
                      onChange={(e) => updateDetail("message", e.target.value)}
                      rows={3}
                      placeholder="e.g. We can't wait to celebrate with you..."
                      className="w-full rounded-lg border px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
                      style={{ borderColor: P.line, background: P.surface, color: P.ink }}
                    />
                  </div>
                  <InputField
                    label="Your Phone Number"
                    value={details.phone}
                    onChange={(v) => updateDetail("phone", v)}
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                  <InputField
                    label="Your Email"
                    value={details.email}
                    onChange={(v) => updateDetail("email", v)}
                    placeholder="your@email.com"
                    type="email"
                  />

                  {tier === "luxe" && (
                    <div
                      className="rounded-xl p-4 flex items-center gap-3"
                      style={{ background: `${P.gold}10`, border: `1px solid ${P.gold}30` }}
                    >
                      <Music size={16} style={{ color: P.gold }} />
                      <div>
                        <p className="text-[12px] font-medium" style={{ color: P.ink }}>
                          Background Music included in Luxe
                        </p>
                        <p className="text-[11px]" style={{ color: P.muted }}>
                          We'll add a romantic track. You can suggest a song or let us choose.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <PreviewCard details={details} theme={selectedTheme} />
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review & Pay */}
          {step === 4 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div>
                <h2 className="font-display text-2xl tracking-tight" style={{ color: P.ink }}>
                  Review Your Order
                </h2>
                <p className="mt-2 text-[14px]" style={{ color: P.body }}>
                  Confirm your details and proceed to payment.
                </p>

                <div className="mt-6 space-y-4">
                  {/* Order summary card */}
                  <div
                    className="rounded-xl p-5 space-y-3"
                    style={{ background: P.surface, border: `1px solid ${P.lineSoft}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium tracking-[0.15em] uppercase" style={{ color: P.gold }}>
                        Template
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.1em]"
                        style={{
                          background: TIER_CONFIG[tier]?.bg,
                          color: TIER_CONFIG[tier]?.color,
                        }}
                      >
                        {tierLabel}
                      </span>
                    </div>
                    <p className="font-display text-lg" style={{ color: P.ink }}>
                      {selectedTheme?.name}
                    </p>

                    <div style={{ borderTop: `1px solid ${P.lineSoft}` }} className="pt-3 space-y-2">
                      <SummaryRow label="Couple" value={`${details.groomName} & ${details.brideName}`} />
                      <SummaryRow label="Date" value={details.weddingDate} />
                      <SummaryRow label="Venue" value={`${details.venue}, ${details.city}`} />
                      <SummaryRow
                        label="Events"
                        value={details.events
                          .filter((e) => e.name && e.date)
                          .map((e) => e.name)
                          .join(", ")}
                      />
                      {details.phone && <SummaryRow label="Phone" value={details.phone} />}
                      {details.email && <SummaryRow label="Email" value={details.email} />}
                    </div>

                    <div
                      className="pt-3 flex items-center justify-between"
                      style={{ borderTop: `1px solid ${P.lineSoft}` }}
                    >
                      <span className="text-[13px] font-medium" style={{ color: P.body }}>
                        Total
                      </span>
                      <span className="font-display text-2xl" style={{ color: P.ink }}>
                        {tierPrice}
                      </span>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div
                    className="rounded-xl p-5 space-y-3"
                    style={{ background: `${P.gold}08`, border: `1px solid ${P.gold}20` }}
                  >
                    <p className="text-[11px] font-medium tracking-[0.15em] uppercase" style={{ color: P.gold }}>
                      What happens next
                    </p>
                    <div className="space-y-2">
                      {[
                        "Your details go to our designer via WhatsApp",
                        "We send a payment link (Razorpay — secure)",
                        "First draft ready in 3-5 days",
                        "Revisions until it's perfect",
                        "Final invite delivered in 7 days",
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: P.gold }} />
                          <span className="text-[12px]" style={{ color: P.body }}>
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <button
                    onClick={handleSubmit}
                    className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: P.gold, color: "white" }}
                  >
                    <Send size={14} />
                    Submit & Proceed to Payment — {tierPrice}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <a
                    href={cta}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-medium tracking-wide border"
                    style={{ borderColor: P.line, color: P.muted }}
                  >
                    <MessageCircle size={12} />
                    Have questions? Chat with us first
                  </a>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <PreviewCard details={details} theme={selectedTheme} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide"
              style={{ border: `1px solid ${P.line}`, color: P.muted }}
            >
              <ArrowLeft size={13} />
              Back
            </button>
          ) : (
            <div />
          )}
          {step < STEPS.length - 1 && (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-semibold tracking-wide transition-all duration-300 disabled:opacity-40"
              style={{
                background: canProceed() ? P.ink : P.bgDeep,
                color: canProceed() ? P.bg : P.muted,
              }}
            >
              Continue
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* ── Reusable input field ──────────────────────────────── */
function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex-1">
      <label
        className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5"
        style={{ color: P.gold }}
      >
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#a68b5b]"
        style={{ borderColor: P.line, background: P.surface, color: P.ink }}
      />
    </div>
  );
}

/* ── Summary row ───────────────────────────────────────── */
function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-[12px]">
      <span style={{ color: P.muted }}>{label}</span>
      <span className="font-medium text-right max-w-[60%]" style={{ color: P.ink }}>
        {value}
      </span>
    </div>
  );
}

/* ── Live Preview Card ─────────────────────────────────── */
function PreviewCard({
  details,
  theme,
}: {
  details: WeddingDetails;
  theme?: (typeof PORTFOLIO_THEMES)[0];
}) {
  return (
    <div>
      <p
        className="mb-3 text-[10px] font-medium tracking-[0.15em] uppercase"
        style={{ color: P.gold }}
      >
        Live Preview
      </p>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${P.lineSoft}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
      >
        {/* Hero preview */}
        <div
          className="relative h-56 bg-cover bg-center"
          style={{
            backgroundImage: theme
              ? `url(${theme.image})`
              : "linear-gradient(135deg, #e8d4d0, #c9a87c)",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/70">
              {details.weddingDate
                ? new Date(details.weddingDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Your Wedding Date"}
            </p>
            <h3 className="mt-2 font-display text-2xl text-white">
              {details.groomName || "Groom"} & {details.brideName || "Bride"}
            </h3>
            <p className="mt-1 text-[11px] text-white/60">
              {details.venue || "Venue"}{details.city ? `, ${details.city}` : ""}
            </p>
          </div>
        </div>

        {/* Events preview */}
        <div className="p-5 space-y-3" style={{ background: P.surface }}>
          <p
            className="text-[9px] font-medium tracking-[0.2em] uppercase"
            style={{ color: P.gold }}
          >
            Wedding Events
          </p>
          {details.events
            .filter((e) => e.name)
            .slice(0, 4)
            .map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: `1px solid ${P.lineSoft}` }}
              >
                <div>
                  <p className="text-[13px] font-medium" style={{ color: P.ink }}>
                    {e.name}
                  </p>
                  {e.venue && (
                    <p className="text-[10px]" style={{ color: P.muted }}>
                      {e.venue}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[11px]" style={{ color: P.body }}>
                    {e.date
                      ? new Date(e.date).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })
                      : "TBD"}
                  </p>
                  {e.time && (
                    <p className="text-[10px]" style={{ color: P.muted }}>
                      {e.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          {details.events.filter((e) => e.name).length === 0 && (
            <p className="text-[12px] italic" style={{ color: P.muted }}>
              Add events to see them here
            </p>
          )}
        </div>

        {/* Footer preview */}
        <div
          className="px-5 py-3 text-center text-[10px]"
          style={{ background: P.bgAlt, color: P.muted }}
        >
          {theme?.name || "Template"} · by The Digital Inviters
        </div>
      </div>
    </div>
  );
}

/* ── Wrapper with Suspense for useSearchParams ─────────── */
export default function Builder() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: P.bg }}>
          <div className="text-center">
            <Sparkles size={24} style={{ color: P.gold }} className="mx-auto animate-pulse" />
            <p className="mt-3 text-[13px]" style={{ color: P.muted }}>Loading builder...</p>
          </div>
        </div>
      }
    >
      <BuilderInner />
    </Suspense>
  );
}
