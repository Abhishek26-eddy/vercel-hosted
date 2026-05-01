"use client";

import { motion } from "framer-motion";
import { MapPin, Shirt, Sun, Waves } from "lucide-react";
import OpeningScreen from "@/components/portfolio/OpeningScreen";
import RSVPForm from "@/components/portfolio/RSVPForm";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";

const hero = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517093602195-b40af9688b63?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85",
];

const events = [
  { name: "Welcome Beach Bonfire", time: "15 Feb · 7 PM", place: "Ashwem Beach" },
  { name: "Haldi Brunch", time: "16 Feb · 11 AM", place: "Garden Villa" },
  { name: "Sunset Vows", time: "16 Feb · 5 PM", place: "Driftwood Mandap" },
  { name: "Boho Reception", time: "16 Feb · 8 PM", place: "Lantern Lawn" },
];

const story = [
  { title: "Two Travellers", text: "A backpacker hostel in Rishikesh. Shared chai, stolen playlists, a love map." },
  { title: "Goa, Again", text: "Every December since — one shack, two hammocks, same sun." },
  { title: "The Sunset Yes", text: "On Ashwem Beach, barefoot, salt in her hair, ring in the sand." },
];

export default function BohoSundownerInvite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbeee0] text-[#4c3a2f]">
      <OpeningScreen
        groom="Rhea"
        bride="Kabir"
        subtitle="Beach. Love. Forever."
        bg="#a85c3b"
        text="#fbeee0"
        accent="#fbeee0"
        buttonLabel="Open Invitation"
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(168,92,59,0.4)_0%,rgba(229,160,122,0.35)_45%,rgba(251,238,224,0.9)_100%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute right-10 top-20 h-60 w-60 rounded-full border border-dashed border-[#a85c3b]/40"
        />
        <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col justify-end px-5 pb-24 pt-20 sm:px-8">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-xs uppercase tracking-[0.5em] text-[#a85c3b]">
            Save the Sun
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="mt-6 font-serif text-7xl italic leading-[0.95] text-[#4c3a2f] sm:text-8xl md:text-9xl">
            Rhea
            <span className="block pl-12 text-5xl sm:text-6xl md:text-7xl">&amp; Kabir</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }} className="mt-8 max-w-xl leading-7 text-[#6b4a38]">
            Come celebrate us under the Goa sun. Sand between toes, cocktails in hand, hearts wide open.
          </motion.p>
          <div className="mt-6 flex flex-wrap gap-6 text-xs uppercase tracking-[0.35em] text-[#a85c3b]">
            <span className="flex items-center gap-2"><Sun size={14} /> 16 Feb 2027</span>
            <span className="flex items-center gap-2"><Waves size={14} /> Ashwem Beach</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Goa</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <p className="text-center text-xs uppercase tracking-[0.5em] text-[#a85c3b]">Their Story</p>
        <h2 className="mt-3 text-center font-serif text-5xl italic text-[#4c3a2f] sm:text-6xl">Salt water & second chances.</h2>
        <div className="mt-14 space-y-8">
          {story.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`max-w-xl ${index % 2 === 0 ? "" : "ml-auto text-right"}`}
            >
              <h3 className="font-serif text-3xl italic text-[#a85c3b]">{moment.title}</h3>
              <div className={`my-3 h-px w-20 bg-[#a85c3b] ${index % 2 === 0 ? "" : "ml-auto"}`} />
              <p className="leading-7 text-[#6b4a38]">{moment.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative bg-[#e5a07a]/30 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#a85c3b]">Itinerary</p>
            <h2 className="mt-3 font-serif text-5xl italic text-[#4c3a2f] sm:text-6xl">Three sunsets of celebration.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-[#a85c3b]/30 bg-[#fbeee0] p-7"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[#a85c3b]">{event.time}</p>
                <h3 className="mt-3 font-serif text-3xl text-[#4c3a2f]">{event.name}</h3>
                <p className="mt-2 text-[#6b4a38]">{event.place}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 rounded-[1.5rem] border border-dashed border-[#a85c3b]/50 bg-transparent p-6 text-center">
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-[#a85c3b]">
              <Shirt size={14} /> Dress Code
            </p>
            <p className="mt-3 font-serif text-2xl italic text-[#4c3a2f]">Boho whites, dusty pastels, barefoot friendly.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="text-center text-xs uppercase tracking-[0.5em] text-[#a85c3b]">Memories</p>
        <h2 className="mt-3 text-center font-serif text-5xl italic text-[#4c3a2f] sm:text-6xl">Some of our favourites.</h2>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="overflow-hidden rounded-[1.25rem]"
              style={{ aspectRatio: index === 0 ? "3/4" : index === 3 ? "3/4" : "1/1" }}
            >
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${src})` }} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#a85c3b] px-5 py-24 text-[#fbeee0] sm:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#fbeee0]/80">Venue</p>
            <h2 className="mt-3 font-serif text-5xl italic sm:text-6xl">Driftwood Beach Villa</h2>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em]"><MapPin size={14} /> Ashwem, North Goa</p>
            <p className="mt-5 leading-7 text-[#fbeee0]/85">
              Palms above, waves ahead, fairy lights strung through the jamun trees. Bring your slowest shoes.
            </p>
            <a
              href="https://maps.google.com/?q=Ashwem+Beach+Goa"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#fbeee0] px-7 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#a85c3b] shadow-lg transition hover:-translate-y-0.5"
            >
              Open in Maps
            </a>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[2rem] md:h-96">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${gallery[1]})` }} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#a85c3b]">RSVP</p>
          <h2 className="mt-3 font-serif text-5xl italic text-[#4c3a2f] sm:text-6xl">Meet us at the sunset?</h2>
        </div>
        <RSVPForm accent="#a85c3b" bg="#fbeee0" text="#4c3a2f" cardBg="#ffffff" buttonLabel="Yes, I'm coming" successMessage="Beach mode: ON. We'll see you in Goa." />
      </section>

      <section className="bg-[#fbeee0] px-5 py-16 text-center sm:px-8">
        <p className="text-xs uppercase tracking-[0.5em] text-[#a85c3b]">Thank You</p>
        <h2 className="mt-3 font-serif text-4xl italic text-[#4c3a2f] sm:text-5xl">Good vibes, safe travels, see you soon.</h2>
      </section>

      <WhatsAppButton
        label="Chat with Us"
        message="Hi%2C%20I%20loved%20the%20Boho%20Sundowner%20invite%20and%20would%20like%20one%20for%20my%20wedding."
        bg="#a85c3b"
        color="#fbeee0"
      />
    </main>
  );
}
