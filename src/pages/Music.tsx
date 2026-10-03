import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MediaSlot } from "@/lib/site-media";

const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

const Music = () => {
  const { data: tracks = [] } = useQuery({
    queryKey: ["music_tracks_public"],
    queryFn: async () => {
      const { data } = await supabase.from("music_tracks").select("*").eq("is_published", true).order("sort_order", { ascending: false });
      return data ?? [];
    },
  });
  const audio = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState({ cur: 0, dur: 0 });
  const track = tracks.find((x) => x.id === current);

  const toggle = (id: string) => {
    const a = audio.current!;
    if (current === id) { playing ? a.pause() : a.play(); return; }
    const tr = tracks.find((x) => x.id === id);
    if (!tr?.audio_url) return;
    a.src = tr.audio_url; setCurrent(id); a.play();
  };

  useEffect(() => () => audio.current?.pause(), []);

  return (
    <>
      <audio ref={audio} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setT({ cur: e.currentTarget.currentTime, dur: e.currentTarget.duration })} />

      <section className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-4 font-script text-6xl md:text-9xl text-foreground/10 pointer-events-none select-none">
          <span>Capella</span><span>Chandon</span>
        </div>
        <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full bg-destructive" />
        <p className="relative mt-4 text-xs font-bold tracking-[0.2em]">CAPELLA CHANDON</p>
        <p className="relative font-script text-lg text-muted-foreground">sound by Jedidiah Ingram</p>
      </section>

      <section className="container grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-8">
        {Array.from({ length: 7 }, (_, i) => <MediaSlot key={i} k={`music_strip_${i + 1}`} className={`aspect-square !rounded-xl ${i > 3 ? "hidden md:block" : ""}`} />)}
      </section>

      <section className="container py-24 grid md:grid-cols-[1fr_1.4fr_1fr] gap-10 items-center">
        <MediaSlot k="music_story_left" className="aspect-[3/5] hidden md:block" />
        <div className="max-w-md mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Behind the sound</p>
          <h2 className="text-center font-script text-5xl mt-2 mb-8">The Feels</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-justify">
            <p>Since childhood I've been captivated by music — learning melodies by ear and chasing that rich, warm sound long before I knew any theory.</p>
            <p>My love for technology grew alongside it. Coding, design and sound engineering all became part of the same craft: building something that feels right from every angle.</p>
            <p>Capella Chandon is where it comes together. I produce and engineer the songs myself, and I design the artwork and press the vinyl too — every release is made end to end by hand.</p>
          </div>
        </div>
        <MediaSlot k="music_story_right" className="aspect-square hidden md:block" />
      </section>

      <section className="container max-w-4xl pb-24">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">All releases</p>
        <h2 className="text-center font-script text-5xl mt-2 mb-12">Listen</h2>
        {tracks.length === 0 && <p className="text-center text-sm text-muted-foreground">New releases coming soon.</p>}
        <div className="divide-y divide-border border-y border-border">
          {tracks.map((tr, i) => {
            const active = current === tr.id && playing;
            return (
              <div key={tr.id} className="flex items-center gap-4 md:gap-8 py-4">
                <span className="text-[10px] text-muted-foreground w-8">{String(tracks.length - i).padStart(3, "0")}</span>
                <div className="w-12 h-12 rounded-lg bg-foreground overflow-hidden shrink-0">
                  {tr.cover_url && <img src={tr.cover_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <span className="flex-1 text-xs uppercase tracking-[0.2em]">{tr.title}</span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tr.release_label}</span>
                <button onClick={() => toggle(tr.id)} disabled={!tr.audio_url} aria-label={active ? "Pause" : "Play"}
                  className="w-14 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-foreground hover:text-background transition-colors disabled:opacity-40">
                  {active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container max-w-5xl pb-24 grid md:grid-cols-2 gap-12 items-end">
        <MediaSlot k="music_ack" className="aspect-square" />
        <div className="text-center">
          <p className="text-xs">Acknowledgements</p>
          <p className="font-script text-4xl mt-2">Capella Chandon</p>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">Thank you to everyone who listened, shared and supported each release. Written, produced, engineered and designed by Jedidiah Ingram.</p>
        </div>
      </section>

      {track && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-foreground text-background px-5 py-2.5 shadow-lg">
          <button onClick={() => toggle(track.id)} aria-label="Play or pause">{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button>
          <span className="text-xs uppercase tracking-[0.2em] max-w-[40vw] truncate">{track.title}</span>
          <span className="text-xs font-mono tabular-nums opacity-70">{fmt(t.cur)} / {fmt(t.dur)}</span>
        </div>
      )}
    </>
  );
};

export default Music;
