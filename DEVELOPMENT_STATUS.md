# DEVELOPMENT STATUS — BFPS Landing Page

Organized by area, not by session — update the relevant section in place as facts change (see
`AGENTS.md` §2). Last updated: **2026-09-11** (docs pass ahead of a session-limit pause; no code
changed in this pass — see `AGENT_HANDOFF.md` for why).

## Frontend (`index.html`)

**Status: built and live.** All sections in `MASTER_SPEC.md` §3 are implemented: header/nav, hero
with split pathing, trust strip, philosophy section, Junior Wing, Senior Wing, lead-magnet section
+ form, admissions section + form, footer, mobile sticky CTA bar.

- Design system (colors, fonts, 8pt-grid spacing) implemented via an inline `tailwind.config`
  extension at the top of `index.html` — matches `MASTER_SPEC.md` §5 exactly.
- `ADMISSIONS_SESSION` constant (currently `'2026–27'`) drives the visible session badge and is
  stamped onto every lead payload — extracted into a single constant specifically so the yearly
  update (each April) is a one-line edit (commit `1f51434`).
- Verified via: `curl` against the live GitHub Pages URL (200 responses for page and both photo
  assets — see `.claude/settings.local.json`'s allowed commands for the exact calls used) and
  direct visual/manual testing during build.

## Backend / lead webhook (`webhook/Code.gs`, live copy in Google Sheets)

**Status: built, bug-fixed, live.**

- Original version appended row values in a hardcoded column order that didn't match the sheet's
  actual header row, so lead details landed under the wrong headers (name under phone's column,
  etc.).
- Fixed (commit `c82ea0e`) by reading row 1 at write time and mapping fields **by header name** via
  a `fieldMap` object — reordering/adding sheet columns no longer breaks it.
- `doTest()` helper added (commit `38ca751`) after confirming that the `TypeError: Cannot read
  properties of undefined (reading 'postData')` seen when clicking Run on `doPost` directly in the
  Apps Script editor is expected behavior (the editor calls it with no arguments), not a bug —
  `doTest` fakes a realistic payload so the mapping logic can be verified from the editor without
  touching the live site. This exact error is what the two `Temp SS error *.jpg` screenshots in the
  sibling `BFPS Landing Page` staging folder document — already resolved, not an open issue.
- Session tagging added (commits `1f51434`, `dfafcfc`) so leads carry `ADMISSIONS_SESSION` in a
  `Session` column, keeping multiple admissions cycles distinguishable in one running sheet.
- Verified via: `doTest()` run from the Apps Script editor confirming a row lands under the correct
  headers, plus real form submissions during build.

## Assets

**Status: all three asset sets present and committed** — `assets/logos/{bfps-logo.png,
kokoon-logo.png}`, `assets/photos/{kokoon-campus.jpg, ai-tech-lab.jpg}`,
`assets/guides/reclaim-focus-guide.pdf`. `ai-tech-lab.jpg` was converted from a 2.4MB source PNG to
a ~290KB JPEG for page-load weight (commit `bba52dc`). Drop-in READMEs exist per folder for future
non-technical replacements. Nothing outstanding here.

## Tracking (GA4 / Meta Pixel)

**Status: scaffolded, not activated.** Both script blocks exist in `index.html`'s `<head>`,
correctly structured, but HTML-commented-out with placeholder IDs (`G-XXXXXXXXXX`,
`YOUR_PIXEL_ID`) since no real GA4 property or Meta Pixel had been created yet as of the last build
session. A commented-out `generate_lead` conversion-event call also already exists in the form
submit handler, ready to uncomment alongside the Pixel/GA4 blocks. This is the only outstanding
code-adjacent gap — see `FEATURE_MATRIX.md` rows 17–19 and the ready prompt in
`CLAUDE_CODE_PROMPTS.md` ("Phase — Activate tracking").

## Hosting

**Status: live.** GitHub Pages confirmed via API (`status: "built"`, `https_enforced: true`,
serving `main`/`/`) at `https://gauravtej3.github.io/bfps-landing-page/`. No custom domain
configured (not requested).

## Documentation (this pass)

**Status: complete, 2026-09-11.** Added the full doc set this project was missing per the
workspace's multi-agent protocol: `AGENTS.md`, `CLAUDE.md` (import), `MASTER_SPEC.md`,
`FEATURE_MATRIX.md`, `ARCHITECTURE.md`, this file, `AGENT_HANDOFF.md`, `CLAUDE_CODE_PROMPTS.md`.
Written from: git log (all 11 commits read), `PRD.md`, full `index.html` structure (grep pass +
head read), `webhook/Code.gs` and its README, all three `assets/*/README.md` files, `.claude/
settings.local.json`'s command allowlist (confirms GitHub Pages + repo identity), and a live
`gh api repos/.../pages` check. No code changes made in this pass.

## Known gaps (carried forward)

1. **GA4 Measurement ID and Meta Pixel ID are placeholders** — needs real IDs from Gaurav/Garv
   (create a GA4 property + a Meta Pixel in Events Manager) before tracking goes live. See
   `CLAUDE_CODE_PROMPTS.md`.
2. **No custom domain** — currently on the default `github.io` subdomain; not requested, just
   noting it's an option if wanted later.
3. **Outer `BFPS Landing Page` staging folder** (sibling, one level up) still holds two unused
   source design files (`ChatGPT Image ... (ALL 3).png`, `Watermark.jpg`) that were never
   integrated into the site — not a blocker, just unclaimed material; flag to Gaurav/Garv if they
   were meant to be used somewhere and got dropped.
