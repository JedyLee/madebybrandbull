import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const Index = () => {
  const featured = projects[0];
  const rest = projects.slice(1, 5);

  return (
    <>
      {/* Hero — magazine masthead */}
      <section className="container pt-10 md:pt-16 pb-12">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>Issue N°07 — Spring 2026</span>
          <span className="hidden md:inline">A graphic design portfolio</span>
          <span>Paris · 48.85° N</span>
        </div>
        <div className="rule mt-4" />

        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-16 items-end">
          <h1 className="display-bold col-span-12 text-[18vw] md:text-[14vw] leading-[0.82]">
            Form,<br />
            <span className="italic font-light">function</span><br />
            &amp; ink.
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-14 border-t border-foreground/15 pt-6">
          <p className="col-span-12 md:col-span-5 text-base md:text-lg leading-relaxed">
            I&apos;m <strong className="font-semibold">Élise Marchand</strong>, an independent
            graphic designer crafting brand identities, editorial systems and
            print objects with a quiet, considered hand.
          </p>
          <div className="col-span-12 md:col-span-4 md:col-start-7 text-sm text-muted-foreground leading-relaxed">
            <p className="eyebrow text-foreground mb-3">Currently</p>
            Open to two new projects from June 2026. Recent collaborations with
            Centre Pompidou, A24 and Mast Brothers.
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-end gap-3">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              View Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured spread */}
      <section className="container pt-8">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow text-muted-foreground">Featured · 001</span>
          <span className="text-xs text-muted-foreground">{featured.year}</span>
        </div>
        <Link
          to="/work"
          className="block group relative overflow-hidden bg-paper-soft"
        >
          <img
            src={featured.image}
            alt={featured.title}
            width={1024}
            height={1280}
            className="w-full aspect-[4/5] md:aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 flex items-end p-6 md:p-10 bg-gradient-to-t from-ink/40 via-transparent">
            <div className="text-paper">
              <div className="eyebrow opacity-80">{featured.category}</div>
              <h2 className="display-bold text-3xl md:text-6xl mt-2">
                {featured.title}
              </h2>
            </div>
          </div>
        </Link>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {featured.blurb}
        </p>
      </section>

      {/* Magazine grid — selected works */}
      <section className="container pt-20">
        <div className="flex items-end justify-between mb-8">
          <h3 className="display-bold text-3xl md:text-5xl">Selected work.</h3>
          <Link to="/work" className="text-sm underline underline-offset-4 hover:no-underline">
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {rest.map((p, i) => (
            <Link
              key={p.id}
              to="/work"
              className={`group block ${
                i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-4"
              }`}
            >
              <div className="overflow-hidden bg-paper-soft">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <div>
                  <div className="eyebrow text-muted-foreground">{p.category}</div>
                  <div className="font-medium mt-1">{p.title}</div>
                </div>
                <span className="text-xs text-muted-foreground">{p.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial pull-quote */}
      <section className="container pt-24 pb-12">
        <div className="border-y border-foreground/15 py-12 md:py-20">
          <p className="display text-3xl md:text-6xl max-w-5xl">
            &ldquo;Design isn&apos;t loud. It&apos;s the&nbsp;
            <span className="italic">quiet confidence</span> of a thing made
            with care.&rdquo;
          </p>
          <div className="eyebrow text-muted-foreground mt-8">
            — Élise, on practice
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
