"use client";

import { MessageCircle } from "lucide-react";

type Props = {
  label?: string;
  message?: string;
  phone?: string;
  bg?: string;
  color?: string;
  position?: "fixed" | "inline";
};

export default function WhatsAppButton({
  label = "Share on WhatsApp",
  message = "Hi%20The%20Digital%20Inviters%2C%20I%20liked%20this%20wedding%20invite%20design.",
  phone = "917240345334",
  bg = "#25D366",
  color = "#ffffff",
  position = "fixed",
}: Props) {
  const href = `https://wa.me/${phone}?text=${message}`;
  const common =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-xl transition hover:-translate-y-0.5";
  const style = { background: bg, color };

  if (position === "inline") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={common} style={style}>
        <MessageCircle size={16} /> {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-2xl transition hover:-translate-y-0.5"
      style={style}
      aria-label={label}
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
