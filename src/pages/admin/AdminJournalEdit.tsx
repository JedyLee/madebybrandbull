import { useEffect, useState, ChangeEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Save, ArrowUp, ArrowDown, Type, Image as ImageIcon, Grid3x3, Quote } from "lucide-react";

export type Section =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "image"; url: string; caption?: string }
  | { id: string; type: "gallery"; images: string[] }
  | { id: string; type: "quote"; text: string; attribution?: string };

type Post = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  published_date: string;
  reading_time: string;
  cover_url: string;
  author: string;
  sections: Section[];
  is_published: boolean;
};

const uid = () => Math.random().toString(36).slice(2, 10);

const AdminJournalEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from("journal_posts").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error || !data) {
        toast({ title: "Not found", variant: "destructive" });
        navigate("/admin/journal");
        return;
      }
      const sections = Array.isArray(data.sections) ? (data.sections as Section[]) : [];
      setPost({ ...(data as any), sections, dek: data.dek ?? "", reading_time: data.reading_time ?? "", cover_url: data.cover_url ?? "" });
    });
  }, [id, navigate]);

  const update = (patch: Partial<Post>) => setPost((p) => (p ? { ...p, ...patch } : p));

  const save = async () => {
    if (!post) return;
    setSaving(true);
    const { error } = await supabase
      .from("journal_posts")
      .update({
        slug: post.slug,
        title: post.title,
        dek: post.dek,
        category: post.category,
        published_date: post.published_date,
        reading_time: post.reading_time,
        cover_url: post.cover_url,
        author: post.author,
        sections: post.sections as any,
        is_published: post.is_published,
      })
      .eq("id", post.id);
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Saved." });
  };

  const addSection = (type: Section["type"]) => {
    if (!post) return;
    let s: Section;
    if (type === "paragraph") s = { id: uid(), type, text: "" };
    else if (type === "image") s = { id: uid(), type, url: "", caption: "" };
    else if (type === "gallery") s = { id: uid(), type, images: [] };
    else s = { id: uid(), type, text: "", attribution: "" };
    update({ sections: [...post.sections, s] });
  };

  const updateSection = (sid: string, patch: Partial<Section>) => {
    if (!post) return;
    update({
      sections: post.sections.map((s) => (s.id === sid ? ({ ...s, ...patch } as Section) : s)),
    });
  };

  const removeSection = (sid: string) => {
    if (!post) return;
    update({ sections: post.sections.filter((s) => s.id !== sid) });
  };

  const move = (idx: number, dir: -1 | 1) => {
    if (!post) return;
    const next = [...post.sections];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    update({ sections: next });
  };

  const uploadSectionImage = async (sid: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(sid);
    try {
      const url = await uploadImage(file, `journal/${post?.id ?? "misc"}`);
      updateSection(sid, { url } as any);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
      e.target.value = "";
    }
  };

  const uploadGallery = async (sid: string, currentImages: string[], e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(sid);
    try {
      const urls: string[] = [];
      for (const f of files) urls.push(await uploadImage(f, `journal/${post?.id ?? "misc"}`));
      updateSection(sid, { images: [...currentImages, ...urls] } as any);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
      e.target.value = "";
    }
  };

  const uploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("cover");
    try {
      const url = await uploadImage(file, `journal/${post?.id ?? "misc"}`);
      update({ cover_url: url });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
      e.target.value = "";
    }
  };

  if (!post) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link to="/admin/journal" className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:text-coral">
          <ArrowLeft className="h-4 w-4" /> All stories
        </Link>
        <div className="flex gap-2 items-center">
          <label className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={post.is_published}
              onChange={(e) => update({ is_published: e.target.checked })}
            />
            Published
          </label>
          {post.is_published && (
            <Link to={`/journal/${post.slug}`} target="_blank" className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral">
              View live
            </Link>
          )}
          <button onClick={save} disabled={saving} className="btn-coral">
            <Save className="h-4 w-4 mr-2" /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="border border-foreground/15 p-5 md:p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="eyebrow block mb-2">Title</label>
            <input value={post.title} onChange={(e) => update({ title: e.target.value })} className="w-full border border-foreground/30 bg-background px-3 py-2 text-xl" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Slug (URL)</label>
            <input value={post.slug} onChange={(e) => update({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} className="w-full border border-foreground/30 bg-background px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="eyebrow block mb-2">Dek (subtitle)</label>
          <input value={post.dek} onChange={(e) => update({ dek: e.target.value })} className="w-full border border-foreground/30 bg-background px-3 py-2" />
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <label className="eyebrow block mb-2">Category</label>
            <input value={post.category} onChange={(e) => update({ category: e.target.value })} className="w-full border border-foreground/30 bg-background px-3 py-2" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Date</label>
            <input type="date" value={post.published_date} onChange={(e) => update({ published_date: e.target.value })} className="w-full border border-foreground/30 bg-background px-3 py-2" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Reading time</label>
            <input value={post.reading_time} onChange={(e) => update({ reading_time: e.target.value })} placeholder="6 min read" className="w-full border border-foreground/30 bg-background px-3 py-2" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Author</label>
            <input value={post.author} onChange={(e) => update({ author: e.target.value })} className="w-full border border-foreground/30 bg-background px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="eyebrow block mb-2">Cover image</label>
          {post.cover_url && <img src={post.cover_url} alt="" className="w-full max-h-64 object-cover mb-2" />}
          <label className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-foreground/30 px-3 py-2 cursor-pointer hover:border-coral">
            <Plus className="h-3.5 w-3.5" /> {uploading === "cover" ? "Uploading…" : post.cover_url ? "Replace cover" : "Upload cover"}
            <input type="file" accept="image/*" hidden onChange={uploadCover} />
          </label>
        </div>
      </div>

      <div>
        <h3 className="display-bold text-2xl mb-4">Story sections</h3>
        <div className="space-y-4">
          {post.sections.map((s, idx) => (
            <div key={s.id} className="border border-foreground/15 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="eyebrow text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} · {s.type}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => move(idx, -1)} className="p-2 hover:text-coral"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => move(idx, 1)} className="p-2 hover:text-coral"><ArrowDown className="h-4 w-4" /></button>
                  <button onClick={() => removeSection(s.id)} className="p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              {s.type === "paragraph" && (
                <textarea
                  value={s.text}
                  onChange={(e) => updateSection(s.id, { text: e.target.value } as any)}
                  rows={6}
                  placeholder="Write a paragraph…"
                  className="w-full border border-foreground/30 bg-background px-3 py-2"
                />
              )}

              {s.type === "image" && (
                <div className="space-y-3">
                  {(s as any).url && <img src={(s as any).url} alt="" className="w-full max-h-96 object-cover" />}
                  <label className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-foreground/30 px-3 py-2 cursor-pointer hover:border-coral">
                    <Plus className="h-3.5 w-3.5" /> {uploading === s.id ? "Uploading…" : (s as any).url ? "Replace" : "Upload image"}
                    <input type="file" accept="image/*" hidden onChange={(e) => uploadSectionImage(s.id, e)} />
                  </label>
                  <input
                    value={(s as any).caption ?? ""}
                    onChange={(e) => updateSection(s.id, { caption: e.target.value } as any)}
                    placeholder="Caption (optional)"
                    className="w-full border border-foreground/30 bg-background px-3 py-2 text-sm"
                  />
                </div>
              )}

              {s.type === "gallery" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(s as any).images.map((url: string, j: number) => (
                      <div key={j} className="relative group">
                        <img src={url} alt="" className="w-full aspect-square object-cover" />
                        <button
                          onClick={() =>
                            updateSection(s.id, {
                              images: (s as any).images.filter((_: string, i: number) => i !== j),
                            } as any)
                          }
                          className="absolute top-1 right-1 bg-background/90 p-1 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-foreground/30 px-3 py-2 cursor-pointer hover:border-coral">
                    <Plus className="h-3.5 w-3.5" /> {uploading === s.id ? "Uploading…" : "Add images"}
                    <input type="file" accept="image/*" multiple hidden onChange={(e) => uploadGallery(s.id, (s as any).images, e)} />
                  </label>
                </div>
              )}

              {s.type === "quote" && (
                <div className="space-y-3">
                  <textarea
                    value={(s as any).text}
                    onChange={(e) => updateSection(s.id, { text: e.target.value } as any)}
                    rows={3}
                    placeholder="Pull quote text…"
                    className="w-full border border-foreground/30 bg-background px-3 py-2 text-lg"
                  />
                  <input
                    value={(s as any).attribution ?? ""}
                    onChange={(e) => updateSection(s.id, { attribution: e.target.value } as any)}
                    placeholder="Attribution (optional)"
                    className="w-full border border-foreground/30 bg-background px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => addSection("paragraph")} className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral inline-flex items-center gap-2">
            <Type className="h-3.5 w-3.5" /> Add paragraph
          </button>
          <button onClick={() => addSection("image")} className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral inline-flex items-center gap-2">
            <ImageIcon className="h-3.5 w-3.5" /> Add image
          </button>
          <button onClick={() => addSection("gallery")} className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral inline-flex items-center gap-2">
            <Grid3x3 className="h-3.5 w-3.5" /> Add gallery
          </button>
          <button onClick={() => addSection("quote")} className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-3 py-2 hover:border-coral inline-flex items-center gap-2">
            <Quote className="h-3.5 w-3.5" /> Add pull quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJournalEdit;
