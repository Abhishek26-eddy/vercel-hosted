"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Disc3, MapPin, Mic2, PartyPopper, Sparkles } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1514326005837-fb4791d25e03?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1514533212735-5df27d970db0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85",
];

const events = [
  { name: "Mehendi Brunch", time: "Feb 07 · 11:00 AM", vibe: "Henna, mimosas, moodboards." },
  { name: "Haldi Afterparty", time: "Feb 07 · 6:00 PM", vibe: "Turmeric meets disco balls." },
  { name: "The Sangeet Night", time: "Feb 08 · 8:00 PM", vibe: "The show you'll talk about for years." },
  { name: "Pheras", time: "Feb 09 · 6:30 PM", vibe: "A softer, sacred finale." },
  { name: "Reception", time: "Feb 10 · 9:00 PM", vibe: "Black tie. Open bar. Dance floor." },
];

const story = [
  { title: "Cameo One", text: "A film set in Goa. She was directing, he was doing a cameo. One clap, one glance." },
  { title: "Act Two", text: "Three cities, two passports, countless voice notes. The distance became the plot." },
  { title: "The Finale", text: "A rooftop in Bandra, a private DJ, and one choreographed proposal." },
];

export default function BollywoodSangeetInvite() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 23) % 100}%`,
        top: `${(index * 37) % 100}%`,
        size: 3 + (index % 4) * 2,
        delay: (index % 8) * 0.3,
      })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1b0b2a] text-[#f5eaff]">
      <OpeningScreen
        groom="Kiara"
        bride="Ranvijay"
        subtitle="Lights on. Curtain up."
        bg="#120620"
        text="#f5eaff"
        accent="#f5c542"
        buttonLabel="Roll The Show"
      />

      <div className="pointer-events-none fixed inset-0 z-10">
        {sparkles.map((star) => (
          <motion.span
            key={star.id}
            animate={{ opacity: [0, 1, 0], scale: [0.7, 1.2, 0.7] }}
            transition={{ duration: 2.4, delay: star.delay, repeat: Infinity }}
            className="absolute rounded-full bg-[#f5c542]"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size, boxShadow: "0 0 12px #f5c542" }}
          />
        ))}
      </div>

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(233,30,99,0.4)_0%,rgba(27,11,42,0.85)_60%,#120620_100%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c542]/20"
        />
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 text-center sm:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f5c542]/50 bg-[#f5c542]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#f5c542]">
            <Disc3 size={14} /> The Sangeet Edition
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="font-serif text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
            <span className="bg-gradient-to-r from-[#f5c542] via-[#e91e63] to-[#f5c542] bg-clip-text text-transparent">Kiara</span>
            <span className="mx-4 italic opacity-80">&amp;</span>
            <span className="bg-gradient-to-r from-[#f5c542] via-[#e91e63] to-[#f5c542] bg-clip-text text-transparent">Ranvijay</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mx-auto mt-8 max-w-xl text-sm uppercase tracking-[0.4em] text-[#f5eaff]/75">
            A five-night wedding. A lifetime encore.
          </motion.p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.35em] text-[#f5c542]">
            <span className="flex items-center gap-2"><Sparkles size={14} /> Feb 07–10, 2027</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> New Delhi</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">Backstory</p>
          <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Three acts. One love story.</h2>
        </div>
        <div className="space-y-6">
          {story.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#2a1246] to-[#1b0b2a] p-7 shadow-[0_20px_60px_rgba(233,30,99,0.15)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#e91e63]">Act {index + 1}</p>
              <h3 className="mt-2 font-serif text-3xl text-[#f5c542]">{moment.title}</h3>
              <p className="mt-3 leading-7 text-[#f5eaff]/80">{moment.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#120620] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">The Lineup</p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Five nights of glamour.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#f5c542]/30 bg-gradient-to-br from-[#2a1246]/80 to-[#1b0b2a]/80 p-6"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#e91e63]/30 blur-2xl transition group-hover:bg-[#e91e63]/60" />
                <Mic2 className="text-[#f5c542]" size={22} />
                <h3 className="mt-4 font-serif text-2xl text-[#f5eaff]">{event.name}</h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#f5c542]">{event.time}</p>
                <p className="mt-4 text-sm leading-6 text-[#f5eaff]/80">{event.vibe}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">Flashbulb Moments</p>
        <h2 className="mt-3 text-center font-serif text-5xl sm:text-6xl">Behind the scenes.</h2>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-[1.25rem] border border-[#f5c542]/20"
              style={{ aspectRatio: index === 0 ? "3/4" : "1/1" }}
            >
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-110" style={{ backgroundImage: `url(${src})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0b2a]/80 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b0b2a] via-[#1b0b2a]/80 to-[#1b0b2a]" />
        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-[#f5c542]/30 bg-white/5 p-10 backdrop-blur-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">The Stage</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">The Leela Pavilion</h2>
          <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#f5c542]">
            <MapPin size={14} /> New Delhi
          </p>
          <p className="mt-5 leading-7 text-[#f5eaff]/80">
            A four-pillared pavilion dressed in magenta drapes, amber spotlights and a dance floor built for a thousand selfies.
          </p>
          <a
            href="https://maps.google.com/?q=The+Leela+Palace+New+Delhi"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#f5c542] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#1b0b2a] shadow-xl transition hover:-translate-y-0.5"
          >
            Open in Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <PartyPopper className="mx-auto mb-4 text-[#f5c542]" size={28} />
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Are you on the guest list?</h2>
        </div>
        <RSVPForm accent="#f5c542" bg="#1b0b2a" text="#1b0b2a" cardBg="#f5eaff" buttonLabel="Confirm My Seat" successMessage="Your front-row seat is saved. See you on the dance floor." />
      </section>

      <section className="bg-[#120620] px-5 py-20 text-center sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f5c542]">Curtain Call</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Thank you for making our story a blockbuster.</h2>
      </section>

      <WhatsAppButton
        label="Message Us"
        message="Hi%2C%20I%20loved%20the%20Bollywood%20Sangeet%20invite%20and%20would%20like%20one%20for%20my%20wedding."
        bg="#f5c542"
        color="#1b0b2a"
      />
    </main>
  );
}
