import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";

const AdminMusic = () => {
  const qc = useQueryClient();
  const { data: tracks = [] } = useQuery({
    queryKey: ["music_tracks_admin"],
    queryFn: async () => (await supabase.from("music_tracks").select("*").order("sort_order", { ascending: false })).data ?? [],
  });
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [label, setLabel] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [coverBusy, setCoverBusy] = useState<string | null>(null);
  const refresh = () => { qc.invalidateQueries({ queryKey: ["music_tracks_admin"] }); qc.invalidateQueries({ queryKey: ["music_tracks_public"] }); };

  const add = async () => {
    if (!title || !audio) return toast.error("Add a title and an audio file");
    setBusy(true);
    try {
      const audio_url = await uploadImage(audio, "music");
      const cover_url = cover ? await uploadImage(cover, "music") : null;
      const sort_order = (tracks[0]?.sort_order ?? 0) + 1;
      const { error } = await supabase.from("music_tracks").insert({ title, album_title: album || null, release_label: label || null, audio_url, cover_url, sort_order });
      if (error) throw error;
      setTitle(""); setAlbum(""); setLabel(""); setAudio(null); setCover(null);
      toast.success("Track added"); refresh();
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  const update = async (id: string, patch: { is_published?: boolean }) => {
    const { error } = await supabase.from("music_tracks").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    refresh();
  };
  const changeCover = async (id: string, file: File) => {
    setCoverBusy(id);
    try {
      const selected = tracks.find((track) => track.id === id);
      if (!selected) throw new Error("Track not found");
      const cover_url = await uploadImage(file, "music");
      const ids = selected.album_title?.trim()
        ? tracks.filter((track) => track.album_title?.trim() === selected.album_title?.trim()).map((track) => track.id)
        : [id];
      const { data, error } = await supabase.from("music_tracks").update({ cover_url }).in("id", ids).select("id");
      if (error) throw error;
      if (data?.length !== ids.length) throw new Error("Cover could not be saved. Please sign in again.");
      refresh();
      toast.success(selected.album_title ? "Album cover updated" : "Cover updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cover upload failed");
    } finally { setCoverBusy(null); }
  };
  const remove = async (id: string) => { if (confirm("Delete this track?")) { await supabase.from("music_tracks").delete().eq("id", id); refresh(); } };

  const input = "w-full border border-foreground/20 bg-transparent px-3 py-2 text-sm";
  return (
    <div className="space-y-10">
      <div className="border border-foreground/15 p-6 grid md:grid-cols-2 gap-4">
        <h2 className="md:col-span-2 text-lg">Upload a new track</h2>
        <input className={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={input} placeholder="Album or single name" value={album} onChange={(e) => setAlbum(e.target.value)} />
        <input className={input} placeholder="Release date, e.g. June 2025" value={label} onChange={(e) => setLabel(e.target.value)} />
        <label className="text-sm">Audio file (mp3, wav, m4a)
          <input type="file" accept="audio/*" className="block mt-1 text-xs" onChange={(e) => setAudio(e.target.files?.[0] ?? null)} />
        </label>
        <label className="text-sm">Cover image (optional)
          <input type="file" accept="image/*" className="block mt-1 text-xs" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
        </label>
        <Button onClick={add} disabled={busy} className="justify-self-start">{busy ? "Uploading…" : "Add track"}</Button>
      </div>

      <div className="divide-y divide-foreground/10">
        {tracks.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-lg bg-transparent overflow-hidden">{t.cover_url && <img src={t.cover_url} alt={`${t.title} cover`} className="w-full h-full object-contain" />}</div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm">{t.title}</p>
              {t.album_title && <p className="text-xs">{t.album_title}</p>}
              <p className="text-xs text-muted-foreground">{t.release_label}</p>
              {t.audio_url && <audio controls src={t.audio_url} className="mt-2 h-8 w-full max-w-sm" />}
            </div>
            <label className="text-xs underline cursor-pointer">{coverBusy === t.id ? "Uploading cover…" : "Change cover"}
              <input type="file" accept="image/*" disabled={coverBusy !== null} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void changeCover(t.id, f); e.target.value = ""; }} />
            </label>
            <Button variant="ghost" size="sm" onClick={() => update(t.id, { is_published: !t.is_published })}>{t.is_published ? "Hide" : "Publish"}</Button>
            <Button variant="ghost" size="sm" onClick={() => remove(t.id)} className="text-destructive">Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMusic;
