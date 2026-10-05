import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";

const AdminMusic = () => {
  const qc = useQueryClient();
  const { data: tracks = [] } = useQuery({
    queryKey: ["music_tracks_admin"],
    queryFn: async () => (await supabase.from("music_tracks").select("*").order("sort_order", { ascending: false })).data ?? [],
  });
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const refresh = () => { qc.invalidateQueries({ queryKey: ["music_tracks_admin"] }); qc.invalidateQueries({ queryKey: ["music_tracks_public"] }); };

  const add = async () => {
    if (!title || !audio) return toast.error("Add a title and an audio file");
    setBusy(true);
    try {
      const audio_url = await uploadImage(audio, "music");
      const cover_url = cover ? await uploadImage(cover, "music") : null;
      const sort_order = (tracks[0]?.sort_order ?? 0) + 1;
      const { error } = await supabase.from("music_tracks").insert({ title, release_label: label || null, audio_url, cover_url, sort_order });
      if (error) throw error;
      setTitle(""); setLabel(""); setAudio(null); setCover(null);
      toast.success("Track added"); refresh();
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  const update = async (id: string, patch: { cover_url?: string; is_published?: boolean }) => { await supabase.from("music_tracks").update(patch).eq("id", id); refresh(); };
  const remove = async (id: string) => { if (confirm("Delete this track?")) { await supabase.from("music_tracks").delete().eq("id", id); refresh(); } };

  const input = "w-full border border-foreground/20 bg-transparent px-3 py-2 text-sm";
  return (
    <div className="space-y-10">
      <div className="border border-foreground/15 p-6 grid md:grid-cols-2 gap-4">
        <h2 className="md:col-span-2 text-lg">Upload a new track</h2>
        <input className={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={input} placeholder="Release date, e.g. June 2025" value={label} onChange={(e) => setLabel(e.target.value)} />
        <label className="text-sm">Audio file (mp3, wav, m4a)
          <input type="file" accept="audio/*" className="block mt-1 text-xs" onChange={(e) => setAudio(e.target.files?.[0] ?? null)} />
        </label>
        <label className="text-sm">Cover image (optional)
          <input type="file" accept="image/*" className="block mt-1 text-xs" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
        </label>
        <button onClick={add} disabled={busy} className="btn-coral justify-self-start">{busy ? "Uploading…" : "Add track"}</button>
      </div>

      <div className="divide-y divide-foreground/10">
        {tracks.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-4 py-4">
            <div className="w-12 h-12 rounded-lg bg-foreground overflow-hidden">{t.cover_url && <img src={t.cover_url} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm">{t.title}</p>
              <p className="text-xs text-muted-foreground">{t.release_label}</p>
              {t.audio_url && <audio controls src={t.audio_url} className="mt-2 h-8 w-full max-w-sm" />}
            </div>
            <label className="text-xs underline cursor-pointer">Change cover
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) update(t.id, { cover_url: await uploadImage(f, "music") }); }} />
            </label>
            <button onClick={() => update(t.id, { is_published: !t.is_published })} className="text-xs underline">{t.is_published ? "Hide" : "Publish"}</button>
            <button onClick={() => remove(t.id)} className="text-xs text-destructive underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMusic;
