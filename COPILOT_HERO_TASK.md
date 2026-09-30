# TASK: Update ONLY the homepage hero (dark banner + floating perfumes)

> Give this to Copilot Chat (Agent/Edit mode) with the workspace open:
> **"Follow COPILOT_HERO_TASK.md. Change only the homepage hero. Adapt to my current code and do not touch anything else."**

## Scope (strict)
- Change **only** the hero section at the top of the homepage, plus the small CSS it needs. Do NOT touch the header, ticker, footer, product cards, other homepage sections, other pages, cart, modal, admin, server, or routing.
- My code has changed since this reference was written. **My current code is the source of truth.** Map the design onto my existing components, class names and files. Do not paste the reference over my files.
- Keep the client's brand (Scent Design Nigeria): no EAC logo, photos or wording.
- No new npm dependencies. Plain CSS. Put the new CSS in `client/src/theme.css` (create it if missing, import it in the entry file AFTER the main stylesheet), or in my existing global CSS if I have no theme file.
- Show me the files you changed when done. Leave TODO comments instead of inventing content.

## What the hero must look like
**Desktop (over 760px):** full-width dark banner (dark gradient `linear-gradient(115deg,#151412 30%,#3b342b)`, white text). Two columns, about 1.2fr / 1fr, vertically centred, max-width 1120px, generous vertical padding (about 56 to 120px).
- **Left:** tiny uppercase eyebrow "Made in Ibadan since 1997" (0.7rem, letter-spacing 0.35em, light grey) then a big serif headline (Playfair Display 500, about 4.4rem max): "Discover your" and, on its own line, *"signature scent…"* in italic, grey (`#ffffff88`). Then one sentence: "Premium perfumes and body oils, blended in Nigeria and delivered to your door." Then two square-cornered uppercase buttons side by side: **"Explore collection"** (white fill, dark text, goes to the shop) and **"Our story"** (transparent, thin white-ish outline, goes to About).
- **Right:** the **existing floating perfume group** (`HeroStage`): 2 to 3 product bottle images bobbing up and down, a soft gold glow behind them, two thin rotating rings (one dashed, one solid, gold-tinted), and small twinkling sparkles. **Keep the existing component and its `HERO` images from config.** Do not replace it with a static image. Enlarge it for the hero: stage about 440px wide and 380px tall, bottles about 330 to 350px tall, rings about 340px and 260px.

**Mobile (760px and below):** single column. The floating perfume group goes **above** the text (`order:-1`) and is smaller (stage 260px tall, bottles about 210 to 230px, rings 240px and 180px). Text and buttons follow; buttons may stack.

**Motion:** keep the existing float, spin, pulse and twinkle animations. Keep whatever `prefers-reduced-motion` handling already exists.

**Fonts:** headline uses `Playfair Display`, body `Jost`. If not already loaded add to `index.html`:
`<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">`

## Steps
1. Find my current homepage hero and the `HeroStage` component (and the CSS for `.stage`, `.ring`, `.glow`, `.sp`). Briefly summarise what you found before editing.
2. Restructure the hero markup to the layout above, reusing my existing `HeroStage`, my navigation method for the two buttons, and my existing text where sensible (adjust copy only if mine is clearly different from the reference).
3. Add the hero CSS (reference below), adjusting selectors to my class names. Make sure the hero rules override the old `.stage` sizes (for example by scoping them as `.eh .stage`).
4. Check desktop and mobile widths and confirm: floating bottles animate, rings and glow are visible on the dark background, no horizontal scroll, buttons work, and nothing outside the hero changed.

## Acceptance checklist
- [ ] Dark hero with two columns on desktop; stage on top on mobile
- [ ] Floating bottle group, glow, rings and sparkles all present and animated
- [ ] Headline: white line + italic grey second line
- [ ] White solid "Explore collection" and ghost "Our story" buttons, square corners
- [ ] Only the hero was changed

## Reference code (older version of my project: ADAPT, don't paste)

### Hero markup (JSX)
`HeroStage` is my existing component (glow, two rings, sparkles, and the `HERO` images). `data-go` attributes are handled by a global click handler in the old code; replace with my navigation.
```jsx
<section className="eh"><div className="eh-in"><div><small className="eyebrow">Made in Ibadan since 1997</small>
<h1>Discover your <em>signature scent…</em></h1>
<p>Premium perfumes and body oils, blended in Nigeria and delivered to your door.</p>
<div className="acts"><button className="btn solid" data-go="products">Explore collection</button><button className="btn ghost" data-go="about">Our story</button></div></div>
<HeroStage/></div></section>
```

### Hero CSS
(The base `.btn` line is shared with the rest of the site; only add it if my buttons are not already square and uppercase, and scope it to the hero if unsure.)
```css
.btn{border-radius:0;letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;font-weight:500;background:#111;color:#fff;border:1px solid #111;padding:14px 26px}
.eyebrow{display:block;font-size:.7rem;letter-spacing:.35em;text-transform:uppercase;color:var(--mu)}
.btn.solid{background:#fff;color:#111;border-color:#fff}.btn.solid:hover{background:var(--paper);color:#111}
.btn.ghost{background:none;color:#fff;border-color:#ffffff88}.btn.ghost:hover{background:#ffffff22}
/* hero */
.eh{background:linear-gradient(115deg,#151412 30%,#3b342b);color:#fff;overflow:hidden}
.eh-in{max-width:1120px;margin:0 auto;padding:clamp(56px,10vw,120px) 20px;display:grid;grid-template-columns:1.2fr 1fr;gap:24px;align-items:center}
.eh .eyebrow{color:#ffffffbb;margin-bottom:18px}
.eh h1{font:500 clamp(2.4rem,6vw,4.4rem)/1.05 'Playfair Display',serif;text-transform:none}.eh h1 em{color:#ffffff88;display:block}
.eh p{max-width:420px;color:#ffffffcc;letter-spacing:.06em;margin:20px 0 28px}
.eh .acts{display:flex;gap:12px;flex-wrap:wrap}
/* floating perfume group (HeroStage) on the dark hero */
.eh .stage{width:min(440px,100%);height:380px;margin:0 auto}
.eh .stage img{height:330px}.eh .stage img:nth-of-type(2){height:350px}
.eh .stage .ring{width:340px;height:340px;margin:-170px 0 0 -170px;border-color:#e8c47a88}
.eh .stage .ring.r2{width:260px;height:260px;margin:-130px 0 0 -130px}
@media(max-width:760px){ .eh-in,.fw{grid-template-columns:1fr} .eh .stage{order:-1;height:260px} .eh .stage img{height:210px} .eh .stage img:nth-of-type(2){height:230px} .eh .stage .ring{width:240px;height:240px;margin:-120px 0 0 -120px} .eh .stage .ring.r2{width:180px;height:180px;margin:-90px 0 0 -90px} }
```

### Existing `HeroStage` (for reference, keep mine)
```jsx
export const HeroStage=()=><div className="stage"><div className="glow"/><div className="ring"/><div className="ring r2"/><span className="sp" style={{left:'8%',top:'12%'}}>✦</span><span className="sp" style={{right:'6%',top:'30%',animationDelay:'-1s'}}>✦</span><span className="sp" style={{left:'20%',bottom:'20%',animationDelay:'-2s'}}>✧</span>{HERO.map(u=><img key={u} src={u} alt="Scent Design perfume"/>)}</div>;
```
