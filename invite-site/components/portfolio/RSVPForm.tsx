"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  accent?: string;
  bg?: string;
  text?: string;
  cardBg?: string;
  buttonLabel?: string;
  successMessage?: string;
  displayClass?: string;
};

export default function RSVPForm({
  accent = "#c9a14a",
  bg = "#ffffff",
  text = "#111111",
  cardBg = "#ffffff",
  buttonLabel = "Confirm Attendance",
  successMessage = "Thank you! Your RSVP has been recorded.",
  displayClass = "font-display",
}: Props) {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", note: "" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  return (
    <div
      className="mx-auto w-full max-w-2xl rounded-[2rem] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.08)] sm:p-10"
      style={{ background: cardBg, color: text }}
    >
      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Your Name
              </label>
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-base outline-none transition focus:border-current"
                style={{ color: text }}
                placeholder="Full name"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(event) => setForm((prev) => ({ ...prev, guests: event.target.value }))}
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-base outline-none focus:border-current"
                  style={{ color: text, background: bg }}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Attending
                </label>
                <select
                  value={form.attending}
                  onChange={(event) => setForm((prev) => ({ ...prev, attending: event.target.value }))}
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-base outline-none focus:border-current"
                  style={{ color: text, background: bg }}
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Message (optional)
              </label>
              <textarea
                value={form.note}
                onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                rows={3}
                className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-base outline-none transition focus:border-current"
                style={{ color: text }}
                placeholder="A warm note for the couple"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] shadow-lg transition hover:-translate-y-0.5"
              style={{ background: accent, color: bg }}
            >
              {buttonLabel}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: `${accent}22`, color: accent }}
            >
              <CheckCircle2 size={34} />
            </div>
            <h3 className={`${displayClass} text-3xl`}>RSVP Confirmed</h3>
            <p className="mt-4 max-w-md leading-7 opacity-80">{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
