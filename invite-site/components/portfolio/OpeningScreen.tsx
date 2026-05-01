"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  groom: string;
  bride: string;
  subtitle?: string;
  script?: string;
  bg?: string;
  text?: string;
  accent?: string;
  buttonLabel?: string;
  image?: string;
  onOpen?: () => void;
};

const easing = [0.22, 1, 0.36, 1] as const;

export default function OpeningScreen({
  groom,
  bride,
  subtitle = "You are cordially invited",
  script = "together with their families",
  bg = "#111111",
  text = "#ffffff",
  accent = "#c9a14a",
  buttonLabel = "Open Invitation",
  image,
  onOpen,
}: Props) {
  const [open, setOpen] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  function handleOpen() {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setOpen(true);
      onOpen?.();
    }, 1200);
  }

  const initials = `${groom[0]?.toUpperCase() ?? ""}${bride[0]?.toUpperCase() ?? ""}`;

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: easing }}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          style={{ background: bg, color: text }}
        >
          {/* Background image with parallax */}
          {image && (
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 2, ease: easing }}
              className="absolute inset-0"
              aria-hidden
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, ${bg}E0 0%, ${bg}C0 50%, ${bg} 100%)` }}
              />
            </motion.div>
          )}

          {/* Decorative corner ornaments */}
          <svg className="pointer-events-none absolute left-6 top-6 h-20 w-20 opacity-30" viewBox="0 0 80 80" fill="none">
            <path d="M0 40 Q0 0 40 0" stroke={accent} strokeWidth="1" fill="none" />
            <path d="M0 60 Q0 0 60 0" stroke={accent} strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="0" r="2" fill={accent} />
            <circle cx="0" cy="40" r="2" fill={accent} />
          </svg>
          <svg className="pointer-events-none absolute right-6 top-6 h-20 w-20 opacity-30 rotate-90" viewBox="0 0 80 80" fill="none">
            <path d="M0 40 Q0 0 40 0" stroke={accent} strokeWidth="1" fill="none" />
            <path d="M0 60 Q0 0 60 0" stroke={accent} strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="0" r="2" fill={accent} />
            <circle cx="0" cy="40" r="2" fill={accent} />
          </svg>
          <svg className="pointer-events-none absolute bottom-6 left-6 h-20 w-20 opacity-30 -rotate-90" viewBox="0 0 80 80" fill="none">
            <path d="M0 40 Q0 0 40 0" stroke={accent} strokeWidth="1" fill="none" />
            <path d="M0 60 Q0 0 60 0" stroke={accent} strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="0" r="2" fill={accent} />
            <circle cx="0" cy="40" r="2" fill={accent} />
          </svg>
          <svg className="pointer-events-none absolute bottom-6 right-6 h-20 w-20 opacity-30 rotate-180" viewBox="0 0 80 80" fill="none">
            <path d="M0 40 Q0 0 40 0" stroke={accent} strokeWidth="1" fill="none" />
            <path d="M0 60 Q0 0 60 0" stroke={accent} strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="0" r="2" fill={accent} />
            <circle cx="0" cy="40" r="2" fill={accent} />
          </svg>

          {/* Soft glow */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 60%)` }}
            aria-hidden
          />

          {/* Envelope card */}
          <motion.div
            animate={envelopeOpen ? { rotateX: -180, y: -100, opacity: 0 } : {}}
            transition={{ duration: 0.8, ease: easing }}
            className="relative perspective-1000"
          >
            <div className="relative px-6 text-center">
              {/* Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: easing }}
                className="mx-auto mb-8"
              >
                <div 
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2"
                  style={{ borderColor: `${accent}50`, background: `${accent}08` }}
                >
                  <span className="font-display text-4xl tracking-[0.1em]" style={{ color: accent }}>
                    {initials}
                  </span>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: easing }}
                className="text-[10px] font-medium uppercase tracking-[0.5em]"
                style={{ color: accent }}
              >
                {subtitle}
              </motion.p>

              {/* Script text */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: easing }}
                className="font-script mt-4 text-2xl sm:text-3xl"
                style={{ color: `${text}90` }}
              >
                {script}
              </motion.p>

              {/* Names */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.9, ease: easing }}
                className="font-display mt-2 text-[clamp(2.5rem,8vw,5.5rem)] leading-[1]"
              >
                {groom}
                <motion.span 
                  className="mx-2 inline-block font-script text-[0.5em]" 
                  style={{ color: accent }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  &amp;
                </motion.span>
                {bride}
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.3, ease: easing }}
                className="mx-auto mt-8 flex items-center justify-center gap-3"
              >
                <div className="h-px w-12" style={{ background: `${accent}60` }} />
                <div className="h-2 w-2 rotate-45" style={{ background: accent }} />
                <div className="h-px w-12" style={{ background: `${accent}60` }} />
              </motion.div>

              {/* Open button */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6, ease: easing }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpen}
                disabled={envelopeOpen}
                className="group mt-10 inline-flex items-center gap-3 rounded-full border px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.4em] backdrop-blur-sm transition-all duration-500"
                style={{
                  borderColor: `${accent}40`,
                  color: text,
                  background: `${accent}10`,
                }}
              >
                <motion.span 
                  className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-125" 
                  style={{ background: accent }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {buttonLabel.toUpperCase()}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
