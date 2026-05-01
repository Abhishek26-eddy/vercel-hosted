import type { Metadata } from "next";
import TuscanyVineyardInvite from "./TuscanyVineyardInvite";

export const metadata: Metadata = {
  title: "Tuscany Vineyard | The Digital Inviters",
  description: "A romantic Italian countryside wedding invitation with rolling hills, olive groves, and rustic elegance.",
  openGraph: {
    title: "Tuscany Vineyard | The Digital Inviters",
    description: "Amore under the Tuscan sun.",
    images: ["https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=85"],
  },
};

export default function Page() {
  return <TuscanyVineyardInvite />;
}
