export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  cover: string;
  author: string;
  body: string[]; // paragraphs
};

// Edit / add your own posts here. Newest first.
export const blogPosts: BlogPost[] = [
  {
    slug: "why-identity-outlives-trends",
    title: "Why identity outlives trends.",
    dek: "On building brands that age like architecture, not like fashion.",
    category: "Essay",
    date: "2026-04-12",
    readingTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    author: "Jedidiah",
    body: [
      "Trends are loud. Identity is quiet. The work that lasts rarely arrives announcing itself — it earns its presence through restraint, repetition and an almost stubborn point of view.",
      "When we begin a project at the studio, we ask one question before any sketching starts: what should still feel true about this brand in ten years? The answer becomes the spine. Everything else — palette, typography, motion — is muscle around that spine.",
      "This is not nostalgia. It is patience. And patience, in design, is the rarest material there is.",
    ],
  },
  {
    slug: "the-quiet-power-of-a-wordmark",
    title: "The quiet power of a wordmark.",
    dek: "Why the most considered logos are often just words, set with intention.",
    category: "Field notes",
    date: "2026-03-28",
    readingTime: "4 min read",
    cover:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1600&q=80",
    author: "Jedidiah",
    body: [
      "A wordmark asks the typeface to do all the heavy lifting. There is nowhere to hide — no icon to lean on, no clever metaphor to distract.",
      "Done well, it becomes the brand. Think of the way certain names instantly summon a feeling before you even register what they sell. That is not luck; it is craft, kerned letter by letter.",
    ],
  },
  {
    slug: "studio-notes-spring-2026",
    title: "Studio notes — Spring 2026.",
    dek: "What we are reading, watching, and quietly working on this season.",
    category: "Studio",
    date: "2026-03-02",
    readingTime: "3 min read",
    cover:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1600&q=80",
    author: "Jedidiah",
    body: [
      "A short dispatch from the studio. New clients in Zürich and Accra, two editorial systems in production, and a typography library quietly expanding behind the scenes.",
      "We are also revisiting our approach to packaging — leaner, more tactile, with fewer layers between the object and the hand that holds it.",
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
