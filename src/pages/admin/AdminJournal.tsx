import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  published_date: string;
  is_published: boolean;
  updated_at: string;
};

const AdminJournal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("journal_posts")
      .select("id, slug, title, category, published_date, is_published, updated_at")
      .order("published_date", { ascending: false });
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createNew = async () => {
    const slug = `story-${Date.now()}`;
    const { data, error } = await supabase
      .from("journal_posts")
      .insert({ slug, title: "Untitled story", category: "Essay", sections: [] })
      .select()
      .single();
    if (error) return toast({ title: "Create failed", description: error.message, variant: "destructive" });
    window.location.href = `/admin/journal/${data.id}`;
  };

  const togglePublish = async (p: Post) => {
    const { error } = await supabase
      .from("journal_posts")
      .update({ is_published: !p.is_published })
      .eq("id", p.id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    load();
  };

  const del = async (p: Post) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const { error } = await supabase.from("journal_posts").delete().eq("id", p.id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="display-bold text-3xl md:text-4xl">Stories.</h2>
        <button onClick={createNew} className="btn-coral">
          <Plus className="h-4 w-4 mr-2" /> New story
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground italic">No stories yet. Click "New story" to write your first one.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="border border-foreground/15 p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-muted-foreground flex items-center gap-3">
                  <span>{p.category}</span>
                  <span className="h-px w-6 bg-foreground/30" />
                  <span>{new Date(p.published_date).toLocaleDateString("en-GB")}</span>
                  {p.is_published ? (
                    <span className="text-coral">● Published</span>
                  ) : (
                    <span className="text-muted-foreground">● Draft</span>
                  )}
                </div>
                <div className="text-xl md:text-2xl mt-2 truncate">{p.title}</div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/journal/${p.id}`}
                  className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral"
                >
                  Edit
                </Link>
                <button
                  onClick={() => togglePublish(p)}
                  className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral inline-flex items-center gap-2"
                >
                  {p.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {p.is_published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => del(p)}
                  className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-destructive hover:text-destructive inline-flex items-center gap-2"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminJournal;
