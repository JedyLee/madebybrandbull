import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const services = [
  "Brand strategy & positioning",
  "Logo & identity systems",
  "Guidelines & rollout assets",
  "Messaging & tone-of-voice",
];

const pillars = [
  {
    n: "01",
    title: "Strategy & positioning",
    body:
      "We find the unique story of your brand so customers notice you and understand why you're different. You get a clear strategic guide for building a brand that wins loyal clients and looks professional at every step.",
    bullets: [
      { h: "Communication audit", p: "We review what has and hasn't worked, and where attention is being lost." },
      { h: "Competitor analysis", p: "We map how others position themselves so you can become the first choice." },
    ],
  },
  {
    n: "02",
    title: "Logo & identity system",
    body:
      "A coherent visual system — logo, type, color, grid — built to scale from a business card to a billboard without losing character or clarity.",
    bullets: [
      { h: "Logo & marks", p: "Primary and secondary marks engineered for any surface, size or medium." },
      { h: "Type & color", p: "A typographic voice and palette tuned to the brand's market and personality." },
    ],
  },
  {
    n: "03",
    title: "Guidelines & rollout",
    body:
      "Everything documented and ready to deploy — so any designer, printer or partner can apply the brand correctly the first time, every time.",
    bullets: [
      { h: "Brand guidelines", p: "Clear rules for type, color, layout, photography, do's and don'ts." },
      { h: "Launch assets", p: "Stationery, social templates, signage, web — the kit to ship on day one." },
    ],
  },
];

const Index = () => {
  const featured = projects[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container pt-16 md:pt-24 pb-20 md:pb-28">
          <p className="eyebrow text-coral mb-6">— Branding</p>

          <div className="relative">
            {/* Ghost duplicate */}
            <h1
              aria-hidden="true"
              className="display pixel-ghost animate-ghost text-[22vw] md:text-[16vw]"
            >
              branding
            </h1>
            {/* Live headline */}
            <h1 className="display relative text-[22vw] md:text-[16vw] text-foreground">
              branding
            </h1>

            {/* Floating decorations */}
            <span
              aria-hidden="true"
              className="hidden md:block absolute top-[8%] left-[28%] w-8 h-8 bg-teal animate-float-slow"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 60% 70%, 60% 100%, 0 100%)" }}
            />
            <span
              aria-hidden="true"
              className="hidden md:block absolute top-1/2 right-[8%] text-coral text-6xl animate-float-rev"
            >
              ➜
            </span>
            <span
              aria-hidden="true"
              className="hidden md:block absolute -bottom-2 right-[24%] w-14 h-14 animate-float-slow"
              style={{
                background:
                  "repeating-linear-gradient(90deg, hsl(var(--lemon)) 0 2px, transparent 2px 6px), repeating-linear-gradient(0deg, hsl(var(--lemon)) 0 2px, transparent 2px 6px)",
              }}
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-end max-w-5xl">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
              Branding — from strategy to a visual system that sets you apart. We
              build identities that are clear, consistent and functional: a tool
              that earns trust and gives your business a professional face.
            </p>
            <div className="md:justify-self-end">
              <Link to="/contact" className="btn-coral">
                Let&apos;s shape your brand <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Service chips */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s) => (
              <div key={s} className="chip">
                <span className="w-2.5 h-2.5 bg-teal shrink-0" />
                <span className="text-foreground/85">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO — numbered pillars */}
      <section className="border-t border-foreground/10 bg-paper-soft/40">
        <div className="container py-20 md:py-28 space-y-24">
          {pillars.map((p) => (
            <div key={p.n} className="grid grid-cols-12 gap-6 md:gap-10">
              <div className="col-span-12 md:col-span-4">
                <div className="section-number">{p.n}</div>
                <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.95]">
                  {p.title}
                </h2>
              </div>

              <div className="col-span-12 md:col-span-8">
                <p className="text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed">
                  {p.body}
                </p>

                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 mt-10">
                  {p.bullets.map((b) => (
                    <div key={b.h} className="border-t border-foreground/15 pt-5">
                      <h3 className="text-teal text-lg font-semibold tracking-tight mb-2">
                        {b.h}
                      </h3>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {b.p}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-coral mb-3">Featured · 001</p>
            <h2 className="display text-5xl md:text-7xl">selected work</h2>
          </div>
          <Link
            to="/work"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-foreground/40 pb-1 hover:text-coral hover:border-coral transition-colors"
          >
            Browse archive <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <Link to="/work" className="block group relative overflow-hidden border border-foreground/15">
          <img
            src={featured.image}
            alt={featured.title}
            width={1920}
            height={900}
            className="w-full aspect-[21/9] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between text-paper">
            <div>
              <p className="eyebrow text-coral mb-2">{featured.category}</p>
              <h3 className="display text-3xl md:text-5xl">{featured.title.toLowerCase()}</h3>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] opacity-80">
              {featured.year}
            </span>
          </div>
        </Link>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {projects.slice(1, 4).map((p) => (
            <Link
              key={p.id}
              to="/work"
              className="group border border-foreground/15 bg-paper-soft/40 overflow-hidden hover:border-coral transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-teal mb-2">{p.category}</p>
                <h3 className="font-display text-2xl lowercase leading-none">
                  {p.title.toLowerCase()}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">{p.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="border-y border-foreground/10 bg-foreground text-paper">
        <div className="container py-20 md:py-28 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="section-number" style={{ color: "hsl(var(--coral))" }}>“</div>
          </div>
          <div className="md:col-span-10">
            <p className="display text-3xl md:text-5xl leading-[1.05]">
              instead of saying no to everything, try to say{" "}
              <span className="text-coral">yes</span> — and figure out how.
            </p>
            <p className="eyebrow text-paper/60 mt-8">— Bjarke Ingels</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32 text-center">
        <p className="eyebrow text-teal mb-5">Open for two new projects · June 2026</p>
        <h2 className="display text-6xl md:text-8xl leading-[0.9]">
          let&apos;s build <span className="text-coral">something</span> sharp.
        </h2>
        <div className="mt-10 flex justify-center">
          <Link to="/contact" className="btn-coral">
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
