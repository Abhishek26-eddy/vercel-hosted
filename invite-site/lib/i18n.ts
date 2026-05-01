// Currency and Language configuration for global website

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  flag: string;
};

export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

// Supported currencies (rates will be fetched dynamically)
export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
];

// Fallback rates (used if API fails) - approximate rates as of 2024
export const FALLBACK_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,    // 1 INR = 0.012 USD (1 USD = ~83 INR)
  EUR: 0.011,    // 1 INR = 0.011 EUR
  GBP: 0.0095,   // 1 INR = 0.0095 GBP
  AED: 0.044,    // 1 INR = 0.044 AED
  AUD: 0.018,    // 1 INR = 0.018 AUD
  CAD: 0.016,    // 1 INR = 0.016 CAD
  SGD: 0.016,    // 1 INR = 0.016 SGD
};

// Cache for exchange rates
let cachedRates: Record<string, number> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

// Fetch live exchange rates from free API
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  // Return cached rates if still valid
  if (cachedRates && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    // Using exchangerate-api.com free tier (no API key needed for basic usage)
    // Base currency is INR
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/INR",
      { next: { revalidate: 3600 } } // Cache for 1 hour in Next.js
    );
    
    if (!response.ok) throw new Error("Failed to fetch rates");
    
    const data = await response.json();
    
    // Extract only the currencies we support
    const rates: Record<string, number> = { INR: 1 };
    for (const currency of CURRENCIES) {
      if (data.rates[currency.code]) {
        rates[currency.code] = data.rates[currency.code];
      }
    }
    
    // Update cache
    cachedRates = rates;
    cacheTimestamp = Date.now();
    
    return rates;
  } catch (error) {
    console.warn("Failed to fetch exchange rates, using fallback:", error);
    return FALLBACK_RATES;
  }
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
];

// Base prices in INR
export const BASE_PRICES = {
  essential: 7999,
  signature: 14999,
};

// Convert price from INR to target currency using dynamic rates
export function convertPrice(
  priceINR: number, 
  currency: Currency, 
  rates: Record<string, number>
): number {
  const rate = rates[currency.code] || FALLBACK_RATES[currency.code] || 1;
  const converted = priceINR * rate;
  
  // Round to nice numbers based on currency
  if (currency.code === "INR") return priceINR;
  if (currency.code === "USD" || currency.code === "EUR" || currency.code === "GBP") {
    return Math.round(converted / 5) * 5; // Round to nearest 5
  }
  return Math.round(converted);
}

// Format price with currency symbol
export function formatPrice(price: number, currency: Currency): string {
  if (currency.code === "INR") {
    return `₹${price.toLocaleString("en-IN")}`;
  }
  return `${currency.symbol}${price.toLocaleString()}`;
}

// Translations (basic - can be expanded)
export const translations: Record<string, Record<string, string>> = {
  en: {
    "hero.tagline": "An invitation as unique as your love",
    "hero.subtitle": "Bespoke digital wedding invitations, crafted with intention",
    "hero.cta": "View Collection",
    "nav.collection": "Collection",
    "nav.howItWorks": "How It Works",
    "nav.included": "What's Included",
    "nav.pricing": "Pricing",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Get Started",
    "pricing.from": "from",
    "pricing.essential": "Essential",
    "pricing.signature": "Signature",
    "footer.crafted": "Crafted with intention",
  },
  hi: {
    "hero.tagline": "आपके प्यार जितना अनोखा निमंत्रण",
    "hero.subtitle": "इरादे से तैयार किए गए डिजिटल शादी के निमंत्रण",
    "hero.cta": "संग्रह देखें",
    "nav.collection": "संग्रह",
    "nav.howItWorks": "कैसे काम करता है",
    "nav.included": "क्या शामिल है",
    "nav.pricing": "मूल्य",
    "nav.whatsapp": "व्हाट्सएप",
    "nav.getStarted": "शुरू करें",
    "pricing.from": "से",
    "pricing.essential": "एसेंशियल",
    "pricing.signature": "सिग्नेचर",
    "footer.crafted": "इरादे से तैयार",
  },
  es: {
    "hero.tagline": "Una invitación tan única como tu amor",
    "hero.subtitle": "Invitaciones de boda digitales a medida, creadas con intención",
    "hero.cta": "Ver Colección",
    "nav.collection": "Colección",
    "nav.howItWorks": "Cómo Funciona",
    "nav.included": "Qué Incluye",
    "nav.pricing": "Precios",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Comenzar",
    "pricing.from": "desde",
    "pricing.essential": "Esencial",
    "pricing.signature": "Firma",
    "footer.crafted": "Creado con intención",
  },
  fr: {
    "hero.tagline": "Une invitation aussi unique que votre amour",
    "hero.subtitle": "Invitations de mariage numériques sur mesure, créées avec intention",
    "hero.cta": "Voir la Collection",
    "nav.collection": "Collection",
    "nav.howItWorks": "Comment ça marche",
    "nav.included": "Ce qui est inclus",
    "nav.pricing": "Tarifs",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Commencer",
    "pricing.from": "à partir de",
    "pricing.essential": "Essentiel",
    "pricing.signature": "Signature",
    "footer.crafted": "Créé avec intention",
  },
  de: {
    "hero.tagline": "Eine Einladung so einzigartig wie Ihre Liebe",
    "hero.subtitle": "Maßgeschneiderte digitale Hochzeitseinladungen, mit Absicht gestaltet",
    "hero.cta": "Kollektion ansehen",
    "nav.collection": "Kollektion",
    "nav.howItWorks": "So funktioniert's",
    "nav.included": "Was enthalten ist",
    "nav.pricing": "Preise",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Loslegen",
    "pricing.from": "ab",
    "pricing.essential": "Essential",
    "pricing.signature": "Signature",
    "footer.crafted": "Mit Absicht gestaltet",
  },
  ar: {
    "hero.tagline": "دعوة فريدة مثل حبكم",
    "hero.subtitle": "دعوات زفاف رقمية مصممة بعناية",
    "hero.cta": "عرض المجموعة",
    "nav.collection": "المجموعة",
    "nav.howItWorks": "كيف يعمل",
    "nav.included": "ما يشمله",
    "nav.pricing": "الأسعار",
    "nav.whatsapp": "واتساب",
    "nav.getStarted": "ابدأ الآن",
    "pricing.from": "من",
    "pricing.essential": "أساسي",
    "pricing.signature": "مميز",
    "footer.crafted": "صُنع بعناية",
  },
};
