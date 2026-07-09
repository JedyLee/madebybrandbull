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

  const staticPost: StaticPost | undefined = !dbPost && slug ? getPostBySlug(slug) : undefined;

  if (!dbPost && !staticPost) {
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

  const view = dbPost
    ? {
        title: dbPost.title,
        dek: dbPost.dek,
        category: dbPost.category,
        date: dbPost.published_date,
        readingTime: dbPost.reading_time,
        cover: dbPost.cover_url,
        author: dbPost.author,
        sections: dbPost.sections,
      }
    : {
        title: staticPost!.title,
        dek: staticPost!.dek,
        category: staticPost!.category,
        date: staticPost!.date,
        readingTime: staticPost!.readingTime,
        cover: staticPost!.cover,
        author: staticPost!.author,
        sections: staticPost!.body.map<Section>((t, i) => ({ id: String(i), type: "paragraph", text: t })),
      };

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="container pt-12 md:pt-16 pb-10">
        <Link to="/journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Journal
        </Link>
        <div className="mt-10 max-w-4xl">
          <div className="eyebrow text-muted-foreground flex items-center gap-3 flex-wrap">
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
          <h1 className="display-bold text-5xl md:text-8xl mt-6 leading-[0.9]">{view.title}</h1>
          {view.dek && <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">{view.dek}</p>}
        </div>
      </section>

      {view.cover && (
        <section className="container">
          <div className="bg-paper-soft overflow-hidden">
            <img src={view.cover} alt={view.title} className="w-full aspect-[16/9] object-cover" />
          </div>
        </section>
      )}

      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28 space-y-4">
              <div><div className="eyebrow text-muted-foreground">Author</div><div className="mt-2 text-sm">{view.author}</div></div>
              <div><div className="eyebrow text-muted-foreground">Filed in</div><div className="mt-2 text-sm">{view.category}</div></div>
            </div>
          </aside>
          <div className="md:col-span-8 md:col-start-5 space-y-6 max-w-2xl">
            {view.sections.map((s, i) => (
              <SectionBlock key={s.id ?? i} s={s} isFirst={i === 0 && s.type === "paragraph"} />
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container border-t border-foreground/15 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="display-bold text-3xl md:text-5xl">Keep reading.</h2>
            <Link to="/journal" className="text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1">All stories</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {related.map((r) => (
              <Link key={r.slug} to={`/journal/${r.slug}`} className="group block">
                <div className="overflow-hidden bg-paper-soft">
                  <img src={r.cover} alt={r.title} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="eyebrow text-muted-foreground mt-5">{r.category} · {formatDate(r.date)}</div>
                <h3 className="display-bold text-2xl md:text-3xl mt-3 leading-tight group-hover:opacity-70 transition-opacity">{r.title}</h3>
                <span className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.2em]">
                  Read story <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPostPage;
