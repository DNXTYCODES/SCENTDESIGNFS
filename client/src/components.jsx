import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { CFG, HERO, TICKER, apiUrl, assetUrl } from "./config";
import Bottle from "./Bottle";
import ProductCard from "./ProductCard";
import { useShop } from "./store";
export const fmt = (n) => CFG.currency + n.toLocaleString("en-NG");
export const Pic = ({ p, h }) =>
  p.img ? (
    <img
      src={assetUrl(p.img)}
      alt={p.n}
      style={{
        height: h,
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
      }}
    />
  ) : (
    <Bottle color={p.col} />
  );
const Was = ({ v }) => <s className="was">{fmt(v)}</s>;
const unit = (p) => (p.c === "Gift sets" ? " set" : "ml");
export function ProductModal({ onAdd }) {
  const { products, ui, setUi, add, notify } = useShop(),
    [i, setI] = useState(0),
    p = products.find((x) => x.id === ui.view),
    s = p && (p.p[i] || p.p[0]);
  const close = () => {
    setUi((u) => ({ ...u, view: null }));
    setI(0);
  };
  return (
    <div
      className={"modal" + (p ? " on" : "")}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {p && (
        <div className="card">
          <button className="x" onClick={close} aria-label="Close">
            ×
          </button>
          <div className="two" style={{ gap: 18 }}>
            <div
              style={{
                background: "var(--tint)",
                display: "grid",
                placeItems: "center",
                padding: 18,
              }}
            >
              <div style={{ width: 150, textAlign: "center" }}>
                <Pic p={p} h={200} />
              </div>
            </div>
            <div>
              <span className="tag">{p.c}</span>
              <h3>{p.n}</h3>
              <p>{p.d}</p>
              <b>Size</b>
              <div className="sz">
                {p.p.map((z, k) => (
                  <button
                    key={k}
                    aria-pressed={z === s}
                    onClick={() => setI(k)}
                  >
                    {z[0]}
                    {unit(p)}
                  </button>
                ))}
              </div>
              <div className="price">
                {s[2] > s[1] && <Was v={s[2]} />}
                {fmt(s[1])}
                {p.disc > 0 && (
                  <span
                    className="sale"
                    style={{ position: "static", marginLeft: 8 }}
                  >
                    -{p.disc}%
                  </span>
                )}
              </div>
              <button
                className="btn"
                id="add"
                style={{ width: "100%" }}
                onClick={() => {
                  (onAdd || add)(p, s);
                  notify(p.n + " added to cart");
                  close();
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export function Bank() {
  const { notify, settings } = useShop(),
    b = settings.bank;
  return (
    <div className="bank">
      <b>Bank transfer details</b>
      <dl>
        <dt>Account name</dt>
        <dd>{b.name}</dd>
        <dt>Account number</dt>
        <dd>{b.no}</dd>
        <dt>Bank</dt>
        <dd>{b.bank}</dd>
      </dl>
      <button
        className="btn gold"
        style={{ padding: "8px 14px" }}
        onClick={() =>
          navigator.clipboard?.writeText(b.no).then(
            () => notify("Account number copied"),
            () => notify("Copy failed. Select the number manually."),
          )
        }
      >
        Copy account number
      </button>
    </div>
  );
}
export function CartDrawer() {
  const { cart, qty, total, setCart, ui, setUi, settings } = useShop(),
    [step, setStep] = useState("cart"),
    [f, setF] = useState({ n: "", p: "", e: "", a: "", c: "" }),
    [err, setErr] = useState(""),
    [ref, setRef] = useState("");
  const close = () => {
      setUi((u) => ({ ...u, drawer: false }));
      setStep("cart");
    },
    set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const msg =
    "New order " +
    ref +
    "\n" +
    cart
      .map(
        (i) =>
          i.q + " x " + i.n + " (" + i.size + i.unit + ") = " + fmt(i.pr * i.q),
      )
      .join("\n") +
    "\nProducts total: " +
    fmt(total) +
    "\n\nName: " +
    f.n +
    "\nPhone: " +
    f.p +
    "\nEmail: " +
    f.e +
    "\nAddress: " +
    f.a +
    ", " +
    f.c +
    "\n\nI have paid (or will pay) to " +
    settings.bank.bank +
    " " +
    settings.bank.no +
    ". Please confirm delivery fee. Proof of payment attached.";
  const place = () => {
    if (!f.n.trim() || !f.p.trim() || !f.a.trim() || !f.c.trim())
      return setErr("Please fill in your name, phone, address and city.");
    setRef("SDN-" + Date.now().toString().slice(-6));
    setStep("done");
  };
  const F = (k, l, t = "text") => (
    <>
      <label htmlFor={"f" + k}>{l}</label>
      <input id={"f" + k} type={t} value={f[k]} onChange={set(k)} />
    </>
  );
  let body;
  if (step === "done")
    body = (
      <>
        <h3>Order ready: {ref}</h3>
        <p>
          Send this message with your payment proof so we can confirm and
          dispatch.
        </p>
        <textarea rows="8" readOnly value={msg} />
        {settings.wa ? (
          <p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://wa.me/" +
                settings.wa +
                "?text=" +
                encodeURIComponent(msg)
              }
            >
              Send on WhatsApp
            </a>
          </p>
        ) : (
          <p>
            <span className="todo">
              WhatsApp number not set yet. Copy this message and send it
              manually.
            </span>
          </p>
        )}
        {settings.email && (
          <p>
            <a
              className="btn line"
              href={
                "mailto:" +
                settings.email +
                "?subject=" +
                encodeURIComponent("Order " + ref) +
                "&body=" +
                encodeURIComponent(msg)
              }
            >
              Send by email
            </a>
          </p>
        )}
        <button
          className="btn gold"
          style={{ width: "100%" }}
          onClick={() => {
            setCart([]);
            close();
          }}
        >
          Done, clear cart
        </button>
      </>
    );
  else if (!cart.length)
    body = (
      <>
        <h3>Your cart</h3>
        <p>Your cart is empty.</p>
        <button className="btn" data-go="products">
          Browse perfumes
        </button>
      </>
    );
  else if (step === "cart")
    body = (
      <>
        <h3>Your cart</h3>
        {cart.map((i) => (
          <div className="row" key={i.k}>
            <Pic p={i} h={48} />
            <div className="g">
              <b>{i.n}</b>
              <br />
              <small>
                {i.size}
                {i.unit} · {i.o > i.pr && <Was v={i.o} />}
                {fmt(i.pr)}
              </small>
            </div>
            <div className="q">
              <button onClick={() => qty(i.k, -1)} aria-label="Less">
                −
              </button>{" "}
              {i.q}{" "}
              <button onClick={() => qty(i.k, 1)} aria-label="More">
                +
              </button>
            </div>
          </div>
        ))}
        <div className="tot">
          <span>Products</span>
          <span>{fmt(total)}</span>
        </div>
        <p className="tag">
          Delivery fee is confirmed after you enter your address and is added to
          your payment.
        </p>
        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={() => setStep("checkout")}
        >
          Checkout
        </button>
      </>
    );
  else
    body = (
      <>
        <h3>Checkout</h3>
        {F("n", "Full name")}
        {F("p", "Phone (WhatsApp if possible)", "tel")}
        {F("e", "Email", "email")}
        <label htmlFor="fa">Delivery address</label>
        <textarea id="fa" rows="2" value={f.a} onChange={set("a")} />
        {F("c", "City and state")}
        <div className="tot" style={{ marginTop: 12 }}>
          <span>Products</span>
          <span>{fmt(total)}</span>
        </div>
        <p className="tag">
          Delivery fee:{" "}
          <span className="todo">
            to be confirmed by us on WhatsApp or email
          </span>
        </p>
        <div style={{ margin: "12px 0" }}>
          <Bank />
        </div>
        <p style={{ fontSize: ".85rem" }}>
          Pay the product cost plus delivery fee in full before dispatch, then
          send proof of payment.
        </p>
        <button className="btn" style={{ width: "100%" }} onClick={place}>
          Send order and payment proof
        </button>
        <p className="tag" style={{ color: "#c0392b" }}>
          {err}
        </p>
        <button
          className="btn line"
          style={{ width: "100%" }}
          onClick={() => setStep("cart")}
        >
          Back to cart
        </button>
      </>
    );
  return (
    <div className={"drawer" + (ui.drawer ? " on" : "")}>
      <div className="bk" onClick={close} />
      <div className="pn" role="dialog" aria-label="Cart">
        <button className="x" onClick={close} aria-label="Close">
          ×
        </button>
        {body}
      </div>
    </div>
  );
}
export const HeroStage = () => (
  <div className="stage">
    <div className="glow" />
    <div className="ring" />
    <div className="ring r2" />
    <span className="sp" style={{ left: "8%", top: "12%" }}>
      ✦
    </span>
    <span
      className="sp"
      style={{ right: "6%", top: "30%", animationDelay: "-1s" }}
    >
      ✦
    </span>
    <span
      className="sp"
      style={{ left: "20%", bottom: "20%", animationDelay: "-2s" }}
    >
      ✧
    </span>
    {HERO.map((u) => (
      <img key={u} src={u} alt="Scent Design perfume" />
    ))}
  </div>
);
export function Featured({ onAdd }) {
  const { products, status, retryCatalog } = useShop();
  return (
    <div className="grid" id="featured">
      {status === "error" ? (
        <div>
          <p className="sub">
            The catalog is taking longer to load. The site is still available.
          </p>
          <button className="btn line" onClick={retryCatalog}>
            Retry catalog
          </button>
        </div>
      ) : status === "loading" ? (
        <p className="sub" aria-live="polite">
          Connecting to the catalog…
        </p>
      ) : (
        products
          .filter((p) => p.f)
          .map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} />)
      )}
    </div>
  );
}
export function Collections({ onAdd }) {
  const { products, categories, status, retryCatalog } = useShop(),
    [t, setT] = useState(),
    tab = t || categories[0],
    l = products.filter((p) => p.c === tab);
  if (status !== "ready")
    return (
      <div>
        <p className="sub" aria-live="polite">
          {status === "loading"
            ? "Collections will appear when the catalog connects."
            : "The catalog is temporarily unavailable."}
        </p>
        {status === "error" && (
          <button className="btn line" onClick={retryCatalog}>
            Retry catalog
          </button>
        )}
      </div>
    );
  return (
    <>
      <div className="ctabs" role="tablist">
        {categories.map((c) => (
          <button
            key={c}
            className="chip"
            aria-pressed={c === tab}
            onClick={() => setT(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid" id="cgrid">
        {l.slice(0, 4).map((p) => (
          <ProductCard key={p.id} p={p} onAdd={onAdd} />
        ))}
      </div>
      <div className="more">
        <button className="btn line" data-go="products" data-cat={tab}>
          {l.length > 4
            ? "See more in " + tab + " (" + l.length + ")"
            : "See all " + tab}
        </button>{" "}
        <button className="btn" data-go="products" data-cat="All">
          View all products
        </button>
      </div>
    </>
  );
}
export const CV = ({ k }) => {
  const { settings } = useShop(),
    v = { wa: settings.wa, ph: settings.phone, em: settings.email }[k];
  return v || <span className="todo">to be added</span>;
};
export const Social = ({ footer }) => {
  const { settings } = useShop();
  return (
    <div className="soc" style={footer ? { marginTop: 10 } : undefined}>
      {Object.entries(settings.social).map(([k, u]) =>
        u ? (
          <a
            key={k}
            className={footer ? "pad" : "btn line"}
            style={footer ? undefined : { padding: "6px 14px" }}
            target="_blank"
            rel="noopener noreferrer"
            href={u}
          >
            {k}
          </a>
        ) : null,
      )}
    </div>
  );
};
export function MsgForm() {
  const [n, setN] = useState(""),
    [email, setEmail] = useState(""),
    [m, setM] = useState(""),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState("");
  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const r = await fetch(apiUrl("/api/contact"), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: n, email, message: m }),
        }),
        j = await r.json();
      if (!r.ok) throw Error(j.error || "Message could not be sent.");
      setStatus("Your message has been sent.");
      setN("");
      setEmail("");
      setM("");
    } catch (e) {
      setStatus(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form className="card" onSubmit={send}>
      <h3>Send a message</h3>
      <label htmlFor="cn">Your name</label>
      <input
        id="cn"
        required
        maxLength="100"
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <label htmlFor="ce">Your email</label>
      <input
        id="ce"
        type="email"
        required
        maxLength="200"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="cm">Message</label>
      <textarea
        id="cm"
        required
        maxLength="5000"
        rows="5"
        value={m}
        onChange={(e) => setM(e.target.value)}
      />
      <p>
        <button className="btn" disabled={busy}>
          {busy ? "Sending…" : "Send message"}
        </button>
      </p>
      <p role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
export function Header({ cartCount, onCart }) {
  const { count, setUi, maxDisc } = useShop(),
    { pathname } = useLocation(),
    displayedCount = cartCount ?? count,
    openCart = onCart || (() => setUi((u) => ({ ...u, drawer: true }))),
    T = maxDisc
      ? ["Sale: up to " + maxDisc + "% off selected perfumes", ...TICKER]
      : TICKER;
  return (
    <>
      <div className="ann" aria-label="Announcements">
        <div className="track">
          {[...T, ...T].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
      <header className="sd-header">
        <div className="bar">
          <button
            className="brand"
            data-go="home"
            aria-label="Scent Design Nigeria home"
          >
            <img src="/logo.jpg" alt="SDN logo" />
            <span>
              <b>Scent Design Nigeria</b>
              <small>fragrance is our passion</small>
            </span>
          </button>
          <nav aria-label="Store navigation">
            <button data-go="products">Shop</button>
          </nav>
          <button
            className="cartbtn sd-bag"
            onClick={openCart}
            aria-label="Open cart"
            title="Open cart"
          >
            <ShoppingBag size={21} aria-hidden="true" />
            {displayedCount > 0 && <span>{displayedCount}</span>}
          </button>
        </div>
      </header>
    </>
  );
}
export const Footer = ({ settings: providedSettings }) => {
  const { settings: storeSettings } = useShop();
  const settings = providedSettings || storeSettings;

  // Keep "Visit us" and "Payment" open on desktop, collapsible on mobile.
  // The 761px breakpoint matches the CSS.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 761px)");
    const sync = () =>
      document
        .querySelectorAll(".sd-footer-disclosure")
        .forEach((d) => {
          d.open = mq.matches;
        });
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <footer className="sd-footer">
      <div className="wrap">
        <div className="grid sd-footer-grid">
          <div>
            <img
              className="sd-footer-brand"
              src="/logo.jpg"
              alt={settings.businessName}
            />
            <h4>{settings.businessName}</h4>
            <p className="sd-footer-tagline">
              Fragrance is our passion.
              <br />
              Established 1997.
            </p>
            <Social footer />
          </div>
          <div>
            <details className="sd-footer-disclosure">
              <summary>Visit us</summary>
              <div>
                {settings.address}
                <br />
                Hours: {settings.hours || "Contact us for opening hours"}
              </div>
            </details>
          </div>
          <div>
            <h4>Quick links</h4>
            {["home", "products", "about", "contact"].map((t) => (
              <span key={t}>
                <a href="#" data-go={t}>
                  {t[0].toUpperCase() + t.slice(1)}
                </a>
                <br />
              </span>
            ))}
          </div>
          <div>
            <details className="sd-footer-disclosure">
              <summary>Payment</summary>
              <div>
                Full payment before delivery by bank transfer.
                <dl>
                  <dt>Account name</dt>
                  <dd>{settings.bank.name}</dd>
                  <dt>Account number</dt>
                  <dd>{settings.bank.no}</dd>
                  <dt>Bank</dt>
                  <dd>{settings.bank.bank}</dd>
                </dl>
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
};