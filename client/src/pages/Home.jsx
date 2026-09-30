import { HeroStage } from "../components";
import ProductCard from "../ProductCard";
import { FOUNDER_IMG, HERO_BACKGROUND } from "../config";

const HOME_COLLECTIONS = [
  { name: "Candles", image: "/img/candleImage.webp" },
  { name: "Diffusers", image: "/img/DiffuserImage.webp" },
  { name: "Room spray", image: "/img/spray.webp" },
];

export default function Home({
  products,
  categories,
  settings,
  status,
  retryCatalog,
  onAdd,
}) {
  const displayCategories = categories.slice(0, 3);
  const featured = products.filter((p) => p.f).slice(0, 4);
  const getByCategory = (name) => products.filter((p) => p.c === name);
  const waLink = settings.wa
    ? `https://wa.me/${settings.wa.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I would love some help choosing a fragrance.")}`
    : "/contact";

  return (
    <>
      <section
        className="home-hero"
        style={{
          backgroundImage: HERO_BACKGROUND
            ? `url("${HERO_BACKGROUND}")`
            : undefined,
        }}
      >
        <div className="hero-inner">
          <div className="hero-copy">
            {/* Temporarily hidden at the client's request. */}
            {/* <span className="eyebrow">Made in Ibadan since 1997</span> */}
            <h1>
              Discover your <em>signature scent…</em>
            </h1>
            <p>
              {/* Perfumes made and sold in Ibadan since 1997. Browse our
              collection, pay by bank transfer and we deliver to your door. */}
            </p>
            <div className="hero-actions">
              <button className="btn solid" data-go="products">
                Explore our Collection
              </button>
              <button className="btn ghost" data-go="about">
                Our story
              </button>
            </div>
          </div>
          {/* Temporarily hidden at the client's request. */}
          {/* <HeroStage /> */}
        </div>
      </section>

      <section className="philosophy">
        <span className="eyebrow">Our philosophy</span>
        <blockquote>
          “A fragrance is more than a scent. It is the quiet signature you leave
          behind. Every bottle is blended with care to become part of your
          story.”
        </blockquote>
      </section>

      <section className="category-rail">
        {HOME_COLLECTIONS.map((collection) => (
          <button
            key={collection.name}
            className="category-tile"
            data-go="products"
          >
            <div className="tile-image">
              <img src={collection.image} alt={collection.name} />
            </div>
            <em>{collection.name}</em>
            <small>Explore the collection</small>
            <i />
          </button>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Best sellers</span>
            <h2>Our most loved fragrances</h2>
          </div>
          <a href="#" data-go="products" data-cat="All">
            View all
          </a>
        </div>

        {status === "loading" ? (
          <p className="sub" aria-live="polite">
            Connecting to the catalog…
          </p>
        ) : status === "error" ? (
          <div>
            <p className="sub">The catalog is temporarily unavailable.</p>
            <button className="btn line" onClick={retryCatalog}>
              Retry catalog
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={onAdd} />
            ))}
          </div>
        )}
      </section>

      <section className="section collections-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Explore the range</span>
            <h2>Our collections</h2>
          </div>
          <a href="#" data-go="products" data-cat="All">
            View all
          </a>
        </div>
        {displayCategories.map((category) => (
          <div className="collection-row" key={category}>
            <div className="collection-heading">
              <h3>{category}</h3>
              <a href="#" data-go="products" data-cat={category}>
                View {category}
              </a>
            </div>
            <div className="product-grid">
              {getByCategory(category)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} p={p} onAdd={onAdd} />
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="founder-wrap">
        <div className="founder">
          <div className="founder-visual">
            {FOUNDER_IMG ? (
              <img src={FOUNDER_IMG} alt="Scent Design Nigeria founder" />
            ) : (
              <img src="/logo.jpg" alt="Scent Design Nigeria" />
            )}
            <span className="founder-tag">Est. 1997</span>
          </div>

          <div className="founder-copy">
            <h2>
              Designed for the <em>signature.</em>
            </h2>
            <p>
              “Scent Design Nigeria began in Old Bodija, Ibadan with one belief:
              the right fragrance can change how you feel about your day. Nearly
              three decades on, we still blend with the same care.”
            </p>
            <p className="note" style={{ marginTop: 12 }}>
              Founder and Curator
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="help-banner">
          <span className="eyebrow">Personalised guidance</span>
          <h2>
            Need help choosing <em>your scent?</em>
          </h2>
          <p>
            Whether it is a gift or for yourself, we are happy to guide you on
            WhatsApp.
          </p>
          <a
            className="help-link"
            href={waLink}
            target={settings.wa ? "_blank" : undefined}
            rel={settings.wa ? "noopener noreferrer" : undefined}
            data-go={settings.wa ? undefined : "contact"}
          >
            Send us a message
          </a>
        </div>
        <div className="order-strip">
          <div className="order-step">
            <b>01</b>Pick your perfume
          </div>
          <div className="order-step">
            <b>02</b>Enter delivery details
          </div>
          <div className="order-step">
            <b>03</b>Pay by bank transfer
          </div>
          <div className="order-step">
            <b>04</b>Send proof, we dispatch
          </div>
        </div>
      </section>
    </>
  );
}
