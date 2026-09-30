# TASK: Restyle the storefront to an "EAC Home"-inspired minimal luxury look

> Paste this whole file into Copilot Chat (Agent/Edit mode) with the workspace open, or attach it as context and say:
> **"Follow COPILOT_TASK.md. Adapt it to my current code, do not overwrite my existing changes."**

## 1. Context
- Project: MERN store (React + Vite in `client/`, Express + MongoDB in `server/`) for **Scent Design Nigeria** (perfumes, Ibadan, since 1997).
- The client wants the **visual design and layout** of https://www.eachomefragrance.ng/ (minimal, airy, editorial, luxury).
- I have ALREADY changed the code and structure of this project. **My current code is the source of truth.** The reference code in section 6 was written against an older version of the project, so file names, component names, class names and props may differ. Map the *design* onto my existing code. Do not paste the reference over my files.

## 2. Hard rules
1. **Do not break functionality**: cart, product modal, bank-transfer checkout, admin panel, API calls, routing, search and filters must all keep working.
2. **Do not delete or rewrite my custom logic or structure.** Change markup and CSS only where needed. If a file has my custom changes, edit it in place and preserve them.
3. **Keep the client's brand**: name, logo, products, categories, prices, copy and bank details stay Scent Design Nigeria's. Do NOT copy EAC's logo, photos, product names or wording. Only borrow layout and styling.
4. Work in small steps. After each step, list the files you changed and confirm the app still compiles (`npm run dev`).
5. Do not add new npm dependencies. Plain CSS, no Tailwind or UI libraries.
6. Keep it responsive (mobile first, breakpoint about 760px) and accessible (visible focus, alt text, buttons are real `<button>`s).
7. Put all new styling in ONE new file `client/src/theme.css`, imported in `main.jsx` AFTER the existing stylesheet, so it can be reverted by removing one import. Only edit existing CSS if an override cannot work.
8. Where you must guess something (missing image, missing copy), leave a visible TODO instead of inventing facts.

## 3. Design spec (what to match)
**Feel:** lots of whitespace, thin 1px lines, no shadows or rounded corners on buttons and cards, small wide-spaced uppercase labels, elegant serif italics for emphasis.

**Palette:** white `#fff`, off-white `#faf8f4`, ink `#111`, muted grey `#777`, hairline `#e8e3da`, gold accent `#b8893a` (used sparingly, e.g. footer headings). Remove the previous purple as the dominant colour. If the site uses CSS variables (e.g. `--pu`, `--go`), re-point them rather than hunting every rule.

**Type:** Headings `Playfair Display` (400/500 + italic 400). Body `Jost`. Add to `index.html`:
`<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">`
Small labels: 0.6 to 0.72rem, uppercase, letter-spacing 0.2 to 0.35em.

**Buttons:** square corners, uppercase, letter-spacing 0.2em, about 0.72rem. Primary = black fill. Secondary = 1px black outline. On dark hero: white solid + white-outline ghost.

**Header:** white, 1px bottom border, logo left, minimal uppercase nav (small, wide tracking), cart as outlined uppercase button. Announcement ticker (if present): thin black bar, uppercase 0.68rem.

