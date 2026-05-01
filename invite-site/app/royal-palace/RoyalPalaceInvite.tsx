"use client";

import { motion } from "framer-motion";
import { Crown, Flame, MapPin, Star } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1617191518007-d7a58e828343?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=900&q=85",
];

const events = [
  { name: "Mehendi", time: "Dec 09 · 3:00 PM", detail: "Henna, marigolds, sweet laughter." },
  { name: "Sangeet", time: "Dec 10 · 7:30 PM", detail: "Dhol, dance, and a thousand stars." },
  { name: "Pheras", time: "Dec 11 · 6:30 PM", detail: "Seven vows under a palace sky." },
  { name: "Reception", time: "Dec 12 · 8:00 PM", detail: "Royal feast. Crown your memories." },
];

const story = [
  { title: "A Chance Encounter", date: "Winter 2020", text: "Two strangers at a Jaipur heritage walk — one guide, one palace, a thousand stories later." },
  { title: "Across Cities", date: "2021–2024", text: "Handwritten letters, midnight drives, and a love that crossed state borders and family traditions." },
  { title: "The Royal Yes", date: "March 2026", text: "At Amber Fort, draped in saffron skies, a proposal fit for royalty." },
];

export default function RoyalPalaceInvite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fdf4e3] text-[#2a0a12]">
      <OpeningScreen
        groom="Ananya"
        bride="Veer"
        subtitle="By the blessing of elders"
        bg="#2a0a12"
        text="#fdf4e3"
        accent="#c9a14a"
        buttonLabel="Open Invitation"
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,10,18,0.82)_0%,rgba(42,10,18,0.55)_50%,rgba(253,244,227,0.95)_100%)]" />
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-14 pt-24 text-center text-[#fdf4e3] sm:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c9a14a] bg-white/10 backdrop-blur-md">
            <Crown className="text-[#c9a14a]" size={32} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[10px] uppercase tracking-[0.55em] text-[#c9a14a]">
            The Royal Wedding Of
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="mt-6 font-serif text-6xl leading-[1] drop-shadow-xl sm:text-7xl md:text-8xl">
            Ananya
            <span className="block italic text-[#c9a14a] text-4xl sm:text-5xl md:text-6xl my-2">&amp;</span>
            Veer
          </motion.h1>
          <div className="mt-8 flex items-center gap-3 text-[#c9a14a]">
            <span className="h-px w-10 bg-[#c9a14a]" />
            <Star size={14} className="fill-[#c9a14a]" />
            <span className="h-px w-10 bg-[#c9a14a]" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.4em]">11 December 2026 · Jaipur</p>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#7a1f2b]">Our Story</p>
          <h2 className="mt-3 font-serif text-5xl text-[#2a0a12] sm:text-6xl">Once upon a palace…</h2>
        </div>
        <div className="mx-auto mt-14 max-w-4xl space-y-6">
          {story.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="grid gap-5 rounded-[2rem] border border-[#c9a14a]/40 bg-white/80 p-7 shadow-[0_18px_60px_rgba(42,10,18,0.08)] md:grid-cols-[200px_1fr]"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#c9a14a]">{moment.date}</p>
                <h3 className="mt-2 font-serif text-3xl text-[#7a1f2b]">{moment.title}</h3>
              </div>
              <p className="leading-7 text-[#5a3238]">{moment.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#2a0a12] px-5 py-24 text-[#fdf4e3] sm:px-8">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#c9a14a_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#c9a14a]">Celebrations</p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Royal Festivities</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[1.5rem] border border-[#c9a14a]/40 bg-white/5 p-7 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <Flame className="text-[#c9a14a]" size={22} />
                  <h3 className="font-serif text-3xl">{event.name}</h3>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#c9a14a]">{event.time}</p>
                <p className="mt-4 leading-7 text-[#fdf4e3]/80">{event.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#7a1f2b]">Frames</p>
          <h2 className="mt-3 font-serif text-5xl text-[#2a0a12] sm:text-6xl">A Royal Album</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-[#c9a14a]/30"
              style={{ aspectRatio: index === 1 ? "3/4" : "1/1" }}
            >
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${src})` }} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#2a0a12]/75" />
        <div className="relative mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-[#c9a14a]/40 bg-[#fdf4e3]/10 p-10 text-[#fdf4e3] backdrop-blur-md md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#c9a14a]">Venue</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Amber Palace Gardens</h2>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.32em]">
              <MapPin size={14} /> Jaipur, Rajasthan
            </p>
            <p className="mt-5 leading-7 text-[#fdf4e3]/80">
              A 16th-century palace dressed in marigolds, antique lamps and the quiet hum of a thousand stories.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Amber+Palace+Jaipur"
            target="_blank"
            rel="noreferrer"
            className="self-end rounded-full bg-[#c9a14a] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#2a0a12] shadow-xl transition hover:-translate-y-0.5"
          >
            Open in Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#7a1f2b]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl text-[#2a0a12] sm:text-6xl">We&apos;d be honoured.</h2>
        </div>
        <RSVPForm accent="#c9a14a" bg="#fdf4e3" text="#2a0a12" cardBg="#ffffff" buttonLabel="Confirm Attendance" successMessage="Aadarpurvak svagat! Your RSVP has been received." />
      </section>

      <section className="bg-[#2a0a12] px-5 py-20 text-center text-[#fdf4e3] sm:px-8">
        <Crown className="mx-auto mb-5 text-[#c9a14a]" size={28} />
        <h2 className="font-serif text-4xl sm:text-5xl">With gratitude from our families.</h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#fdf4e3]/70">
          We look forward to welcoming you to a celebration our families have dreamt of for a lifetime.
        </p>
      </section>

      <WhatsAppButton
        label="Message Us"
        message="Hi%2C%20I%20loved%20the%20Royal%20Palace%20invite%20and%20would%20like%20a%20custom%20one%20for%20my%20wedding."
        bg="#c9a14a"
        color="#2a0a12"
      />
    </main>
  );
}
