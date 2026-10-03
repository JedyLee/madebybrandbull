import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Every editable picture spot on the public site. Key -> admin label. */
export const MEDIA_SLOTS: { key: string; label: string; page: string }[] = [
  { key: "home_hero", label: "Home · large hero photo", page: "Home" },
  { key: "home_band", label: "Home · wide black band", page: "Home" },
  { key: "home_portrait", label: "Home · portrait beside intro", page: "Home" },
  { key: "about_portrait", label: "About · image beside bio", page: "About" },
  { key: "about_wide", label: "About · wide image", page: "About" },
  ...Array.from({ length: 6 }, (_, i) => ({ key: `work_tile_${i + 1}`, label: `Work · tile ${i + 1}`, page: "Work" })),
  ...Array.from({ length: 4 }, (_, i) => ({ key: `book_${i + 1}`, label: `Work · book cover ${i + 1}`, page: "Work" })),
  ...Array.from({ length: 7 }, (_, i) => ({ key: `music_strip_${i + 1}`, label: `Music · square ${i + 1}`, page: "Music" })),
  { key: "music_story_left", label: "Music · story image left", page: "Music" },
  { key: "music_story_right", label: "Music · story image right", page: "Music" },
  { key: "music_ack", label: "Music · acknowledgements image", page: "Music" },
];

export const useSiteMedia = () =>
  useQuery({
    queryKey: ["site_media"],
    queryFn: async () => {
      const { data } = await supabase.from("site_media").select("key,url");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r) => (map[r.key] = r.url));
      return map;
    },
  });

export const MediaSlot = ({ k, className = "", alt = "" }: { k: string; className?: string; alt?: string }) => {
  const { data } = useSiteMedia();
  const url = data?.[k];
  return (
    <div className={`overflow-hidden rounded-[1.75rem] bg-foreground ${className}`}>
      {url && <img src={url} alt={alt} loading="lazy" className="w-full h-full object-cover" />}
    </div>
  );
};
