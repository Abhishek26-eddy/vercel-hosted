import type { Metadata } from "next";
import SouthIndianTempleInvite from "./SouthIndianTempleInvite";

export const metadata: Metadata = {
  title: "South Indian Temple — Nandini & Karthik · Chennai",
  description:
    "A traditional South Indian temple wedding invitation with jasmine florals, temple gold and banana leaf styling.",
  openGraph: {
    title: "South Indian Temple — Nandini & Karthik",
    description: "Traditional South Indian temple wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1609925265061-7d5a6b1b9dab?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <SouthIndianTempleInvite />;
}
