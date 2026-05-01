import type { Metadata } from "next";
import MinimalElegantInvite from "./MinimalElegantInvite";

export const metadata: Metadata = {
  title: "Minimal Elegant — Isha & Arjun · Mumbai",
  description:
    "A clean, editorial black and ivory wedding invitation with quiet luxury typography and subtle motion.",
  openGraph: {
    title: "Minimal Elegant — Isha & Arjun",
    description: "Editorial minimal luxury wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <MinimalElegantInvite />;
}
