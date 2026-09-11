# BFPS Landing Page — Persistent Multi-Agent Development Protocol

This project (the Bright Future Public School lead-generation landing page) may be worked on by
more than one AI coding agent — Claude Code, OpenAI Codex, or others — often in separate sessions
that share no conversation history. **This file, plus the other docs listed below, is the
persistent memory that makes that safe.** Any agent opening this repo must treat the repo itself —
not any prior chat — as the source of truth for project state.

This file is read automatically by both Claude Code and OpenAI Codex CLI (their respective
`AGENTS.md`/`CLAUDE.md` conventions both resolve here — see `CLAUDE.md` in this same folder, which
just imports this file). No one needs to paste a briefing prompt into a new agent session — reading
this file **is** the briefing.

## What this project is

A single static HTML landing page (no build step, no framework) for Bright Future Public School's
admissions lead-generation funnel, plus a small serverless backend (Google Apps Script bound to a
Google Sheet) that receives form submissions. See `MASTER_SPEC.md` for the product spec and
`ARCHITECTURE.md` for the technical shape.

**Folder note:** this repo folder is named `claude-workshop` on disk (historical), not
`BFPS Landing Page` — that name is taken by a separate, non-code staging folder one level up
(`E:\GTS Ai - Claude Work\BFPS Landing Page\`) that holds original source images/PDF the real
assets in this repo were derived from. That staging folder is not part of the live build and has
no code in it — don't confuse the two. This repo (`claude-workshop`) is the actual project.

## Repo map (single repo, no siblings)

| Path | What it is | Git? |
|---|---|---|
| `index.html` | The entire frontend — one file, Tailwind CDN, vanilla JS. | Yes — this repo. |
| `webhook/Code.gs` | Version-controlled **copy** of the Google Apps Script Web App. The *live* copy runs inside the bound Google Sheet's own script editor (Apps Script isn't hosted in this repo) — see `webhook/README.md` for how to push a change from here to there. | Yes (the copy only). |
| `assets/logos/`, `assets/photos/`, `assets/guides/` | Drop-in image/PDF assets `index.html` already references by exact filename. Each has its own README for non-technical staff. | Yes. |
| `PRD.md` | Original product requirements doc (the brief this was built from). Superseded for day-to-day reference by `MASTER_SPEC.md`, which reflects what's actually built. | Yes. |

- **GitHub remote:** `https://github.com/gauravtej3/bfps-landing-page.git`, branch `main`.
- **Live hosting:** GitHub Pages, serving `main` branch root → `https://gauravtej3.github.io/bfps-landing-page/`.
- **Backend/data store:** Google Sheet "BFPS Lead 4m LP Contacts" — see `ARCHITECTURE.md` and
  `webhook/README.md` for the exact link and update procedure.

## 1. Persistent project memory — the files, always at these paths

- **`AGENTS.md`** (this file) — permanent engineering rules and the repo map above.
- **`CLAUDE.md`** — one line, `@AGENTS.md`, so Claude Code's own auto-load picks this file up too.
  (The workspace-root `E:\GTS Ai - Claude Work\CLAUDE.md` governance — branding, secrets, admin
  accounts, token efficiency, authority — already applies here automatically via Claude Code's
  directory walk-up; this file is additive, not a replacement. Note: the branding/admin-accounts
  standards there are scoped to apps *with user accounts/roles* — this landing page has none, see
  `ARCHITECTURE.md`'s "Admin access model" section for how access actually works here instead.)
- **`MASTER_SPEC.md`** — the authoritative, current product/content spec (what the page must say
  and do). Read this before changing copy, CTAs, or section structure.
- **`FEATURE_MATRIX.md`** — every feature/section with its status (Built & verified / Placeholder /
  Not started). Check this first to know what's actually done before assuming something is missing.
- **`ARCHITECTURE.md`** — technical shape: hosting, data flow, asset drop-in convention, admin
  access model.
- **`DEVELOPMENT_STATUS.md`** — the detailed, continuously-updated build log by area.
- **`AGENT_HANDOFF.md`** — the short, agent-to-agent "read this first, do this next" summary.
  Distinct from `DEVELOPMENT_STATUS.md`: that file is the full history; this one is "what do I do
  *right now*."
- **`CLAUDE_CODE_PROMPTS.md`** — ready-to-paste, phase-by-phase prompts (what was used to build
  each phase, and the exact prompt for the next phase). Use this to resume without burning tokens
  re-deriving context — paste the "Next phase" prompt as-is into a fresh session.

Do not rely on conversation memory for any of this. If it isn't written down here, a new agent (or
a resumed Claude Code session after a `/clear`) has no way to know it.

## 2. Keeping `DEVELOPMENT_STATUS.md` updated

Organized by area (Frontend / Backend·webhook / Assets / Tracking / Hosting), not by session.
Update the relevant existing section in place with the new fact (what's built, what was verified
and how, known gaps) rather than appending a new dated block. Condensing a bug's full narrative
into a one-paragraph fact + commit reference is fine; deleting the fact itself is not — the full
reasoning still lives in the commit's own message and this file's git history if needed later.

## 3. `AGENT_HANDOFF.md` — keep it a current-state snapshot, not a diary

Whenever a session reaches a natural stopping point, a context/usage limit, or the user asks to
stop: **update it in place** with the new true state — rewrite the stale claim, don't prepend a new
dated paragraph on top of it. Cover: what changed, whether it's verified (and how — honestly flag
anything not run), any new known gap/blocker, and whether "Next Recommended Action" is still right.

