"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Film } from "lucide-react";
import type { PortfolioTheme } from "@/lib/portfolioThemes";
import { getMotionProfile } from "./motionProfiles";

/* ═══════════════════════════════════════════════════════════
   VideoPreview — 10-second theme-matched animated preview
   Renders a sequence of animated "scenes" that feel like a
   video version of the invite card.
   ═══════════════════════════════════════════════════════════ */

interface VideoPreviewProps {
  theme: PortfolioTheme;
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  venue?: string;
}

/* ── Particle overlays ──────────────────────────────────── */
function GoldDust() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1, height: Math.random() * 4 + 1,
            background: `rgba(201,161,74,${Math.random() * 0.5 + 0.2})`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i} className="absolute text-[10px]"
          style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
          animate={{ y: ["0%", "120%"], x: [0, Math.random() * 60 - 30], rotate: [0, 360] }}
          transition={{ duration: Math.random() * 4 + 6, repeat: Infinity, delay: Math.random() * 5 }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

function Sparkle() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div key={i} className="absolute"
          style={{
            width: 2, height: 2, borderRadius: "50%",
            background: `rgba(255,215,0,${Math.random() * 0.6 + 0.3})`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 2 + 1.5, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
  );
}

function Particles({ style }: { style: string }) {
  if (style === "gold-dust") return <GoldDust />;
  if (style === "petals") return <Petals />;
  if (style === "sparkle" || style === "stars") return <Sparkle />;
  return null;
}

/* ── Scene components ───────────────────────────────────── */
const sceneVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.6 } },
};

function Scene1({ accent, groom, bride }: { accent: string; groom: string; bride: string }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      variants={sceneVariants} initial="enter" animate="center" exit="exit"
    >
      <motion.p className="text-[8px] font-semibold uppercase tracking-[0.5em]" style={{ color: accent }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >Together With Their Families</motion.p>
      <motion.div className="mt-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
        <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{groom}</h1>
        <span className="block font-serif italic text-xl my-1" style={{ color: accent }}>&amp;</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{bride}</h1>
      </motion.div>
    </motion.div>
  );
}

function Scene2({ accent, date, venue }: { accent: string; date: string; venue: string }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      variants={sceneVariants} initial="enter" animate="center" exit="exit"
    >
      <motion.div className="flex items-center gap-3 mb-4" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
        <span className="h-px w-8" style={{ background: accent }} />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em]" style={{ color: accent }}>Save the Date</span>
        <span className="h-px w-8" style={{ background: accent }} />
      </motion.div>
      <motion.p className="font-serif text-2xl sm:text-3xl text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {date || "February 16, 2025"}
      </motion.p>
      <motion.p className="mt-3 text-[11px] text-white/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        {venue || "Grand Venue · Your City"}
      </motion.p>
    </motion.div>
  );
}

function Scene3({ accent }: { accent: string }) {
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      variants={sceneVariants} initial="enter" animate="center" exit="exit"
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2" style={{ borderColor: accent, background: `${accent}20` }}>
          <span className="font-serif text-2xl" style={{ color: accent }}>♥</span>
        </div>
      </motion.div>
      <motion.p className="mt-4 font-serif text-lg sm:text-xl italic text-white/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        You&apos;re Invited
      </motion.p>
      <motion.p className="mt-2 text-[9px] uppercase tracking-[0.3em]" style={{ color: accent }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        The Digital Inviters
      </motion.p>
    </motion.div>
  );
}

/* ═══ Main component ═══ */
export default function VideoPreview({ theme, groomName, brideName, weddingDate, venue }: VideoPreviewProps) {
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState(0);
  const profile = getMotionProfile(theme.family);

  const groom = groomName || theme.couple.split("&")[0]?.trim() || "Groom";
  const bride = brideName || theme.couple.split("&")[1]?.trim() || "Bride";
  const date = weddingDate ? new Date(weddingDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";

  const totalScenes = 3;
  const sceneDuration = 3400; // ~3.4s per scene = ~10s total

  const resetAndPlay = useCallback(() => {
    setScene(0);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (scene >= totalScenes) {
      setPlaying(false);
      setScene(0);
      return;
    }
    const timer = setTimeout(() => setScene((s) => s + 1), sceneDuration);
    return () => clearTimeout(timer);
  }, [playing, scene]);

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ aspectRatio: "9/16", maxHeight: "480px", border: `1px solid ${theme.accent}30` }}>
      {/* Background */}
      <motion.div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${theme.image})`, filter: profile.colorFilter }}
        animate={playing && profile.bgMotion === "slow-zoom" ? { scale: [1, 1.08] } : profile.bgMotion === "drift" ? { x: [0, -15, 0] } : profile.bgMotion === "pan-left" ? { x: [0, -30] } : {}}
        transition={{ duration: 10, ease: "easeInOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: profile.overlayGradient }} />

      {/* Particles */}
      {playing && <Particles style={profile.particleStyle} />}

      {/* Scenes */}
      <AnimatePresence mode="wait">
        {playing && scene === 0 && <Scene1 key="s1" accent={theme.accent} groom={groom} bride={bride} />}
        {playing && scene === 1 && <Scene2 key="s2" accent={theme.accent} date={date} venue={venue || theme.location} />}
        {playing && scene === 2 && <Scene3 key="s3" accent={theme.accent} />}
      </AnimatePresence>

      {/* Idle state */}
      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
          <div className="relative z-10">
            <Film size={24} className="mx-auto mb-3" style={{ color: theme.accent }} />
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Video Preview</p>
            <p className="mt-1 text-[11px] text-white/70">{theme.name}</p>
          </div>
        </div>
      )}

      {/* Play/Pause button */}
      <button onClick={playing ? () => setPlaying(false) : resetAndPlay}
        className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-110"
        style={{ background: `${theme.accent}40`, border: `1.5px solid ${theme.accent}60` }}
      >
        {playing ? <Pause size={14} color="white" /> : <Play size={14} color="white" fill="white" />}
      </button>

      {/* Progress bar */}
      {playing && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background: "rgba(255,255,255,0.15)" }}>
          <motion.div className="h-full" style={{ background: theme.accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: sceneDuration * totalScenes / 1000, ease: "linear" }}
          />
        </div>
      )}

      {/* Badge */}
      <div className="absolute top-3 left-3 z-20 rounded-full px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)", color: theme.accent }}>
        10s Preview
      </div>
    </div>
  );
}
