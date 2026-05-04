import type { Metadata } from "next";
import PalaceHeirloomInvite from "./PalaceHeirloomInvite";

export const metadata: Metadata = {
  title: "Palace Heirloom · Signature — Maharani Padmini & Prince Vikram",
  description:
    "A gallery-grade bespoke wedding invitation — hand-illustrated Mughal motifs, real gold leaf textures, cinematic parallax storytelling. By The Digital Inviters.",
  openGraph: {
    title: "Palace Heirloom · Signature Collection",
    description: "An invitation worthy of royalty. Bespoke design by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=90",
    ],
  },
};

export default function Page() {
  return <PalaceHeirloomInvite />;
}