**Homepage sections, in this order:**
1. **Hero**: dark full-width banner (dark gradient or lifestyle photo with dark overlay). Eyebrow "Made in Ibadan since 1997". Big serif headline, second line italic and grey (e.g. "Discover your / *signature scent…*"). One sentence of copy. Two buttons: "Explore collection" (white solid) and "Our story" (ghost). On the right on desktop (above the text on mobile) keep the **existing floating perfume group** (`HeroStage`: 2 to 3 product bottles bobbing up and down, a soft gold glow, two slowly rotating thin rings, twinkling sparkles). Do NOT replace it with a static image. Reuse the existing component and its `HERO` images, and restyle it for the dark background (larger, gold rings) as in the reference CSS. Keep the existing `prefers-reduced-motion` handling.
2. **Philosophy**: centred, max-width about 760px, small uppercase eyebrow "Our philosophy" + one quote paragraph.
3. **Category tiles**: 3 columns (1 on mobile), portrait 4:5 image blocks, **the middle tile offset down about 44px on desktop**. Under each: lowercase italic serif name, tiny uppercase tagline, a short 28px hairline. Each links to the shop filtered by that category. Image = first product photo in that category (fallback: off-white block with a simple bottle silhouette in that product's colour).
4. **"The essentials"** (best sellers/featured): section header row = uppercase serif title + tiny uppercase subtitle on the left, underlined "View all" link on the right, hairline under the row. Below, product grid.
5. **One section per category** (first 2 or 3 categories) with the same header row and a 4-item grid.
6. **Founder story**: off-white background, 2 columns. Left: portrait photo with a black "EST. 1997" tag overlapping the bottom-right corner. Right: serif heading "Designed for the *signature.*", a quote, "Founder and Curator" in italic. Make the photo configurable (`FOUNDER_IMG` in config; fall back to the logo). Quote text is a TODO for the client.
7. **Help banner**: centred off-white box, eyebrow "Personalised guidance", heading "Need help choosing *your scent?*", one line, underlined "Send us a message" link to WhatsApp (`https://wa.me/<number>?text=...`), falling back to the contact page if no number is set.
8. **How to order strip**: four columns "01 Pick your perfume / 02 Enter delivery details / 03 Pay by bank transfer / 04 Send proof, we dispatch". Keep this because checkout is by bank transfer.
9. **Footer**: white, top hairline, gold uppercase column headings, plain dark links, keep my existing columns and content (address, payment, social).

**Product card:** no border, no shadow, no radius. Off-white image area. Small uppercase category tag, italic serif product name, price, then a black "View and add" button. Small square black badge "Best seller" and a sale badge if the code has one. Keep the existing click behaviour (opens my product modal).

**Remove from homepage (EAC does not have these):** stats bar, scent-family cards, "why customers choose us", trust badges, long FAQ. Do NOT delete them from the codebase. Move them to a `Home.old.jsx` (or comment out) so they can be restored.

**Other pages (Products, About, Contact, cart drawer, modal):** do not redesign. Just make sure they inherit the new fonts, colours, square buttons and flat cards without layout breakage. Fix anything that looks broken.

## 4. Steps for Copilot
1. Read my current `client/src` (entry, App, components, pages, styles, config). Summarise the structure and which files hold: header, footer, product card, home page, global CSS variables. Ask me only if something is truly ambiguous.
2. Create `client/src/theme.css` from section 6A, adjusting selectors to MY class names. Import it last in the entry file.
3. Update the font link in `index.html`.
4. Restyle header, footer and product card (CSS first; edit markup only if needed).
5. Rebuild the home page per section 3 using section 6B as a reference, reusing MY existing product card component, store/hooks, category data and routing helpers.
6. Add `FOUNDER_IMG` (empty string) to the config file if there is one.
7. Check desktop and mobile widths. Verify: cart opens, modal opens, category tiles filter the shop, WhatsApp link works, admin still loads.
8. Give me a short summary: files changed, anything skipped, TODOs left for the client.

## 5. Acceptance checklist
- [ ] No purple dominant colour; palette is white, off-white, black, gold accents
- [ ] Playfair Display headings with italic accents, Jost body
- [ ] Buttons and cards are square, no shadows
- [ ] Homepage sections in the order above; middle category tile offset on desktop
- [ ] Mobile layout stacks cleanly, no horizontal scroll
- [ ] All existing features still work and my earlier changes are intact
- [ ] Old homepage sections preserved in `Home.old.jsx`, not deleted
- [ ] No EAC logo, images or copy used

## 6. Reference implementation (written for an older version of my project: ADAPT, don't paste)

### 6A. `client/src/theme.css`
```css
/* EAC-inspired theme: minimal, airy, editorial. Loaded after index.css so it overrides it. */
:root{--pu:#111;--pu2:#333;--pd:#111;--go:#b8893a;--tint:#faf8f4;--paper:#faf8f4;--ln:#e8e3da;--tx:#1c1c1c;--mu:#777}
body{font-family:Jost,system-ui,sans-serif;letter-spacing:.01em}
h1,h2,h3{font-family:'Playfair Display',Georgia,serif;font-weight:400}
h1 em,h2 em{font-style:italic;color:var(--mu)}
.eyebrow{display:block;font-size:.7rem;letter-spacing:.35em;text-transform:uppercase;color:var(--mu)}
/* buttons */
.btn{border-radius:0;letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;font-weight:500;background:#111;color:#fff;border:1px solid #111;padding:14px 26px}
.btn.line{background:none;color:#111}.btn:hover{background:#333;color:#fff}.btn.line:hover{background:#111}
.btn.solid{background:#fff;color:#111;border-color:#fff}.btn.solid:hover{background:var(--paper);color:#111}
.btn.ghost{background:none;color:#fff;border-color:#ffffff88}.btn.ghost:hover{background:#ffffff22}
/* header + ticker */
.ann{background:#111;color:#fff;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase}
header{border-bottom:1px solid var(--ln)}
.brand b{font:400 1.05rem 'Playfair Display',serif}.brand small{letter-spacing:.2em;text-transform:uppercase;font-size:.6rem}
nav button{text-transform:uppercase;letter-spacing:.25em;font-size:.68rem;color:#111;border-radius:0}
nav button[aria-selected=true]{border-bottom:1px solid #111;background:none;color:#111}
.cartbtn{border-radius:0;background:none;color:#111;border:1px solid #111;letter-spacing:.2em;text-transform:uppercase;font-size:.68rem}
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
/* philosophy */
.phil{text-align:center;max-width:760px;margin:0 auto;padding:clamp(56px,9vw,110px) 20px}
.phil blockquote{margin:18px 0 0;font:400 clamp(1.15rem,2.2vw,1.5rem)/1.7 Jost,sans-serif;color:#222}
/* category tiles */
.tiles{max-width:1120px;margin:0 auto;padding:0 20px 80px;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,3vw,32px);align-items:start}
.tile{background:none;border:0;padding:0;text-align:center;color:#111}
.tile:nth-child(2){margin-top:44px}
.tile .ph{aspect-ratio:4/5;display:grid;place-items:center;overflow:hidden}.tile img{width:70%;height:80%;object-fit:contain;transition:transform .6s}
.tile .bt{width:26%;aspect-ratio:1/2.6;border-radius:8px 8px 14px 14px;box-shadow:0 14px 24px #0002}
.tile:hover img{transform:scale(1.06)}
.tile em{display:block;font:italic 400 1.3rem 'Playfair Display',serif;margin-top:16px}
.tile small{display:block;letter-spacing:.3em;text-transform:uppercase;font-size:.62rem;color:var(--mu);margin-top:4px}
.tile i{display:block;width:28px;height:1px;background:#bbb;margin:12px auto 0}
/* product sections */
.es{max-width:1120px;margin:0 auto;padding:0 20px 70px}
.sh{display:flex;justify-content:space-between;align-items:end;margin-bottom:26px;border-bottom:1px solid var(--ln);padding-bottom:14px}
.sh h2{font:400 1.6rem 'Playfair Display',serif;letter-spacing:.12em;text-transform:uppercase}
.sh p{margin:4px 0 0;font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--mu)}
.sh a{font-size:.68rem;letter-spacing:.25em;text-transform:uppercase;color:#111;text-decoration:none;border-bottom:1px solid #111}
.card.pc{border:0;box-shadow:none;background:none;border-radius:0;text-align:left}
.card.pc .img{background:var(--paper);border-radius:0}
.card.pc h3{font:italic 400 1.15rem 'Playfair Display',serif}
.card.pc .tag{letter-spacing:.28em;text-transform:uppercase;font-size:.6rem;color:var(--mu);background:none;padding:0}
.ribbon,.sale{border-radius:0;letter-spacing:.2em;text-transform:uppercase;font-size:.58rem;background:#111;color:#fff}
/* founder + help + how */
.founder{background:var(--paper);padding:clamp(48px,8vw,100px) 20px}
.fw{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,6vw,72px);align-items:center}
.fph{position:relative;aspect-ratio:4/5;background:#fff;display:grid;place-items:center;box-shadow:0 20px 50px #0001}
.fph img{width:100%;height:100%;object-fit:cover}.fph img.lg{width:55%;height:auto;object-fit:contain}
.fph span{position:absolute;right:-12px;bottom:-14px;background:#111;color:#fff;font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;padding:14px 18px}
.founder h2{font-size:clamp(2rem,4vw,3rem)}.founder p{color:#444;line-height:1.9;margin:18px 0}
.who{font:italic 400 1rem 'Playfair Display',serif;color:#111}
.help{text-align:center;max-width:860px;margin:60px auto;padding:56px 20px;background:var(--paper)}
.help h2{font-size:clamp(1.8rem,3.5vw,2.6rem);margin:14px 0}.help p{color:#555;max-width:520px;margin:0 auto 22px}
.ul{font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#111;text-decoration:none;border-bottom:1px solid #111;padding-bottom:4px}
.fw4{max-width:1120px;margin:0 auto 60px;padding:0 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mu)}
.fw4 b{display:block;font:italic 400 1.6rem 'Playfair Display',serif;color:#111;letter-spacing:0;margin-bottom:6px}
/* footer */
footer{background:#fff;color:#333;border-top:1px solid var(--ln)}
footer h4{font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:var(--go);font-weight:500}
footer a{color:#333;text-decoration:none}
@media(max-width:760px){.eh-in,.fw{grid-template-columns:1fr}.eh .stage{order:-1;height:260px}.eh .stage img{height:210px}.eh .stage img:nth-of-type(2){height:230px}.eh .stage .ring{width:240px;height:240px;margin:-120px 0 0 -120px}.eh .stage .ring.r2{width:180px;height:180px;margin:-90px 0 0 -90px}.tiles{grid-template-columns:1fr}.tile:nth-child(2){margin-top:0}.fw4{grid-template-columns:1fr 1fr}.fph{max-width:340px}}
```

### 6B. Homepage (`client/src/pages/Home.jsx`)
It uses these from the old project: `useShop()` (gives `products`, `categories`), the existing `HeroStage` floating-perfumes component, a `Card` component for products, `CFG` and `HERO` from config, and `data-go`/`data-cat` attributes that a global click handler turns into navigation. Replace those with my current equivalents.
```jsx
import {useShop} from '../store';import {Card,HeroStage} from '../components';import {CFG,FOUNDER_IMG} from '../config';
const TAG={Men:'Bold and woody',Women:'Floral and elegant',Unisex:'Made for everyone','Body oils':'Soft and lasting','Gift sets':'Ready to give'};
const wa=CFG.wa?{href:'https://wa.me/'+CFG.wa+'?text='+encodeURIComponent('Hi! I would love some help choosing a fragrance.'),target:'_blank',rel:'noopener noreferrer'}:{href:'#','data-go':'contact'};
export default function Home(){const{products,categories}=useShop(),cats=categories.slice(0,3),of=c=>products.filter(p=>p.c===c);
return(<>
<section className="eh"><div className="eh-in"><div><small className="eyebrow">Made in Ibadan since 1997</small>
<h1>Discover your <em>signature scent…</em></h1>
<p>Premium perfumes and body oils, blended in Nigeria and delivered to your door.</p>
<div className="acts"><button className="btn solid" data-go="products">Explore collection</button><button className="btn ghost" data-go="about">Our story</button></div></div>
<HeroStage/></div></section>

<section className="phil"><small className="eyebrow">Our philosophy</small><blockquote>“A fragrance is more than a scent. It is the quiet signature you leave behind. Every bottle is blended with care to become part of your story.”</blockquote></section>

<section className="tiles">{cats.map(c=>{const p=of(c).find(x=>x.img);return <button key={c} className="tile" data-go="products" data-cat={c}>
<div className="ph" style={{background:p?'#e6b955':'var(--paper)'}}>{p?<img src={p.img} alt={c}/>:of(c)[0]&&<span className="bt" style={{background:of(c)[0].col}}/>}</div><em>{c}</em><small>{TAG[c]||'Explore'}</small><i/></button>})}</section>

<section className="es"><div className="sh"><div><h2>The essentials</h2><p>Our most loved fragrances</p></div><a href="#" data-go="products" data-cat="All">View all</a></div>
<div className="grid">{products.filter(p=>p.f).map(p=><Card key={p.id} p={p}/>)}</div></section>

{cats.map(c=><section className="es" key={c}><div className="sh"><div><h2>{c}</h2><p>{TAG[c]||''}</p></div><a href="#" data-go="products" data-cat={c}>View {c}</a></div>
<div className="grid">{of(c).slice(0,4).map(p=><Card key={p.id} p={p}/>)}</div></section>)}

<section className="founder"><div className="fw"><div className="fph">{FOUNDER_IMG?<img src={FOUNDER_IMG} alt="Founder"/>:<img className="lg" src="/logo.jpg" alt="Scent Design Nigeria"/>}<span>Est. 1997</span></div>
<div><h2>Designed for the <em>signature.</em></h2><p>“Scent Design Nigeria began in Old Bodija, Ibadan with one belief: the right fragrance can change how you feel about your day. Nearly three decades on, we still blend with the same care.” <span className="todo">Replace with the founder’s own words</span></p><small className="who">Founder and Curator</small></div></div></section>

<section className="help"><small className="eyebrow">Personalised guidance</small><h2>Need help choosing <em>your scent?</em></h2><p>Whether it is a gift or for yourself, we are happy to guide you on WhatsApp.</p><a className="ul" {...wa}>Send us a message</a></section>

<section className="how"><div className="fw4"><div><b>01</b>Pick your perfume</div><div><b>02</b>Enter delivery details</div><div><b>03</b>Pay by bank transfer</div><div><b>04</b>Send proof, we dispatch</div></div></section></>)}
```

### 6C. Config addition
```js
// Founder / shop photo for the homepage story section, e.g. '/img/founder.jpg' (put the file in client/public/img)
export const FOUNDER_IMG='';
```
