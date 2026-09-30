# Task: Restyle the Scent Design frontend using the provided design files

Paste this whole file into Copilot Chat (Agent mode) with the workspace open. Also attach the 6 files in this folder.

## Goal
Replace the **visual layer only** of the existing React frontend with the new design in `sd.css`, `Header.jsx`, `Footer.jsx`, `Home.jsx`, `Shop.jsx`, `ProductCard.jsx`. Keep all Scent Design content, data, and logic.

## Rules
1. **Do not change** backend, admin app, API calls, auth, cart/checkout logic, context/redux stores, or routes. Only change JSX structure and CSS of the storefront.
2. **Keep Scent Design content**: logo, brand name, tagline, hero text and image, philosophy text, category names/images, founder/about content, WhatsApp/Instagram links, footer text. The provided files use placeholders — wire in the existing values (from current components, config, or the DB), do not ship placeholder text.
3. **Home section order** must stay: Hero → Philosophy → Category trio → Best sellers → Our collections → About/Founder → CTA → Footer. Reuse existing components' data sources for "Best sellers" and "Our collections".
4. **Reuse existing data fetching and cart hooks.** Pass them into the new components via props (`products`, `categories`, `onAdd`, `cartCount`, `onCart`). Adapt the new components rather than rewriting the data layer.
5. **Product field mapping** in `ProductCard.jsx`: map the existing model to `name, category, price, oldPrice, size, description, image, stock, bestSeller, limited, variants[], rating, reviewCount, _id`. Keep existing behavior for variants and cart items (variant must be chosen before add if variants exist). Preserve the existing product detail route.
6. **Remove old CSS** that conflicts (old header, footer, card, hero, shop styles). Import `sd.css` once in the entry file. Avoid global resets that break the admin app if it shares the bundle.
7. Add to `index.html` `<head>`:
   `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">`
8. If the project uses Tailwind or a component library, keep them installed but do not use them in the new components. If `react-router-dom` `Link` is not used, adapt the imports to the existing router.
9. Keep responsive behavior: 4-col grid → 2 → 1; hero buttons stack on mobile; category trio stacks on mobile.
10. Preserve existing SEO tags, favicons, and analytics.

## Design notes (do not alter unless told)
- Body sans (Inter), headings italic serif (Newsreader), labels tiny uppercase with wide letter-spacing, square corners, 1px black buttons.
- Card badges: rust "<5 units left" when 0 < stock < 5, dark "Best seller", dark "Limited", round gold "Sale" when oldPrice > price. If stock is 0, the button reads "Out of stock" and is disabled.
- Descriptions clamp to 2 lines with a "...Show more" toggle.
- Fonts/colors are close approximations. Tokens live in `:root` at the top of `sd.css` for easy tuning.

## Steps
1. Inspect the current frontend: routes, layout, Header/Footer/Home/Shop/Product card components, and where cart state lives.
2. Show me a short plan mapping each old component to a new one, and list every place placeholder props need real data. Wait for my OK.
3. Implement, replacing old markup and styles. Then run the dev server, fix any errors and warnings, and confirm Home and Shop render at desktop and 390px widths.
4. Summarize changed files, deleted files, and anything that needs my decision.
