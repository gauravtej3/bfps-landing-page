# FEATURE MATRIX — BFPS Landing Page

Status legend: ✅ Built & verified live · 🟡 Built, placeholder/needs real value · ⬜ Not started

Check this before assuming anything is missing or re-doing work — per workspace policy, don't
re-verify rows marked ✅ "just in case"; only re-check a row a specific new change actually touches.

| # | Feature | Status | Notes |
|---|---|---|---|
| 1 | Header/nav with BFPS logo | ✅ | `bfps-logo.png` present in `assets/logos/`, committed. |
| 2 | Hero section + split pathing (Junior/Senior) | ✅ | |
| 3 | Trust/enrollment strip | ✅ | |
| 4 | "Head, Hand & Heart" philosophy section | ✅ | |
| 5 | Junior Wing section (Kokoon) | ✅ | Logo (`kokoon-logo.png`) + campus photo (`kokoon-campus.jpg`) both present and committed. |
| 6 | Senior Wing section (AI Tech) | ✅ | Photo (`ai-tech-lab.jpg`) present and committed (converted from source PNG, ~290KB). |
| 7 | Lead-magnet section + form (`guideForm`) | ✅ | Free "Reclaim Focus" guide download wired; `reclaim-focus-guide.pdf` present in `assets/guides/`, committed. |
| 8 | Admissions form (`admissionsForm`) | ✅ | Name, phone, child's class, intent; posts to webhook. |
| 9 | Admissions session badge/tagging | ✅ | `ADMISSIONS_SESSION` constant, currently `'2026–27'`; flows into `session` field on every lead and the `Session` sheet column. |
| 10 | Mobile sticky CTA bar | ✅ | Page reserves bottom padding on mobile so it never overlaps content. |
| 11 | Footer (school info, social links, auto copyright year) | ✅ | |
| 12 | Click-to-call CTAs (9251414913 / 951414914) | ✅ | |
| 13 | Instagram/Facebook links (@bfpsjaipur / BFPSjaipur) | ✅ | |
| 14 | Lead webhook → Google Sheet (Apps Script) | ✅ | Column-mapping bug fixed (maps by header name, not position) — see `webhook/README.md`. `doTest()` helper added for safe manual verification. |
| 15 | Asset drop-in convention (logos/photos/guide) | ✅ | READMEs in each `assets/*` folder; all three asset sets already dropped in and committed. |
| 16 | GitHub Pages hosting | ✅ | Live at `https://gauravtej3.github.io/bfps-landing-page/`, `status: built`, HTTPS enforced, serving `main` branch root. |
| 17 | Google Analytics 4 (GA4) | 🟡 | Script block present but commented out; Measurement ID is still the placeholder `G-XXXXXXXXXX`. Needs a real GA4 property + ID. |
| 18 | Meta/Facebook Pixel | 🟡 | Script block present but commented out; Pixel ID is still the placeholder `YOUR_PIXEL_ID`. Needs a real Pixel ID from Meta Events Manager. |
| 19 | GA4/Pixel conversion event on form submit | 🟡 | Commented-out `gtag('event', 'generate_lead')` placeholder exists in the submit handler in `index.html`; inactive until #17/#18 are live. |
| 20 | Custom domain (vs. `github.io` subdomain) | ⬜ | Not requested/configured; currently on the default GitHub Pages subdomain. |
| 21 | Admin/CMS UI inside the app | ⬜ (by design) | Not in scope — see `MASTER_SPEC.md` §9 and `ARCHITECTURE.md`'s admin access model. Content/data access is via GitHub + Google account access, not an in-app login. |

## Known blockers

None currently — all rows above are either ✅ or 🟡-pending-a-value-only-Gaurav/Garv-can-supply
(a GA4 Measurement ID and a Meta Pixel ID). No code work is blocked; the code path for both is
already written and only needs the two real IDs swapped in and the comment blocks uncommented.
