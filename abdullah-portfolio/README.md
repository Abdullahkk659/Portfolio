# Portfolio — Abdullah

Next.js 15 (App Router, TypeScript) portfolio with a working contact backend.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; it runs fine empty
npm run dev                  # http://localhost:3000
```

Needs Node 20.9 or newer (`node -v` to check).

### Do not run `npm audit fix --force`

It is allowed to "fix" an advisory by downgrading a package to any older major
version that lacks the vulnerable code — including releases from years ago that are
incompatible with everything else here. Running it twice on this project downgrades
Next from 16 to 9.3.3 and breaks the build.

Most advisories `npm audit` reports for a Next.js app live in build-time tooling
(webpack loaders, babel, terser). That code runs on your machine and in the Vercel
build container. It never reaches a visitor. A portfolio with no user accounts and no
database is not meaningfully exposed by them. Plain `npm audit fix` is safe; the
`--force` variant is not.

If you have already run it, recover with:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

Without `RESEND_API_KEY` the contact route accepts submissions and logs them to the
server console instead of emailing. Nothing breaks.

## Edit the content

Everything the site says lives in **`src/lib/profile.ts`** — name, links, projects,
bullets, stack, benchmark numbers. Don't edit the components to change copy.

Still to replace before you deploy:

1. `socials.linkedin` and `socials.x` — real profile URLs (both are placeholders)
2. `profile.email` — confirm the domain; it's set to `abdullahqudoos10@gmail.com`

Benchmark figures are the real held-out test accuracies from the ML term report
(KNN 77.05, Logistic Regression 80.33, Gaussian Naive Bayes 81.97).

## Your photo

Save it as **`public/me.jpg`** — portrait orientation, 900x1200 or larger, head and
shoulders in the upper half. The card handles the rest: it crops from the top, converts
to grayscale, and fades to black behind the text. Until the file exists the card shows a
designed placeholder rather than a broken image.

## Structure

```
src/
  app/
    layout.tsx          fonts, metadata, JSON-LD
    page.tsx            page composition
    globals.css         the whole design system
    api/contact/route.ts  validation → rate limit → email
  components/
    Chrome.tsx          fixed section rail + live Gujranwala date/time
    Hero.tsx            portrait card, neon headline, ribbon, stats
    Stage.tsx           work list, owns the active-project state
    Device.tsx          the phone and its four screens
    Contact.tsx         form with real sending/sent/error states
  lib/profile.ts        all content
```

## Why this backend

For a portfolio, a separate API server is a liability — one more thing to keep awake,
one more deploy, one more cold start. Next.js Route Handlers give you a real Node
backend in the same project:

- **Validation** — zod, rejecting bad input with messages the form can display
- **Spam control** — honeypot field plus optional Upstash sliding-window rate limit
  (3 messages per IP per 10 minutes)
- **Delivery** — Resend, free tier, no SMTP setup
- **Degrades safely** — missing env vars downgrade behaviour instead of crashing

If you want a separate **Nest.js** service to demonstrate backend skill (that's what
Nest is for — it can't render this site), the natural split is a small analytics +
message-log API on Railway with Postgres, and point `fetch("/api/contact")` at it.
Worth doing only if the goal is showing off the architecture.

## Deploy

Push to GitHub, import at vercel.com, paste the env vars from `.env.example`.
Add a custom domain and Resend's DNS records so `CONTACT_FROM_EMAIL` isn't spam-foldered.

## Design notes

- **Palette** — near-black `#050608` page on pure black, panels `#0D1014`, one accent:
  neon blue `#1FB6FF` with `#7FE4FF` highlights and `#0A6FD8` depth. Nothing else is
  coloured, so every glow reads as deliberate.
- **Type** — Bricolage Grotesque (display), Public Sans (body), DM Mono (labels/data).
- **Signature** — one phone, sticky beside the work list. Scrolling a project into the
  middle of the viewport swaps the screen to a miniature of that project. The status bar
  and the header stamp show real Gujranwala time. The portfolio for a mobile developer
  should itself be a mobile demo.
- Keyboard focus is visible, `prefers-reduced-motion` is respected, layout collapses to
  a single column under 1000px.
