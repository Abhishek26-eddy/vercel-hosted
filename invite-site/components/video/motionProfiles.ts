import type { ThemeFamily } from "@/lib/portfolioThemes";

/* ═══════════════════════════════════════════════════════════
   Motion profiles for video previews — per theme family
   Each profile defines timing, easing, and visual style
   ═══════════════════════════════════════════════════════════ */

export interface MotionProfile {
  family: ThemeFamily;
  label: string;
  /** Overlay gradient for the video */
  overlayGradient: string;
  /** Particle / decorative element style */
  particleStyle: "gold-dust" | "petals" | "waves" | "sparkle" | "confetti" | "leaves" | "stars" | "none";
  /** Text entrance style */
  textEntrance: "fade-up" | "slide-in" | "typewriter" | "scale-in" | "blur-in";
  /** Background motion */
  bgMotion: "slow-zoom" | "pan-left" | "parallax" | "static" | "drift";
  /** Overall mood filter */
  colorFilter: string;
  /** Transition between scenes */
  sceneTransition: "fade" | "slide" | "zoom" | "dissolve";
  /** Music mood hint */
  musicMood: string;
}

export const MOTION_PROFILES: Record<ThemeFamily, MotionProfile> = {
  royal: {
    family: "royal",
    label: "Royal Grandeur",
    overlayGradient: "linear-gradient(180deg, rgba(13,9,7,0.7) 0%, rgba(13,9,7,0.3) 50%, rgba(13,9,7,0.8) 100%)",
    particleStyle: "gold-dust",
    textEntrance: "scale-in",
    bgMotion: "slow-zoom",
    colorFilter: "sepia(0.15) saturate(1.2)",
    sceneTransition: "dissolve",
    musicMood: "Regal shehnai, deep tabla",
  },
  floral: {
    family: "floral",
    label: "Soft Floral",
    overlayGradient: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
    particleStyle: "petals",
    textEntrance: "fade-up",
    bgMotion: "drift",
    colorFilter: "saturate(1.1) brightness(1.05)",
    sceneTransition: "fade",
    musicMood: "Soft piano, gentle strings",
  },
  editorial: {
    family: "editorial",
    label: "Modern Cinematic",
    overlayGradient: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)",
    particleStyle: "none",
    textEntrance: "typewriter",
    bgMotion: "pan-left",
    colorFilter: "contrast(1.1) saturate(0.9)",
    sceneTransition: "slide",
    musicMood: "Ambient electronic, minimal beats",
  },
  destination: {
    family: "destination",
    label: "Airy Coastal",
    overlayGradient: "linear-gradient(180deg, rgba(0,50,80,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,50,80,0.5) 100%)",
    particleStyle: "waves",
    textEntrance: "blur-in",
    bgMotion: "drift",
    colorFilter: "saturate(1.15) brightness(1.08)",
    sceneTransition: "fade",
    musicMood: "Acoustic guitar, ocean ambience",
  },
  festive: {
    family: "festive",
    label: "Festive Energy",
    overlayGradient: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)",
    particleStyle: "confetti",
    textEntrance: "slide-in",
    bgMotion: "slow-zoom",
    colorFilter: "saturate(1.3) brightness(1.05)",
    sceneTransition: "zoom",
    musicMood: "Dhol beats, vibrant Bollywood",
  },
  traditional: {
    family: "traditional",
    label: "Traditional Warmth",
    overlayGradient: "linear-gradient(180deg, rgba(80,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(80,0,0,0.5) 100%)",
    particleStyle: "sparkle",
    textEntrance: "fade-up",
    bgMotion: "slow-zoom",
    colorFilter: "sepia(0.1) saturate(1.2) brightness(1.02)",
    sceneTransition: "dissolve",
    musicMood: "Classical sitar, warm shehnai",
  },
  dramatic: {
    family: "dramatic",
    label: "Dark Drama",
    overlayGradient: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)",
    particleStyle: "stars",
    textEntrance: "scale-in",
    bgMotion: "parallax",
    colorFilter: "contrast(1.15) saturate(0.85)",
    sceneTransition: "dissolve",
    musicMood: "Deep cello, atmospheric strings",
  },
  romantic: {
    family: "romantic",
    label: "Soft Romance",
    overlayGradient: "linear-gradient(180deg, rgba(200,150,150,0.2) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)",
    particleStyle: "petals",
    textEntrance: "blur-in",
    bgMotion: "drift",
    colorFilter: "saturate(1.05) brightness(1.08) sepia(0.05)",
    sceneTransition: "fade",
    musicMood: "Soft violin, piano melody",
  },
};

export function getMotionProfile(family: ThemeFamily): MotionProfile {
  return MOTION_PROFILES[family] || MOTION_PROFILES.floral;
}
