import { describe, expect, it } from "vitest";
import { musicGallerySlots } from "./music-gallery";

describe("music release slots", () => {
  it("shows one uploaded release once and leaves the other boxes empty", () => {
    const release = { title: "First", cover: "first.png" };
    const slots = musicGallerySlots([release]);
    expect(slots.filter(Boolean)).toEqual([release]);
    expect(slots.slice(1).every((slot) => slot === null)).toBe(true);
  });

  it("fills the next slot with another release without changing the first", () => {
    const first = { title: "First", cover: "first.png" };
    const second = { title: "Second", cover: "second.png" };
    expect(musicGallerySlots([first, second]).slice(0, 3)).toEqual([first, second, null]);
  });
});