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

// Official WhatsApp glyph (speech bubble with handset), solid fill.
const WhatsAppIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
          <Phone size={22} strokeWidth={1.9} fill="currentColor" aria-hidden="true" />
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
          <WhatsAppIcon size={27} />
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