import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import sonsBallad from "@/assets/sound/sons-ballad.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type SelectedItem = {
  to: string;
  image?: string;
  category: string;
  title: string;
  year: string;
  render?: () => JSX.Element;
};

const SelectedSlider = ({ items }: { items: SelectedItem[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const active = items[current];

  return (
    <div>
      <div className="relative bg-paper-soft">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {items.map((p) => (
              <CarouselItem key={p.title}>
                <Link to={p.to} className="block group overflow-hidden">
                  {p.render ? (
                    p.render()
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="w-full aspect-[4/5] md:aspect-[16/10] object-cover opacity-90 transition-all duration-[1200ms] ease-out group-hover:opacity-100 group-hover:scale-[1.015]"
                    />
                  )}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 h-10 w-10 rounded-full border-foreground/20 bg-paper/80 hover:bg-paper" />
          <CarouselNext className="right-4 top-1/2 h-10 w-10 rounded-full border-foreground/20 bg-paper/80 hover:bg-paper" />
        </Carousel>
      </div>

      <div className="mt-8 flex items-start justify-between gap-6">
        <div>
          <div className="eyebrow text-muted-foreground">{active.category}</div>
          <Link
            to={active.to}
            className="font-display italic font-light text-2xl md:text-3xl mt-2 inline-block hover:opacity-60 transition-opacity"
          >
            {active.title}
          </Link>
        </div>
        <div className="flex items-center gap-4 shrink-0 pt-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-light">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-light">{active.year}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-px flex-1 transition-colors duration-500 ${
              current === i ? "bg-foreground" : "bg-foreground/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const featured = projects[0];

  const selected = [
    {
      to: "/work",
      image: sonsBallad,
      category: "Sound Engineering",
      title: "Self-pressed vinyl, mixed & mastered in-house",
      year: projects[1].year,
    },
    {
      to: "/work",
      image: projects[2].image,
      category: "Editorial",
      title: "Cassona Magazine",
      year: projects[2].year,
    },
    {
      to: "/work#typography",
      category: "Typography",
      title: "Full Access to Text Options",
      year: projects[3].year,
      render: () => (
        <div className="w-full aspect-[4/5] md:aspect-[16/10] bg-paper-soft border border-foreground/10 flex flex-col">
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-light">
            <span>Display Serif</span>
            <span>Aa Bb Cc · 0—9</span>
          </div>
          <div className="flex-1 flex items-center justify-center px-6 md:px-10">
            <span
              className="text-center leading-none italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 11vw, 9rem)",
              }}
            >
              Quiet Confidence
            </span>
          </div>
          <div className="flex items-end justify-between px-6 md:px-10 pb-6 md:pb-8 border-t border-foreground/10 pt-4">
            <div>
              <div className="eyebrow text-muted-foreground">Typeface</div>
              <div className="text-xl md:text-2xl mt-1 italic font-display font-light">
                Cormorant Garamond
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
              + 7 more
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Meta header strip */}
      <div className="border-b border-foreground/10">
        <div className="container flex flex-col md:flex-row justify-between gap-2 py-5 text-[10px] tracking-[0.3em] uppercase font-light text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-ink-soft" />
            Issue N°07 — Spring 2026
          </div>
          <div className="hidden md:block opacity-70">A Graphic Design Portfolio</div>
          <div>Ghana · 5.55° N</div>
        </div>
      </div>

      {/* Hero — full viewport, centered cinematic */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="display text-[18vw] md:text-[12vw] leading-[0.88] tracking-[-0.03em]">
            Form, function
            <br />
            <span className="text-ink-soft">&amp; Design.</span>
          </h1>
          <div className="mt-14 flex justify-center">
            <div className="w-px h-24 bg-ink-soft/50" />
          </div>
        </div>
      </section>

      {/* Intro — narrative */}
      <section className="container py-32 md:py-48 grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-3 pt-3">
          <p className="eyebrow text-muted-foreground">The Narrative</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="display text-3xl md:text-6xl leading-[1.15] mb-14 max-w-4xl">
            I&apos;m Jedidiah Ingram, an independent graphic designer crafting
            brand identities, editorial systems and print objects with a quiet,
            considered hand.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
            <div>
              <p className="eyebrow text-muted-foreground mb-4">Currently</p>
              <p className="text-base md:text-lg leading-relaxed font-light text-foreground/80">
                Open to two new projects from June 2026. Recent collaborations
                with Centre Pompidou, A24 and Mast Brothers.
              </p>
            </div>
            <div className="flex items-end">
              <Link
                to="/work"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-light border-b border-foreground/40 pb-2 hover:border-foreground transition-colors"
              >
                View the Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured project — cinematic full-bleed */}
      <section className="px-4 md:px-8">
        <div className="flex items-baseline justify-between mb-8 px-2">
          <span className="eyebrow text-muted-foreground">Featured · 001</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">
            {featured.year}
          </span>
        </div>
        <Link
          to="/work"
          className="block group relative overflow-hidden bg-paper-soft"
        >
          <img
            src={featured.image}
            alt={featured.title}
            width={1920}
            height={820}
            className="w-full aspect-[21/9] object-cover opacity-90 transition-all duration-[2000ms] ease-out group-hover:opacity-100 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink/10 via-transparent to-ink/30">
            <div className="text-center text-paper px-6">
              <p className="eyebrow opacity-90 mb-5">{featured.category}</p>
              <h3 className="display text-4xl md:text-7xl">{featured.title}</h3>
            </div>
          </div>
        </Link>
        <p className="mt-6 px-2 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-light">
          {featured.blurb}
        </p>
      </section>

      {/* Selected work */}
      <section className="container pt-40 pb-24">
        <div className="flex items-end justify-between mb-14">
          <h3 className="display text-4xl md:text-6xl">Selected work.</h3>
          <Link
            to="/work"
            className="text-[10px] tracking-[0.3em] uppercase font-light border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
          >
            Browse Archive →
          </Link>
        </div>
        <SelectedSlider items={selected} />
      </section>

      {/* Editorial pull-quote */}
      <section className="bg-paper-soft/40 py-32 md:py-48">
        <div className="container text-center max-w-4xl">
          <p className="display text-3xl md:text-5xl leading-[1.25]">
            &ldquo;Instead of saying no to everything, try to say{" "}
            <span className="text-ink-soft">yes</span> and figure out how.&rdquo;
          </p>
          <div className="flex flex-col items-center gap-6 mt-14">
            <div className="w-px h-12 bg-ink-soft" />
            <p className="eyebrow text-muted-foreground">— Bjarke Ingels</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
