"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Palmtree, Plane, Shell, Waves } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=900&q=85",
];

const itinerary = [
  { day: "Day 01", date: "Mar 20", title: "Arrival & Welcome Dinner", detail: "Fly into Port Blair. Transfer to Havelock by luxury ferry. Beach dinner under the stars." },
  { day: "Day 02", date: "Mar 21", title: "Island Haldi & Sunset Sangeet", detail: "Morning haldi on sand. Evening sangeet on a floating deck." },
  { day: "Day 03", date: "Mar 22", title: "The Wedding", detail: "Barefoot ceremony at Radhanagar Beach. Dinner at the resort." },
  { day: "Day 04", date: "Mar 23", title: "Farewell Brunch & Snorkelling", detail: "Optional snorkelling, kayaking, or simply doing nothing." },
];

const story = [
  { title: "First Dive", text: "They met on a scuba trip in the Maldives — she was afraid of deep water, he taught her to breathe underwater." },
  { title: "Two Passports", text: "Long-distance through three continents, twelve cities and a hundred airport coffees." },
  { title: "The Proposal", text: "On a hidden Andaman cove, knee in the sand, ring tied in a seashell." },
];

export default function BeachDestinationInvite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eaf7f8] text-[#0a3a45]">
      <OpeningScreen
        groom="Alia"
        bride="Zayn"
        subtitle="Pack your bags — we're getting married"
        bg="#0a3a45"
        text="#eaf7f8"
        accent="#f3e6c4"
        buttonLabel="Begin Journey"
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,58,69,0.35)_0%,rgba(43,138,155,0.25)_45%,rgba(234,247,248,0.9)_100%)]" />
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2"
        >
          <Waves className="text-white/70" size={60} />
        </motion.div>
        <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white backdrop-blur">
            <Plane size={13} /> Destination Wedding
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="font-serif text-6xl leading-[1] text-white drop-shadow-xl sm:text-7xl md:text-8xl">
            Alia
            <span className="mx-3 italic text-[#f3e6c4]">&amp;</span>
            Zayn
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/85">
            Three days of ocean, sunshine and slow love — on the quiet white sands of Havelock Island.
          </motion.p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.4em] text-white">
            <span className="flex items-center gap-2"><Compass size={14} /> 20–23 Mar 2027</span>
            <span className="flex items-center gap-2"><Palmtree size={14} /> Havelock Island</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-12 text-center">
          <Shell className="mx-auto mb-4 text-[#2b8a9b]" size={26} />
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2b8a9b]">Their Story</p>
          <h2 className="mt-3 font-serif text-5xl text-[#0a3a45] sm:text-6xl">Written in salt and sunshine.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {story.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[1.5rem] border border-[#bfe2e3] bg-white/85 p-7 shadow-[0_18px_50px_rgba(10,58,69,0.08)] backdrop-blur"
            >
              <h3 className="font-serif text-2xl text-[#0a3a45]">{moment.title}</h3>
              <div className="my-3 h-px w-12 bg-[#2b8a9b]" />
              <p className="leading-7 text-[#295863]">{moment.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a3a45] px-5 py-24 text-[#eaf7f8] sm:px-8">
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#2b8a9b]/40 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#f3e6c4]/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <Plane className="mx-auto mb-4 text-[#f3e6c4]" size={26} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f3e6c4]">Itinerary</p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">Four days in paradise.</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 hidden w-px bg-[#f3e6c4]/30 md:block" />
            <div className="space-y-6">
              {itinerary.map((item, index) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="relative grid gap-4 md:grid-cols-[180px_1fr] md:pl-10"
                >
                  <span className="absolute left-[13px] top-2 hidden h-3 w-3 rounded-full bg-[#f3e6c4] md:block" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#f3e6c4]">{item.day} · {item.date}</p>
                    <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
                  </div>
                  <p className="leading-7 text-[#eaf7f8]/80">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-[1.5rem] border border-[#f3e6c4]/30 bg-white/5 p-6 backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#f3e6c4]">Travel Note</p>
            <p className="mt-3 leading-7 text-[#eaf7f8]/85">
              Rooms are blocked at our resort from Mar 19–24. RSVP by 15 Feb so we can arrange ferry transfers and airport pick-ups for you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2b8a9b]">Snapshots</p>
        <h2 className="mt-3 text-center font-serif text-5xl text-[#0a3a45] sm:text-6xl">Somewhere blue.</h2>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className={`overflow-hidden rounded-[1.25rem] ${index === 0 ? "md:col-span-2 md:row-span-2 min-h-64" : ""}`}
              style={{ aspectRatio: index === 0 ? "1/1" : "3/4" }}
            >
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-110" style={{ backgroundImage: `url(${src})` }} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#0a3a45]/60" />
        <div className="relative mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-[#f3e6c4]/40 bg-white/10 p-10 text-[#eaf7f8] backdrop-blur-md md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#f3e6c4]">Resort Venue</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Radhanagar Beach Resort</h2>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.32em]">
              <MapPin size={14} /> Havelock Island, Andaman
            </p>
            <p className="mt-5 leading-7 text-[#eaf7f8]/85">
              Private beachfront, open-air mandap, oceanside dining pavilion and sunsets that refuse to end.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Radhanagar+Beach+Havelock+Island"
            target="_blank"
            rel="noreferrer"
            className="self-end rounded-full bg-[#f3e6c4] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#0a3a45] shadow-xl transition hover:-translate-y-0.5"
          >
            Open in Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#2b8a9b]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl text-[#0a3a45] sm:text-6xl">Will you fly in for us?</h2>
        </div>
        <RSVPForm accent="#2b8a9b" bg="#eaf7f8" text="#0a3a45" cardBg="#ffffff" buttonLabel="RSVP Now" successMessage="Your seat is saved on the island. We'll be in touch with travel details." />
      </section>

      <section className="bg-[#0a3a45] px-5 py-20 text-center text-[#eaf7f8] sm:px-8">
        <Shell className="mx-auto mb-5 text-[#f3e6c4]" size={26} />
        <h2 className="font-serif text-4xl sm:text-5xl">Thank you for crossing oceans for us.</h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#eaf7f8]/75">
          See you barefoot, with salt in your hair and a champagne flute in hand.
        </p>
      </section>

      <WhatsAppButton
        label="Message Us"
        message="Hi%2C%20I%20loved%20the%20Beach%20Destination%20invite%20and%20would%20like%20one%20for%20my%20wedding."
        bg="#2b8a9b"
        color="#eaf7f8"
      />
    </main>
  );
}
