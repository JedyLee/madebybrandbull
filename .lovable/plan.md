

## Plan — Add your real portfolio (static)

### What you'll send me

Across 2–3 chat messages, attach your project images (max 10 per message, JPG/PNG/WEBP, under 20 MB each). For each image, give me a short caption in this format:

```
1. Title — Client — Year — Category — Size (sm/md/lg)
   Blurb: one or two sentences.

2. Title — Client — Year — Category — Size
   Blurb: ...
```

- **Category** should be one of: Branding, Editorial, Typography, Packaging, Print (or tell me a new one to add to the filter bar)
- **Size** controls how big the tile is in the magazine grid: `lg` = wide hero, `md` = medium, `sm` = small
- **Blurb** is optional — I can write one if you skip it

If you don't want to write captions inline, just number the images and send a separate list — whatever's easiest.

### What I'll do

1. **Save images** into `src/assets/` with clean filenames (`work-{slug}.jpg`)
2. **Replace `src/data/projects.ts`** with your real entries — one `Project` object per piece, with id, title, client, category, year, image import, blurb, and size
3. **Update the category filter** in `src/pages/Work.tsx` if you have new categories beyond the current five
4. **Pick the featured project** for the homepage hero (first item in the array, or you tell me which one)
5. **Verify** the Work page grid, homepage featured spread, and "Selected work" section all render your new pieces correctly

### What stays the same

- The magazine layout, fonts, colors, and page structure
- The designer name/bio (separate task — say the word and I'll update those too)

### After this is done

Once your work is in, you can click **Publish** in the top-right to push the live site at `jedidiahthedesigner.lovable.app` so people can see it.

