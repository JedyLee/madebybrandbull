import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Section } from "@/pages/admin/AdminJournalEdit";


const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

type DbPost = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  published_date: string;
  reading_time: string;
  cover_url: string;
  author: string;
  sections: Section[];
};

const SectionBlock = ({ s, isFirst }: { s: Section; isFirst: boolean }) => {
  if (s.type === "paragraph") {
    return (
      <p className={`text-lg md:text-xl leading-[1.65] text-foreground/90 ${isFirst ? "first-letter:display-bold first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]" : ""}`}>
        {s.text}
      </p>
    );
  }
  if (s.type === "image") {
    return (
      <figure className="my-4">
        <img src={s.url} alt={s.caption ?? ""} className="w-full object-cover" />
        {s.caption && <figcaption className="eyebrow text-muted-foreground mt-3">{s.caption}</figcaption>}
      </figure>
    );
  }
  if (s.type === "gallery") {
    return (
      <div className="grid grid-cols-2 gap-3 my-4">
        {s.images.map((url, i) => (
          <img key={i} src={url} alt="" className="w-full aspect-square object-cover" />
        ))}
      </div>
    );
  }
  return (
    <blockquote className="border-l-2 border-coral pl-6 py-2 my-6">
      <p className="serif-display text-2xl md:text-4xl leading-tight">"{s.text}"</p>
      {s.attribution && <footer className="eyebrow text-muted-foreground mt-4">— {s.attribution}</footer>}
    </blockquote>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [dbPost, setDbPost] = useState<DbPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("journal_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setDbPost({
            ...(data as any),
            sections: Array.isArray(data.sections) ? (data.sections as Section[]) : [],
            dek: data.dek ?? "",
            reading_time: data.reading_time ?? "",
            cover_url: data.cover_url ?? "",
          });
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container py-20 text-muted-foreground">Loading…</div>;

  if (!dbPost) {
    return (
      <section className="container py-32 text-center">
        <div className="eyebrow text-muted-foreground">404 · Story</div>
        <h1 className="display-bold text-5xl md:text-7xl mt-4">Story not found.</h1>
        <Link to="/journal" className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Link>
      </section>
    );
  }

  const view = {
    title: dbPost.title,
    dek: dbPost.dek,
    category: dbPost.category,
    date: dbPost.published_date,
    readingTime: dbPost.reading_time,
    cover: dbPost.cover_url,
    author: dbPost.author,
    sections: dbPost.sections,
  };

  return (
    <>
      <section className="container pt-12 md:pt-16 pb-8">
        <Link to="/journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Journal
        </Link>
        <div className="mt-8 max-w-3xl mx-auto text-center">
          <div className="eyebrow text-muted-foreground flex items-center justify-center gap-3 flex-wrap">
            <span>{view.category}</span>
            <span className="h-px w-8 bg-foreground/30" />
            <span>{formatDate(view.date)}</span>
            {view.readingTime && (
              <>
                <span className="h-px w-8 bg-foreground/30" />
                <span>{view.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="display-bold text-4xl md:text-6xl mt-5 leading-[0.95]">{view.title}</h1>
          {view.dek && <p className="mt-5 text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">{view.dek}</p>}
        </div>
      </section>

      {view.cover && (
        <section className="container">
          <div className="max-w-4xl mx-auto bg-paper-soft overflow-hidden">
            <img src={view.cover} alt={view.title} className="w-full max-h-[60vh] object-cover" />
          </div>
        </section>
      )}

      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="eyebrow text-muted-foreground flex items-center gap-3">
            <span>By {view.author}</span>
            <span className="h-px w-8 bg-foreground/30" />
            <span>{view.category}</span>
          </div>
          {view.sections.map((s, i) => (
            <SectionBlock key={s.id ?? i} s={s} isFirst={i === 0 && s.type === "paragraph"} />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
