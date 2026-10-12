/** Empty slots keep the gallery moving without duplicating actual releases. */
export const musicGallerySlots = <T,>(releases: T[]): (T | null)[] =>
  Array.from({ length: Math.max(7, releases.length) }, (_, index) => releases[index] ?? null);