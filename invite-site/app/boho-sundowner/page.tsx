import type { Metadata } from "next";
import BohoSundownerInvite from "./BohoSundownerInvite";

export const metadata: Metadata = {
  title: "Boho Sundowner — Rhea & Kabir · Goa",
  description:
    "A relaxed boho-beach wedding invitation with terracotta, sage and sunset tones — made for barefoot vows and Goa sunsets.",
  openGraph: {
    title: "Boho Sundowner — Rhea & Kabir",
    description: "Boho beach sundowner wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <BohoSundownerInvite />;
}
