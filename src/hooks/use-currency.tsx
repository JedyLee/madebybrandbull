import { useEffect, useState } from "react";

export type CurrencyCode = "EUR" | "USD" | "CHF" | "GBP" | "GHS";

type CurrencyConfig = {
  code: CurrencyCode;
  symbol: string;
  // Approximate conversion rate from 1 EUR (base currency of listed prices).
  // Static rates — accurate enough for indicative pricing.
  rate: number;
  // Round to nearest N to keep prices clean.
  roundTo: number;
  // Symbol placement
  position: "prefix" | "suffix";
  locale: string;
};

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: "EUR", symbol: "€",   rate: 1,      roundTo: 100,  position: "prefix", locale: "fr-FR" },
  USD: { code: "USD", symbol: "$",   rate: 1.08,   roundTo: 100,  position: "prefix", locale: "en-US" },
  CHF: { code: "CHF", symbol: "CHF", rate: 0.96,   roundTo: 100,  position: "prefix", locale: "de-CH" },
  GBP: { code: "GBP", symbol: "£",   rate: 0.85,   roundTo: 100,  position: "prefix", locale: "en-GB" },
  GHS: { code: "GHS", symbol: "GH₵", rate: 16.5,   roundTo: 1000, position: "prefix", locale: "en-GH" },
};

// Map ISO country codes to our supported currencies.
const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  CH: "CHF",
  LI: "CHF",
  GB: "GBP",
  GH: "GHS",
};

const STORAGE_KEY = "bb-currency";

const detectFromTimezone = (): CurrencyCode | null => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("America/")) return "USD";
    if (tz === "Europe/Zurich" || tz === "Europe/Vaduz") return "CHF";
    if (tz === "Europe/London") return "GBP";
    if (tz === "Africa/Accra") return "GHS";
  } catch {
    /* noop */
  }
  return null;
};

export const useCurrency = () => {
  const [currency, setCurrencyState] = useState<CurrencyCode>("EUR");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && stored in CURRENCIES) {
      setCurrencyState(stored as CurrencyCode);
      setReady(true);
      return;
    }

    let cancelled = false;

    const tzGuess = detectFromTimezone();
    if (tzGuess) {
      setCurrencyState(tzGuess);
      setReady(true);
    }

    // Confirm with IP-based geolocation (free, no key).
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const country = (data.country_code || data.country || "").toUpperCase();
        const mapped = COUNTRY_TO_CURRENCY[country] ?? "EUR";
        setCurrencyState(mapped);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    localStorage.setItem(STORAGE_KEY, code);
    setCurrencyState(code);
  };

  const config = CURRENCIES[currency];

  /**
   * Convert a EUR price into the active currency.
   * Accepts a number (EUR amount) or a string like "€2,400".
   * Returns a formatted string. Non-numeric strings (e.g. "On request") pass through.
   */
  const format = (value: number | string): string => {
    let eur: number | null = null;

    if (typeof value === "number") {
      eur = value;
    } else {
      const cleaned = value.replace(/[^\d.,]/g, "").replace(/,/g, "");
      const parsed = parseFloat(cleaned);
      if (!Number.isNaN(parsed) && parsed > 0) eur = parsed;
    }

    if (eur === null) return typeof value === "string" ? value : String(value);

    const converted = eur * config.rate;
    const rounded = Math.round(converted / config.roundTo) * config.roundTo;

    const formatted = new Intl.NumberFormat(config.locale, {
      maximumFractionDigits: 0,
    }).format(rounded);

    return config.position === "prefix"
      ? `${config.symbol}${formatted}`
      : `${formatted} ${config.symbol}`;
  };

  return {
    currency,
    setCurrency,
    format,
    ready,
    available: Object.keys(CURRENCIES) as CurrencyCode[],
    symbol: config.symbol,
  };
};
