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

// Base prices in INR (3 tiers)
export const BASE_PRICES = {
  basic: 1499,
  luxe: 3499,
  signature: 9999,
  basicOriginal: 2999,
  luxeOriginal: 5999,
  signatureOriginal: 14999,
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

// Translations - comprehensive for all page sections
export const translations: Record<string, Record<string, string>> = {
  en: {
    "hero.eyebrow": "Digital Wedding Invitations",
    "hero.title1": "An invitation",
    "hero.title2": "as unique as your love",
    "hero.subtitle": "We craft bespoke digital invitations that capture the essence of your story. Your guests will feel the thought in every detail.",
    "hero.cta": "Create your invitation",
    "hero.viewSamples": "View samples",
    "hero.stat1": "Days to deliver",
    "hero.stat2": "Plans to choose",
    "hero.stat3": "Love it or refund",
    "nav.collection": "Collection",
    "nav.howItWorks": "How It Works",
    "nav.included": "What's Included",
    "nav.pricing": "Pricing",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Get Started",
    "pricing.title": "Choose your experience.",
    "pricing.subtitle": "One-time payment. No subscriptions. No hidden charges. Lifetime hosting included in every plan.",
    "pricing.basic": "Basic",
    "pricing.luxe": "Luxe",
    "pricing.basicTag": "Everything you need, beautifully done",
    "pricing.luxeTag": "For couples who want it all",
    "pricing.mostPopular": "Most Popular",
    "pricing.getStarted": "Get Started",
    "footer.crafted": "Crafted with intention",
    "cta.mobile": "Start Your Invite",
  },
  hi: {
    "hero.eyebrow": "डिजिटल शादी के निमंत्रण",
    "hero.title1": "एक निमंत्रण",
    "hero.title2": "आपके प्यार जितना अनोखा",
    "hero.subtitle": "हम आपकी कहानी के सार को कैद करने वाले डिजिटल निमंत्रण बनाते हैं। आपके मेहमान हर विवरण में विचार महसूस करेंगे।",
    "hero.cta": "अपना निमंत्रण बनाएं",
    "hero.viewSamples": "नमूने देखें",
    "hero.stat1": "दिनों में डिलीवरी",
    "hero.stat2": "प्लान चुनें",
    "hero.stat3": "पसंद या वापसी",
    "nav.collection": "संग्रह",
    "nav.howItWorks": "कैसे काम करता है",
    "nav.included": "क्या शामिल है",
    "nav.pricing": "मूल्य",
    "nav.whatsapp": "व्हाट्सएप",
    "nav.getStarted": "शुरू करें",
    "pricing.title": "अपना अनुभव चुनें।",
    "pricing.subtitle": "एक बार भुगतान। कोई सदस्यता नहीं। कोई छिपे शुल्क नहीं। आजीवन होस्टिंग शामिल।",
    "pricing.basic": "बेसिक",
    "pricing.luxe": "लक्स",
    "pricing.basicTag": "सब कुछ सुंदर तरीके से",
    "pricing.luxeTag": "जोड़ों के लिए जो सब चाहते हैं",
    "pricing.mostPopular": "सबसे लोकप्रिय",
    "pricing.getStarted": "शुरू करें",
    "footer.crafted": "इरादे से तैयार",
    "cta.mobile": "निमंत्रण शुरू करें",
  },
  es: {
    "hero.eyebrow": "Invitaciones de Boda Digitales",
    "hero.title1": "Una invitación",
    "hero.title2": "tan única como tu amor",
    "hero.subtitle": "Creamos invitaciones digitales a medida que capturan la esencia de tu historia. Tus invitados sentirán el cuidado en cada detalle.",
    "hero.cta": "Crea tu invitación",
    "hero.viewSamples": "Ver muestras",
    "hero.stat1": "Días para perfeccionar",
    "hero.stat2": "Revisiones",
    "hero.stat3": "Te encanta o reembolso",
    "nav.collection": "Colección",
    "nav.howItWorks": "Cómo Funciona",
    "nav.included": "Qué Incluye",
    "nav.pricing": "Precios",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Comenzar",
    "pricing.title": "Elige tu experiencia.",
    "pricing.subtitle": "Pago único. Sin suscripciones. Sin cargos ocultos. Alojamiento de por vida incluido.",
    "pricing.basic": "Básico",
    "pricing.luxe": "Luxe",
    "pricing.basicTag": "Todo lo que necesitas, bellamente hecho",
    "pricing.luxeTag": "Para parejas que lo quieren todo",
    "pricing.mostPopular": "Más Popular",
    "pricing.getStarted": "Comenzar",
    "footer.crafted": "Creado con intención",
    "cta.mobile": "Comienza tu Invitación",
  },
  fr: {
    "hero.eyebrow": "Invitations de Mariage Numériques",
    "hero.title1": "Une invitation",
    "hero.title2": "aussi unique que votre amour",
    "hero.subtitle": "Nous créons des invitations numériques sur mesure qui capturent l'essence de votre histoire. Vos invités ressentiront l'attention dans chaque détail.",
    "hero.cta": "Créez votre invitation",
    "hero.viewSamples": "Voir les exemples",
    "hero.stat1": "Jours pour parfaire",
    "hero.stat2": "Révisions",
    "hero.stat3": "Satisfait ou remboursé",
    "nav.collection": "Collection",
    "nav.howItWorks": "Comment ça marche",
    "nav.included": "Ce qui est inclus",
    "nav.pricing": "Tarifs",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Commencer",
    "pricing.title": "Choisissez votre expérience.",
    "pricing.subtitle": "Paiement unique. Pas d'abonnement. Pas de frais cachés. Hébergement à vie inclus.",
    "pricing.basic": "Basique",
    "pricing.luxe": "Luxe",
    "pricing.basicTag": "Tout ce qu'il faut, magnifiquement fait",
    "pricing.luxeTag": "Pour les couples qui veulent tout",
    "pricing.mostPopular": "Plus Populaire",
    "pricing.getStarted": "Commencer",
    "footer.crafted": "Créé avec intention",
    "cta.mobile": "Commencez votre Invitation",
  },
  de: {
    "hero.eyebrow": "Digitale Hochzeitseinladungen",
    "hero.title1": "Eine Einladung",
    "hero.title2": "so einzigartig wie Ihre Liebe",
    "hero.subtitle": "Wir gestalten maßgeschneiderte digitale Einladungen, die das Wesen Ihrer Geschichte einfangen. Ihre Gäste werden die Sorgfalt in jedem Detail spüren.",
    "hero.cta": "Erstellen Sie Ihre Einladung",
    "hero.viewSamples": "Beispiele ansehen",
    "hero.stat1": "Tage bis zur Perfektion",
    "hero.stat2": "Überarbeitungen",
    "hero.stat3": "Zufrieden oder Geld zurück",
    "nav.collection": "Kollektion",
    "nav.howItWorks": "So funktioniert's",
    "nav.included": "Was enthalten ist",
    "nav.pricing": "Preise",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Loslegen",
    "pricing.title": "Wählen Sie Ihr Erlebnis.",
    "pricing.subtitle": "Einmalige Zahlung. Kein Abo. Keine versteckten Kosten. Lebenslange Hosting inklusive.",
    "pricing.basic": "Basic",
    "pricing.luxe": "Luxe",
    "pricing.basicTag": "Alles was Sie brauchen, wunderschön",
    "pricing.luxeTag": "Für Paare die alles wollen",
    "pricing.mostPopular": "Am Beliebtesten",
    "pricing.getStarted": "Loslegen",
    "footer.crafted": "Mit Absicht gestaltet",
    "cta.mobile": "Einladung starten",
  },
  ar: {
    "hero.eyebrow": "دعوات زفاف رقمية",
    "hero.title1": "دعوة",
    "hero.title2": "فريدة مثل حبكم",
    "hero.subtitle": "نصمم دعوات رقمية مخصصة تجسد جوهر قصتكم. سيشعر ضيوفكم بالاهتمام في كل تفصيل.",
    "hero.cta": "أنشئ دعوتك",
    "hero.viewSamples": "عرض النماذج",
    "hero.stat1": "أيام للإتقان",
    "hero.stat2": "مراجعات",
    "hero.stat3": "أحبها أو استرد أموالك",
    "nav.collection": "المجموعة",
    "nav.howItWorks": "كيف يعمل",
    "nav.included": "ما يشمله",
    "nav.pricing": "الأسعار",
    "nav.whatsapp": "واتساب",
    "nav.getStarted": "ابدأ الآن",
    "pricing.title": "اختر تجربتك.",
    "pricing.subtitle": "دفعة واحدة. بدون اشتراكات. بدون رسوم خفية. استضافة مدى الحياة مشمولة.",
    "pricing.basic": "أساسي",
    "pricing.luxe": "فاخر",
    "pricing.basicTag": "كل ما تحتاجه بجمال",
    "pricing.luxeTag": "للأزواج الذين يريدون كل شيء",
    "pricing.mostPopular": "الأكثر شعبية",
    "pricing.getStarted": "ابدأ الآن",
    "footer.crafted": "صُنع بعناية",
    "cta.mobile": "ابدأ دعوتك",
  },
};
