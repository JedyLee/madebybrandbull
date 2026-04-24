## Replace Danna Bakes slider images

Replace all four images in the Danna Bakes branding slider with the newly uploaded versions (DB01–DB04), in order.

### Steps

1. **Copy uploaded images** into the project at `src/assets/brands/`:
   - `user-uploads://DB01.png` → `src/assets/brands/danna-bakes-01.webp` (overwrite)
   - `user-uploads://DB02.png` → `src/assets/brands/danna-bakes-02.webp` (overwrite)
   - `user-uploads://DB03.png` → `src/assets/brands/danna-bakes-03.webp` (overwrite)
   - `user-uploads://DB04.png` → `src/assets/brands/danna-bakes-04.webp` (overwrite)

2. **No code changes needed** — `src/data/brands.ts` already imports `danna01`–`danna04` in order for the Danna Bakes brand entry, so overwriting the existing files updates the slider automatically.

### Notes

- File extensions in `brands.ts` stay `.webp` (the bundler handles the actual content regardless of original PNG source).
- Order on screen will match upload order: DB01 first, DB04 last.
