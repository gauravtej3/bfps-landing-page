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

**Status: active, live. Activated 2026-09-11.**

- **GA4:** Measurement ID `G-HBJ1F42B4G`, property "BFPS Jaipur Landing Page" (newly created under
  `gauravtej@gmail.com`'s GA4 account, separate from the existing "Legal Advisory" property).
  Uncommented in commit `7836400`.
- **Meta Pixel:** Pixel ID `1754463085876673`, created under the "Bright Future Public School"
  Business Manager in Events Manager. Uncommented in commit `dc4a4d5`.
- Both `gtag('event', 'generate_lead')` and `fbq('track', 'Lead')` fire in the form submit handler
  **after** the Apps Script webhook call already succeeds, so activating tracking made zero change
  to the lead-capture path (verified via clean `git diff` before each commit — only the tracking
  blocks and those two lines changed).
- Verified via: `curl`-polling the live GitHub Pages URL after each push until each real ID
  appeared in the served HTML (confirmed both times).
- Not yet done: no live check of actual GA4 Realtime / Events Manager Test Events dashboards to see
  a pageview/lead event register end-to-end — the code path is confirmed deployed and correct, but
  a real-traffic dashboard check hasn't been done. Worth a quick look next time either dashboard is
  opened, not urgent.

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

1. ~~GA4/Meta Pixel IDs are placeholders~~ — **resolved 2026-09-11**, see Tracking section above.
2. **No custom domain** — currently on the default `github.io` subdomain; not requested, just
   noting it's an option if wanted later.
3. **Outer `BFPS Landing Page` staging folder** (sibling, one level up) still holds two unused
   source design files (`ChatGPT Image ... (ALL 3).png`, `Watermark.jpg`) that were never
   integrated into the site — not a blocker, just unclaimed material; flag to Gaurav/Garv if they
   were meant to be used somewhere and got dropped.
4. **Tracking dashboards not yet spot-checked** — see the last bullet of the Tracking section
   above; low priority.
