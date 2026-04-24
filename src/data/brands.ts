import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import danna01 from "@/assets/brands/danna-bakes-01.webp";
import danna02 from "@/assets/brands/danna-bakes-02.webp";
import danna03 from "@/assets/brands/danna-bakes-03.webp";
import danna04 from "@/assets/brands/danna-bakes-04.webp";
import hydrasen01 from "@/assets/brands/hydrasen-01.webp";
import hydrasen02 from "@/assets/brands/hydrasen-02.webp";
import hydrasen05 from "@/assets/brands/hydrasen-05.webp";
import dannaPkg03 from "@/assets/brands/danna-bakes-pkg-03.webp";
import dannaPkg04 from "@/assets/brands/danna-bakes-pkg-04.webp";
import esquire01 from "@/assets/brands/esquire-01.webp";
import esquire02 from "@/assets/brands/esquire-02.webp";
import cassona01 from "@/assets/brands/cassona-01.webp";
import cassona02 from "@/assets/brands/cassona-02.webp";

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
    headline: "A sweet, confident identity for an artisan bakery.",
    subtext:
      "A full brand system for Danna Bakes — logo suite, packaging, social campaigns and seasonal collateral built around a bold pink palette and a playful display voice.",
    year: "2025",
    images: [danna01, danna02, danna03, danna04],
  },
  {
    id: "hydrasen",
    name: "Hydrasen",
    headline: "An identity for cleaner water, carried across oceans.",
    subtext:
      "Brand identity for Hydrasen — a shipping company dedicated to water purification and sustainable transport of refining devices. The mark draws on flowing currents and clinical clarity to express the company's mission of cleaner, accessible water worldwide.",
    year: "2024",
    images: [hydrasen01, hydrasen02, work4, work5],
  },
  {
    id: "esquire",
    name: "Esquire",
    headline: "A refined identity for a luxury apartment complex.",
    subtext:
      "Esquire is a luxury apartment complex I manage — and the brand, visuals and environmental design are mine end-to-end. Drawing on hands-on experience in real estate and property, the identity pairs a confident display serif with a tactile ornamental motif and a black-and-cream palette to signal quiet, lived-in luxury.",
    year: "2026",
    images: [esquire01, esquire02, work5, work1],
  },
  {
    id: "ghana70",
    name: "Ghana@70",
    headline: "A national identity celebrating seven decades.",
    subtext:
      "Concept identity for Ghana@70 — a commemorative system blending heritage motifs with contemporary type to mark seventy years of independence.",
    year: "2027",
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
    year: "2025 — 2026",
    images: [cassona01, cassona02],
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
    id: "danna-bakes-pkg",
    name: "Danna Bakes",
    headline: "Sweet packaging that carries the craving home.",
    subtext:
      "Packaging system for Danna Bakes — gable boxes, cupcake carriers and seasonal collateral built around a confident pink palette, playful display type and tactile patterns. Each piece is designed to make the bakery experience travel as well as the cakes do.",
    year: "2024",
    images: [danna01, danna02, dannaPkg03, dannaPkg04],
  },
  {
    id: "hydrasen-pkg",
    name: "Hydrasen",
    headline: "Shipping cartons for water-refining devices.",
    subtext:
      "Packaging system for Hydrasen — protective shipping cartons that carry water purification and refining devices to ports around the world. A gradient sky-to-sea palette signals the brand's commitment to clean, sustainable water.",
    year: "2025",
    images: [hydrasen05, work3, work4, work5],
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
