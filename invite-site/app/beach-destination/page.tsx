import type { Metadata } from "next";
import BeachDestinationInvite from "./BeachDestinationInvite";

export const metadata: Metadata = {
  title: "Beach Destination — Alia & Zayn · Andaman",
  description:
    "A luxury ocean destination wedding invitation with aqua, sand and pearl tones — crafted for barefoot island vows.",
  openGraph: {
    title: "Beach Destination — Alia & Zayn",
    description: "Luxury destination beach wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <BeachDestinationInvite />;
}
