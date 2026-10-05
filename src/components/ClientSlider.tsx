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

export const ClientSlider = ({ dark = false }: { dark?: boolean }) => {
  const autoScroll = useRef(AutoScroll({ speed: 1.2, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" }, [autoScroll.current]);
  return (
    <div className={`overflow-hidden ${dark ? "bg-foreground text-background" : "bg-paper-soft text-foreground"}`} aria-label="Selected clients">
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex items-center py-10 md:py-14">
          {[...clients, ...clients].map((client, index) => (
            <div key={`${client.name}-${index}`} className="shrink-0 w-40 md:w-56 h-16 md:h-20 px-7 flex items-center justify-center">
              <img src={client.logo} alt={client.name} loading="lazy" draggable={false} className={`max-h-full max-w-full object-contain pointer-events-none select-none ${dark ? "invert brightness-200 dark:invert-0 dark:brightness-100" : "dark:invert dark:brightness-200"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};