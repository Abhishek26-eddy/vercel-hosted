import type { Metadata } from "next";
import ParisRomanceInvite from "./ParisRomanceInvite";

export const metadata: Metadata = {
  title: "Paris Romance | The Digital Inviters",
  description: "A dreamy Parisian wedding invitation with Eiffel Tower elegance, champagne blush tones, and French sophistication.",
  openGraph: {
    title: "Paris Romance | The Digital Inviters",
    description: "Eiffel Tower elegance meets champagne dreams.",
    images: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"],
  },
};

export default function Page() {
  return <ParisRomanceInvite />;
}
