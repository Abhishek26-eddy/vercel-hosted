"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  image: string;
  overlay?: string;
  children: ReactNode;
  className?: string;
  minHeight?: string;
};

export default function ParallaxHero({
  image,
  overlay = "linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.15) 45%,rgba(0,0,0,0.55))",
  children,
  className = "",
  minHeight = "100dvh",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`} style={{ minHeight }}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0" style={{ background: overlay }} />
      </motion.div>
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
