import { useMemo, useState } from "react";
import { projects } from "@/data/projects";

const categories = ["All", "Branding", "Editorial", "Typography", "Packaging", "Print"];

const Work = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <section className="container pt-12 md:pt-20 pb-10">
        <div className="eyebrow text-muted-foreground">Index of works · 2019—2026</div>
        <h1 className="display-bold text-6xl md:text-[10rem] mt-4">Work.</h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
          A selection of projects across identity, editorial, type and print.
          Each is developed in close collaboration with the people behind it.
        </p>
      </section>

      <section className="container">
        <div className="flex flex-wrap gap-2 border-y border-foreground/15 py-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs uppercase tracking-[0.2em] px-3 py-2 transition-colors ${
                filter === c
                  ? "bg-foreground text-background"
                  : "hover:bg-foreground/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {filtered.map((p, i) => {
            const span =
              p.size === "lg"
                ? "md:col-span-8"
                : p.size === "md"
                ? "md:col-span-6"
                : "md:col-span-4";
            const offset = i % 3 === 1 ? "md:mt-16" : i % 3 === 2 ? "md:mt-32" : "";
            return (
              <article key={p.id} className={`${span} ${offset} group`}>
                <div className="overflow-hidden bg-paper-soft">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-6 border-t border-foreground/15 pt-3">
                  <div>
                    <div className="eyebrow text-muted-foreground">
                      {p.category} · {p.client}
                    </div>
                    <h2 className="display-bold text-2xl md:text-3xl mt-2">
                      {p.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      {p.blurb}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {String(i + 1).padStart(2, "0")} / {p.year}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Work;
