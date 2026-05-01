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

  function handleOpen() {
    setOpen(true);
    onOpen?.();
  }

  const initials = `${groom[0]?.toUpperCase() ?? ""}${bride[0]?.toUpperCase() ?? ""}`;

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 1.1, ease: easing }}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-6"
          style={{ background: bg, color: text }}
        >
          {image && (
            <motion.div
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.35 }}
              transition={{ duration: 1.6, ease: easing }}
              className="absolute inset-0"
              aria-hidden
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, ${bg}CC 0%, ${bg}AA 50%, ${bg} 100%)` }}
              />
            </motion.div>
          )}

          <motion.div
            animate={{ scale: [1, 1.02, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
            aria-hidden
          />

          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: easing }}
              className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full border"
              style={{ borderColor: `${accent}66`, background: `${accent}11` }}
            >
              <span className="font-display text-3xl tracking-[0.08em]" style={{ color: accent }}>
                {initials}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: easing }}
              className="eyebrow"
              style={{ color: accent }}
            >
              {subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: easing }}
              className="font-script mt-5 text-3xl sm:text-4xl"
              style={{ color: accent }}
            >
              {script}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ duration: 1.2, delay: 0.85, ease: easing }}
              className="font-display mt-3 text-[clamp(3rem,9vw,6.5rem)] leading-[0.95]"
            >
              {groom}
              <span className="mx-3 font-script" style={{ color: accent }}>
                &amp;
              </span>
              {bride}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.25, ease: easing }}
              className="mx-auto mt-10 h-px w-28 origin-center"
              style={{ background: accent }}
            />

            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: easing }}
              whileHover={{ y: -2 }}
              onClick={handleOpen}
              className="mt-10 inline-flex items-center gap-3 rounded-full border px-9 py-4 text-[11px] font-medium tracking-[0.38em] backdrop-blur transition"
              style={{
                borderColor: `${accent}66`,
                color: text,
                background: `${accent}15`,
              }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              {buttonLabel.toUpperCase()}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
