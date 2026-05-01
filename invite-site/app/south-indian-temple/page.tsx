import type { Metadata } from "next";
import SouthIndianTempleInvite from "./SouthIndianTempleInvite";

export const metadata: Metadata = {
  title: "Monsoon Romance — Priya & Rohan · Coorg",
  description:
    "A poetic monsoon wedding invitation with lush greens, rain motifs, and fresh romantic energy.",
  openGraph: {
    title: "Monsoon Romance — Priya & Rohan",
    description: "Rain-kissed wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <SouthIndianTempleInvite />;
}
