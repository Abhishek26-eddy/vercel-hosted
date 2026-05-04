import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Pinyon_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";

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
    "Boutique digital wedding invitations starting at ₹1,499. Choose a design, fill in your details, and share. Built-in RSVP, lifetime hosting, delivered in 24 hours.",
  keywords: [
    "digital wedding invitation",
    "digital wedding invitation India",
    "wedding invite design",
    "animated wedding card",
    "luxury wedding invitation",
    "custom wedding invite",
    "WhatsApp wedding invitation",
    "destination wedding invite",
    "Indian wedding card",
    "modern wedding invitation",
    "wedding e-invite",
    "digital shaadi card",
    "online wedding invitation",
    "wedding website India",
  ],
  authors: [{ name: "The Digital Inviters" }],
  creator: "The Digital Inviters",
  other: {
    "theme-color": "#faf9f7",
  },
  openGraph: {
    title: "The Digital Inviters — Boutique Digital Wedding Invitations",
    description:
      "Boutique digital wedding invitations starting at ₹1,499. Choose a design, customize, and share. Built-in RSVP and lifetime hosting.",
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
      "Boutique digital wedding invitations starting at ₹1,499. Choose a design, customize, and share.",
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
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
