# ARCHITECTURE — BFPS Landing Page

## 1. Overview

No build step, no framework, no server this project owns. Two moving parts:

```
Visitor's browser                         GitHub                         Google
┌──────────────────────┐   git push   ┌──────────────┐   serves    ┌─────────────────────────┐
│ index.html (static)  │◄─────────────┤ GitHub repo   ├────────────►│ GitHub Pages             │
│ Tailwind CDN + JS     │              │ gauravtej3/   │  (main,     │ gauravtej3.github.io/   │
└──────────┬────────────┘              │ bfps-landing- │   root)     │ bfps-landing-page/       │
           │ fetch() POST                page          │             └─────────────────────────┘
           ▼
┌──────────────────────┐
│ Google Apps Script    │  doPost(e) → maps fields by header name → appendRow
│ Web App (/exec URL)   │
│ bound to a Google      │
│ Sheet                  │
└──────────┬────────────┘
           ▼
┌──────────────────────┐
│ "BFPS Lead 4m LP       │  One row per lead: Timestamp | Session | Source |
│  Contacts" Sheet       │  Name | Phone | Child's Class/Age | Intent
└──────────────────────┘
```

## 2. Frontend

- **Single file:** `index.html` — markup, Tailwind config (inline `<script>` block), and page JS
  (form handling, session badge, sticky CTA) all live in this one file. No bundler, no
  `package.json`, no `node_modules`.
- **Styling:** Tailwind CSS via the CDN build (`https://cdn.tailwindcss.com`) with an inline
  `tailwind.config` extending the theme with BFPS's colors/fonts (see `MASTER_SPEC.md` §5). A small
  `<style>` block on top handles smooth scroll and the mobile sticky-bar bottom padding.
- **Fonts:** Google Fonts (`Merriweather`, `Open Sans`), loaded via `<link>` with `preconnect`.
- **No client-side router, no state library** — it's a single scrolling page with anchor-link
  navigation (`#philosophy`, `#junior`, `#senior`, `#guide`, `#admissions`).

## 3. Backend: Google Apps Script webhook

- **What it is:** a Google Apps Script **Web App**, deployed with a stable `/exec` URL, bound to
  the Google Sheet "BFPS Lead 4m LP Contacts" (the sheet *is* the database).
- **Where the live code actually runs:** inside that Sheet's own `Extensions > Apps Script` editor
  — **not** in this repo. `webhook/Code.gs` here is a version-controlled *copy* kept in sync
  manually; editing it in the repo does nothing to production by itself.
- **How a change reaches production:** edit `webhook/Code.gs` in this repo → open the Sheet → paste
  the new content into its Apps Script editor → `Deploy > Manage deployments` → edit the existing
  deployment → "New version" → Deploy. This preserves the same `/exec` URL, so `index.html` never
  needs to change. Full steps and the live Sheet's URL are in `webhook/README.md`.
- **Field mapping:** `doPost(e)` reads the Sheet's row-1 headers and maps incoming JSON fields to
  columns **by header name** (not fixed position), so reordering/adding sheet columns doesn't break
  it — this was a deliberate fix for an earlier bug where columns were hardcoded by position and
  leads landed under the wrong headers.
- **Manual test path:** `doTest()` in `Code.gs` fakes a realistic payload and calls `doPost()`
  directly, runnable from the Apps Script editor's Run button — this exists because running
  `doPost` itself from the editor always throws (it needs a real HTTP event object Google only
  supplies on an actual POST), which is expected, not a bug.

## 4. Data flow for a lead submission

1. Visitor fills `guideForm` (lead magnet) or `admissionsForm` (full inquiry) in `index.html`.
2. Page JS builds a payload (name, phone, childClass/childAge, intent, source) and adds
   `session` (from the `ADMISSIONS_SESSION` constant) and `submittedAt`.
3. `fetch(GOOGLE_SHEET_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })`.
4. Apps Script `doPost` parses it, maps fields to the Sheet's actual header row, appends one row.
5. (Lead-magnet form only) the guide PDF (`assets/guides/reclaim-focus-guide.pdf`) downloads
   client-side immediately after a successful submit.

## 5. Assets — drop-in convention

`assets/logos/`, `assets/photos/`, `assets/guides/` are each pre-wired in `index.html` to look for
an exact filename (documented in each folder's own `README.md`). Missing files degrade gracefully
(fallback badge, hidden slot, or an inert download link) rather than showing a broken image — so a
non-technical staff member can add/replace media by dropping a correctly-named file into the right
folder and pushing, with no code change. All three asset sets are currently present and committed.

**Not part of the live build:** `E:\GTS Ai - Claude Work\BFPS Landing Page\` (note: different name,
one level up, sibling to this repo) is a staging folder holding the original source images/PDF
these assets were derived from, plus two debugging screenshots from the `doPost` Run-button
non-bug (§3). It has no code and isn't referenced by `index.html` — see `AGENTS.md`'s "Folder note."

## 6. Hosting & deployment

- **Host:** GitHub Pages, "legacy" build type, serving branch `main` / path `/` (repo root) of
  `github.com/gauravtej3/bfps-landing-page`.
- **Live URL:** `https://gauravtej3.github.io/bfps-landing-page/` (HTTPS enforced, no custom
  domain configured).
- **Deploy mechanism:** pushing to `main` is the deploy — GitHub Pages rebuilds automatically.
  There is no separate CI/build pipeline to run.

## 7. Admin access model (why there's no in-app login)

This is a public static marketing page with no user accounts, sessions, or roles of its own — so
the workspace's standard in-app-admin-role convention doesn't apply here (nothing to grant a role
*in*). "Admin access" for this project instead means **owning the two external accounts that
control it.** See the top-level reply to the user for exact steps; in short:

| Capability | Controlled by | Who has it |
|---|---|---|
| Edit page content/code, push to `main`, trigger a redeploy | GitHub repo write access (`gauravtej3/bfps-landing-page`) | The `gauravtej3` GitHub account owner |
| View/export captured leads, edit the webhook script, redeploy it | Google account access to the "BFPS Lead 4m LP Contacts" Sheet | Whoever owns/is shared on that Google account |
| Update tracking (once activated) | Google Analytics / Meta Business Manager account access | Same as above, once GA4/Pixel are set up |

There is intentionally no separate "admin password" for the site itself — access is entirely
gated by who can authenticate to those two external accounts (GitHub + Google), consistent with the
workspace's account-identity-based (not shared-credential) approach to admin access elsewhere.

## 8. Secrets posture

No `.env`, no API keys in this repo. The Apps Script `/exec` URL embedded in `index.html` is a
public endpoint by design (the page must be able to call it from any visitor's browser) — it is not
a secret; Apps Script Web Apps are meant to be called this way. There is currently nothing in this
project that needs to go in the workspace root `.env`.
