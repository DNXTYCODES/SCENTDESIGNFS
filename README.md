# Scent Design Nigeria – MERN

MongoDB + Express + React (Vite) + Node 18.18+.

## Run locally (VS Code)

1. Install Node LTS and MongoDB Community (or use a free MongoDB Atlas URI). Open this folder in VS Code.
2. `npm run install:all`
3. `cp server/.env.example server/.env` and fill in MONGO_URI, ADMIN_PASSWORD, JWT_SECRET.
4. `npm run seed` (loads the starter products once)
5. `npm run dev` → site http://localhost:5173, admin http://localhost:5173/admin
   Manage categories, products, business contact details, bank information, map link, and social profiles in `/admin`. Add categories before assigning products if useful.

To deliver contact-form messages by email, set `SMTP_USER` and `SMTP_PASS` in `server/.env` (for Gmail, create and use a Google App Password). Set the receiving address in the admin site's public email field or `CONTACT_TO`, then restart the server. Keep SMTP credentials server-side; never add them to the client environment. Initial business settings can be supplied with the `SITE_*` variables in `server/.env.example`.

## Production

`npm run build` then `NODE_ENV=production npm start` – Express serves the API, uploads and the built React app from one process.

- Host: Render / Railway / VPS. Build: `npm run install:all && npm run build`. Start: `npm start`. Add the env vars from .env.example.
- Database: MongoDB Atlas (IP allow-list, dedicated DB user, backups on).
- Uploads: default is local disk. Cloud hosts wipe it on redeploy, so attach a persistent disk and set UPLOAD_DIR, or move images to Cloudinary/S3.
- HTTPS is required (the admin cookie is `Secure` in production). Render/Railway provide it; on a VPS use nginx + Let's Encrypt.
- Use a long random JWT_SECRET and a strong ADMIN_PASSWORD. Login is rate-limited (10 tries / 15 min).
- Keep a process manager (PM2 or the host's) and monitor `/healthz`.

### Render: separate frontend and API

The static frontend stays available while Render spins a free API service back up. A `render.yaml` Blueprint creates both services. Set the Blueprint's required `MONGO_URI`, `ADMIN_PASSWORD`, and `JWT_SECRET` values. Add `SMTP_USER` and `SMTP_PASS` in the API service environment if website messages should be emailed.

The API service builds `client/dist` as well so its same-origin `/admin` page can manage the API securely. The public static site gets its API host from the Blueprint, sends credentialed requests to that host, and shows a retry message if the catalog is still waking. For manual setup, deploy the repo root as a Node web service with build command `npm install --prefix server && npm install --prefix client && npm run build --prefix client` and start command `node server/index.js`; deploy `client` as a Static Site with build command `npm install && npm run build` and publish directory `dist`. Set `VITE_API_URL` on the Static Site to the API origin and `FRONTEND_ORIGIN` on the API to the exact Static Site origin. Redeploy the static site after changing `VITE_API_URL`.

`/admin` on the public site redirects to the API service's admin page. Keep `FRONTEND_ORIGIN` restricted to your real frontend origin; production login cookies are Secure and credentialed cross-origin API access is enabled only for that origin. If you attach a custom frontend domain, override `FRONTEND_ORIGIN` in the API service with that exact `https://` origin.

## Replacing the old site (same database, domain and Render)

1. Work on a new git branch and a NEW Render web service first; move the domain only after testing.
2. Use a NEW database name: `MONGO_URI=mongodb+srv://USER:PASS@<your-cluster>/sdn`. This app only touches `sdn_products` and `sdn_catdiscounts`, never the old collections.
3. Bring old products across: set `LEGACY_DB` (the old database name, often `e-commerce`), run `npm run migrate --prefix server -- --dry`, check the preview, then `npm run migrate --prefix server`. Old Cloudinary image links keep working. Sizes/prices are best-effort; fix in /admin.
4. Set Cloudinary (`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`) so new photos survive redeploys.
5. Never commit `.env` files. Set variables in the Render dashboard.
6. The old separate frontend/admin/backend services can be switched off after the domain points to the new one.
