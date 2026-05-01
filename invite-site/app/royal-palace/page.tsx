import type { Metadata } from "next";
import RoyalPalaceInvite from "./RoyalPalaceInvite";

export const metadata: Metadata = {
  title: "Royal Palace — Ananya & Veer · Jaipur",
  description:
    "An opulent Rajasthani palace wedding invitation with maroon, antique gold and regal typography for a cinematic royal celebration.",
  openGraph: {
    title: "Royal Palace — Ananya & Veer",
    description: "Opulent Rajasthani palace wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <RoyalPalaceInvite />;
}
