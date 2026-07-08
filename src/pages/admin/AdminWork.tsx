import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";
import { toast } from "@/hooks/use-toast";
import { X, Plus, Trash2, Save } from "lucide-react";

type Section = { id: string; title: string; description: string };
type Brand = {
  id?: string;
  category: string;
  name: string;
  headline: string;
  subtext: string;
  year: string;
  images: string[];
  sort_order: number;
};

const CATEGORIES = [
  { id: "branding", label: "Branding" },
  { id: "editorial", label: "Editorial" },
  { id: "packaging", label: "Packaging" },
  { id: "typography", label: "Typography" },
];

const AdminWork = () => {
  const [sections, setSections] = useState<Record<string, Section>>({});
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [{ data: secs }, { data: brs }] = await Promise.all([
      supabase.from("work_sections").select("*"),
      supabase.from("work_brands").select("*").order("category").order("sort_order"),
    ]);
    const secMap: Record<string, Section> = {};
    CATEGORIES.forEach((c) => {
      const found = secs?.find((s) => s.id === c.id);
      secMap[c.id] = { id: c.id, title: found?.title ?? "", description: found?.description ?? "" };
    });
    setSections(secMap);
    setBrands((brs as Brand[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const saveSection = async (id: string) => {
    const s = sections[id];
    const { error } = await supabase.from("work_sections").upsert({
      id,
      title: s.title,
      description: s.description,
    });
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Section text saved." });
  };

  const addBrand = (category: string) => {
    setBrands((b) => [
      ...b,
      { category, name: "", headline: "", subtext: "", year: "", images: [], sort_order: b.length },
    ]);
  };

  const updateBrand = (idx: number, patch: Partial<Brand>) => {
    setBrands((b) => b.map((br, i) => (i === idx ? { ...br, ...patch } : br)));
  };

  const saveBrand = async (idx: number) => {
    const b = brands[idx];
    if (!b.name || !b.headline) {
      toast({ title: "Name and headline required.", variant: "destructive" });
      return;
    }
    const payload = {
      category: b.category,
      name: b.name,
      headline: b.headline,
      subtext: b.subtext,
      year: b.year,
      images: b.images,
      sort_order: b.sort_order,
    };
    if (b.id) {
      const { error } = await supabase.from("work_brands").update(payload).eq("id", b.id);
      if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      const { data, error } = await supabase.from("work_brands").insert(payload).select().single();
      if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
      updateBrand(idx, { id: data.id });
    }
    toast({ title: "Brand saved." });
  };

  const deleteBrand = async (idx: number) => {
    const b = brands[idx];
    if (!confirm(`Delete "${b.name}"?`)) return;
    if (b.id) {
      const { error } = await supabase.from("work_brands").delete().eq("id", b.id);
      if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
    setBrands((arr) => arr.filter((_, i) => i !== idx));
    toast({ title: "Deleted." });
  };

  const uploadForBrand = async (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(`brand-${idx}`);
    try {
      const urls: string[] = [];
      for (const f of files) urls.push(await uploadImage(f, `work/${brands[idx].category}`));
      updateBrand(idx, { images: [...brands[idx].images, ...urls] });
      toast({ title: `Uploaded ${urls.length} image(s).` });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
      e.target.value = "";
    }
  };

  const removeImage = (idx: number, imgIdx: number) => {
    updateBrand(idx, { images: brands[idx].images.filter((_, i) => i !== imgIdx) });
  };

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-16">
      {CATEGORIES.map((cat) => {
        const catBrands = brands.map((b, i) => ({ b, i })).filter(({ b }) => b.category === cat.id);
        const sec = sections[cat.id];
        return (
          <section key={cat.id} className="border border-foreground/15 p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="display-bold text-3xl md:text-4xl">{cat.label}.</h2>
              <button onClick={() => addBrand(cat.id)} className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-foreground/30 px-3 py-2 hover:border-coral">
                <Plus className="h-3.5 w-3.5" /> Add brand
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="eyebrow block mb-2">Section title override</label>
                <input
                  value={sec.title}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, [cat.id]: { ...sec, title: e.target.value } }))
                  }
                  placeholder={`${cat.label}.`}
                  className="w-full border border-foreground/30 bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="eyebrow block mb-2">Section description</label>
                <input
                  value={sec.description}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, [cat.id]: { ...sec, description: e.target.value } }))
                  }
                  placeholder="Optional intro line"
                  className="w-full border border-foreground/30 bg-background px-3 py-2"
                />
              </div>
              <button onClick={() => saveSection(cat.id)} className="btn-coral self-start">
                <Save className="h-4 w-4 mr-2" /> Save section text
              </button>
            </div>

            <div className="space-y-6">
              {catBrands.length === 0 && (
                <p className="text-muted-foreground text-sm italic">No custom brands added to this category yet.</p>
              )}
              {catBrands.map(({ b, i }) => (
                <div key={b.id ?? i} className="border border-foreground/15 p-5 space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <input
                      value={b.name}
                      onChange={(e) => updateBrand(i, { name: e.target.value })}
                      placeholder="Brand name"
                      className="border border-foreground/30 bg-background px-3 py-2"
                    />
                    <input
                      value={b.year}
                      onChange={(e) => updateBrand(i, { year: e.target.value })}
                      placeholder="Year (2025)"
                      className="border border-foreground/30 bg-background px-3 py-2"
                    />
                    <input
                      type="number"
                      value={b.sort_order}
                      onChange={(e) => updateBrand(i, { sort_order: Number(e.target.value) })}
                      placeholder="Sort"
                      className="border border-foreground/30 bg-background px-3 py-2"
                    />
                  </div>
                  <input
                    value={b.headline}
                    onChange={(e) => updateBrand(i, { headline: e.target.value })}
                    placeholder="Headline"
                    className="w-full border border-foreground/30 bg-background px-3 py-2"
                  />
                  <textarea
                    value={b.subtext}
                    onChange={(e) => updateBrand(i, { subtext: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    className="w-full border border-foreground/30 bg-background px-3 py-2"
                  />
                  <div>
                    <div className="eyebrow mb-2">Images ({b.images.length})</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                      {b.images.map((url, j) => (
                        <div key={j} className="relative group">
                          <img src={url} alt="" className="w-full aspect-square object-cover" />
                          <button
                            onClick={() => removeImage(i, j)}
                            className="absolute top-1 right-1 bg-background/90 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-foreground/30 px-3 py-2 cursor-pointer hover:border-coral">
                      <Plus className="h-3.5 w-3.5" />
                      {uploading === `brand-${i}` ? "Uploading…" : "Upload images"}
                      <input type="file" accept="image/*" multiple hidden onChange={(e) => uploadForBrand(i, e)} />
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-foreground/10">
                    <button onClick={() => saveBrand(i)} className="btn-coral">
                      <Save className="h-4 w-4 mr-2" /> Save
                    </button>
                    <button
                      onClick={() => deleteBrand(i)}
                      className="text-xs uppercase tracking-[0.2em] border border-foreground/30 px-4 py-2 hover:border-destructive hover:text-destructive inline-flex items-center gap-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AdminWork;
