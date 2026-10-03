import { MediaSlot } from "@/lib/site-media";

const timeline = [
  { y: "Senior High", h: "Teaching myself design", p: "Picked up design on my own at Presec Legon while studying IT, learning layout, type and colour by doing." },
  { y: "Branding", h: "Building identities", p: "Brand systems for Danna Bakes, Hydrasen, Esquire and more — from strategy to rollout." },
  { y: "Editorial", h: "Making magazines", p: "Art-directed and designed the first two volumes of Cassona Healthcare Quarterly." },
  { y: "Music", h: "Sound and vinyl", p: "Producing and engineering my own records, and designing the vinyl and sleeves myself." },
  { y: "Now", h: "Still learning", p: "Pairing design with coding and cybersecurity knowledge, and pushing every project a little further." },
];

const About = () => (
  <>
    <section className="container max-w-4xl pt-16 md:pt-24 text-center">
      <h1 className="text-3xl md:text-5xl leading-tight">Imagine if I never<br />Studied Design Alone</h1>
    </section>
    <section className="container max-w-5xl py-20 grid md:grid-cols-2 gap-12 items-center">
      <MediaSlot k="about_portrait" className="aspect-square" />
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">
        I'm Jedidiah Ingram, a self-taught designer from Ghana. For six years I've built brands, magazines and packaging
        for businesses that care about detail. I combine creativity with strategy, and I bring the same ear for detail
        from my music production into every visual system I make.
      </p>
    </section>
    <section className="container max-w-5xl">
      <MediaSlot k="about_wide" className="aspect-[21/9]" />
    </section>
    <section className="container max-w-3xl py-24">
      <h2 className="text-center text-2xl md:text-3xl mb-12">I am still learning</h2>
      <div className="divide-y divide-border">
        {timeline.map((t) => (
          <div key={t.h} className="grid md:grid-cols-[140px_1fr] gap-2 py-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground pt-1">{t.y}</div>
            <div>
              <h3 className="text-lg">{t.h}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default About;
