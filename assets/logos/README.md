# Logo Files — Where to Drop Them

This folder is already wired into `index.html`. Just add your two logo files here
using the **exact filenames** below — no code changes needed.

| File to add (exact name) | Used for | Shown in |
|---|---|---|
| `bfps-logo.png` | Bright Future Public School (main school logo) | Header (top-left) |
| `kokoon-logo.png` | Kokoon - The Pre-School (Junior Wing) | Junior Wing section |

## Steps
1. Rename your two logo image files to match the names above exactly (case-sensitive,
   all lowercase, hyphen, no spaces).
2. Copy/drag both files directly into this folder:
   `E:\GTS Ai - Claude Work\claude-workshop\assets\logos\`
3. Open (or refresh) `index.html` in your browser — both logos will appear
   automatically. Nothing else needs to change.

## If your files aren't .png
The page looks for `bfps-logo.png` and `kokoon-logo.png` specifically. If your
logo is a `.jpg`, `.jpeg`, or `.svg` instead:
- Either **re-save/export it as a `.png`** with those exact names (simplest), **or**
- Ask Claude to update the two `<img src="...">` lines in `index.html` to match
  your actual file extension.

## Recommended logo specs
- **Format:** PNG or SVG with a transparent background (keeps it clean on both the
  white header bar and the green Kokoon section background).
- **BFPS logo:** roughly square, at least 200×200px — it's displayed in a small
  circular badge in the header.
- **Kokoon logo:** landscape or square, at least 300px on the shorter side — it's
  displayed at a larger size in the Junior Wing section.

## Safety net
Until you add the real files, the page won't show a broken-image icon:
- The header falls back to a "BF" badge.
- The Kokoon logo slot simply stays hidden.
Both switch over automatically the moment the correctly-named files are present.
