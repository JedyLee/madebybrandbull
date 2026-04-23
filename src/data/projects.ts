import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import architectureForm from "@/assets/architecture/form-study-01.webp";

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  blurb: string;
  size?: "sm" | "md" | "lg";
};

export const projects: Project[] = [
  {
    id: "well-curated-brand",
    title: "Well Curated Brand Strategy",
    client: "Brand Bull",
    category: "Brands",
    year: "2025",
    image: work1,
    blurb: "A considered identity system built around a clear brand voice, a tight visual language, and the small details that make a brand feel inevitable.",
    size: "lg",
  },
  {
    id: "modern-pages",
    title: "Modern Pages Identity",
    client: "Modern Pages",
    category: "Branding",
    year: "2024",
    image: work2,
    blurb: "Stationery and visual identity for an independent publisher in Lyon.",
    size: "md",
  },
  {
    id: "wost-folus",
    title: "Wost Folus Magazine",
    client: "Wost Folus",
    category: "Editorial",
    year: "2024",
    image: work3,
    blurb: "Quarterly magazine on slow architecture, printed on uncoated cream stock.",
    size: "md",
  },
  {
    id: "vector-poster",
    title: "Down/Forward Poster Series",
    client: "Galerie Saint-Paul",
    category: "Print",
    year: "2023",
    image: work4,
    blurb: "Twelve risograph posters announcing a year of exhibitions.",
    size: "sm",
  },
  {
    id: "bdove",
    title: "B/Dove Apothecary",
    client: "B/Dove",
    category: "Packaging",
    year: "2025",
    image: work5,
    blurb: "Minimal packaging system for a Parisian skincare label.",
    size: "sm",
  },
];
