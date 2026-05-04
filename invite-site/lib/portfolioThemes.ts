export type ThemeTier = "basic" | "luxe";

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
  tier: ThemeTier;
  category: string;
  badge?: string;
};

export const BRAND = {
  name: "The Digital Inviters",
  tagline: "Boutique digital wedding invitations, crafted with love",
  whatsappNumber: "917240345334",
  whatsappBase:
    "https://wa.me/917240345334?text=Hi%20The%20Digital%20Inviters%2C%20I%20liked%20the%20",
  upiId: "abhishekprajapatiad-1@okhdfcbank",
};

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  // ─── LUXE THEMES ───
  {
    slug: "royal-palace",
    name: "Royal",
    tagline: "Timeless elegance for an unforgettable wedding.",
    shortDescription:
      "Classic composition, refined detailing, and regal warmth — an opulent Rajasthani palace invite with gold accents and rich maroon.",
    couple: "Ananya & Veer",
    location: "Jaipur, Rajasthan",
    palette: ["#fdf4e3", "#c9a14a", "#7a1f2b", "#2a0a12"],
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85",
    accent: "#c9a14a",
    background: "#fdf4e3",
    tier: "luxe",
    category: "Royal",
    badge: "Most Loved",
  },
  {
    slug: "paris-romance",
    name: "Paris Romance",
    tagline: "Eiffel Tower dreams. Champagne kisses.",
    shortDescription:
      "A dreamy Parisian invitation with French elegance, champagne blush tones, and cinematic romance under the City of Lights.",
    couple: "Amélie & Étienne",
    location: "Paris, France",
    palette: ["#faf8f5", "#e8d4d0", "#c9a87c", "#2c2420"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    accent: "#d4a574",
    background: "#faf8f5",
    tier: "luxe",
    category: "Romantic",
    badge: "Signature",
  },
  {
    slug: "tuscany-vineyard",
    name: "Tuscan Vineyard",
    tagline: "Amore under the Tuscan sun.",
    shortDescription:
      "Rolling hills, olive groves, terracotta warmth — a romantic Italian countryside invitation with rustic vineyard elegance.",
    couple: "Isabella & Marco",
    location: "Tuscany, Italy",
    palette: ["#faf6f1", "#c67b5c", "#6b7c5a", "#722f37"],
    image:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=85",
    accent: "#c67b5c",
    background: "#faf6f1",
    tier: "luxe",
    category: "Rustic",
  },
  {
    slug: "santorini-sunset",
    name: "Santorini Sunset",
    tagline: "Where the Aegean meets forever.",
    shortDescription:
      "Whitewashed domes, Aegean blues, and Mediterranean sunsets — a breathtaking coastal invitation for destination weddings.",
    couple: "Elena & Nikos",
    location: "Santorini, Greece",
    palette: ["#ffffff", "#4a90a4", "#1e3a5f", "#d4a574"],
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    accent: "#d4a574",
    background: "#ffffff",
    tier: "luxe",
    category: "Coastal",
  },
  {
    slug: "bollywood-sangeet",
    name: "Bollywood Sangeet",
    tagline: "Dramatic. Vibrant. Unforgettable.",
    shortDescription:
      "A theatrical design with bold colors, dramatic energy, and the spirit of a grand Bollywood celebration brought to life.",
    couple: "Kiara & Ranvijay",
    location: "New Delhi",
    palette: ["#1a0a2e", "#ff6b35", "#ffd700", "#e91e63"],
    image:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1200&q=85",
    accent: "#ffd700",
    background: "#1a0a2e",
    tier: "luxe",
    category: "Dramatic",
    badge: "New",
  },
  // ─── BASIC THEMES ───
  {
    slug: "roses-luxury",
    name: "Roses",
    tagline: "Hand-painted roses for a deeply romantic invitation.",
    shortDescription:
      "A cinematic floral invite with champagne gold typography and floating petals — delicate, emotional, and unforgettable.",
    couple: "Meera & Aarav",
    location: "Udaipur, Rajasthan",
    palette: ["#fff6f1", "#f2c8c1", "#c9a14a", "#4b1629"],
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    accent: "#c9a14a",
    background: "#fff6f1",
    tier: "basic",
    category: "Floral",
    badge: "Most Loved",
  },
  {
    slug: "minimal-elegant",
    name: "Editorial",
    tagline: "Quiet luxury. Clean lines. Modern confidence.",
    shortDescription:
      "Editorial typography, magazine layout and a sophisticated finish for couples who love understated design.",
    couple: "Isha & Arjun",
    location: "Mumbai",
    palette: ["#ffffff", "#efece6", "#b79862", "#111111"],
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    accent: "#b79862",
    background: "#f7f6f2",
    tier: "basic",
    category: "Editorial",
  },
  {
    slug: "south-indian-temple",
    name: "Monsoon Romance",
    tagline: "Rain-kissed love. Fresh beginnings.",
    shortDescription:
      "A poetic monsoon wedding invite with lush greens, gentle rain motifs, and the quiet beauty of nature.",
    couple: "Priya & Rohan",
    location: "Coorg, Karnataka",
    palette: ["#f5f9f4", "#3d5a3d", "#7ba17b", "#2c3e2c"],
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85",
    accent: "#5a8f5a",
    background: "#f5f9f4",
    tier: "basic",
    category: "Romantic",
  },
  {
    slug: "beach-destination",
    name: "Nautical",
    tagline: "Sun, sand, and seashells. A seaside love story.",
    shortDescription:
      "An invitation inspired by the sea — navy blue tones, seashells, and the timeless charm of a coastal celebration.",
    couple: "Alia & Zayn",
    location: "Andaman Islands",
    palette: ["#f0f4f8", "#1e3a5f", "#4a90a4", "#d4a574"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    accent: "#4a90a4",
    background: "#f0f4f8",
    tier: "basic",
    category: "Coastal",
    badge: "New",
  },
  {
    slug: "boho-sundowner",
    name: "Boho Sundowner",
    tagline: "Golden hour. Barefoot elegance. Free spirits.",
    shortDescription:
      "A warm, earthy bohemian invitation with sunset hues, dried flowers, and the carefree spirit of a Goa sundowner.",
    couple: "Rhea & Kabir",
    location: "Goa",
    palette: ["#faf5ef", "#d4956b", "#8b6b4a", "#2d1810"],
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85",
    accent: "#d4956b",
    background: "#faf5ef",
    tier: "basic",
    category: "Rustic",
  },
];
