import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";

export type Brand = {
  id: string;
  name: string;
  headline: string;
  subtext: string;
  year: string;
  images: string[];
};

export type FontSpecimen = {
  id: string;
  name: string;
  classification: string;
  sample: string;
  fontFamily: string;
  weight?: number;
  italic?: boolean;
};

// Branding — 4 brands × 4 images each
export const brandingBrands: Brand[] = [
  {
    id: "danna-bakes",
    name: "Danna Bakes",
    headline: "A pastel romance for a Parisian pâtisserie.",
    subtext:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Identity, packaging and a tiny grammar of icons for an artisan bakery in the 11ème.",
    year: "2025",
    images: [work1, work2, work3, work4],
  },
  {
    id: "modern-pages",
    name: "Modern Pages",
    headline: "Editorial elegance for an independent publisher.",
    subtext:
      "Lorem ipsum dolor sit amet. A serif-led wordmark, stationery system and a two-color print language for Modern Pages, Lyon.",
    year: "2024",
    images: [work2, work3, work4, work5],
  },
  {
    id: "bdove",
    name: "B/Dove Apothecary",
    headline: "Quiet skincare, stripped to its essentials.",
    subtext:
      "Lorem ipsum dolor sit amet. Monogram, label system and unboxing ritual for a Marais-based apothecary.",
    year: "2025",
    images: [work3, work4, work5, work1],
  },
  {
    id: "atelier-noir",
    name: "Galerie Saint-Paul",
    headline: "An exhibition identity that breathes.",
    subtext:
      "Lorem ipsum dolor sit amet. Yearly identity, signage and risograph posters for a contemporary art gallery.",
    year: "2023",
    images: [work4, work5, work1, work2],
  },
];

// Editorial — 2 brands × 2 images each
export const editorialBrands: Brand[] = [
  {
    id: "cassona",
    name: "Cassona Magazine",
    headline: "Slow architecture, on uncoated cream stock.",
    subtext:
      "Lorem ipsum dolor sit amet. Quarterly editorial system, typographic grid and cover art-direction.",
    year: "2024",
    images: [work3, work2],
  },
  {
    id: "modern-pages-editorial",
    name: "Modern Pages — Issue 04",
    headline: "A reading object that wants to be held.",
    subtext:
      "Lorem ipsum dolor sit amet. Long-form editorial design and bespoke drop caps for a 144-page issue.",
    year: "2025",
    images: [work2, work4],
  },
];

// Packaging — 4 brands × 4 images each
export const packagingBrands: Brand[] = [
  {
    id: "bdove-pkg",
    name: "B/Dove Apothecary",
    headline: "Refillable glass, debossed paper, soft labels.",
    subtext:
      "Lorem ipsum dolor sit amet. A primary, secondary and shipper system for a 12-SKU skincare line.",
    year: "2025",
    images: [work5, work1, work2, work3],
  },
  {
    id: "danna-pkg",
    name: "Danna Bakes",
    headline: "Boxes, bags and a pastel sticker grammar.",
    subtext:
      "Lorem ipsum dolor sit amet. Take-away packaging that feels like a small gift before you open it.",
    year: "2025",
    images: [work1, work3, work4, work5],
  },
  {
    id: "mast-co",
    name: "Mast & Co. Coffee",
    headline: "Specialty coffee in a confident wrapper.",
    subtext:
      "Lorem ipsum dolor sit amet. A single-origin bag system with rotating typographic covers.",
    year: "2024",
    images: [work4, work2, work5, work1],
  },
  {
    id: "noir-tea",
    name: "Maison Noir Tea",
    headline: "Tins, sachets and a hand-set wordmark.",
    subtext:
      "Lorem ipsum dolor sit amet. A quiet packaging family for a small-batch French tea house.",
    year: "2023",
    images: [work3, work5, work2, work4],
  },
];

// Typography — slider of fonts available to the client
export const fontSpecimens: FontSpecimen[] = [
  {
    id: "outfit",
    name: "Outfit",
    classification: "Geometric Sans · Variable",
    sample: "Brand Bull",
    fontFamily: "'Outfit', sans-serif",
    weight: 700,
  },
  {
    id: "playfair",
    name: "Playfair Display",
    classification: "Modern Serif · Display",
    sample: "Editorial",
    fontFamily: "'Playfair Display', serif",
    weight: 700,
  },
  {
    id: "instrument-serif",
    name: "Instrument Serif",
    classification: "Transitional Serif",
    sample: "Quiet Confidence",
    fontFamily: "'Instrument Serif', serif",
    weight: 400,
    italic: true,
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    classification: "Neo-grotesque",
    sample: "Form & Function",
    fontFamily: "'Space Grotesk', sans-serif",
    weight: 500,
  },
  {
    id: "dm-serif",
    name: "DM Serif Display",
    classification: "Display Serif",
    sample: "Maison",
    fontFamily: "'DM Serif Display', serif",
    weight: 400,
  },
  {
    id: "syne",
    name: "Syne",
    classification: "Contemporary · Display",
    sample: "Brand New",
    fontFamily: "'Syne', sans-serif",
    weight: 700,
  },
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    classification: "Garalde Serif",
    sample: "Atelier",
    fontFamily: "'Cormorant Garamond', serif",
    weight: 500,
    italic: true,
  },
  {
    id: "jetbrains",
    name: "JetBrains Mono",
    classification: "Monospace",
    sample: "01 / Studio",
    fontFamily: "'JetBrains Mono', monospace",
    weight: 500,
  },
];
