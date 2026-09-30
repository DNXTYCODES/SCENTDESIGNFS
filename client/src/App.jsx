import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useShop } from "./store";
import { API_BASE } from "./config";
import { Header, Footer, CartDrawer, ProductModal } from "./components";
import { Phone } from "lucide-react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
const AdminRedirect = () => {
  useEffect(() => {
    location.replace(API_BASE ? `${API_BASE}/admin` : "/admin.html");
  }, []);
  return null;
};
export default function App() {
  const nav = useNavigate(),
    { pathname } = useLocation(),
    {
      setUi,
      toast,
      settings,
      count,
      products,
      categories,
      status,
      retryCatalog,
      add,
      notify,
      maxDisc,
    } = useShop();
  const openCart = () => setUi((ui) => ({ ...ui, drawer: true }));
  const openProduct = (product) => setUi((ui) => ({ ...ui, view: product.id }));
  const handleCardAdd = (product, selectedVariant) => {
    if (!selectedVariant) {
      openProduct(product);
      return;
    }
    const sizeUnit = product.c === "Gift sets" ? " set" : "ml";
    const selectedSize = product.p?.find(
      (option) => `${option[0]}${sizeUnit}` === selectedVariant,
    );
    if (!selectedSize) {
      openProduct(product);
      return;
    }
    add(product, selectedSize);
    notify(`${product.n} added to cart`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const pages = {
      "/": "Home",
      "/products": "Perfumes",
      "/about": "About us",
      "/contact": "Contact",
    };
    const page = pages[pathname] || "Page not found";
    const title =
      pathname === "/"
        ? `${settings.businessName} | Perfumes made in Ibadan`
        : `${page} | ${settings.businessName}`;
    const description =
      `${settings.description} ${page === "Contact" ? settings.address : "Shop perfumes and fragrance in Ibadan, Nigeria."}`.trim();
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = description;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) ogDescription.content = description;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = `${location.origin}/logo.jpg`;
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.content = `${location.origin}/logo.jpg`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${location.origin}${pathname}`;
  }, [pathname, settings]);
  // any element with data-go (and optional data-cat) navigates client-side
  useEffect(() => {
    const h = (e) => {
      const g = e.target.closest("[data-go]");
      if (!g) return;
      e.preventDefault();
      const t = g.dataset.go,
        c = g.dataset.cat;
      setUi({ drawer: false, view: null });
      nav(
        (t === "home" ? "/" : "/" + t) +
          (c && c !== "All" ? "?cat=" + encodeURIComponent(c) : ""),
      );
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [nav, setUi]);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setUi({ drawer: false, view: null });
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [setUi]);
  return (
    <>
      <Header cartCount={count} onCart={openCart} />
      <main>
        <div className="tab on" key={pathname}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  categories={categories}
                  settings={settings}
                  status={status}
                  retryCatalog={retryCatalog}
                  onAdd={handleCardAdd}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  categories={categories}
                  status={status}
                  maxDisc={maxDisc}
                  retryCatalog={retryCatalog}
                  onAdd={handleCardAdd}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminRedirect />} />
            <Route
              path="*"
              element={
                <div className="wrap pagehead">
                  <h2>Page not found</h2>
                  <p>
                    <button className="btn" data-go="home">
                      Go home
                    </button>
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer settings={settings} />
      <div className="contact-fabs" aria-label="Contact us">
        <a
          className="contact-fab call-fab"
          href={
            settings.phone
              ? `tel:${settings.phone.replace(/[^\d+]/g, "")}`
              : "/contact"
          }
          aria-label="Call us"
          title="Call us"
        >
          <Phone size={21} aria-hidden="true" />
        </a>
        <a
          className="contact-fab whatsapp-fab"
          href={
            settings.wa
              ? `https://wa.me/${settings.wa.replace(/\D/g, "")}`
              : "/contact"
          }
          target={settings.wa ? "_blank" : undefined}
          rel={settings.wa ? "noopener noreferrer" : undefined}
          aria-label="Chat with us on WhatsApp"
          title="Chat on WhatsApp"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.5 28l5.8-1.5A12.7 12.7 0 1 0 16 3.2Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.8 16.6v3.1c0 .8-.7 1.5-1.5 1.5A16.8 16.8 0 0 1 4.8 5.7c0-.8.7-1.5 1.5-1.5h3.1c.8 0 1.4.6 1.5 1.4.1.8.3 1.5.6 2.2.3.6.2 1.3-.3 1.7l-1.3 1.3a13.5 13.5 0 0 0 5.3 5.3l1.3-1.3c.5-.5 1.1-.6 1.7-.3.7.3 1.4.5 2.2.6.8.1 1.4.8 1.4 1.5z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <CartDrawer />
      <ProductModal onAdd={add} />
      <div
        className="toast"
        role="status"
        style={{ display: toast ? "block" : "none" }}
      >
        {toast}
      </div>
    </>
  );
}
