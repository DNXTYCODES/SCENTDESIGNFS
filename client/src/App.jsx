import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useShop } from "./store";
import { API_BASE } from "./config";
import { Header, Footer, CartDrawer, ProductModal } from "./components";
import { MessageCircle, Phone } from "lucide-react";
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
    { setUi, toast, settings } = useShop();
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
      <Header />
      <main>
        <div className="tab on" key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
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
      <Footer />
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
          <MessageCircle size={22} aria-hidden="true" />
        </a>
      </div>
      <CartDrawer />
      <ProductModal />
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
