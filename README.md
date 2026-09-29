# Scent Design Nigeria – MERN
MongoDB + Express + React (Vite) + Node 18.18+.

## Run locally (VS Code)
1. Install Node LTS and MongoDB Community (or use a free MongoDB Atlas URI). Open this folder in VS Code.
2. `npm run install:all`
3. `cp server/.env.example server/.env` and fill in MONGO_URI, ADMIN_PASSWORD, JWT_SECRET.
4. `npm run seed` (loads the starter products once)
5. `npm run dev` → site http://localhost:5173, admin http://localhost:5173/admin
Edit WhatsApp/phone/email in `client/.env` (`VITE_WHATSAPP=234...`, `VITE_PHONE`, `VITE_EMAIL`) and bank/social/ticker in `client/src/config.js`.

## Production
`npm run build` then `NODE_ENV=production npm start` – Express serves the API, uploads and the built React app from one process.
- Host: Render / Railway / VPS. Build: `npm run install:all && npm run build`. Start: `npm start`. Add the env vars from .env.example.
- Database: MongoDB Atlas (IP allow-list, dedicated DB user, backups on).
- Uploads: default is local disk. Cloud hosts wipe it on redeploy, so attach a persistent disk and set UPLOAD_DIR, or move images to Cloudinary/S3.
- HTTPS is required (the admin cookie is `Secure` in production). Render/Railway provide it; on a VPS use nginx + Let's Encrypt.
- Use a long random JWT_SECRET and a strong ADMIN_PASSWORD. Login is rate-limited (10 tries / 15 min).
- Keep a process manager (PM2 or the host's) and monitor `/healthz`.

## Replacing the old site (same database, domain and Render)
1. Work on a new git branch and a NEW Render web service first; move the domain only after testing.
2. Use a NEW database name: `MONGO_URI=mongodb+srv://USER:PASS@<your-cluster>/sdn`. This app only touches `sdn_products` and `sdn_catdiscounts`, never the old collections.
3. Bring old products across: set `LEGACY_DB` (the old database name, often `e-commerce`), run `npm run migrate --prefix server -- --dry`, check the preview, then `npm run migrate --prefix server`. Old Cloudinary image links keep working. Sizes/prices are best-effort; fix in /admin.
4. Set Cloudinary (`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`) so new photos survive redeploys.
5. Never commit `.env` files. Set variables in the Render dashboard.
6. The old separate frontend/admin/backend services can be switched off after the domain points to the new one.
