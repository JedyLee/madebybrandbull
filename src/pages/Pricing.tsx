import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { useCurrency } from "@/hooks/use-currency";

// Base prices in EUR. The active currency is detected from the visitor's location.
const tiers: Array<{
  name: string;
  priceEur: number | null; // null = "On request"
  cadence: string;
  summary: string;
  items: string[];
  timeline: string;
  featured?: boolean;
}> = [
  {
    name: "Essential",
    priceEur: 2400,
    cadence: "starting at",
    summary: "For founders and small studios needing a confident visual base.",
    items: [
      "Logotype + 2 marks",
      "Color & typography system",
      "Business card + letterhead",
      "Basic brand guidelines (PDF)",
      "2 rounds of revisions",
    ],
    timeline: "3—4 weeks",
  },
  {
    name: "Studio",
    priceEur: 6800,
    cadence: "starting at",
    summary: "A complete identity for brands ready to launch with intention.",
    items: [
      "Everything in Essential",
      "Full stationery + packaging concepts",
      "Editorial templates (print + digital)",
      "Iconography + custom illustration",
      "Brand guidelines book (40+ pages)",
      "4 rounds of revisions",
    ],
    timeline: "6—8 weeks",
    featured: true,
  },
  {
    name: "Editorial",
    priceEur: null,
    cadence: "by quote",
    summary: "Magazines, books and long-form publications, art-directed end-to-end.",
    items: [
      "Concept + grid system",
      "Custom typography pairing",
      "Photo & illustration direction",
      "Full layout (up to 200 pages)",
      "Print supervision",
      "Unlimited revisions within scope",
    ],
    timeline: "8—14 weeks",
  },
];

const Pricing = () => {
  const { format } = useCurrency();

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
          Prices shown in your local currency. Indicative — invoiced in EUR.
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
                  {t.priceEur === null ? "On request" : format(t.priceEur)}
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

      {/* Premium / Signature tier */}
      <section className="container pt-16">
        <article
          className="relative overflow-hidden border border-[#c9a84c]/40 p-8 md:p-14"
          style={{
            background:
              "linear-gradient(135deg, #1a1408 0%, #2a1f0a 25%, #4a3815 50%, #2a1f0a 75%, #0d0a05 100%)",
            boxShadow:
              "0 30px 80px -20px rgba(201,168,76,0.35), inset 0 1px 0 rgba(240,215,140,0.2)",
          }}
        >
          {/* Decorative gold shimmer overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(240,215,140,0.25) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(201,168,76,0.2) 0%, transparent 45%)",
            }}
          />

          <div className="relative grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 text-[10px] tracking-[0.2em] uppercase border"
                style={{
                  borderColor: "rgba(240,215,140,0.5)",
                  color: "#f0d78c",
                  background: "rgba(240,215,140,0.05)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                By invitation
              </div>

              <h2
                className="display-bold text-5xl md:text-7xl mt-6 leading-[0.9]"
                style={{
                  background:
                    "linear-gradient(135deg, #f5e6a8 0%, #f0d78c 30%, #c9a84c 60%, #f0d78c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Signature.
              </h2>

              <p className="mt-6 text-base md:text-lg max-w-lg" style={{ color: "rgba(245,230,168,0.85)" }}>
                A bespoke, end-to-end engagement for established brands and
                ambitious founders. Direct collaboration with our creative
                director, full strategic immersion, and unlimited scope within
                a defined timeline.
              </p>

              <ul className="mt-10 space-y-4 text-sm" style={{ color: "rgba(245,230,168,0.9)" }}>
                {[
                  "Dedicated creative director + senior team",
                  "Brand strategy & market positioning",
                  "Identity, packaging, digital & spatial design",
                  "Custom typography & art direction",
                  "Launch campaign & rollout supervision",
                  "12 months of post-launch advisory",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#f0d78c" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 md:pl-8 md:border-l" style={{ borderColor: "rgba(240,215,140,0.2)" }}>
              <div className="eyebrow opacity-70" style={{ color: "#f0d78c" }}>
                Investment
              </div>
              <div
                className="display-bold text-5xl md:text-6xl mt-3"
                style={{
                  background:
                    "linear-gradient(135deg, #f5e6a8 0%, #f0d78c 50%, #c9a84c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {format(24000)}+
              </div>
              <div className="text-xs mt-2" style={{ color: "rgba(245,230,168,0.6)" }}>
                starting at · 12—20 weeks
              </div>

              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center w-full px-5 py-4 text-sm tracking-wide transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #f0d78c 0%, #c9a84c 100%)",
                  color: "#1a1408",
                  fontWeight: 600,
                  boxShadow: "0 10px 30px -10px rgba(201,168,76,0.6)",
                }}
              >
                Request an introduction →
              </Link>

              <p className="mt-6 text-[11px] tracking-wide" style={{ color: "rgba(245,230,168,0.55)" }}>
                Limited to four engagements per year. Subject to creative fit.
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
