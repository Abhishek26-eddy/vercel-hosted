"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  Currency, 
  Language, 
  CURRENCIES, 
  LANGUAGES, 
  translations,
  convertPrice,
  formatPrice,
  fetchExchangeRates,
  FALLBACK_RATES,
  BASE_PRICES 
} from "@/lib/i18n";

type LocaleContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  price: (priceINR: number) => string;
  prices: {
    basic: string;
    luxe: string;
    signature: string;
    basicOriginal: string;
    luxeOriginal: string;
    signatureOriginal: string;
  };
  rates: Record<string, number>;
  ratesLoading: boolean;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // INR default
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]); // English default
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Fetch live exchange rates on mount
  useEffect(() => {
    async function loadRates() {
      try {
        const liveRates = await fetchExchangeRates();
        setRates(liveRates);
      } catch (error) {
        console.warn("Using fallback rates:", error);
      } finally {
        setRatesLoading(false);
      }
    }
    loadRates();
  }, []);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedLanguage = localStorage.getItem("language");
    
    if (savedCurrency) {
      const found = CURRENCIES.find(c => c.code === savedCurrency);
      if (found) setCurrencyState(found);
    }
    
    if (savedLanguage) {
      const found = LANGUAGES.find(l => l.code === savedLanguage);
      if (found) setLanguageState(found);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c.code);
  };

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem("language", l.code);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language.code]?.[key] || translations.en[key] || key;
  };

  // Price formatting function with live rates
  const price = (priceINR: number): string => {
    const converted = convertPrice(priceINR, currency, rates);
    return formatPrice(converted, currency);
  };

  // Pre-calculated prices with live rates (3 tiers)
  const prices = {
    basic: price(BASE_PRICES.basic),
    luxe: price(BASE_PRICES.luxe),
    signature: price(BASE_PRICES.signature),
    basicOriginal: price(BASE_PRICES.basicOriginal),
    luxeOriginal: price(BASE_PRICES.luxeOriginal),
    signatureOriginal: price(BASE_PRICES.signatureOriginal),
  };

  return (
    <LocaleContext.Provider value={{ 
      currency, 
      setCurrency, 
      language, 
      setLanguage, 
      t, 
      price,
      prices,
      rates,
      ratesLoading,
    }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
