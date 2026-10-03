import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";
import { MEDIA_SLOTS, useSiteMedia } from "@/lib/site-media";

const AdminMedia = () => {
  const { data = {} } = useSiteMedia();
  const qc = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);

  const upload = async (key: string, file?: File) => {
    if (!file) return;
    setBusy(key);
    try {
      const url = await uploadImage(file, "site");
      const { error } = await supabase.from("site_media").upsert({ key, url, updated_at: new Date().toISOString() });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["site_media"] });
      toast.success("Image updated");
    } catch (e: any) { toast.error(e.message); } finally { setBusy(null); }
  };
  const clear = async (key: string) => {
    await supabase.from("site_media").delete().eq("key", key);
    qc.invalidateQueries({ queryKey: ["site_media"] });
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MEDIA_SLOTS.map((s) => (
        <div key={s.key} className="border border-foreground/15 p-4">
          <div className="aspect-video rounded-xl bg-foreground overflow-hidden">
            {data[s.key] && <img src={data[s.key]} alt="" className="w-full h-full object-cover" />}
          </div>
          <p className="mt-3 text-sm">{s.label}</p>
          <div className="mt-3 flex gap-3 text-xs">
            <label className="cursor-pointer underline">
              {busy === s.key ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => upload(s.key, e.target.files?.[0])} />
            </label>
            {data[s.key] && <button onClick={() => clear(s.key)} className="text-muted-foreground underline">Remove</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMedia;
