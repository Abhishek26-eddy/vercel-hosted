import type { Metadata } from "next";
import RosesLuxuryInvite from "./RosesLuxuryInvite";

export const metadata: Metadata = {
  title: "Roses Luxury — Meera & Aarav · Udaipur",
  description:
    "A cinematic floral wedding invitation with rose, ivory and champagne gold styling, floating petals and an elegant RSVP experience.",
  openGraph: {
    title: "Roses Luxury — Meera & Aarav",
    description: "A cinematic floral wedding invitation by The Digital Inviters.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function Page() {
  return <RosesLuxuryInvite />;
}
