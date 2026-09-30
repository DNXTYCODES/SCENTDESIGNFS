import { useShop } from "../store";
import { Card, HeroStage } from "../components";
import { FOUNDER_IMG } from "../config";

const TAG = {
  Men: "Bold and woody",
  Women: "Floral and elegant",
  Unisex: "Made for everyone",
  "Body oils": "Soft and lasting",
  "Gift sets": "Ready to give",
};

export default function Home() {
  const { products, categories, settings } = useShop();
  const displayCategories = categories.slice(0, 3);
  const featured = products.filter((p) => p.f).slice(0, 4);
  const getByCategory = (name) => products.filter((p) => p.c === name);
  const waLink = settings.wa
    ? `https://wa.me/${settings.wa.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I would love some help choosing a fragrance.")}`
    : "/contact";

  return (
    <>
      <section className="home-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Made in Ibadan since 1997</span>
            <h1>
              Discover your <em>signature scent…</em>
            </h1>
            <p>
              Premium perfumes and body oils, blended in Nigeria and delivered
              to your door.
            </p>
            <div className="hero-actions">
              <button className="btn solid" data-go="products">
                Explore collection
              </button>
              <button className="btn ghost" data-go="about">
                Our story
              </button>
            </div>
          </div>
          <HeroStage />
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
        {displayCategories.map((category) => {
          const categoryProducts = getByCategory(category);
          const imageProduct =
            categoryProducts.find((p) => p.img) || categoryProducts[0];

          return (
            <button
              key={category}
              className="category-tile"
              data-go="products"
              data-cat={category}
            >
              <div className="tile-image">
                {imageProduct && imageProduct.img ? (
                  <img src={imageProduct.img} alt={category} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#f4efe8",
                    }}
                  />
                )}
              </div>
              <em>{category}</em>
              <small>{TAG[category] || "Explore the collection"}</small>
              <i />
            </button>
          );
        })}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">The essentials</span>
            <h2>Our most loved fragrances</h2>
          </div>
          <a href="#" data-go="products" data-cat="All">
            View all
          </a>
        </div>

        <div className="product-grid">
          {featured.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>

      {displayCategories.map((category) => (
        <section className="section" key={category}>
          <div className="section-head">
            <div>
              <span className="eyebrow">Curated picks</span>
              <h2>{category}</h2>
            </div>
            <a href="#" data-go="products" data-cat={category}>
              View {category}
            </a>
          </div>

          <div className="product-grid">
            {getByCategory(category)
              .slice(0, 4)
              .map((p) => (
                <Card key={p.id} p={p} />
              ))}
          </div>
        </section>
      ))}

      <section className="founder-wrap">
        <div className="founder">
          <div className="founder-visual">
            {FOUNDER_IMG ? (
              <img src={FOUNDER_IMG} alt="Founder" />
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
              <span className="note">
                Replace this quote with the founder’s own words.
              </span>
            </p>
            <p className="note" style={{ marginTop: 12 }}>
              Founder and Curator
            </p>
          </div>
        </div>
      </section>

      <section className="help-banner">
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
      </section>

      <div className="order-strip">
        <div className="order-step">
          <b>01</b>
          Pick your perfume
        </div>
        <div className="order-step">
          <b>02</b>
          Enter delivery details
        </div>
        <div className="order-step">
          <b>03</b>
          Pay by bank transfer
        </div>
        <div className="order-step">
          <b>04</b>
          Send proof, we dispatch
        </div>
      </div>
    </>
  );
}
