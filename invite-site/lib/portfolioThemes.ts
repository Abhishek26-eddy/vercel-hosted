export type PortfolioTheme = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  couple: string;
  location: string;
  palette: string[];
  image: string;
  accent: string;
  background: string;
};

export const BRAND = {
  name: "The Digital Inviters",
  tagline: "Premium digital wedding invitations crafted for modern celebrations",
  whatsappNumber: "917240345334",
  whatsappBase:
    "https://wa.me/917240345334?text=Hi%20The%20Digital%20Inviters%2C%20I%20liked%20the%20",
};

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  // ─────────────────────────────────────────────────────────────
  // INTERNATIONAL DESTINATION THEMES (Premium)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "paris-romance",
    name: "Paris Romance",
    tagline: "Eiffel Tower dreams. Champagne kisses.",
    shortDescription:
      "A dreamy Parisian wedding invitation with French elegance, champagne blush tones, and cinematic romance under the City of Lights.",
    couple: "Amélie & Étienne",
    location: "Paris, France",
    palette: ["#faf8f5", "#e8d4d0", "#c9a87c", "#2c2420"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    accent: "#d4a574",
    background: "#faf8f5",
  },
  {
    slug: "santorini-sunset",
    name: "Santorini Sunset",
    tagline: "Where the Aegean meets forever.",
    shortDescription:
      "A breathtaking Greek island invitation with whitewashed domes, Aegean blues, and Mediterranean sunsets over the caldera.",
    couple: "Elena & Nikos",
    location: "Santorini, Greece",
    palette: ["#ffffff", "#4a90a4", "#1e3a5f", "#d4a574"],
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    accent: "#d4a574",
    background: "#ffffff",
  },
  {
    slug: "tuscany-vineyard",
    name: "Tuscany Vineyard",
    tagline: "Amore under the Tuscan sun.",
    shortDescription:
      "A romantic Italian countryside invitation with rolling hills, olive groves, terracotta warmth, and rustic vineyard elegance.",
    couple: "Isabella & Marco",
    location: "Tuscany, Italy",
    palette: ["#faf6f1", "#c67b5c", "#6b7c5a", "#722f37"],
    image:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=85",
    accent: "#c67b5c",
    background: "#faf6f1",
  },
  // ─────────────────────────────────────────────────────────────
  // INDIAN THEMES
  // ─────────────────────────────────────────────────────────────
  {
    slug: "roses-luxury",
    name: "Roses Luxury",
    tagline: "Rose. Ivory. Cinematic love.",
    shortDescription:
      "A cinematic floral invite with champagne gold typography and floating petals for a romantic, editorial feel.",
    couple: "Meera & Aarav",
    location: "Udaipur, Rajasthan",
    palette: ["#fff6f1", "#f2c8c1", "#c9a14a", "#4b1629"],
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    accent: "#c9a14a",
    background: "#fff6f1",
  },
  {
    slug: "royal-palace",
    name: "Royal Palace",
    tagline: "Maroon, gold and a thousand lamps.",
    shortDescription:
      "An opulent Rajasthani palace invite with regal crests, mehendi, sangeet, wedding and reception events.",
    couple: "Ananya & Veer",
    location: "Jaipur, Rajasthan",
    palette: ["#fdf4e3", "#c9a14a", "#7a1f2b", "#2a0a12"],
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85",
    accent: "#c9a14a",
    background: "#fdf4e3",
  },
  {
    slug: "minimal-elegant",
    name: "Minimal Elegant",
    tagline: "Quiet luxury. Clean lines.",
    shortDescription:
      "An editorial black and ivory invite with confident typography and subtle motion for modern couples.",
    couple: "Isha & Arjun",
    location: "Mumbai",
    palette: ["#ffffff", "#efece6", "#b79862", "#111111"],
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    accent: "#b79862",
    background: "#f7f6f2",
  },
  {
    slug: "south-indian-temple",
    name: "Monsoon Romance",
    tagline: "Rain-kissed love. Fresh beginnings.",
    shortDescription:
      "A poetic monsoon wedding invite with lush greens, gentle rain motifs, and fresh romantic energy.",
    couple: "Priya & Rohan",
    location: "Coorg, Karnataka",
    palette: ["#f5f9f4", "#3d5a3d", "#7ba17b", "#2c3e2c"],
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85",
    accent: "#5a8f5a",
    background: "#f5f9f4",
  },
];
