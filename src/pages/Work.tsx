import { useEffect, useMemo, useRef, useState } from "react";
import {
  brandingBrands,
  editorialBrands,
  packagingBrands,
  fontSpecimens,
  type Brand,
} from "@/data/brands";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const sections = [
  { id: "branding", label: "Branding" },
  { id: "editorial", label: "Editorial" },
  { id: "packaging", label: "Packaging" },
  { id: "typography", label: "Typography" },
] as const;

type SectionId = (typeof sections)[number]["id"];

type SectionOverride = { id: string; title: string; description: string };


const BrandBlock = ({ brand, index }: { brand: Brand; index: number }) => {
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

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-foreground/15 pt-10 md:pt-14">
      <header className="md:col-span-4 md:sticky md:top-28 md:self-start">
        <div className="eyebrow text-muted-foreground">
          {String(index + 1).padStart(2, "0")} · {brand.name}
        </div>
        <h3 className="display-bold text-3xl md:text-5xl mt-3 leading-[0.95]">
          {brand.headline}
        </h3>
        <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
          {brand.subtext}
        </p>
        <div className="eyebrow text-muted-foreground mt-6">{brand.year}</div>
      </header>

      <div className="md:col-span-8">
        <div className="relative bg-paper-soft">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {brand.images.map((src, i) => (
                <CarouselItem key={i}>
                  <img
                    src={src}
                    alt={`${brand.name} — image ${i + 1}`}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="w-full aspect-[4/5] object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
            <CarouselNext className="right-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
          </Carousel>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="uppercase tracking-[0.2em]">
            {String(current + 1).padStart(2, "0")} / {String(brand.images.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {brand.images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-[3px] w-8 transition-colors ${
                  current === i ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const TypographySlider = () => {
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

  const active = fontSpecimens[current];

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-foreground/15 pt-10 md:pt-14">
      <header className="md:col-span-4 md:sticky md:top-28 md:self-start">
        <div className="eyebrow text-muted-foreground">Type library · Brand Bull</div>
        <h3 className="display-bold text-3xl md:text-5xl mt-3 leading-[0.95]">
          A curated set of typefaces, ready to dress your brand.
        </h3>
        <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. From editorial
          serifs to neo-grotesque sans, slide through the fonts available to
          clients of the studio.
        </p>
        <div className="eyebrow text-muted-foreground mt-6">2026</div>
      </header>

      <div className="md:col-span-8">
        <div className="relative bg-paper-soft border border-foreground/10">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {fontSpecimens.map((f) => (
                <CarouselItem key={f.id}>
                  <div className="aspect-[4/5] md:aspect-[16/11] flex flex-col">
                    <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{f.classification}</span>
                      <span>Aa Bb Cc · 0–9</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-6 md:px-10">
                      <span
                        className="text-center leading-none"
                        style={{
                          fontFamily: f.fontFamily,
                          fontWeight: f.weight ?? 400,
                          fontStyle: f.italic ? "italic" : "normal",
                          fontSize: "clamp(3rem, 11vw, 9rem)",
                        }}
                      >
                        {f.sample}
                      </span>
                    </div>
                    <div className="flex items-end justify-between px-6 md:px-10 pb-6 md:pb-8 border-t border-foreground/10 pt-4">
                      <div>
                        <div className="eyebrow text-muted-foreground">Typeface</div>
                        <div
                          className="text-xl md:text-2xl mt-1"
                          style={{ fontFamily: f.fontFamily }}
                        >
                          {f.name}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {String(current + 1).padStart(2, "0")} /{" "}
                        {String(fontSpecimens.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
            <CarouselNext className="right-4 top-1/2 h-10 w-10 rounded-none border-foreground/30 bg-paper/90 hover:bg-paper" />
          </Carousel>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {fontSpecimens.map((f, i) => (
            <button
              key={f.id}
              onClick={() => api?.scrollTo(i)}
              className={`text-xs uppercase tracking-[0.18em] px-3 py-2 border transition-colors ${
                current === i
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground/60"
              }`}
              style={{ fontFamily: f.fontFamily }}
            >
              {f.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground max-w-md">
          Currently viewing <span className="text-foreground">{active.name}</span> —{" "}
          {active.classification}.
        </p>
      </div>
    </article>
  );
};

const Work = () => {
  const [filter, setFilter] = useState<SectionId | "All">("All");
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    branding: null,
    editorial: null,
    packaging: null,
    typography: null,
  });

  const handleFilter = (id: SectionId | "All") => {
    setFilter(id);
    if (id !== "All") {
      requestAnimationFrame(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isVisible = (id: SectionId) => filter === "All" || filter === id;

  return (
    <>
      <section className="container pt-12 md:pt-20 pb-10">
        <div className="eyebrow text-muted-foreground">
          Brand Bull · Index of works · 2019—2026
        </div>
        <h1 className="display-bold text-6xl md:text-[10rem] mt-4 leading-[0.85]">
          Work.
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
          A selection of identity, editorial, packaging and type projects from
          Brand Bull. Each is developed in close collaboration with the people
          behind it.
        </p>
      </section>

      <section className="container sticky top-0 z-30 bg-background/90 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2 border-y border-foreground/15 py-4">
          {(["All", ...sections.map((s) => s.label)] as const).map((label) => {
            const id = (label === "All" ? "All" : label.toLowerCase()) as
              | SectionId
              | "All";
            const active = filter === id;
            return (
              <button
                key={label}
                onClick={() => handleFilter(id)}
                className={`text-xs uppercase tracking-[0.2em] px-3 py-2 transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground/5"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container pt-16 pb-12 space-y-20 md:space-y-28">
        {isVisible("branding") && (
          <div
            id="branding"
            ref={(el) => (sectionRefs.current.branding = el)}
            className="scroll-mt-28"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="display-bold text-4xl md:text-7xl">Branding.</h2>
              <span className="eyebrow text-muted-foreground">
                {String(brandingBrands.length).padStart(2, "0")} brands
              </span>
            </div>
            <div className="space-y-16 md:space-y-24">
              {brandingBrands.map((b, i) => (
                <BrandBlock key={b.id} brand={b} index={i} />
              ))}
            </div>
          </div>
        )}

        {isVisible("editorial") && (
          <div
            id="editorial"
            ref={(el) => (sectionRefs.current.editorial = el)}
            className="scroll-mt-28"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="display-bold text-4xl md:text-7xl">Editorial.</h2>
              <span className="eyebrow text-muted-foreground">
                {String(editorialBrands.length).padStart(2, "0")} brands
              </span>
            </div>
            <div className="space-y-16 md:space-y-24">
              {editorialBrands.map((b, i) => (
                <BrandBlock key={b.id} brand={b} index={i} />
              ))}
            </div>
          </div>
        )}

        {isVisible("packaging") && (
          <div
            id="packaging"
            ref={(el) => (sectionRefs.current.packaging = el)}
            className="scroll-mt-28"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="display-bold text-4xl md:text-7xl">Packaging.</h2>
              <span className="eyebrow text-muted-foreground">
                {String(packagingBrands.length).padStart(2, "0")} brands
              </span>
            </div>
            <div className="space-y-16 md:space-y-24">
              {packagingBrands.map((b, i) => (
                <BrandBlock key={b.id} brand={b} index={i} />
              ))}
            </div>
          </div>
        )}

        {isVisible("typography") && (
          <div
            id="typography"
            ref={(el) => (sectionRefs.current.typography = el)}
            className="scroll-mt-28"
          >
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="display-bold text-4xl md:text-7xl">Typography.</h2>
              <span className="eyebrow text-muted-foreground">
                {String(fontSpecimens.length).padStart(2, "0")} typefaces
              </span>
            </div>
            <TypographySlider />
          </div>
        )}
      </section>
    </>
  );
};

export default Work;
