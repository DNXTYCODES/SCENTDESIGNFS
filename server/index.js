const path = require("path"),
  fs = require("fs"),
  crypto = require("crypto");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express"),
  mongoose = require("mongoose"),
  helmet = require("helmet"),
  compression = require("compression"),
  rateLimit = require("express-rate-limit"),
  multer = require("multer"),
  cloudinary = require("cloudinary").v2,
  jwt = require("jsonwebtoken"),
  cors = require("cors");
const { Product, CatDiscount, Category, SiteSettings } = require("./models");
const {
    MONGO_URI,
    ADMIN_PASSWORD,
    JWT_SECRET,
    PORT = 5000,
    NODE_ENV,
  } = process.env,
  PROD = NODE_ENV === "production";
const FRONTEND_ORIGINS = new Set(
  (process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => new URL(/^https?:\/\//i.test(x) ? x : `https://${x}`).origin),
);
if (
  !MONGO_URI ||
  !ADMIN_PASSWORD ||
  ADMIN_PASSWORD.length < 8 ||
  !JWT_SECRET ||
  JWT_SECRET.length < 16
) {
  console.error(
    "Set MONGO_URI, ADMIN_PASSWORD (8+ chars) and JWT_SECRET (16+ chars) in server/.env",
  );
  process.exit(1);
}
const {
    CLOUDINARY_NAME: CN,
    CLOUDINARY_API_KEY: CK,
    CLOUDINARY_SECRET_KEY: CS,
  } = process.env,
  CLOUD = !!(CN && CK && CS);
if (CLOUD)
  cloudinary.config({
    cloud_name: CN,
    api_key: CK,
    api_secret: CS,
    secure: true,
  });
const SITE_DEFAULTS = {
  businessName:
    process.env.SITE_NAME ||
    process.env.VITE_BUSINESS_NAME ||
    "Scent Design Nigeria Ltd",
  email:
    process.env.SITE_EMAIL ||
    process.env.VITE_EMAIL ||
    process.env.CONTACT_TO ||
    "",
  phone: process.env.SITE_PHONE || process.env.VITE_PHONE || "",
  wa: process.env.SITE_WHATSAPP || process.env.VITE_WHATSAPP || "",
  address:
    process.env.SITE_ADDRESS ||
    process.env.VITE_ADDRESS ||
    "7 Oyesina Close, opposite 7 Ibikunle Avenue, Old Bodija, Ibadan, Nigeria",
  hours: process.env.SITE_HOURS || process.env.VITE_HOURS || "",
  mapUrl:
    process.env.SITE_MAP_URL ||
    process.env.VITE_MAP_URL ||
    "https://maps.google.com/?q=7+oyesina+close+ibadan",
  description:
    process.env.SITE_DESCRIPTION ||
    process.env.VITE_SITE_DESCRIPTION ||
    "Perfumes made in Ibadan since 1997.",
  bank: {
    name: process.env.BANK_ACCOUNT_NAME || "Scent Design Nigeria Ltd",
    no: process.env.BANK_ACCOUNT_NUMBER || "0063962854",
    bank: process.env.BANK_NAME || "Access Bank",
  },
  social: {
    Instagram: process.env.SITE_INSTAGRAM || process.env.VITE_INSTAGRAM || "",
    Facebook: process.env.SITE_FACEBOOK || process.env.VITE_FACEBOOK || "",
    TikTok: process.env.SITE_TIKTOK || process.env.VITE_TIKTOK || "",
    X: process.env.SITE_X || process.env.VITE_X || "",
    YouTube: process.env.SITE_YOUTUBE || process.env.VITE_YOUTUBE || "",
  },
};
const UP = process.env.UPLOAD_DIR || path.join(__dirname, "uploads"),
  DIST = path.join(__dirname, "../client/dist");
fs.mkdirSync(UP, { recursive: true });
const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, cb) =>
      cb(null, origin && FRONTEND_ORIGINS.has(origin) ? origin : false),
    credentials: true,
  }),
);
app.use("/api/admin", (q, r, n) => {
  if (!PROD) return n();
  const origin = q.get("origin"),
    ownOrigin = `${q.protocol}://${q.get("host")}`;
  if (origin !== ownOrigin && !FRONTEND_ORIGINS.has(origin))
    return r.status(403).json({ error: "Untrusted admin request" });
  n();
});
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'"],
        frameSrc: ["https://www.google.com"],
        upgradeInsecureRequests: PROD ? [] : null,
      },
    },
  }),
);
app.use(compression(), express.json({ limit: "50kb" }));
const W = (f) => (q, r, n) => f(q, r, n).catch(n),
  bad = (m, status = 400) => Object.assign(Error(m), { status });
