# MASTER SPEC — BFPS Landing Page

Authoritative, current product spec. `PRD.md` is the original brief this was built from and stays
as historical record; this file reflects what the page actually is/does today and is what future
changes should be checked against. If the two disagree, this file wins (and `PRD.md` should be
treated as superseded, not re-derived from).

## 1. Purpose

Lead-generation landing page for **Bright Future Public School (BFPS), Jaipur** (pincode 302004).
Goal: capture contact details of nearby parents to grow enrollment from ~200 toward the 400-student
capacity. Messaging deliberately centers the *institution* (philosophy, curriculum, facilities), not
individual teachers, because of high staff turnover.

## 2. Audience & positioning

Primary persona: **Mrs. Priya Sharma (38, upper-middle class, dual-income)** — wants academic rigor
balanced with values and global/future readiness; avoiding both "exam factory" and purely
play-focused schools.

Core brand philosophy: **"Head, Hand, and Heart"** — holistic development, critical thinking, moral
character — blended with a competitive tech edge (AI curriculum) no other local school offers.

Split funnel:
- **Junior Wing** — Kokoon, The Pre-School (PG–1st). Focus: nurturing environment, "play more,
  grow" philosophy.
- **Senior Wing** — 7th–10th. Focus: AI-powered classes, academic excellence, "future-ready
  citizens."

## 3. Page structure (as built, `index.html`, top to bottom)

1. **Header/Nav** — BFPS logo (circular badge, falls back to "BF" text badge until a real file is
   dropped in), sticky.
2. **Hero** — Headline: *"Bright Future Public School: Academic Excellence, Rooted in Values."*
   Split pathing into Junior vs. Senior wing CTAs.
3. **Trust/Enrollment strip** — credibility strip under the hero.
4. **Head, Hand & Heart philosophy section** (`#philosophy`).
5. **Junior Wing section** (`#junior`) — Kokoon branding/logo, campus photo, "Play More, Grow."
   messaging.
6. **Senior Wing section** (`#senior`) — AI Tech Lab photo, future-ready/AI messaging.
7. **Lead magnet section** (`#guide`) — free download of *"Reclaim Focus: Smart Device Rules for
   Academic Growth"* in exchange for name, phone, child's age (`guideForm`).
8. **Admissions / lead capture section** (`#admissions`) — full inquiry form (`admissionsForm`):
   name, phone, child's class (dropdown), intent (dropdown). Session badge (e.g. "Admissions
   2026–27") driven by the `ADMISSIONS_SESSION` JS constant.
9. **Footer** — school info, copyright year (auto-updated via JS), social links.
10. **Mobile sticky CTA bar** — fixed bottom bar on small screens (page has `padding-bottom` reserved
    for it so it never covers content).

## 4. CTAs & contact channels

- **Click-to-call:** Admissions numbers **9251414913** and **951414914**.
- **Social:** Instagram `@bfpsjaipur`, Facebook `https://www.facebook.com/BFPSjaipur`.
- **Lead capture:** two forms (lead-magnet form, full admissions form), both POST to the same
  Google Apps Script webhook — see `ARCHITECTURE.md`.

## 5. Design system ("Enlightened Minimalism")

8-point grid, generous negative space.

| Token | Value | Use |
|---|---|---|
| Primary Blue | `#004A8F` | Primary buttons, headers |
| Secondary Green | `#2A625A` | Secondary accents, Junior Wing theme |
| Accent Gold | `#EBA83A` | Highlights, stars, special CTA text |
| Background | `#F8F8F8` | Main background |
| Text | `#333333` | Body copy |

Typography: **Merriweather** (700/900) for headings, **Open Sans** (400/600/700) for body/buttons —
both loaded via Google Fonts, configured as Tailwind's `font-heading`/`font-body`.

These are wired into `index.html`'s inline `tailwind.config` (`theme.extend.colors`/`fontFamily`) —
edit there, not a separate config file (there is no build step / no `tailwind.config.js`).

## 6. Data collected per lead

`name`, `phone`, `childClass` (admissions form) or `childAge` (lead-magnet form), `intent`,
`source`, `session` (from `ADMISSIONS_SESSION`), `submittedAt`. See `ARCHITECTURE.md` for how this
maps to Google Sheet columns.

## 7. Tracking (spec'd, not yet activated)

Placeholders present in `index.html`'s `<head>` for:
- Google Analytics 4 (`gtag.js`, Measurement ID `G-XXXXXXXXXX`)
- Meta/Facebook Pixel (`fbevents.js`, Pixel ID `YOUR_PIXEL_ID`)

Both blocks are HTML-commented out and use placeholder IDs — see `FEATURE_MATRIX.md` for status and
`CLAUDE_CODE_PROMPTS.md` for the ready prompt to activate them once real IDs are supplied.

## 8. Recurring maintenance

- **Each admissions cycle (~April):** update the `ADMISSIONS_SESSION` constant in `index.html`
  (one line) — every new lead is auto-tagged with the new value; old rows keep their original
  session. No new sheet/script needed.
- **Logos/photos/guide PDF:** drop-in convention — see the README in each `assets/*` subfolder.
  Non-technical staff can swap these without touching code.

## 9. Explicitly out of scope

- No CMS/admin dashboard in the app itself — this is a static marketing page with no user accounts
  (see `ARCHITECTURE.md`'s "Admin access model" for how content/data access actually works).
- No payment processing.
- No individual faculty bios/profiles (deliberate, per staff-turnover strategy above).
