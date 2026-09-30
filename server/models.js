const m = require("mongoose");
const Product = m.model(
  "Product",
  new m.Schema(
    {
      n: { type: String, required: true, trim: true, maxlength: 80 },
      c: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40,
        index: true,
      },
      p: { type: [[Number]], validate: (v) => v.length > 0 },
      d: { type: String, maxlength: 500, default: "" },
      col: { type: String, default: "#7a1fc4" },
      f: { type: Number, default: 0 },
      rating: { type: Number, min: 1, max: 5, default: 4 },
      reviewCount: { type: Number, min: 0, default: 0 },
      img: { type: String, default: "" },
      imgId: { type: String, default: "" },
      discount: { pct: Number, end: String },
    },
    { timestamps: true },
  ),
  "sdn_products",
);
const CatDiscount = m.model(
  "CatDiscount",
  new m.Schema({
    category: { type: String, unique: true, required: true },
    pct: { type: Number, required: true },
    end: String,
  }),
  "sdn_catdiscounts",
);
const Category = m.model(
  "Category",
  new m.Schema(
    {
      name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 40,
      },
    },
    { timestamps: true },
  ),
  "sdn_categories",
);
const SiteSettings = m.model(
  "SiteSettings",
  new m.Schema(
    {
      key: { type: String, unique: true, required: true },
      businessName: String,
      email: String,
      phone: String,
      wa: String,
      address: String,
      hours: String,
      mapUrl: String,
      description: String,
      bank: { type: m.Schema.Types.Mixed, default: {} },
      social: { type: m.Schema.Types.Mixed, default: {} },
    },
    { timestamps: true, minimize: false },
  ),
  "sdn_site_settings",
);
module.exports = { Product, CatDiscount, Category, SiteSettings };
