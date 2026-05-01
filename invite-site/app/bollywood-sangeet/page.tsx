import type { Metadata } from "next";
import BollywoodSangeetInvite from "./BollywoodSangeetInvite";

export const metadata: Metadata = {
  title: "Bollywood Sangeet — Kiara & Ranvijay · New Delhi",
  description:
    "A high-energy glamorous sangeet wedding invitation with deep purples, magenta neon and golden spotlights.",
  openGraph: {
    title: "Bollywood Sangeet — Kiara & Ranvijay",
    description: "Glamorous Bollywood sangeet wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <BollywoodSangeetInvite />;
}
