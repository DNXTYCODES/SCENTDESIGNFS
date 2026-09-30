# Fix: ProductCard must match the design exactly

I'm attaching `ProductCard.jsx` and `ProductCard.css`. Replace the current product card component with these two files. This is a strict copy, not inspiration.

Requirements (all mandatory):
1. Element order top to bottom: image with badges → NAME (bold uppercase, tracked) → category (italic serif, gray, BELOW the name) → price → description (2-line clamp) → SIZE (uppercase, 1px underline) → fragrance select (only if variants) → 5 stars + "(N) reviews" → ADD TO CART.
2. SIZE must always render when the product has one. Map it from the existing model field (size / volume / sizes[0] / first variant size) in the `map` block at the top of ProductCard.jsx.
3. Stars and "(N) reviews" must always render, even with 0 reviews. Default rating 4.
4. ADD TO CART: WHITE background, BLACK 1px border, BLACK text, square corners, full width. It only inverts to black background/white text on hover. No other colors, no rounded corners, no filled black default.
5. Do NOT edit ProductCard.css. Do NOT add other classes or Tailwind to this component. Delete or stop importing any old product-card CSS/component so nothing overrides `.sdc` styles. Search the repo for old global rules on `button`, `h3`, `select`, `.card`, `.product-card` and scope or remove them so they don't affect `.sdc`.
6. Every place that renders a product (Shop page, Home rows, related products) must use this same component.
7. Only edit the `map` block to fit my product schema. Keep onAdd(rawProduct, selectedVariant) signature, or adapt the caller to it without changing cart logic.
8. Run the dev server and verify at desktop and 390px width that a card shows: image, name, category, price, size, stars/reviews, white ADD TO CART button. Report anything that differs.
