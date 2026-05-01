import type { Metadata } from "next";
import SantoriniSunsetInvite from "./SantoriniSunsetInvite";

export const metadata: Metadata = {
  title: "Santorini Sunset | The Digital Inviters",
  description: "A breathtaking Greek island wedding invitation with Aegean blues, whitewashed domes, and Mediterranean elegance.",
  openGraph: {
    title: "Santorini Sunset | The Digital Inviters",
    description: "Where the Aegean meets forever.",
    images: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85"],
  },
};

export default function Page() {
  return <SantoriniSunsetInvite />;
}
