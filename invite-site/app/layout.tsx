import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Pinyon_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedigitalinviters.vercel.app"),
  title: {
    default: "The Digital Inviters — Boutique Digital Wedding Invitations",
    template: "%s | The Digital Inviters",
  },
  description:
    "Bespoke digital wedding invitations crafted for modern couples. Cinematic animations, personalized storytelling, and mobile-first design. From Paris to Santorini to your hometown — we create invites guests screenshot and remember.",
  keywords: [
    "digital wedding invitation",
    "wedding invite design",
    "animated wedding card",
    "luxury wedding invitation",
    "custom wedding invite",
    "WhatsApp wedding invitation",
    "destination wedding invite",
    "Indian wedding card",
    "modern wedding invitation",
  ],
  authors: [{ name: "The Digital Inviters" }],
  creator: "The Digital Inviters",
  openGraph: {
    title: "The Digital Inviters — Boutique Digital Wedding Invitations",
    description:
      "Bespoke digital wedding invitations with cinematic animations and personalized storytelling. Crafted for modern couples who want their invite to feel as special as their love story.",
    type: "website",
    url: "https://thedigitalinviters.vercel.app",
    siteName: "The Digital Inviters",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "The Digital Inviters - Premium Wedding Invitations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Digital Inviters — Boutique Digital Wedding Invitations",
    description:
      "Bespoke digital wedding invitations with cinematic animations. Crafted for modern couples.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${display.variable} ${script.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
