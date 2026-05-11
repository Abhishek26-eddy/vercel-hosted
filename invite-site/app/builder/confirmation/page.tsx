"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Heart, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { BRAND } from "@/lib/portfolioThemes";

const P = {
  bg: "#faf8f5",
  ink: "#1a1816",
  body: "#57504a",
  muted: "#9a9189",
  gold: "#c9a14a",
  goldSoft: "#9a7b4f",
  surface: "rgba(0,0,0,0.02)",
  line: "rgba(0,0,0,0.06)",
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const tier = searchParams.get("tier");

  const whatsappUrl = `${BRAND.whatsappBase}Hi%2C%20I%20just%20submitted%20my%20invitation%20details!%20Order%20ID%3A%20${orderId || "N/A"}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: P.bg, color: P.ink }}>
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: `${P.gold}15`, border: `2px solid ${P.gold}` }}
        >
          <CheckCircle2 size={40} style={{ color: P.gold }} />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: P.gold }}>
            Order Received
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: P.ink }}>
            We've got your details!
          </h1>
        </motion.div>

        {/* Order ID */}
        {orderId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-block rounded-full px-5 py-2.5"
            style={{ background: P.surface, border: `1px solid ${P.line}` }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: P.muted }}>
              Order Reference
            </p>
            <p className="mt-1 font-mono text-sm font-semibold" style={{ color: P.ink }}>
              {orderId}
            </p>
          </motion.div>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-3"
        >
          <p className="text-[14px] leading-[1.8]" style={{ color: P.body }}>
            Thank you for choosing The Digital Inviters. We've received your invitation brief and will begin crafting your personalized wedding invitation.
          </p>
          <p className="text-[14px] leading-[1.8]" style={{ color: P.body }}>
            Our team will review your details and reach out to you shortly to finalize design customizations, confirm your love story elements, and discuss delivery timelines.
          </p>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-2xl p-6"
          style={{ background: `${P.gold}08`, border: `1px solid ${P.gold}20` }}
        >
          <Sparkles size={20} className="mx-auto mb-3" style={{ color: P.gold }} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: P.gold }}>
            What Happens Next
          </p>
          <ul className="mt-4 space-y-2.5 text-left text-[13px] leading-relaxed" style={{ color: P.body }}>
            <li className="flex items-start gap-2">
              <Heart size={14} className="mt-0.5 flex-shrink-0" style={{ color: P.gold }} />
              <span>We'll review your details and contact you within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart size={14} className="mt-0.5 flex-shrink-0" style={{ color: P.gold }} />
              <span>You'll receive a personalized design mockup to review</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart size={14} className="mt-0.5 flex-shrink-0" style={{ color: P.gold }} />
              <span>Once approved, your invite will be crafted and delivered</span>
            </li>
          </ul>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-semibold tracking-wide shadow-lg transition-all hover:scale-[1.02]"
            style={{ background: P.gold, color: "white" }}
          >
            <MessageCircle size={14} />
            Chat With Us on WhatsApp
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full px-8 py-3 text-[11px] font-medium border transition-all hover:border-opacity-70"
            style={{ borderColor: P.line, color: P.muted }}
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Support note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-[11px] leading-relaxed"
          style={{ color: P.muted }}
        >
          Have questions? Our team is here to help.
          <br />
          Contact us anytime via WhatsApp or email.
        </motion.p>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ background: P.bg }}>
        <div className="flex flex-col items-center gap-3">
          <Heart size={32} style={{ color: P.gold }} className="animate-pulse" />
          <p className="text-[12px]" style={{ color: P.muted }}>Loading...</p>
        </div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
