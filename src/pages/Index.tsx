import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
                      className="w-full aspect-[4/5] md:aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  )}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
          <CarouselNext className="right-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
        </Carousel>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <div className="eyebrow text-muted-foreground">{active.category}</div>
          <Link
            to={active.to}
            className="font-medium text-lg md:text-xl mt-1 inline-block hover:underline underline-offset-4"
          >
            {active.title}
          </Link>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">{active.year}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-[3px] flex-1 transition-colors ${
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
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>Display Serif</span>
            <span>Aa Bb Cc · 0—9</span>
          </div>
          <div className="flex-1 flex items-center justify-center px-6 md:px-10">
            <span
              className="text-center leading-none"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(3rem, 11vw, 9rem)",
              }}
            >
              Quiet Confidence
            </span>
          </div>
          <div className="flex items-end justify-between px-6 md:px-10 pb-6 md:pb-8 border-t border-foreground/10 pt-4">
            <div>
              <div className="eyebrow text-muted-foreground">Typeface</div>
              <div
                className="text-xl md:text-2xl mt-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Instrument Serif
              </div>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
              + 7 more
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Hero — magazine masthead */}
      <section className="container pt-10 md:pt-16 pb-12">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>Issue N°07 — Spring 2026</span>
          <span className="hidden md:inline">A graphic design portfolio</span>
          <span>Ghana · 5.55° N</span>
        </div>
        <div className="rule mt-4" />

        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-16 items-end">
          <h1 className="display-bold col-span-12 text-[18vw] md:text-[14vw] leading-[0.82]">
            Form,<br />
            <span className="italic font-light">function</span><br />
            &amp; Design.
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-14 border-t border-foreground/15 pt-6">
          <p className="col-span-12 md:col-span-5 text-base md:text-lg leading-relaxed">
            I&apos;m <strong className="font-semibold">Jedidiah Ingram</strong>, an independent
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

        <SelectedSlider items={selected} />
      </section>

      {/* Editorial pull-quote */}
      <section className="container pt-24 pb-12">
        <div className="border-y border-foreground/15 py-12 md:py-20">
          <p className="display text-3xl md:text-6xl max-w-5xl">
            &ldquo;Instead of saying no to everything, try to say&nbsp;
            <span className="italic">yes</span> and figure out how.&rdquo;
          </p>
          <div className="eyebrow text-muted-foreground mt-8">
            — Bjarke Ingels
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
