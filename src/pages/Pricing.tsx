import { Link } from "react-router-dom";
import { Check, Sparkles, Gem, Crown } from "lucide-react";
import { useCurrency, type CurrencyCode } from "@/hooks/use-currency";

// Per-currency prices (no conversion math — exact figures per region).
type PriceMap = Partial<Record<CurrencyCode, number>>;

const tiers: Array<{
  name: string;
  prices: PriceMap | null;
  cadence: string;
  summary: string;
  items: string[];
  timeline: string;
  featured?: boolean;
}> = [
  {
    name: "Essential",
    prices: { EUR: 540, USD: 500, GBP: 535, CHF: 495, GHS: 500 },
    cadence: "starting at",
    summary: "For founders and small studios needing a visual base.",
    items: [
      "Logotype + 2 marks",
      "Color & typography system",
      "Business card + letterhead",
      "3 rounds of revision",
    ],
    timeline: "1 week",
  },
  {
    name: "Studio",
    prices: { EUR: 1232, USD: 1200, GBP: 1235, CHF: 1202, GHS: 19000 },
    cadence: "starting at",
    summary: "A complete identity & marketing plan.",
    items: [
      "Everything in Essential",
      "Packaging content",
      "Editorial templates + custom illustration",
      "7 rounds of revision",
    ],
    timeline: "3 weeks",
    featured: true,
  },
  {
    name: "Editorial",
    prices: { EUR: 3080, USD: 3000, GBP: 3005, CHF: 3040, GHS: 48000 },
    cadence: "starting at",
    summary:
      "Magazines, books and long-form publications, art-directed end-to-end.",
    items: [
      "Concept + grid system",
      "Custom typography pairing",
      "Photo & illustration direction",
      "Full layout (up to 100 pages)",
      "Unlimited revisions within scope",
    ],
    timeline: "3 months",
  },
];

