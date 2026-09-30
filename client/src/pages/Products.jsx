import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components";
export default function Products({
  products,
  categories,
  status,
  maxDisc,
  retryCatalog,
  onAdd,
}) {
  const [sp, setSp] = useSearchParams(),
    cat = sp.get("cat") || "All",
    [q, setQ] = useState(""),
    [sort, setSort] = useState("");
  const cats = ["All", ...categories, ...(maxDisc ? ["On sale"] : [])];
  let l = products.filter(
    (p) =>
      (cat === "All" || (cat === "On sale" ? p.disc > 0 : p.c === cat)) &&
      (p.n + p.d).toLowerCase().includes(q.toLowerCase()),
  );
  if (sort)
    l = [...l].sort((a, b) =>
      sort === "lo" ? a.p[0][1] - b.p[0][1] : b.p[0][1] - a.p[0][1],
    );
  return (
    <>
      <main className="sd-shop">
        <div className="sd-shop-head">
          <span className="eyebrow">The collection</span>
          <h1>Our perfumes</h1>
          <p className="sub">Choose a size, add to cart, pay by transfer.</p>
          <hr />
        </div>
        <div className="sd-filter-tabs" aria-label="Filter by category">
          {cats.map((c) => (
            <button
              key={c}
              aria-pressed={c === cat}
              onClick={() => setSp(c === "All" ? {} : { cat: c })}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="sd-search" htmlFor="products-search">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4-4" />
          </svg>
            <input
              id="products-search"
              type="search"
              placeholder="Search fragrances..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
        </label>
        <div className="sd-shop-tools">
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort: Featured</option>
              <option value="lo">Price: low to high</option>
              <option value="hi">Price: high to low</option>
            </select>
        </div>
        {status === "loading" && (
          <p className="sub sd-shop-message" aria-live="polite">
            Connecting to the catalog…
          </p>
        )}
        {status === "error" && (
          <div className="sd-shop-message">
            <p className="sub">
              The catalog is temporarily unavailable. The rest of the site is
              still available.
            </p>
            <button className="btn line" onClick={retryCatalog}>
              Retry catalog
            </button>
          </div>
        )}
        <div className="sd-grid">
          {l.map((p) => (
            <Card key={p.id} p={p} onAdd={onAdd} />
          ))}
        </div>
        {status === "ready" && !l.length && (
          <p className="sub sd-shop-message">
            No perfumes match. Try another search or category.
          </p>
        )}
      </main>
    </>
  );
}
