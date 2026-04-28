import { useEffect, useState } from "react";

export type CurrencyCode = "EUR" | "USD" | "CHF" | "GBP" | "GHS";

type CurrencyConfig = {
  code: CurrencyCode;
  symbol: string;
  position: "prefix" | "suffix";
  locale: string;
};

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: "EUR", symbol: "€",   position: "prefix", locale: "fr-FR" },
  USD: { code: "USD", symbol: "$",   position: "prefix", locale: "en-US" },
  CHF: { code: "CHF", symbol: "₣",   position: "prefix", locale: "de-CH" },
  GBP: { code: "GBP", symbol: "£",   position: "prefix", locale: "en-GB" },
  GHS: { code: "GHS", symbol: "¢", position: "prefix", locale: "en-GH" },
};

// Map ISO country codes to our supported currencies.
const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  CH: "CHF",
  LI: "CHF",
  GB: "GBP",
  GH: "GHS",
};

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
    let cancelled = false;

    const tzGuess = detectFromTimezone();
    if (tzGuess) {
      setCurrencyState(tzGuess);
      setReady(true);
    }

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

  const config = CURRENCIES[currency];

  /**
   * Format a price object keyed by currency. Falls back to EUR if the active
   * currency isn't in the map. Non-numeric values pass through.
   */
  const formatPrice = (
    prices: Partial<Record<CurrencyCode, number>> | string | null
  ): string => {
    if (prices === null) return "On request";
    if (typeof prices === "string") return prices;

    const amount = prices[currency] ?? prices.EUR ?? 0;

    const formatted = new Intl.NumberFormat(config.locale, {
      maximumFractionDigits: 0,
    }).format(amount);

    return config.position === "prefix"
      ? `${config.symbol}${formatted}`
      : `${formatted} ${config.symbol}`;
  };

  return {
    currency,
    formatPrice,
    ready,
    symbol: config.symbol,
  };
};
