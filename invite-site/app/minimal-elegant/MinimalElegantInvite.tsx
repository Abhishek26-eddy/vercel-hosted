"use client";

import { motion } from "framer-motion";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
];

const events = [
  { no: "01", name: "Civil Ceremony", time: "10:30" },
  { no: "02", name: "Cocktail Hour", time: "18:00" },
  { no: "03", name: "Dinner & Vows", time: "20:00" },
  { no: "04", name: "After Party", time: "23:00" },
];

const story = [
  { label: "Met", year: "2019", text: "A rainy Monday, an architecture studio, shared headphones." },
  { label: "Moved In", year: "2022", text: "A tiny Bandra flat, one window, endless conversations." },
  { label: "Engaged", year: "2026", text: "No crowd. Just two, a terrace, and a quiet yes." },
];

export default function MinimalElegantInvite() {
  return (
    <main className="relative min-h-screen bg-[#f7f6f2] text-neutral-900">
      <OpeningScreen
        groom="Isha"
        bride="Arjun"
        subtitle="A quiet celebration"
        bg="#111111"
        text="#f7f6f2"
        accent="#b79862"
        buttonLabel="Enter"
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-[#f7f6f2]" />
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-5 pb-10 pt-10 sm:px-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-neutral-700">
            <span>Isha · Arjun</span>
            <span>MMXXVI</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">The Wedding of</p>
            <h1 className="mt-4 font-serif text-[20vw] leading-[0.85] text-neutral-900 sm:text-[14vw] lg:text-[12rem]">
              Isha
            </h1>
            <h1 className="text-right font-serif text-[20vw] leading-[0.85] text-neutral-900 sm:text-[14vw] lg:text-[12rem]">
              Arjun
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900/20 pt-6 text-xs uppercase tracking-[0.35em] text-neutral-700">
              <span>14 · 11 · 2026</span>
              <span>Mumbai, India</span>
              <span>18:00 IST</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-32 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          <p className="font-serif text-sm uppercase tracking-[0.45em] text-neutral-500">Our Story</p>
          <div className="space-y-10">
            {story.map((moment, index) => (
              <motion.div
                key={moment.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="grid gap-6 border-b border-neutral-900/15 pb-10 md:grid-cols-[180px_1fr]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#b79862]">{moment.label}</p>
                  <p className="mt-2 font-serif text-4xl text-neutral-900">{moment.year}</p>
                </div>
                <p className="text-lg leading-8 text-neutral-700">{moment.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-32 text-white sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.45em] text-[#b79862]">The Day</p>
          <h2 className="mt-3 font-serif text-5xl sm:text-6xl md:text-7xl">14 November, 2026.</h2>
          <div className="mt-16 divide-y divide-white/15">
            {events.map((event, index) => (
              <motion.div
                key={event.no}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="grid grid-cols-[60px_1fr_auto] items-baseline gap-6 py-7"
              >
                <span className="font-serif text-3xl text-[#b79862]">{event.no}</span>
                <span className="font-serif text-2xl">{event.name}</span>
                <span className="text-sm uppercase tracking-[0.35em] text-white/70">{event.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <p className="text-center text-xs uppercase tracking-[0.45em] text-neutral-500">Editorial</p>
        <h2 className="mt-3 text-center font-serif text-5xl text-neutral-900 sm:text-6xl">Images.</h2>
        <div className="mt-16 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className={`overflow-hidden ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ aspectRatio: index === 0 ? "1/1" : "3/4" }}
            >
              <div className="h-full w-full bg-cover bg-center grayscale transition-all duration-700 hover:grayscale-0" style={{ backgroundImage: `url(${src})` }} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#efece6] px-5 py-32 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">Venue</p>
            <h2 className="mt-3 font-serif text-5xl text-neutral-900 sm:text-6xl">The Quiet Room</h2>
            <p className="mt-6 max-w-md leading-7 text-neutral-700">
              A heritage bungalow in Bandra — white walls, wooden floors, a single long table and a thousand candles.
            </p>
            <div className="mt-8 space-y-2 text-sm text-neutral-700">
              <p>Bandra West, Mumbai 400050</p>
              <p>Doors open at 5:30 PM</p>
            </div>
            <a
              href="https://maps.google.com/?q=Bandra+Mumbai"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-none bg-neutral-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-white transition hover:bg-[#b79862]"
            >
              Directions
            </a>
          </div>
          <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${gallery[2]})` }} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-32 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl text-neutral-900 sm:text-6xl">Kindly respond.</h2>
        </div>
        <RSVPForm accent="#b79862" bg="#f7f6f2" text="#111111" cardBg="#ffffff" buttonLabel="Respond" successMessage="Noted with gratitude. See you on the 14th." />
      </section>

      <section className="border-t border-neutral-900/10 bg-[#f7f6f2] px-5 py-16 text-center sm:px-8">
        <p className="font-serif text-3xl italic text-neutral-900 sm:text-4xl">With warmth, Isha &amp; Arjun.</p>
        <p className="mt-3 text-xs uppercase tracking-[0.4em] text-neutral-500">14 · 11 · 2026 · Mumbai</p>
      </section>

      <WhatsAppButton
        label="Enquire"
        message="Hi%2C%20I%20loved%20the%20Minimal%20Elegant%20invite%20and%20would%20like%20a%20custom%20one%20for%20my%20wedding."
        bg="#111111"
        color="#ffffff"
      />
    </main>
  );
}