const active = (d) =>
  d &&
  d.pct > 0 &&
  (!d.end || Date.now() <= Date.parse(d.end + "T23:59:59+01:00"));
// product discount overrides category discount; p rows: [size, finalPrice, originalPrice]
const eff = (p, cd) => {
  const c = cd[p.c],
    d = active(p.discount) ? p.discount : active(c) ? c : null,
    pct = d ? d.pct : 0;
  return {
    id: String(p._id),
    n: p.n,
    c: p.c,
    d: p.d,
    col: p.col,
    f: p.f,
    img: p.img,
    discount:
      p.discount && p.discount.pct
        ? { pct: p.discount.pct, end: p.discount.end || "" }
        : null,
    disc: pct,
    dsrc: d ? (d === p.discount ? "product" : "category") : "",
    dend: (d && d.end) || "",
    p: p.p.map(([s, pr]) => [
      s,
      pct ? Math.round((pr * (100 - pct)) / 100) : pr,
      pr,
    ]),
  };
};
const siteSettings = async () => {
  const s = await SiteSettings.findOne({ key: "site" }).lean();
  return {
    ...SITE_DEFAULTS,
    ...(s || {}),
    bank: { ...SITE_DEFAULTS.bank, ...(s?.bank || {}) },
    social: { ...SITE_DEFAULTS.social, ...(s?.social || {}) },
  };
};
const categoryNames = async () => {
  const [saved, used] = await Promise.all([
    Category.find().sort({ name: 1 }).lean(),
    Product.distinct("c"),
  ]);
  return [...new Set([...saved.map((c) => c.name), ...used])].sort((a, b) =>
    a.localeCompare(b),
  );
};
const list = async () => {
  const cds = await CatDiscount.find().lean(),
    cd = Object.fromEntries(cds.map((c) => [c.category, c]));
  return {
    products: (await Product.find().sort({ _id: 1 }).lean()).map((p) =>
      eff(p, cd),
    ),
    categories: await categoryNames(),
    catDiscounts: Object.fromEntries(
      cds.map((c) => [c.category, { pct: c.pct, end: c.end || "" }]),
    ),
    settings: await siteSettings(),
  };
};
const cookieOf = (q) =>
  Object.fromEntries(
    (q.headers.cookie || "")
      .split(/;\s*/)
      .map((x) => x.split(/=(.*)/s).slice(0, 2)),
  );
