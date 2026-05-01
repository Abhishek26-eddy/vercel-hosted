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
    default: "The Digital Inviters — Premium Digital Wedding Invitations",
    template: "%s | The Digital Inviters",
  },
  description:
    "Premium digital wedding invitations crafted for modern celebrations. Browse cinematic themes — floral, royal, boho, minimal, Bollywood, temple and beach destination invites.",
  openGraph: {
    title: "The Digital Inviters — Premium Digital Wedding Invitations",
    description:
      "Premium digital wedding invitations crafted for modern celebrations.",
    type: "website",
    url: "https://thedigitalinviters.vercel.app",
    siteName: "The Digital Inviters",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Digital Inviters — Premium Digital Wedding Invitations",
    description:
      "Premium digital wedding invitations crafted for modern celebrations.",
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
