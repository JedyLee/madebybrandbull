import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";
import block57 from "@/assets/clients/block57.png";
import cassona from "@/assets/clients/cassona.png";
import pateAChoux from "@/assets/clients/pate-a-choux.png";
import fairway from "@/assets/clients/fairway.png";
import cosmo from "@/assets/clients/cosmo.png";
import neusoft from "@/assets/clients/neusoft.png";
import mindray from "@/assets/clients/mindray.png";
import fimex from "@/assets/clients/fimex.png";
import saareYaa from "@/assets/clients/saare-yaa.png";
import apmTerminals from "@/assets/clients/apm-terminals.png";

const clients = [
  { name: "Block 57 Cantonments", logo: block57 },
  { name: "Cassona Healthcare Group", logo: cassona },
  { name: "Pâte à Choux", logo: pateAChoux },
  { name: "Fairway", logo: fairway },
  { name: "Cosmo", logo: cosmo },
  { name: "Neusoft", logo: neusoft },
  { name: "Mindray", logo: mindray },
  { name: "Fimex", logo: fimex },
  { name: "Saare Yaa", logo: saareYaa },
  { name: "APM Terminals", logo: apmTerminals },
];

export const SiteFooter = () => {
  const year = new Date().getFullYear();
  const autoScroll = useRef(
    AutoScroll({ speed: 2, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", containScroll: false },
    [autoScroll.current]
  );

  return (
    <footer className="border-t border-foreground/15 mt-24">
      <div className="overflow-hidden border-y border-foreground/15 bg-paper-soft">
        <div className="container py-5 flex items-baseline justify-between">
          <span className="eyebrow text-muted-foreground">Selected Clients</span>
          <span className="text-xs text-muted-foreground">{clients.length} brands · 2024—{year}</span>
        </div>
        <div
          className="overflow-hidden border-t border-foreground/10 cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex py-10 items-center">
            {[...clients, ...clients, ...clients].map((c, i) => (
              <div
                key={`${i}-${c.name}`}
                className="px-10 md:px-16 flex items-center justify-center h-16 md:h-20 shrink-0"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  draggable={false}
                  className="max-h-full max-w-[180px] md:max-w-[220px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="display-bold text-2xl">Brand Bull</div>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Independent graphic design studio working with founders, museums and
            considered brands.
          </p>
        </div>
        <div>
          <div className="eyebrow text-muted-foreground mb-3">Pages</div>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Index</Link></li>
            <li><Link to="/work" className="hover:underline">Work</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link to="/journal" className="hover:underline">Journal</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-muted-foreground mb-3">Elsewhere</div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Are.na</a></li>
            <li><a href="#" className="hover:underline">Read.cv</a></li>
            <li><a href="mailto:hello@brandbull.studio" className="hover:underline">hello@brandbull.studio</a></li>
          </ul>
        </div>
      </div>
      <div className="container pb-8 flex flex-col md:flex-row md:justify-between gap-2 text-xs text-muted-foreground border-t border-foreground/10 pt-6">
        <span>© {year} Brand Bull. All rights reserved.</span>
        <span>Designed in Ghana · Printed on recycled paper.</span>
      </div>
    </footer>
  );
};
