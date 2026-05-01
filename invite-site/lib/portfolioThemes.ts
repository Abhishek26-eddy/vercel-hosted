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
    slug: "boho-sundowner",
    name: "Boho Sundowner",
    tagline: "Terracotta skies, barefoot vows.",
    shortDescription:
      "A laid-back boho-beach invite with sunset gradients, dried florals and relaxed Goa energy.",
    couple: "Rhea & Kabir",
    location: "Goa",
    palette: ["#fbeee0", "#e5a07a", "#a85c3b", "#556052"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    accent: "#c96a4b",
    background: "#fbeee0",
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
    slug: "bollywood-sangeet",
    name: "Bollywood Sangeet",
    tagline: "Lights. Music. Shaadi.",
    shortDescription:
      "A glamorous high-energy invite made for sangeet nights, with spotlights, magenta neon and disco sparkle.",
    couple: "Kiara & Ranvijay",
    location: "New Delhi",
    palette: ["#1b0b2a", "#5d2a9a", "#e91e63", "#f5c542"],
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
    accent: "#f5c542",
    background: "#1b0b2a",
  },
  {
    slug: "south-indian-temple",
    name: "South Indian Temple",
    tagline: "Jasmine, gold and sacred vows.",
    shortDescription:
      "A traditional South Indian temple invite with banana leaf motifs, jasmine detail and deep emerald tones.",
    couple: "Nandini & Karthik",
    location: "Chennai, Tamil Nadu",
    palette: ["#fdf7ea", "#c9a14a", "#0f5132", "#4b1a16"],
    image:
      "https://images.unsplash.com/photo-1609925265061-7d5a6b1b9dab?auto=format&fit=crop&w=1200&q=85",
    accent: "#c9a14a",
    background: "#fdf7ea",
  },
  {
    slug: "beach-destination",
    name: "Beach Destination",
    tagline: "Ocean vows. Pearl skies.",
    shortDescription:
      "A luxury destination invite with aqua gradients, pearl-white typography and full travel itinerary.",
    couple: "Alia & Zayn",
    location: "Havelock Island, Andaman",
    palette: ["#eaf7f8", "#bfe2e3", "#2b8a9b", "#f3e6c4"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    accent: "#2b8a9b",
    background: "#eaf7f8",
  },
];
