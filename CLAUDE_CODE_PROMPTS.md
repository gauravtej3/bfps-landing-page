# CLAUDE CODE PROMPTS — Phase by Phase (BFPS Landing Page)

Ready-to-paste prompts for each phase of this project. Phases 1–9 are a **reconstructed record**
of work already completed (from git history) — kept so a new agent understands *how* the site was
built without re-deriving it, and so nothing already-done gets redone. As of 2026-09-11 the entire
project (including tracking) is complete — see "Future phases" at the bottom for what's next
whenever new work is requested.

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

## Phase 9 — Activate tracking (DONE — 2026-09-11, commits `7836400`, `dc4a4d5`)
> Activated in two steps as each ID became available: GA4 first (Measurement ID `G-HBJ1F42B4G`,
> commit `7836400`), then Meta Pixel once the user created one in Events Manager (Pixel ID
> `1754463085876673`, commit `dc4a4d5`). Both script blocks uncommented in `<head>`, both
> conversion-event calls (`gtag('event', 'generate_lead')`, `fbq('track', 'Lead')`) uncommented in
> the form submit handler. Each commit verified via a clean, minimal `git diff` and confirmed live
> via a `curl`-poll of the deployed page after pushing. See `AGENT_HANDOFF.md` and
> `DEVELOPMENT_STATUS.md`'s Tracking section for full detail. `FEATURE_MATRIX.md` rows 17–19 are
> now ✅.

## Future phases (not yet requested — don't start without being asked)

- Custom domain for GitHub Pages (currently on the default `github.io` subdomain).
- Any new section/CTA/copy change — check `MASTER_SPEC.md` first and update it alongside the code
  change, don't let it drift out of sync.
- Next `ADMISSIONS_SESSION` bump — due ~April 2027 for the 2027–28 cycle; one-line change in
  `index.html`, see `MASTER_SPEC.md` §8.
