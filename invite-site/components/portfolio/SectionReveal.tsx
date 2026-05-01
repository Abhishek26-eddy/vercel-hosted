"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  amount?: number;
  once?: boolean;
  y?: number;
  x?: number;
};

const easing = [0.22, 1, 0.36, 1] as const;

export default function SectionReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  amount = 0.2,
  once = true,
  y = 36,
  x = 36,
}: Props) {
  const reduce = useReducedMotion();

  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        filter: "blur(10px)",
        y: direction === "up" ? y : 0,
        x: direction === "left" ? -x : direction === "right" ? x : 0,
      };

  const animate = reduce
    ? { opacity: 1 }
    : { opacity: 1, filter: "blur(0px)", y: 0, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration: 1.1, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
