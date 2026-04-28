import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <section className="container py-32 text-center">
        <div className="eyebrow text-muted-foreground">404 · Story</div>
        <h1 className="display-bold text-5xl md:text-7xl mt-4">
          Story not found.
        </h1>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journal
        </Link>
      </section>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="container pt-12 md:pt-16 pb-10">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Journal
        </Link>

        <div className="mt-10 max-w-4xl">
          <div className="eyebrow text-muted-foreground flex items-center gap-3">
            <span>{post.category}</span>
            <span className="h-px w-8 bg-foreground/30" />
            <span>{formatDate(post.date)}</span>
            <span className="h-px w-8 bg-foreground/30" />
            <span>{post.readingTime}</span>
          </div>
          <h1 className="display-bold text-5xl md:text-8xl mt-6 leading-[0.9]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            {post.dek}
          </p>
        </div>
      </section>

      <section className="container">
        <div className="bg-paper-soft overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            width={1920}
            height={1080}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28 space-y-4">
              <div>
                <div className="eyebrow text-muted-foreground">Author</div>
                <div className="mt-2 text-sm">{post.author}</div>
              </div>
              <div>
                <div className="eyebrow text-muted-foreground">Filed in</div>
                <div className="mt-2 text-sm">{post.category}</div>
              </div>
            </div>
          </aside>

          <div className="md:col-span-8 md:col-start-5 space-y-6 max-w-2xl">
            {post.body.map((p, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-[1.65] text-foreground/90 first:first-letter:display-bold first:first-letter:text-6xl first:first-letter:float-left first:first-letter:mr-3 first:first-letter:leading-[0.85]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container border-t border-foreground/15 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="display-bold text-3xl md:text-5xl">Keep reading.</h2>
            <Link
              to="/journal"
              className="text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1"
            >
              All stories
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/journal/${r.slug}`}
                className="group block"
              >
                <div className="overflow-hidden bg-paper-soft">
                  <img
                    src={r.cover}
                    alt={r.title}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="eyebrow text-muted-foreground mt-5">
                  {r.category} · {formatDate(r.date)}
                </div>
                <h3 className="display-bold text-2xl md:text-3xl mt-3 leading-tight group-hover:opacity-70 transition-opacity">
                  {r.title}
                </h3>
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

export default BlogPost;
