# TASK: Update ONLY the homepage hero (dark banner + floating perfumes)

## How to give this to Copilot
1. Copy this whole `copilot-hero` folder into the project root (anywhere in the workspace is fine).
2. Open Copilot Chat, switch to **Agent** mode, and attach (drag in or use "Add Context"): this file, everything in `reference/` (including the two `target-*.png` screenshots) and the images in `assets/`.
3. Send: **"Follow COPILOT_HERO_TASK.md. Change only the homepage hero. Match the target screenshots. Adapt to my current code and do not touch anything else."**

## Files in this package
| File | What it is |
|---|---|
| `assets/hero-1.webp` | NEW transparent cut-out of the amber faceted bottle. Copy to `client/public/img/hero-1.webp` |
| `assets/sk.webp` | Paradox Silver Knight bottle (transparent). Should already exist at `client/public/img/sk.webp`; copy only if missing |
| `reference/target-desktop.png`, `reference/target-mobile.png` | **The look to match** (desktop and mobile) |
| `reference/Hero.jsx` | Reference hero markup (React) |
| `reference/hero.css` | Reference hero CSS incl. mobile rules |
| `reference/HeroStage.jsx` | The existing floating-perfumes component and the animation CSS it relies on (keep mine) |
| `reference/config-snippet.js` | The `HERO` image list for `config.js` |

## Scope (strict)
- Change **only** the hero at the top of the homepage plus the small CSS and config it needs. Do NOT touch the header, ticker, footer, product cards, other homepage sections, other pages, cart, modal, admin, server, or routing.
- The reference code was written against an older version of my project. **My current code is the source of truth.** Map the design onto my existing components, class names and files. Do not paste the reference over my files.
- Keep the client's brand (Scent Design Nigeria). No new npm dependencies. Plain CSS.
- Put new CSS in `client/src/theme.css` (create it if missing and import it in the entry file AFTER the main stylesheet), or in my existing global CSS if I don't use a theme file.
- Leave TODO comments instead of inventing content. Show me every file you changed at the end.

## What the hero must look like (see `target-desktop.png` and `target-mobile.png`)
**Desktop (over 760px):** full-width dark banner (`linear-gradient(115deg,#151412 30%,#3b342b)`, white text). Two columns (about 1.2fr / 1fr), vertically centred, max-width 1120px, generous vertical padding (56 to 120px).
- **Left:** small uppercase eyebrow "Made in Ibadan since 1997" (0.7rem, letter-spacing 0.35em, light grey). Big serif headline (Playfair Display 500, up to about 4.4rem): "Discover your" then on its own line *"signature scent…"* in italic grey (`#ffffff88`). One sentence: "Premium perfumes and body oils, blended in Nigeria and delivered to your door." Two square-cornered uppercase buttons side by side: **"Explore collection"** (white fill, dark text, goes to the shop) and **"Our story"** (transparent, thin light outline, goes to About).
- **Right:** the **existing floating perfume group** (`HeroStage`): two bottles bobbing up and down (amber faceted bottle + Paradox Silver Knight), a soft gold glow, two thin rotating gold-tinted rings, and small twinkling sparkles. **Keep my existing component. Do not replace it with a static image.**
  - Point `HERO` in `config.js` to `['/img/hero-1.webp','/img/sk.webp']`.
  - Stage about 480px wide and 380px tall; rings about 340px and 260px.
  - Size the two images separately: 1st image about **350px** tall, 2nd about **330px** tall, both with `max-width:none` and small negative side margins (about -8px) so they slightly overlap. The old rule `.stage img{max-width:48%}` would squeeze them, so override it.
  - Scope the hero rules as `.eh .stage ...` so they beat the old `.stage` sizes.

**Mobile (760px and below):** single column. The floating group goes **above** the text (`order:-1`), stage 260px tall, bottles about 225px and 210px tall, rings 240px and 180px. Buttons may stack.

**Motion:** keep the existing float, spin, pulse and twinkle animations and any `prefers-reduced-motion` handling.

**Fonts:** headline `Playfair Display`, body `Jost`. If not already loaded, add to `index.html`:
`<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">`

## Steps
1. Find my current homepage hero, the `HeroStage` component, and the CSS for `.stage`, `.ring`, `.glow`, `.sp`. Summarise what you found in a few lines before editing.
2. Copy `assets/hero-1.webp` into `client/public/img/` (and `sk.webp` only if missing). Update `HERO` in `config.js`.
3. Restructure the hero markup to the layout above using `reference/Hero.jsx`, reusing my `HeroStage`, my navigation method for the two buttons, and my existing copy where it already matches.
4. Add the hero CSS from `reference/hero.css`, adapted to my class names and variables (define `--mu` and `--paper` if missing).
5. Check desktop and mobile widths against the target screenshots. Confirm: bottles animate, rings and glow are visible on dark, no horizontal scroll, both buttons work, and nothing outside the hero changed.

## Acceptance checklist
- [ ] Dark hero, two columns on desktop, floating group on top on mobile
- [ ] Two bottles (amber faceted + Paradox) floating with glow, rings and sparkles
- [ ] Headline: white line plus italic grey second line
- [ ] White solid "Explore collection" and ghost "Our story", square corners
- [ ] `HERO` uses `/img/hero-1.webp` and `/img/sk.webp`
- [ ] Only the hero (plus its CSS and config) was changed
