"use client";

import { motion } from "framer-motion";
import { Bell, Flower, Leaf, MapPin, Sun } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1609925265061-7d5a6b1b9dab?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1604604557532-cd5e53e2d033?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1610173826608-e3a5e1c3bba0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1587825140708-dfaf18c4c93a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
];

const ceremonies = [
  { name: "Nischayathartham", time: "May 14 · 9:30 AM", detail: "Formal engagement with family elders." },
  { name: "Kaashi Yatra", time: "May 15 · 7:00 AM", detail: "The playful journey of the groom." },
  { name: "Kanyadaanam & Muhurtham", time: "May 15 · 10:45 AM", detail: "The sacred vows at the auspicious hour." },
  { name: "Sadya Lunch", time: "May 15 · 12:30 PM", detail: "A traditional feast on banana leaves." },
  { name: "Reception", time: "May 16 · 7:30 PM", detail: "A grand Chennai evening." },
];

const blessings = [
  { title: "Pooja", text: "A morning under the temple bells, where two families prayed for one future." },
  { title: "Parents", text: "Both sets of parents — childhood friends themselves — gently wove two worlds into one." },
  { title: "Promise", text: "Seven steps. Seven vows. One lifetime chosen together." },
];

export default function SouthIndianTempleInvite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fdf7ea] text-[#4b1a16]">
      <OpeningScreen
        groom="Nandini"
        bride="Karthik"
        subtitle="With the blessings of our elders"
        bg="#0f5132"
        text="#fdf7ea"
        accent="#c9a14a"
        buttonLabel="Open Invitation"
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,81,50,0.75)_0%,rgba(201,161,74,0.25)_45%,rgba(253,247,234,0.95)_100%)]" />
        <svg className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2" width="380" height="110" viewBox="0 0 380 110" fill="none">
          <path d="M20 90 Q190 10 360 90" stroke="#c9a14a" strokeWidth="2" fill="none" />
          <path d="M20 90 Q190 40 360 90" stroke="#c9a14a" strokeWidth="1" opacity="0.6" fill="none" />
          {Array.from({ length: 9 }).map((_, index) => (
            <circle key={index} cx={20 + index * 42.5} cy={90} r={3} fill="#c9a14a" />
          ))}
        </svg>
        <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c9a14a] bg-[#fdf7ea]/15 backdrop-blur">
            <Bell className="text-[#c9a14a]" size={24} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="text-[10px] uppercase tracking-[0.55em] text-[#c9a14a]">
            Shubha Vivaham
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-6 font-serif text-6xl leading-[1] text-[#fdf7ea] drop-shadow-xl sm:text-7xl md:text-8xl">
            Nandini
            <span className="block italic text-[#c9a14a] text-4xl sm:text-5xl md:text-6xl my-2">&amp;</span>
            Karthik
          </motion.h1>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-[#fdf7ea]/90">15 May 2027 · Chennai</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
        <Flower className="mx-auto mb-5 text-[#0f5132]" size={26} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#0f5132]">Invocation</p>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-3xl italic leading-relaxed text-[#4b1a16] sm:text-4xl md:text-5xl">
          &ldquo;Two families joined in faith, two hearts entwined in dharma — one sacred new beginning.&rdquo;
        </p>
        <div className="mx-auto mt-10 h-px w-28 bg-[#c9a14a]" />
      </section>

      <section className="bg-[#0f5132] px-5 py-24 text-[#fdf7ea] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <Leaf className="mx-auto mb-4 text-[#c9a14a]" size={26} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#c9a14a]">Our Blessings</p>
            <h2 className="mt-3 font-serif text-5xl sm:text-6xl">A story of Parampara.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blessings.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[1.5rem] border border-[#c9a14a]/40 bg-[#fdf7ea]/5 p-7 backdrop-blur"
              >
                <h3 className="font-serif text-3xl text-[#c9a14a]">{moment.title}</h3>
                <div className="my-3 h-px w-12 bg-[#c9a14a]" />
                <p className="leading-7 text-[#fdf7ea]/85">{moment.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#0f5132]">Ceremonies</p>
          <h2 className="mt-3 font-serif text-5xl text-[#4b1a16] sm:text-6xl">Sacred days ahead.</h2>
        </div>
        <div className="space-y-4">
          {ceremonies.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-5 rounded-[1.5rem] border border-[#c9a14a]/30 bg-white p-6 shadow-[0_12px_40px_rgba(15,81,50,0.08)] md:grid-cols-[auto_1fr_auto]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f5132] text-[#c9a14a]">
                <Sun size={22} />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#0f5132]">{event.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[#5a3238]">{event.detail}</p>
              </div>
              <p className="rounded-full bg-[#0f5132] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fdf7ea]">
                {event.time}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#fdf2e0] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-[#0f5132]">Album</p>
          <h2 className="mt-3 text-center font-serif text-5xl text-[#4b1a16] sm:text-6xl">Memories in gold.</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="overflow-hidden rounded-[1.25rem] ring-1 ring-[#c9a14a]/30"
                style={{ aspectRatio: index === 0 ? "3/4" : "1/1" }}
              >
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${src})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609925265061-7d5a6b1b9dab?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#0f5132]/80" />
        <div className="relative mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-[#c9a14a]/40 bg-[#fdf7ea]/10 p-10 text-[#fdf7ea] backdrop-blur-md md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#c9a14a]">Temple</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Sri Kapaleeshwarar Kalyana Mandapam</h2>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.32em]">
              <MapPin size={14} /> Mylapore, Chennai
            </p>
            <p className="mt-5 leading-7 text-[#fdf7ea]/85">
              A heritage hall wrapped in jasmine strings, copper lamps and the soft rhythm of nadaswaram.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Kapaleeshwarar+Temple+Mylapore+Chennai"
            target="_blank"
            rel="noreferrer"
            className="self-end rounded-full bg-[#c9a14a] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#0f5132] shadow-xl transition hover:-translate-y-0.5"
          >
            Open in Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#0f5132]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl text-[#4b1a16] sm:text-6xl">Kindly grace our muhurtham.</h2>
        </div>
        <RSVPForm accent="#0f5132" bg="#fdf7ea" text="#4b1a16" cardBg="#ffffff" buttonLabel="Send RSVP" successMessage="Your blessings have been received with gratitude." />
      </section>

      <section className="bg-[#0f5132] px-5 py-20 text-center text-[#fdf7ea] sm:px-8">
        <Flower className="mx-auto mb-5 text-[#c9a14a]" size={26} />
        <h2 className="font-serif text-4xl sm:text-5xl">Nandri. Thank you for being part of our beginning.</h2>
      </section>

      <WhatsAppButton
        label="Message Us"
        message="Hi%2C%20I%20loved%20the%20South%20Indian%20Temple%20invite%20and%20would%20like%20one%20for%20my%20wedding."
        bg="#0f5132"
        color="#fdf7ea"
      />
    </main>
  );
}