const Pricing = () => {
  const { formatPrice } = useCurrency();

  // Premium tier prices
  const signaturePrices: PriceMap = { EUR: 5002, USD: 5000, GBP: 5010, CHF: 5020, GHS: 79000 };
  const platinumPrices: PriceMap = { EUR: 10005, USD: 10015, GBP: 10014, CHF: 10005, GHS: 158000 };

  return (
    <>
      <section className="container pt-12 md:pt-20 pb-10">
        <div className="eyebrow text-muted-foreground">Engagements & rates</div>
        <h1 className="display-bold text-6xl md:text-[9rem] mt-4 leading-[0.85]">
          Pricing.
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
          Clear, fixed scopes. No subscriptions, no retainers. Every project
          begins with a free 30-minute call to make sure we&apos;re a good fit.
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground tracking-wide">
          Prices shown in your local currency.
        </p>
      </section>

      <section className="container border-t border-foreground/15">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              className={`relative p-8 md:p-10 border-foreground/15 ${
                i > 0 ? "md:border-l border-t md:border-t-0" : ""
              } ${t.featured ? "bg-foreground text-background" : ""}`}
            >
              {t.featured && (
                <span className="absolute top-6 right-6 eyebrow opacity-70">
                  Most chosen
                </span>
              )}
              <div className="eyebrow opacity-70">0{i + 1}</div>
              <h2 className="display-bold text-4xl mt-4">{t.name}</h2>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="display-bold text-5xl">
                  {formatPrice(t.prices)}
                </span>
              </div>
              <div className={`text-xs mt-1 ${t.featured ? "opacity-70" : "text-muted-foreground"}`}>
                {t.cadence} · {t.timeline}
              </div>

              <p className={`mt-5 text-sm ${t.featured ? "opacity-80" : "text-muted-foreground"}`}>
                {t.summary}
              </p>

              <ul className="mt-8 space-y-3 text-sm">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-10 inline-flex items-center justify-center w-full px-5 py-3 text-sm tracking-wide border transition-colors ${
                  t.featured
                    ? "border-background hover:bg-background hover:text-foreground"
                    : "border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Start a project →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────────────────  SIGNATURE — Diamond  ───────────────────────── */}
      <section className="container pt-16">
        <article
          className="relative overflow-hidden border p-8 md:p-14"
          style={{
            borderColor: "rgba(180,220,255,0.35)",
            background:
              "linear-gradient(135deg, #0a1420 0%, #0f1f33 25%, #1a3654 50%, #0f1f33 75%, #050a12 100%)",
            boxShadow:
              "0 30px 90px -20px rgba(140,200,255,0.35), inset 0 1px 0 rgba(220,240,255,0.25)",
          }}
        >
          {/* Diamond facet shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 75% 15%, rgba(220,240,255,0.35) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(140,200,255,0.25) 0%, transparent 50%), linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
          />
          {/* Faint prism glints */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              background:
                "conic-gradient(from 210deg at 70% 30%, rgba(180,140,255,0.2), rgba(140,220,255,0.2), rgba(220,240,255,0.2), rgba(180,140,255,0.2))",
            }}
          />

          <div className="relative grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 text-[10px] tracking-[0.2em] uppercase border"
                style={{
                  borderColor: "rgba(220,240,255,0.55)",
                  color: "#dceeff",
                  background: "rgba(220,240,255,0.06)",
                }}
              >
                <Gem className="h-3 w-3" />
                By invitation
              </div>

              <h2
                className="display-bold text-5xl md:text-7xl mt-6 leading-[0.9]"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #dceeff 25%, #9ec8ff 55%, #ffffff 80%, #b8d8ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 40px rgba(180,220,255,0.15)",
                }}
              >
                Signature.
              </h2>

              <p className="mt-6 text-base md:text-lg max-w-lg" style={{ color: "rgba(220,240,255,0.85)" }}>
                A bespoke engagement reserved for clients I take on personally.
                Direct collaboration with our creative director from the first
                sketch to the final rollout — strategic depth, refined craft,
                and the kind of attention only a handful of brands receive each
                year.
              </p>

              <ul className="mt-10 space-y-4 text-sm" style={{ color: "rgba(220,240,255,0.9)" }}>
                {[
                  "Dedicated creative direction + senior team",
                  "Brand strategy & market positioning",
                  "Identity, packaging, digital & spatial design",
                  "Custom typography & art direction",
                  "Launch campaigns & rollout supervision",
                  "12 months of post-launch advisory",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#dceeff" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 md:pl-8 md:border-l" style={{ borderColor: "rgba(220,240,255,0.2)" }}>
              <div className="eyebrow opacity-70" style={{ color: "#dceeff" }}>
                Investment
              </div>
              <div
                className="display-bold text-5xl md:text-6xl mt-3"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #dceeff 50%, #9ec8ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {formatPrice(signaturePrices)}
              </div>
              <div className="text-xs mt-2" style={{ color: "rgba(220,240,255,0.6)" }}>
                starting at · 6 months
              </div>

              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center w-full px-5 py-4 text-sm tracking-wide transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #dceeff 50%, #9ec8ff 100%)",
                  color: "#0a1420",
                  fontWeight: 600,
                  boxShadow: "0 10px 30px -10px rgba(140,200,255,0.7)",
                }}
              >
                Request an introduction →
              </Link>

              <p className="mt-6 text-[11px] tracking-wide" style={{ color: "rgba(220,240,255,0.55)" }}>
                Limited to four engagements per year. Subject to creative fit.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* ─────────────────────────  PLATINUM  ───────────────────────── */}
      <section className="container pt-10">
        <article
          className="relative overflow-hidden border p-8 md:p-14"
          style={{
            borderColor: "rgba(229,231,235,0.35)",
            background:
              "linear-gradient(135deg, #1a1d24 0%, #2c303a 20%, #4a505c 40%, #6b7280 55%, #4a505c 75%, #1a1d24 100%)",
            boxShadow:
              "0 30px 90px -20px rgba(229,231,235,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Brushed platinum sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 45%, transparent 55%, rgba(255,255,255,0.1) 70%, transparent 80%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(180,190,210,0.2) 0%, transparent 50%)",
            }}
          />

          <div className="relative grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 text-[10px] tracking-[0.2em] uppercase border"
                style={{
                  borderColor: "rgba(255,255,255,0.55)",
                  color: "#f5f7fa",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <Crown className="h-3 w-3" />
                Legacy partnership
              </div>

              <h2
                className="display-bold text-5xl md:text-7xl mt-6 leading-[0.9]"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e5e7eb 30%, #9ca3af 55%, #f5f7fa 80%, #d1d5db 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Platinum.
              </h2>

              <p className="mt-6 text-base md:text-lg max-w-lg" style={{ color: "rgba(245,247,250,0.88)" }}>
                A fully immersive design partnership for visionary brands
                building legacy-level impact. Platinum is not just a service —
                it&apos;s an ongoing creative alliance focused on shaping,
                scaling, and sustaining your brand across every touchpoint.
                From concept to global presence, every element is executed with
                unmatched depth, clarity, and intention.
              </p>

              <ul className="mt-10 space-y-4 text-sm" style={{ color: "rgba(245,247,250,0.9)" }}>
                {[
                  "End-to-end brand ecosystem development",
                  "Advanced strategy, research & positioning",
                  "Multi-platform design systems (global scale)",
                  "Campaign direction, media & brand storytelling",
                  "Priority access & continuous creative support",
                  "Long-term advisory & evolution planning",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#f5f7fa" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 md:pl-8 md:border-l" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <div className="eyebrow opacity-70" style={{ color: "#f5f7fa" }}>
                Investment
              </div>
              <div
                className="display-bold text-5xl md:text-6xl mt-3"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {formatPrice(platinumPrices)}
              </div>
              <div className="text-xs mt-2" style={{ color: "rgba(245,247,250,0.6)" }}>
                starting at · 1 year
              </div>

              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center w-full px-5 py-4 text-sm tracking-wide transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)",
                  color: "#1a1d24",
                  fontWeight: 600,
                  boxShadow: "0 10px 30px -10px rgba(229,231,235,0.7)",
                }}
              >
                Begin the partnership →
              </Link>

              <p className="mt-6 text-[11px] tracking-wide" style={{ color: "rgba(245,247,250,0.55)" }}>
                One engagement at a time. Strict creative & strategic alignment required.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="container pt-20 pb-8">
        <div className="grid md:grid-cols-2 gap-10 border-t border-foreground/15 pt-10">
          <div>
            <h3 className="display-bold text-3xl md:text-4xl">How it works.</h3>
          </div>
          <ol className="space-y-6 text-sm">
            {[
              ["Discovery", "A conversation about your project, goals and constraints. No pitch deck required."],
              ["Proposal", "A fixed-scope proposal with timeline, deliverables and a 50% deposit to begin."],
              ["Design", "Weekly check-ins. You&apos;ll see work as it happens, not just at milestones."],
              ["Delivery", "Final files, brand book, and a handover call. Print supervision when relevant."],
            ].map(([title, body], i) => (
              <li key={title} className="grid grid-cols-12 gap-4 border-t border-foreground/10 pt-4">
                <span className="col-span-2 eyebrow text-muted-foreground">0{i + 1}</span>
                <div className="col-span-10">
                  <div className="font-medium">{title}</div>
                  <p className="text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: body }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default Pricing;
