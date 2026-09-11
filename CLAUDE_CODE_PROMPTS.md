# CLAUDE CODE PROMPTS — Phase by Phase (BFPS Landing Page)

Ready-to-paste prompts for each phase of this project. Phases 1–8 are a **reconstructed record**
of work already completed (from git history) — kept so a new agent understands *how* the site was
built without re-deriving it, and so nothing already-done gets redone. Phase 9 is the **actual next
step**, ready to paste into a fresh Claude Code session as-is.

Before pasting any prompt below into a new session, that session should already read `AGENTS.md`
(it will, automatically) — these prompts assume that context and don't repeat it.

---

## Phase 1 — Initial build (commit `5c94a02`)
> Build the BFPS landing page frontend: single `index.html`, Tailwind CDN, per `PRD.md` — hero with
> split Junior/Senior pathing, Head-Hand-Heart philosophy section, Junior Wing (Kokoon) section,
> Senior Wing (AI) section, footer, mobile sticky CTA bar. Use the color palette and fonts specified
> in the PRD's design system section.

## Phase 2 — Google Sheet webhook wiring (commit `c0f525e`)
> Add a `GOOGLE_SHEET_WEBHOOK_URL` constant and wire both lead forms to POST their payload to it via
> `fetch`, so submissions land in a Google Sheet via an Apps Script Web App.

## Phase 3 — Lead-magnet PDF download (commit `39b9c6a`)
> Wire the "Get the Free Guide" form so a successful submission triggers an instant client-side
> download of the lead-magnet PDF.

## Phase 4 — Lead magnet asset (commit `b985d14`)
> Add the actual "Reclaim Focus: Smart Device Rules for Academic Growth" PDF to
> `assets/guides/reclaim-focus-guide.pdf`.

## Phase 5 — Fix binary asset corruption (commit `3da35f6`)
> Add a `.gitattributes` marking `*.pdf`, `*.png`, `*.jpg`, `*.jpeg` as binary, to stop git from
> corrupting them via line-ending normalization.

## Phase 6 — Fix webhook column-mapping bug + admissions-session tagging (commits `c82ea0e`,
`38ca751`, `1f51434`, `dfafcfc`)
> Leads are landing in the wrong Google Sheet columns. Rewrite `webhook/Code.gs`'s `doPost` to map
> fields to columns by matching the sheet's actual header row (row 1) by name, not by hardcoded
> position, so reordering/adding columns never breaks it again. Add a `doTest()` helper so the
> mapping can be verified from the Apps Script editor's Run button without a real form submission
> (note in the README that Running `doPost` itself always throws — that's expected, not a bug).
> Then extract the "Admissions 2026-27" badge text into a single `ADMISSIONS_SESSION` JS constant,
> send it as a `session` field on every lead, and add a matching `Session` column in the webhook so
> multiple admissions cycles stay distinguishable in one running sheet.

## Phase 7 — Campus photos (commits `6d0ee6a`, `bba52dc`)
> Wire photo placeholders in the Junior Wing and Senior Wing sections to real `<img>` tags that
> auto-swap in once correctly-named files (`kokoon-campus.jpg`, `ai-tech-lab.jpg`) are dropped into
> `assets/photos/`, with a graceful placeholder fallback until then. Then add the actual photo
> files (convert any oversized source PNG to a page-weight-appropriate JPEG first).

## Phase 8 — Documentation pass (this session, 2026-09-11)
> Pause active work (session limit approaching). Bring this project up to the workspace's standard
> multi-agent doc set (`AGENTS.md`, `CLAUDE.md` import, `MASTER_SPEC.md`, `FEATURE_MATRIX.md`,
> `ARCHITECTURE.md`, `DEVELOPMENT_STATUS.md`, `AGENT_HANDOFF.md`, this file) written from the repo's
> actual current state — no code changes.

---

## Phase 9 — Activate tracking (NEXT — not yet started)

This is the only real remaining work. Paste this prompt once you have a real GA4 Measurement ID
and/or Meta Pixel ID (fill in the blanks below first):

> In `index.html`, activate analytics tracking:
>
> 1. GA4 Measurement ID: `___________` (replace `G-XXXXXXXXXX`)
> 2. Meta Pixel ID: `___________` (replace `YOUR_PIXEL_ID`)
>
> Uncomment the GA4 `<script>` block and the Meta Pixel `<script>` block in the `<head>` (both are
> currently HTML-commented out under "TRACKING PLACEHOLDERS"), replacing the placeholder IDs with
> the real ones above. Then uncomment the `generate_lead` conversion-event call(s) in the form
> submit handler so both the lead-magnet and admissions form submissions fire a conversion event.
> Only touch tracking code — don't change page content, styling, or the webhook. Commit with a
> message noting both IDs were activated (don't put the raw IDs' surrounding context in a way that
> reads as a secret — they're analytics IDs, not credentials, so it's fine for them to appear in
> the commit and in `index.html` itself, same as they will publicly in the page source).
>
> After: verify by loading the live site with the browser's network tab open and confirming a
> request fires to `google-analytics.com`/`googletagmanager.com` and to `facebook.com/tr` on page
> load. Update `FEATURE_MATRIX.md` rows 17–19 to ✅ and `DEVELOPMENT_STATUS.md`'s "Tracking"
> section once confirmed working, not before.

If only one of the two IDs is available, do that one now and leave the other's placeholder/comment
block untouched — don't half-activate a block with a fake ID.

## Future phases (not yet requested — don't start without being asked)

- Custom domain for GitHub Pages (currently on the default `github.io` subdomain).
- Any new section/CTA/copy change — check `MASTER_SPEC.md` first and update it alongside the code
  change, don't let it drift out of sync.
- Next `ADMISSIONS_SESSION` bump — due ~April 2027 for the 2027–28 cycle; one-line change in
  `index.html`, see `MASTER_SPEC.md` §8.
