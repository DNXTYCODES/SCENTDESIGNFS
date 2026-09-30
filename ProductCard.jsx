import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const naira = (n) => "₦" + Number(n || 0).toLocaleString("en-NG");

/**
 * Exact-layout product card. Order (top to bottom) — DO NOT REORDER:
 * image+badges → NAME → category → price → description → SIZE → variant select → stars+reviews → ADD TO CART
 * Adapt ONLY the `map` block below to the existing product model.
 */
export default function ProductCard({ p: raw, onAdd }) {
  // ---- field mapping (edit right-hand sides only) ----
  const p = {
    id: raw._id || raw.id,
    name: raw.name,
    category: raw.category?.name || raw.category,
    price: raw.price,
    oldPrice: raw.oldPrice || raw.compareAtPrice || 0,
    size: raw.size || raw.volume || raw.sizes?.[0] || "",
    description: raw.description || "",
    image: raw.image || raw.images?.[0]?.url || raw.images?.[0],
    stock: raw.stock ?? raw.countInStock ?? 99,
    bestSeller: !!(raw.bestSeller || raw.isBestSeller),
    limited: !!raw.limited,
    variants: (raw.variants || raw.fragrances || []).map((v) => (typeof v === "string" ? v : v.name)),
    rating: raw.rating || 4,
    reviewCount: raw.numReviews ?? raw.reviews?.length ?? 0,
  };
  // ----------------------------------------------------
  const [variant, setVariant] = useState("");
  const [more, setMore] = useState(false);
  const out = p.stock === 0;
  const low = p.stock > 0 && p.stock < 5;
  const needsVariant = p.variants.length > 0 && !variant;

  return (
    <article className="sdc">
      <Link to={`/product/${p.id}`} className="sdc-img">
        <img src={p.image} alt={p.name} loading="lazy" />
        {low && <span className="sdc-badge">&lt;5 units left</span>}
        {p.limited && <span className="sdc-badge sdc-dark">Limited</span>}
        {p.bestSeller && <span className="sdc-badge sdc-dark">Best seller</span>}
        {p.oldPrice > p.price && <span className="sdc-sale">Sale</span>}
      </Link>

      <h3 className="sdc-name">{p.name}</h3>
      <div className="sdc-cat">{p.category}</div>
      <div className="sdc-price">
        {naira(p.price)}
        {p.oldPrice > p.price && <s>{naira(p.oldPrice)}</s>}
      </div>

      {p.description && (
        <div className={`sdc-desc ${more ? "" : "sdc-clamp"}`}>
          {p.description}
          {p.description.length > 90 && (
            <button type="button" className="sdc-more" onClick={() => setMore(!more)}>
              {more ? " Show less" : " ...Show more"}
            </button>
          )}
        </div>
      )}

      {p.size && <div className="sdc-size">{p.size}</div>}

      {p.variants.length > 0 && (
        <select className="sdc-select" value={variant} onChange={(e) => setVariant(e.target.value)}>
          <option value="">-- Choose fragrance --</option>
          {p.variants.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      )}

      <div className="sdc-stars">
        <span className="sdc-starrow">
          {[1, 2, 3, 4, 5].map((i) => (
            <i key={i} className={i <= Math.round(p.rating) ? "on" : ""}>★</i>
          ))}
        </span>
        ({p.reviewCount}) reviews
      </div>

      <button
        type="button"
        className="sdc-add"
        disabled={out || needsVariant}
        onClick={() => onAdd(raw, variant)}
      >
        {out ? "Out of stock" : "Add to cart"}
      </button>
    </article>
  );
}
