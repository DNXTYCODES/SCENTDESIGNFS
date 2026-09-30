// Edit business details here (WhatsApp number in international format without +, e.g. 2348012345678)
const e = import.meta.env;
const apiOrigin = e.VITE_API_URL || "";
export const API_BASE = apiOrigin
  ? `${/^https?:\/\//i.test(apiOrigin) ? "" : "https://"}${apiOrigin}`.replace(
      /\/+$/,
      "",
    )
  : "";
export const apiUrl = (path) => API_BASE + path;
export const assetUrl = (path) =>
  path?.startsWith("/uploads/") && API_BASE ? API_BASE + path : path;
export const CFG = {
  wa: e.VITE_WHATSAPP || "",
  phone: e.VITE_PHONE || "",
  email: e.VITE_EMAIL || "",
  businessName: e.VITE_BUSINESS_NAME || "Scent Design Nigeria Ltd",
  address:
    e.VITE_ADDRESS ||
    "7 Oyesina Close, opposite 7 Ibikunle Avenue, Old Bodija, Ibadan, Nigeria",
  hours: e.VITE_HOURS || "",
  mapUrl: e.VITE_MAP_URL || "https://maps.google.com/?q=7+oyesina+close+ibadan",
  description: e.VITE_SITE_DESCRIPTION || "Perfumes made in Ibadan since 1997.",
  social: {
    Instagram: e.VITE_INSTAGRAM || "",
    Facebook: e.VITE_FACEBOOK || "",
    TikTok: e.VITE_TIKTOK || "",
    X: e.VITE_X || "",
    YouTube: e.VITE_YOUTUBE || "",
  },
  bank: {
    name: "Scent Design Nigeria Ltd",
    no: "0063962854",
    bank: "Access Bank",
  },
  currency: "₦",
};
export const HERO = ["/img/sk.webp", "/img/no.webp"];
export const HERO_BACKGROUND = "/img/ngn.webp";
export const FOUNDER_IMG = "/img/men.jpeg";
export const TICKER = [
  "Welcome to Scent Design Nigeria, where fragrance is our passion",
  "Perfumes made in Ibadan since 1997",
  "Pay by bank transfer, we dispatch once payment is confirmed",
  "Send proof of payment on WhatsApp or email",
];
