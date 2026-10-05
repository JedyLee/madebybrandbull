import { Link } from "react-router-dom";
import { MediaSlot } from "@/lib/site-media";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClientSlider } from "@/components/ClientSlider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const faqs = [
  { q: "What do you actually offer?", a: "Brand strategy, logo and identity systems, editorial and magazine design, packaging, and guidelines — plus web design and development through my affiliate partner." },
  { q: "What's the return on investment?", a: "A clear, consistent identity earns trust faster, lets you charge with confidence, and gives every touchpoint a professional face." },
  { q: "How can you work with me?", a: "We start with a short discovery call, agree on scope and timeline, then move through strategy, design rounds and final delivery." },
  { q: "What do you charge for work?", a: "Packages start at Essential and scale to Signature and Platinum. Prices are shown in your local currency on the pricing page." },
];

const Index = () => {
  const { data: editedFaqs = [] } = useQuery({
    queryKey: ["site_faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_faqs").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
  const displayedFaqs = editedFaqs.length ? editedFaqs.map((f) => ({ q: f.question, a: f.answer })) : faqs;
  return (
  <>
    <section className="container max-w-5xl pt-10 md:pt-16">
      <div className="relative">
        <span className="font-script absolute -top-8 md:-top-14 left-0 text-6xl md:text-9xl z-10 leading-none text-background mix-blend-difference dark:mix-blend-normal dark:text-foreground">Jedidiah</span>
        <MediaSlot k="home_hero" alt="Jedidiah Ingram" className="!rounded-none aspect-[16/9] mx-auto w-[88%] grayscale" />
        <span className="font-script absolute -bottom-8 md:-bottom-14 right-0 text-6xl md:text-9xl z-10 leading-none text-background mix-blend-difference dark:mix-blend-normal dark:text-foreground">Ingram</span>
      </div>
    </section>

    <section className="container py-24 md:py-32 text-center">
      <h1 className="font-heavy text-3xl sm:text-5xl md:text-7xl tracking-[0.35em] leading-tight">
        GET IN TUNE<br />WITH DETAIL
      </h1>
    </section>

    <ClientSlider dark />

    <section className="container max-w-5xl py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
      <MediaSlot k="home_portrait" alt="Portrait" className="aspect-[4/5] grayscale" />
      <div>
        <h2 className="text-2xl md:text-3xl leading-snug">I'm Jedidiah<br />I've done this for 6 years</h2>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-justify">
          I taught myself design in Senior High School even though I was doing an IT related course in Presec Legon.
          I have strong coding and cybersecurity knowledge, and yet my passion and dedication on this site will be to my
          design portfolio and music production — branding, editorial, packaging, and the records I press myself.
        </p>
        <Link to="/about" className="inline-block mt-6 text-xs border-b border-foreground pb-0.5 hover:text-coral hover:border-coral">More about me</Link>
      </div>
    </section>

    <section className="container max-w-3xl pb-24">
      <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
      <h2 className="text-center text-2xl md:text-3xl mt-2 mb-10">Before you book</h2>
      <Accordion type="single" collapsible>
        {displayedFaqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-sm font-normal">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </>
  );
};

export default Index;
