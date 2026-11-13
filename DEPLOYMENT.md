# Deploying the website on Hostinger

Live URL: **https://biharsetu.in**. It talks to the API at **https://bihar-setu-backend.fillipsoftware.com**, which runs on aaPanel (see `DEPLOYMENT.md` in the `bihar_setu_backend` repo).
Set up the API and its SSL certificate first. The website cannot load forms or content until the API responds over HTTPS.

## 1. Build on your PC

```powershell
npm ci
npm run build
```

`npm run build` reads `.env.production`, which sets `VITE_API_URL=https://bihar-setu-backend.fillipsoftware.com`. The URL is fixed into the build, so rebuild whenever it changes.

The build goes to `dist/`. Zip the **contents** of `dist` (not the folder itself) so that `index.html` sits at the top of the zip:

- In Explorer: open `dist`, press Ctrl+A, then right-click → Send to → Compressed (zipped) folder. Or:
- In PowerShell, use Windows' own tar by its full path. Plain `tar` may run Git's tar instead, which can't write zip files:

  ```powershell
  & "$env:SystemRoot\System32\tar.exe" -a -cf biharsetu-dist.zip -C dist .
  ```

Don't upload the old `dist.zip` in this folder. It was built before `.env.production` existed and holds a `dist/` subfolder.

## 2. Upload (hPanel → Websites → biharsetu.in → File Manager)

1. Open `public_html` and delete the default `default.php` / `index.php` placeholder.
2. Upload `biharsetu-dist.zip` into `public_html` and **Extract** it there.
3. Confirm `public_html` now contains `index.html`, `assets/` and `.htaccess`, not a `dist/` subfolder.
4. Delete the zip.

`.htaccess` (from `public/.htaccess`) does three things:

- redirects `http://` and `www.` to `https://biharsetu.in`;
- sends every route (`/about`, `/agenda`, `/admin/login`, …) to `index.html`, so refreshing a page doesn't show a 404;
- caches the hashed `assets/` files for a year, while `index.html` is always re-checked.

## 3. SSL and DNS

- hPanel → Security → **SSL** → install the free certificate for `biharsetu.in` (it covers `www`).
- If the domain is registered somewhere else, point it to Hostinger (Hostinger nameservers, or the A record shown in hPanel).

## 4. Check it

- Open https://biharsetu.in. Pages load and the Agenda / Enquire forms show their fields.
- Refresh on https://biharsetu.in/about. It should not 404.
- Sign in at https://biharsetu.in/admin/login with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the server's `.env`.
- If forms say "Unable to reach the server", open the browser console:
  - **CORS error**: `CORS_ORIGINS` in the server `.env` must include `https://biharsetu.in` and `https://www.biharsetu.in`. Restart the API after changing it.
  - **Mixed content / certificate error**: SSL is not active yet on `bihar-setu-backend.fillipsoftware.com`.
- **ERR_TOO_MANY_REDIRECTS** (can happen behind Hostinger CDN or Cloudflare): delete the "Always use https://biharsetu.in" rule (the two `RewriteCond` lines and the `RewriteRule` under it) from `public_html/.htaccess`. Then turn on hPanel → Security → SSL → **Force HTTPS** instead.

## Updating later

Run `npm run build` again and repeat step 2. Replace the old `assets/` folder rather than merging into it, so stale files don't pile up.
