import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Essential",
    price: "€2,400",
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
    price: "€6,800",
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
    price: "On request",
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
                <span className="display-bold text-5xl">{t.price}</span>
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