const auth = (q, r, n) => {
  try {
    jwt.verify(cookieOf(q).sdn_admin, JWT_SECRET);
    n();
  } catch {
    r.status(401).json({ error: "Not logged in" });
  }
};
const h = (x) => crypto.createHash("sha256").update(String(x)).digest();
app.post(
  "/api/admin/login",
  rateLimit({
    windowMs: 9e5,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts. Try again in 15 minutes." },
  }),
  (q, r) => {
    if (!crypto.timingSafeEqual(h(q.body.password), h(ADMIN_PASSWORD)))
      return r.status(401).json({ error: "Wrong password" });
    r.cookie(
      "sdn_admin",
      jwt.sign({ a: 1 }, JWT_SECRET, { expiresIn: "12h" }),
      {
        httpOnly: true,
        sameSite: PROD ? "none" : "strict",
        secure: PROD,
        maxAge: 432e5,
      },
    ).json({ ok: 1 });
  },
);
app.post("/api/admin/logout", (q, r) =>
  r.clearCookie("sdn_admin").json({ ok: 1 }),
);
app.get("/healthz", (q, r) =>
  r.json({ ok: mongoose.connection.readyState === 1 }),
);
app.get(
  "/api/catalog",
  W(async (q, r) => {
    const data = await list();
    r.set("Cache-Control", "no-cache").json({
      products: data.products,
      categories: data.categories,
      settings: data.settings,
    });
  }),
);
app.get(
  "/api/admin/data",
  auth,
  W(async (q, r) => r.set("Cache-Control", "no-store").json(await list())),
);
app.put(
  "/api/admin/settings",
  auth,
  W(async (q, r) => {
    const b = q.body || {},
      text = (v, n) =>
        String(v || "")
          .trim()
          .slice(0, n),
      url = (v, n) => {
        const x = text(v, n);
        if (x && !/^https?:\/\//i.test(x))
          throw bad("Links must start with https:// or http://");
        return x;
      };
    const value = {
      businessName: text(b.businessName, 100),
      email: text(b.email, 200),
      phone: text(b.phone, 40),
      wa: text(b.wa, 30),
      address: text(b.address, 300),
      hours: text(b.hours, 160),
      mapUrl: url(b.mapUrl, 500),
      description: text(b.description, 300),
      bank: {
        name: text(b.bank?.name, 100),
        no: text(b.bank?.no, 40),
        bank: text(b.bank?.bank, 100),
      },
      social: Object.fromEntries(
        ["Instagram", "Facebook", "TikTok", "X", "YouTube"].map((k) => [
          k,
          url(b.social?.[k], 500),
        ]),
      ),
    };
    const saved = await SiteSettings.findOneAndUpdate(
      { key: "site" },
      { $set: { ...value, key: "site" } },
      { upsert: true, new: true, runValidators: true },
    ).lean();
    r.set("Cache-Control", "no-store").json({
      ok: 1,
      settings: {
        ...SITE_DEFAULTS,
        ...saved,
        bank: { ...SITE_DEFAULTS.bank, ...saved.bank },
        social: { ...SITE_DEFAULTS.social, ...saved.social },
      },
    });
  }),
);
app.post(
  "/api/contact",
  rateLimit({
    windowMs: 9e5,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again later." },
  }),
  W(async (q, r) => {
    const name = String(q.body.name || "")
        .replace(/[\r\n]/g, " ")
        .trim()
        .slice(0, 100),
      email = String(q.body.email || "")
        .trim()
        .slice(0, 200),
      message = String(q.body.message || "")
        .trim()
        .slice(0, 5000);
    if (!name || !message || !/^\S+@\S+\.\S+$/.test(email))
      throw bad("Enter your name, a valid email address and a message.");
    const to =
      (await siteSettings()).email ||
      process.env.CONTACT_TO ||
      process.env.SMTP_USER;
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !to)
      return r
        .status(503)
        .json({
          error:
            "Email delivery is not configured yet. Please contact us by phone or WhatsApp.",
        });
    const nodemailer = require("nodemailer"),
      port = Number(process.env.SMTP_PORT || 465),
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    await transporter.sendMail({
      from: `${name} via ${SITE_DEFAULTS.businessName} <${process.env.SMTP_USER}>`,
      replyTo: email,
      to,
      subject: `Website message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    r.json({ ok: 1 });
  }),
);
const EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};
const up = multer({
  storage: CLOUD
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: UP,
        filename: (q, f, cb) =>
          cb(null, crypto.randomBytes(8).toString("hex") + EXT[f.mimetype]),
      }),
  limits: { fileSize: 5e6 },
  fileFilter: (q, f, cb) => cb(null, !!EXT[f.mimetype]),
});
const rm = (img) => {
  if (img && img.startsWith("/uploads/"))
    fs.unlink(path.join(UP, path.basename(img)), () => {});
};
const saveImg = (f) =>
  CLOUD
    ? new Promise((ok, no) =>
        cloudinary.uploader
          .upload_stream({ folder: "sdn-products" }, (e, x) =>
            e ? no(e) : ok({ img: x.secure_url, imgId: x.public_id }),
          )
          .end(f.buffer),
      )
    : Promise.resolve({ img: "/uploads/" + f.filename, imgId: "" });
const dropImg = (o) => {
  if (o.imgId) cloudinary.uploader.destroy(o.imgId).catch(() => {});
  else rm(o.img);
};
const guard = (f) =>
  W(async (q, r) => {
    try {
      await f(q, r);
    } catch (e) {
      if (q.file && !CLOUD) rm("/uploads/" + q.file.filename);
      throw e;
    }
  });
function clean(b) {
  const n = String(b.n || "")
      .trim()
      .slice(0, 80),
    c = String(b.c || "")
      .trim()
      .slice(0, 40);
  let p;
  try {
    p = JSON.parse(b.p);
  } catch {
    p = [];
  }
  p = (Array.isArray(p) ? p : [])
    .map((x) => [Math.round(+x[0]), Math.round(+x[1])])
    .filter((x) => x[0] > 0 && x[1] > 0)
    .sort((a, b) => a[0] - b[0]);
  if (!n || !c || !p.length)
    throw bad("Name, category and at least one size and price are required");
  return {
    n,
    c,
    p,
    d: String(b.d || "").slice(0, 500),
    col: /^#[0-9a-f]{6}$/i.test(b.col) ? b.col : "#7a1fc4",
    f: b.f === "1" ? 1 : 0,
  };
}
function disc(b) {
  const pct = Math.round(+b.pct);
  if (!(pct > 0)) return null;
  if (pct > 95) throw bad("Discount must be between 1 and 95 percent");
  return { pct, end: /^\d{4}-\d{2}-\d{2}$/.test(b.end || "") ? b.end : "" };
}
app.param("id", (q, r, n, v) =>
  mongoose.isValidObjectId(v) ? n() : r.sendStatus(404),
);
const one = async (id) => {
  const p = await Product.findById(id);
  if (!p) throw bad("Not found", 404);
  return p;
};
const out = async (p) => {
  const cds = await CatDiscount.find().lean();
  return eff(p.toObject(), Object.fromEntries(cds.map((c) => [c.category, c])));
};
app.post(
  "/api/admin/products",
  auth,
  up.single("img"),
  guard(async (q, r) => {
    const c = clean(q.body),
      im = q.file ? await saveImg(q.file) : {};
    r.json(await out(await Product.create({ ...c, ...im })));
  }),
);
app.put(
  "/api/admin/products/:id",
  auth,
  up.single("img"),
  guard(async (q, r) => {
    const p = await one(q.params.id),
      old = { img: p.img, imgId: p.imgId },
      c = clean(q.body);
    Object.assign(p, c);
    const swap = q.file || q.body.rmimg === "1";
    if (swap)
      Object.assign(p, q.file ? await saveImg(q.file) : { img: "", imgId: "" });
    await p.save();
    if (swap) dropImg(old);
    r.json(await out(p));
  }),
);
app.delete(
  "/api/admin/products/:id",
  auth,
  W(async (q, r) => {
    const p = await one(q.params.id);
    await p.deleteOne();
    dropImg(p);
    r.json({ ok: 1 });
  }),
);
app.put(
  "/api/admin/products/:id/discount",
  auth,
  W(async (q, r) => {
    const p = await one(q.params.id);
    p.discount = disc(q.body) || undefined;
    await p.save();
    r.json(await out(p));
  }),
);
app.post(
  "/api/admin/categories",
  auth,
  W(async (q, r) => {
    const name = String(q.body.name || "")
      .trim()
      .slice(0, 40);
    if (!name) throw bad("Category name is required");
    if (await Category.exists({ name }))
      throw bad("Category already exists", 409);
    await Category.create({ name });
    r.json({ ok: 1 });
  }),
);
app.put(
  "/api/admin/categories/:category",
  auth,
  W(async (q, r) => {
    const old = q.params.category,
      name = String(q.body.name || "")
        .trim()
        .slice(0, 40);
    if (!name) throw bad("Category name is required");
    if (name !== old && (await Category.exists({ name })))
      throw bad("Category already exists", 409);
    await Category.findOneAndUpdate(
      { name: old },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    if (name !== old) {
      await Product.updateMany({ c: old }, { $set: { c: name } });
      await CatDiscount.updateOne(
        { category: old },
        { $set: { category: name } },
      );
    }
    r.json({ ok: 1 });
  }),
);
app.delete(
  "/api/admin/categories/:category",
  auth,
  W(async (q, r) => {
    const name = q.params.category;
    if (await Product.exists({ c: name }))
      throw bad("Move or delete this category’s products before removing it.");
    await Category.deleteOne({ name });
    await CatDiscount.deleteOne({ category: name });
    r.json({ ok: 1 });
  }),
);
app.put(
  "/api/admin/category-discount",
  auth,
  W(async (q, r) => {
    const category = String(q.body.category || "");
    if (!(await categoryNames()).includes(category))
      throw bad("Unknown category", 404);
    const d = disc(q.body);
    if (d)
      await CatDiscount.findOneAndUpdate({ category }, d, {
        upsert: true,
        new: true,
      });
    else await CatDiscount.deleteOne({ category });
    r.json({ ok: 1 });
  }),
);
app.use("/uploads", express.static(UP, { maxAge: "7d", index: false }));
if (fs.existsSync(DIST)) {
  app.use(
    express.static(DIST, {
      index: false,
      setHeaders: (res, p) => {
        if (p.includes(path.sep + "assets" + path.sep))
          res.set("Cache-Control", "public,max-age=31536000,immutable");
      },
    }),
  );
  app.get("/admin", (q, r) =>
    r.set("X-Robots-Tag", "noindex").sendFile(path.join(DIST, "admin.html")),
  );
  app.get(/^\/(?!api\/|uploads\/).*/, (q, r) =>
    r.sendFile(path.join(DIST, "index.html")),
  );
}
app.use("/api", (q, r) => r.status(404).json({ error: "Not found" }));
app.use((e, q, r, n) => {
  const s =
    e instanceof multer.MulterError
      ? 400
      : e.name === "ValidationError"
        ? 400
        : e.status || 500;
  if (s >= 500) console.error(e);
  r.status(s).json({ error: s < 500 ? e.message : "Server error" });
});
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const s = app.listen(PORT, () => console.log("Listening on " + PORT));
    const stop = () =>
      s.close(() => mongoose.disconnect().then(() => process.exit(0)));
    process.on("SIGTERM", stop);
    process.on("SIGINT", stop);
  })
  .catch((e) => {
    console.error("MongoDB connection failed:", e.message);
    process.exit(1);
  });
