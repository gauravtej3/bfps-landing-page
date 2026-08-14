# Campus Photos — Where to Drop Them

This folder is already wired into `index.html`. Just add your two photo files
here using the **exact filenames** below — no code changes needed.

| File to add (exact name) | Used for | Shown in |
|---|---|---|
| `kokoon-campus.jpg` | Kokoon - The Pre-School students/activity photo | Junior Wing section |
| `ai-tech-lab.jpg` | AI Tech Lab / Senior Wing students photo | Senior Wing section |

## Steps
1. Rename your two photos to match the names above exactly (case-sensitive,
   all lowercase, hyphen, no spaces).
2. Copy/drag both files directly into this folder:
   `E:\GTS Ai - Claude Work\claude-workshop\assets\photos\`
3. Push to GitHub (or ask Claude to) so the live site picks it up.
4. Open (or refresh) the live site — both photos will appear automatically
   in place of the grey placeholder boxes. Nothing else needs to change.

## If your files aren't .jpg
The page looks for `kokoon-campus.jpg` and `ai-tech-lab.jpg` specifically. If
your photo is a `.png` or `.jpeg` instead:
- Either **re-save/export it as a `.jpg`** with those exact names (simplest), **or**
- Ask Claude to update the two `<img src="...">` lines in `index.html` to match
  your actual file extension.

## Recommended photo specs
- **Aspect ratio:** roughly 4:3 (landscape) — the box crops to fill this shape,
  so a photo already close to 4:3 avoids awkward cropping.
- **Content:** real students doing a real activity reads far better than an
  empty classroom or a stock photo — Kokoon should show a Junior Wing activity
  (play-based learning, sensory activity, etc.), AI Tech Lab should show
  Senior Wing students actually using the tech/AI lab.
- **File size:** keep each under ~500KB (export at ~1600px on the long side,
  medium-high JPEG quality) so the page still loads fast on mobile.
- **Consent:** make sure you have parent/school permission to publish photos
  of students publicly, since this page is public and indexed by Google.

## Until the files are added
The grey placeholder boxes with their label text stay exactly as they are
now — nothing breaks, no broken-image icon. Each photo switches in
automatically the moment its correctly-named file is present.
