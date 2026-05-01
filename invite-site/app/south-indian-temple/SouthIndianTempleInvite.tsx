"use client";

import { motion } from "framer-motion";
import { CloudRain, Leaf, MapPin, Heart, Droplets } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const P = {
  bg: "#f5f9f4",
  bgAlt: "#e8f0e6",
  ink: "#2c3e2c",
  body: "#4a5f4a",
  muted: "#7a8f7a",
  accent: "#5a8f5a",
  accentSoft: "#7ba17b",
  gold: "#a08b5b",
};

const hero = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=900&q=85",
];

const events = [
  { name: "Mehendi", time: "June 20 · 4:00 PM", detail: "Henna, music, and laughter under the mango trees." },
  { name: "Sangeet", time: "June 21 · 7:00 PM", detail: "Dancing in the rain, celebrating our love." },
  { name: "Wedding Ceremony", time: "June 22 · 11:00 AM", detail: "Sacred vows amidst the misty hills." },
  { name: "Reception", time: "June 22 · 7:30 PM", detail: "An evening of joy and togetherness." },
];

const story = [
  { title: "First Rain", text: "We met during the first monsoon shower of the year. Strangers sharing an umbrella." },
  { title: "Coffee & Conversations", text: "Rainy evenings became our thing. Chai, pakoras, and endless stories." },
  { title: "The Question", text: "He proposed in the rain. She said yes before he finished asking." },
];

export default function SouthIndianTempleInvite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f9f4] text-[#2c3e2c]">
      <OpeningScreen
        groom="Priya"
        bride="Rohan"
        subtitle="A love story written in rain"
        bg="#5a8f5a"
        text="#f5f9f4"
        accent="#a08b5b"
        buttonLabel="Open Invitation"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(90,143,90,0.7)_0%,rgba(90,143,90,0.4)_40%,rgba(245,249,244,0.95)_100%)]" />
        
        {/* Rain drops decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-white/20"
              style={{ left: `${5 + i * 5}%`, height: "60px" }}
              animate={{ y: ["-100%", "100vh"] }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        
        <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur">
            <CloudRain className="text-white" size={24} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="text-[10px] uppercase tracking-[0.55em] text-white/80">
            Monsoon Romance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-6 font-serif text-6xl leading-[1] text-white drop-shadow-xl sm:text-7xl md:text-8xl">
            Priya
            <span className="block italic text-[#a08b5b] text-4xl sm:text-5xl md:text-6xl my-2">&amp;</span>
            Rohan
          </motion.h1>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-white/90">22 June 2027 · Coorg</p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
        <Droplets className="mx-auto mb-5 text-[#5a8f5a]" size={26} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#5a8f5a]">Our Beginning</p>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-3xl italic leading-relaxed text-[#2c3e2c] sm:text-4xl md:text-5xl">
          &ldquo;Like the first rain of monsoon, love arrived unexpectedly — and changed everything.&rdquo;
        </p>
        <div className="mx-auto mt-10 h-px w-28 bg-[#5a8f5a]" />
      </section>

      {/* Story Section */}
      <section className="bg-[#5a8f5a] px-5 py-24 text-[#f5f9f4] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <Heart className="mx-auto mb-4 text-[#a08b5b]" size={26} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#a08b5b]">Our Story</p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Written in rain.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {story.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[1.5rem] border border-white/20 bg-white/5 p-7 backdrop-blur"
              >
                <h3 className="font-serif text-3xl text-[#a08b5b]">{moment.title}</h3>
                <div className="my-3 h-px w-12 bg-[#a08b5b]" />
                <p className="leading-7 text-white/85">{moment.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#5a8f5a]">Celebrations</p>
          <h2 className="mt-3 font-serif text-5xl text-[#2c3e2c] sm:text-6xl">Days of joy.</h2>
        </div>
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-5 rounded-[1.5rem] border border-[#5a8f5a]/30 bg-white p-6 shadow-[0_12px_40px_rgba(90,143,90,0.08)] md:grid-cols-[auto_1fr_auto]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5a8f5a] text-white">
                <Leaf size={22} />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#5a8f5a]">{event.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4a5f4a]">{event.detail}</p>
              </div>
              <p className="rounded-full bg-[#5a8f5a] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                {event.time}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#e8f0e6] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-[#5a8f5a]">Gallery</p>
          <h2 className="mt-3 text-center font-serif text-5xl text-[#2c3e2c] sm:text-6xl">Moments in green.</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="overflow-hidden rounded-[1.25rem] ring-1 ring-[#5a8f5a]/30"
                style={{ aspectRatio: index === 0 ? "3/4" : "1/1" }}
              >
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${src})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#5a8f5a]/80" />
        <div className="relative mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-white/20 bg-white/10 p-10 text-white backdrop-blur-md md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#a08b5b]">Venue</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">The Tamara Coorg</h2>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.32em]">
              <MapPin size={14} /> Coorg, Karnataka
            </p>
            <p className="mt-5 leading-7 text-white/85">
              Nestled in the misty hills, surrounded by coffee plantations and the gentle sound of rain on leaves.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=The+Tamara+Coorg"
            target="_blank"
            rel="noreferrer"
            className="self-end rounded-full bg-[#a08b5b] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-xl transition hover:-translate-y-0.5"
          >
            Open in Maps
          </a>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#5a8f5a]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl text-[#2c3e2c] sm:text-6xl">Join us in the rain.</h2>
        </div>
        <RSVPForm accent="#5a8f5a" bg="#f5f9f4" text="#2c3e2c" cardBg="#ffffff" buttonLabel="Send RSVP" successMessage="We can't wait to celebrate with you!" />
      </section>

      {/* Footer */}
      <section className="bg-[#5a8f5a] px-5 py-20 text-center text-white sm:px-8">
        <CloudRain className="mx-auto mb-5 text-[#a08b5b]" size={26} />
        <h2 className="font-serif text-4xl sm:text-5xl">See you when the clouds gather.</h2>
      </section>

      <WhatsAppButton
        label="Message Us"
        message="Hi%2C%20I%20loved%20the%20Monsoon%20Romance%20invite%20and%20would%20like%20one%20for%20my%20wedding."
        bg="#5a8f5a"
        color="#f5f9f4"
      />
    </main>
  );
}
