# AGENT HANDOFF — BFPS Landing Page

Current-state snapshot, not a diary — rewritten in place at every stopping point (see `AGENTS.md`
§3). **Last updated: 2026-09-11, ahead of an approaching session-limit pause.**

## Current state

The site is **fully built and live**: `https://gauravtej3.github.io/bfps-landing-page/`. All
sections, both lead forms, the Google Sheet webhook (with its column-mapping bug already fixed),
and all image/PDF assets are done, committed, and pushed. `git status` is clean on `main`, in sync
with `origin`. See `FEATURE_MATRIX.md` for the full row-by-row state — nothing in this pause is
"in progress"; this session only added documentation, no code changes.

## What happened this session

Paused all active work per user request (session limit approaching) and brought the project up to
the workspace's standard multi-agent doc set, which didn't exist yet for this repo. Added:
`AGENTS.md`, `CLAUDE.md` (import), `MASTER_SPEC.md`, `FEATURE_MATRIX.md`, `ARCHITECTURE.md`,
`DEVELOPMENT_STATUS.md`, this file, `CLAUDE_CODE_PROMPTS.md`. All written directly from the repo's
actual state (git log, live `index.html`, `webhook/Code.gs`, asset READMEs, a live GitHub Pages API
check) — no assumptions carried in from conversation memory.

**Nothing was verified/re-tested in this pass** — per workspace policy, already-shipped, unchanged
work (the whole live site) was trusted rather than blanket-re-checked. If you're picking this up
and want to sanity-check the live site is still up, that's a 10-second `curl`/browser check, not a
re-build.

## Work completed this session

- [x] Located the real project (repo folder is named `claude-workshop`, not `BFPS Landing Page` —
      see `AGENTS.md`'s "Folder note").
- [x] Read git history (11 commits), `PRD.md`, full `index.html`, `webhook/Code.gs` + its README,
      all `assets/*/README.md` files.
- [x] Confirmed live hosting via `gh api repos/gauravtej3/bfps-landing-page/pages` (`status: built`).
- [x] Wrote the 8 docs listed above.

## Work remaining (not started, not blocked on any bug — just needs a real value)

**Only one substantive gap exists: tracking activation.** Everything else is shipped.

1. Get a real **GA4 Measurement ID** (create a GA4 property in Google Analytics if one doesn't
   exist) and a real **Meta Pixel ID** (create one in Meta Events Manager) — this needs
   Gaurav/Garv's Google/Meta Business account access, not something an agent can generate.
2. Once you have both IDs, use the ready prompt in `CLAUDE_CODE_PROMPTS.md` ("Phase — Activate
   tracking") to wire them in — it's a small, mechanical edit (uncomment 2 blocks, swap 2
   placeholder strings, uncomment 1 conversion-event line) already scoped out.

Everything else — content, both forms, webhook, assets, hosting — needs no further action unless
Gaurav/Garv asks for a specific new feature or the annual `ADMISSIONS_SESSION` bump (next due
~April 2027).

## Tests/checks run this session

None — this was a documentation-only pass. Last known-good verification of the live app is the one
already recorded in `DEVELOPMENT_STATUS.md` (from the original build session, pre-dating this
handoff).

## Known problems

None open. See `DEVELOPMENT_STATUS.md`'s "Known gaps" for the 3 non-blocking notes (tracking IDs,
optional custom domain, unused staging-folder design files).

## Next recommended action

**If resuming with no new instruction:** nothing to do — the site is live and complete pending the
tracking IDs above, which only Gaurav/Garv can supply. Don't re-verify or re-build anything already
marked ✅ in `FEATURE_MATRIX.md`.

**If Gaurav/Garv supplies a GA4 ID and/or Pixel ID:** open `CLAUDE_CODE_PROMPTS.md`, copy the
"Phase — Activate tracking" prompt into a fresh session, fill in the two IDs, run it.

**If asked to open the site as admin:** see the "How to access as admin" answer given directly to
the user in this session (also captured in `ARCHITECTURE.md` §7) — GitHub repo access for
code/content, Google account access to the "BFPS Lead 4m LP Contacts" Sheet for leads/webhook.

## Important warnings for the next agent

- The repo folder on disk is `claude-workshop`, **not** `BFPS Landing Page` — don't waste a search
  cycle looking for a folder by that exact name; see `AGENTS.md`'s "Folder note."
- Editing `webhook/Code.gs` in this repo changes nothing live by itself — it must be manually
  pasted into the Google Sheet's Apps Script editor and redeployed. See `ARCHITECTURE.md` §3 and
  `webhook/README.md`.
- If you see the error `TypeError: Cannot read properties of undefined (reading 'postData')` in the
  Apps Script editor, that's expected when `doPost` is Run directly (not a bug) — use `doTest()`
  instead. Already documented in-code and in `webhook/README.md`; don't re-diagnose it.
