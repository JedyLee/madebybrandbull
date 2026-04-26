## Goal
Region-lock the Pricing page so visitors only ever see prices in their auto-detected local currency. No manual switcher, no override.

## Changes

**1. `src/pages/Pricing.tsx`**
- Remove the entire currency switcher block from the header (the "Currency" eyebrow, the row of `EUR / USD / CHF / GBP / GHS` buttons, and the "Detected from your location" helper text).
- Simplify the header back to a single column — drop the `flex justify-between flex-wrap` wrapper around the title.
- Update the `useCurrency()` destructure to only pull `format` (drop `currency`, `setCurrency`, `available`).
- Remove the now-unused `CurrencyCode` import.
- Keep the small "Indicative — invoiced in EUR" note, but relocate it as a subtle line under the intro paragraph so visitors still understand the displayed price is converted.

**2. `src/hooks/use-currency.tsx`**
- Remove `localStorage` read/write — since users can no longer change currency, persisting it serves no purpose and could lock in a stale/wrong value (e.g. if a visitor was once on a VPN). Detection runs fresh on every visit.
- Keep `setCurrency` exported (harmless, unused) or trim it — I'll trim it along with `available` since nothing consumes them anymore.
- Hook continues to detect via timezone first (instant), then confirms via `ipapi.co` IP geolocation.

## Result
- 🇺🇸 USA → USD only
- 🇪🇺 Europe (default) → EUR only
- 🇬🇧 UK → GBP only
- 🇨🇭 Switzerland / Liechtenstein → CHF only
- 🇬🇭 Ghana → GHS only
- No switcher, no way to view other regions' pricing.

## Caveat to be aware of
VPN users and travelers will see the currency of their detected location (not their home country). This is unavoidable without server-side geo headers, but it's a rare edge case and the "invoiced in EUR" note covers any final billing questions.