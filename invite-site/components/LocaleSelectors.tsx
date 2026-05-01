"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { CURRENCIES, LANGUAGES } from "@/lib/i18n";

export function CurrencySelector() {
  const { currency, setCurrency } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-[#a68b5b]/30 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#1a1816] backdrop-blur-sm transition hover:border-[#a68b5b]/50"
      >
        <span>{currency.flag}</span>
        <span>{currency.code}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[#a68b5b]/20 bg-white shadow-xl"
          >
            <div className="max-h-64 overflow-y-auto py-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#faf8f4] ${
                    currency.code === c.code ? "bg-[#faf8f4] font-medium text-[#a68b5b]" : "text-[#1a1816]"
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.code}</span>
                  <span className="ml-auto text-xs text-[#5c5650]">{c.symbol}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LanguageSelector() {
  const { language, setLanguage } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-[#a68b5b]/30 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#1a1816] backdrop-blur-sm transition hover:border-[#a68b5b]/50"
      >
        <span>{language.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-[#a68b5b]/20 bg-white shadow-xl"
          >
            <div className="py-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-[#faf8f4] ${
                    language.code === l.code ? "bg-[#faf8f4] font-medium text-[#a68b5b]" : "text-[#1a1816]"
                  }`}
                >
                  <span>{l.code.toUpperCase()}</span>
                  <span className="text-xs text-[#5c5650]">{l.nativeName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LocaleSelectors() {
  return (
    <div className="flex items-center gap-2">
      <CurrencySelector />
      <LanguageSelector />
    </div>
  );
}
