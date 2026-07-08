import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { supabase } from "@/integrations/supabase/client";

type AnyPost = { slug: string; title: string; dek: string; category: string; date: string; readingTime: string; cover: string };


const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const Blog = () => {
  const [dbPosts, setDbPosts] = useState<AnyPost[]>([]);
  useEffect(() => {
    supabase
      .from("journal_posts")
      .select("slug, title, dek, category, published_date, reading_time, cover_url")
      .eq("is_published", true)
      .order("published_date", { ascending: false })
      .then(({ data }) => {
        setDbPosts(
          (data ?? []).map((p: any) => ({
            slug: p.slug,
            title: p.title,
            dek: p.dek ?? "",
            category: p.category,
            date: p.published_date,
            readingTime: p.reading_time ?? "",
            cover: p.cover_url ?? "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1600&q=80",
          }))
        );
      });
  }, []);
  const allPosts: AnyPost[] = [...dbPosts, ...blogPosts];
  return (

    <>
      <section className="container pt-12 md:pt-20 pb-10">
        <div className="eyebrow text-muted-foreground">
          Brand Bull · Journal · Est. 2024
        </div>
        <h1 className="display-bold text-6xl md:text-[10rem] mt-4 leading-[0.85]">
          Journal.
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
          Essays, field notes and studio dispatches on identity, editorial and
          the long game of building brands that last.
        </p>
      </section>

      <section className="container border-t border-foreground/15 pt-16 pb-24 space-y-24 md:space-y-36">
        {allPosts.map((post, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={post.slug}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center"
            >
              <Link
                to={`/journal/${post.slug}`}
                className={`md:col-span-7 group block overflow-hidden bg-paper-soft ${
                  reverse ? "md:order-2" : ""
                }`}
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>

              <div
                className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}
              >
                <div className="eyebrow text-muted-foreground flex items-center gap-3">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-foreground/30" />
                  <span>{post.category}</span>
                </div>

                <Link to={`/journal/${post.slug}`} className="block group mt-5">
                  <h2 className="display-bold text-4xl md:text-6xl leading-[0.95] group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h2>
                </Link>

                <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                  {post.dek}
                </p>

                <div className="mt-8 flex items-center justify-between max-w-md">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {formatDate(post.date)} · {post.readingTime}
                  </div>
                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:gap-3 transition-all"
                  >
                    Read story
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Blog;