## 4. Git checkpoints

Before starting a change: check `git status` and the current branch. After a stable increment:
commit with a real message. This is a single-branch, single-remote repo — no branch juggling
needed for normal work.

Never commit API keys, passwords, tokens, or `.env` secrets — see the workspace-root `CLAUDE.md`'s
secrets-handling section, which already governs this repo. (This project currently has no secrets
of its own — the Apps Script webhook URL embedded in `index.html` is a public endpoint by design,
not a credential; see `ARCHITECTURE.md`.)

## 5. Never mark unfinished work complete

If something is partially done, say so explicitly — `PARTIAL / IN PROGRESS` — in both
`DEVELOPMENT_STATUS.md` and `AGENT_HANDOFF.md`. Don't mark it done until actually verified (a real
page load / form submission / sheet row, not just "the code looks right").

## 6. Handing off to another agent

Before ending a session: verify `git status` is clean (or explicitly note what's uncommitted and
why), commit stable work, update `DEVELOPMENT_STATUS.md` and `AGENT_HANDOFF.md`, and leave the
working tree in a state another agent (or yourself, later) can pick up without guessing.

## 7. Opening this project as a new/resumed agent

Read, in order: this file → `MASTER_SPEC.md` → `FEATURE_MATRIX.md` → `ARCHITECTURE.md` →
`DEVELOPMENT_STATUS.md` → `AGENT_HANDOFF.md` → `git status`/latest commit → the actual source
(`index.html`, `webhook/Code.gs`) for the area being touched. Determine what's already done.
**Never redo completed work** — this repo is small enough and `FEATURE_MATRIX.md` explicit enough
that there's no excuse for re-verifying already-shipped sections "just in case." Continue from
`AGENT_HANDOFF.md`'s "Next Recommended Action," or the matching prompt in `CLAUDE_CODE_PROMPTS.md`.
Per this workspace's own standing convention, trust these docs and prior verified results rather
than blanket-re-verifying.

## 8. One agent at a time

Only one coding agent modifies this repo's working tree at a time. Don't assume another agent's
changes are safe unless they're actually present in git history.

## 9. The two places code actually lives

`index.html` (and everything else in this repo) is fully captured by git — normal workflow. The
Apps Script webhook (`webhook/Code.gs`) is **not** — the live, executing copy lives only inside the
Google Sheet's own script editor. A change to `webhook/Code.gs` in this repo does nothing to
production until it's manually pasted into the Sheet's Apps Script editor and redeployed. See
`webhook/README.md` for the exact steps. Never assume a Code.gs commit alone fixed a live bug.

## 10. The core principle

If this session disappeared right now, the next competent agent opening this repo should be able
to determine, from the repo alone: what's built, what's being built, what failed, what remains, and
what to do next. That's more durable than any conversation history — and it's why this file and its
companions exist.
