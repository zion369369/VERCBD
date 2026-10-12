# vercbd.org — why it's broken and how to fix it

## What I found (verified against the live site, 19 Sep 2026)

| Test | Result | What it means |
|---|---|---|
| `https://www.vercbd.org/` | 200, but it's the **old HTML site** (`/images/slider1.jpg`, `/images/logo.jpg`, no `_next`) | The old website is still sitting in `public_html` and its `index` file is shadowing the homepage |
| `https://www.vercbd.org/about` | **503 Service Unavailable** + *"Additionally, a 503 … while trying to use an ErrorDocument"* | The `.htaccess` proxy rule is failing |
| `https://www.vercbd.org/nonexistent-random-path` | **503** (not 404) | Confirms every non-file URL dies in the same rule — Next.js is never reached |
| `https://www.vercbd.org/_next/static/css/92c747ddcc6056fd.css` | **200, real CSS** | Static files that physically exist in `public_html` are fine |

So the Node.js app is **not serving a single page**. Everything you see working is a static file on disk; everything else is a 503.

### Root cause 1 — the reverse-proxy rule in `.htaccess` (this is the 503)

Your `website/.htaccess` contains:

```apache
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

Two separate things are wrong with it:

1. **`[P]` needs `mod_proxy`**, which is disabled on cPanel shared hosting. A `[P]` rule that can't proxy returns `503`. And because the catch-all also rewrites the error page itself, Apache prints the giveaway second line: *"a 503 error was encountered while trying to use an ErrorDocument"*. That doubled message is the fingerprint of this exact bug.
2. **Nothing is listening on port 3000 anyway.** Your `server.js` correctly does `server.listen('passenger')` when Passenger is present — a Unix socket, not a TCP port. So even with `mod_proxy` enabled, the proxy would hit a closed port.

You don't need a proxy at all. Passenger already routes the domain into your app. The rule has to go.

### Root cause 2 — the old site is still in `public_html` (this is the homepage + images)

`/` serves the old static site, and `RewriteCond %{REQUEST_FILENAME} -f` lets any surviving old file win over the app. That's why you get a mix: old images load, new pages 503.

### Root cause 3 — `server.js` rewrites your `.htaccess` at boot

```js
ht = ht.replace(/<IfModule mod_rewrite\.c>[\s\S]*?<\/IfModule>/g, '');
ht = ht.replace(/RewriteEngine On[\s\S]*?RewriteRule[^\n]*/g, '');
```

This silently deletes rewrite blocks from `public_html/.htaccess` on every start. Combined with the proxy rule it creates a deadlock: the app can only clean the file *after* it starts, but it can't start because the file blocks every request. Remove it — Apache config should never be edited by the app.

### Root cause 4 — `next/image` has no `sharp` (this is the broken images)

Your pages use `next/image`, e.g. on `/about`:

```html
<img src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_official.48a8284c.jpg&w=3840&q=75">
```

Next.js 14 needs two things to serve that URL: the `sharp` native module, and a writable `.next/cache/images` directory. Shared cPanel hosting often has neither. When either is missing, every `/_next/image` URL errors out while plain `<img src="/assets/...">` tags keep working — which is exactly "*some* images are not loading".

The replacement `server.js` checks both at boot and, if optimisation isn't possible, streams the original file for `/_next/image` requests instead. Images then always render, just unresized. You can force that mode with the environment variable `VERCBD_UNOPTIMIZED_IMAGES=1`.

### Root cause 5 — pre-rendered HTML served ahead of Next.js

`server.js` returns `.next/server/app/<path>.html` before Next.js ever sees the request. That also catches the client router's RSC requests (`/about?_rsc=abc`), handing back HTML where a flight payload is expected. Client-side navigation breaks and the admin panel — which is a fully client-side app on `localStorage` — is the most affected. The fix below makes this a *fallback* only, and skips it for RSC requests.

---

## The fix

Three replacement files are in this folder:

- `server.js` → replaces `/home/vercbd/website/server.js`
- `package.json` → replaces `/home/vercbd/website/package.json`
- `htaccess-for-public_html.txt` → contents for `/home/vercbd/public_html/.htaccess`

### Step 1 — Get the old site out of the way

In **cPanel → File Manager**, turn on hidden files first: *Settings* (top right) → tick **Show Hidden Files (dotfiles)** → Save. You'll need this for `.htaccess` and `.next`.

In `/home/vercbd/public_html`:

1. Create a folder `/home/vercbd/old_site_backup`.
2. Move **everything** from `public_html` into it **except**: `.htaccess`, `cgi-bin`, and (if present) `_next` and `assets`.
   The old `index.html` / `index.php` / `images/` folder must be gone — that's what's serving your homepage today.

### Step 2 — Confirm the Node.js app is attached to the domain

**cPanel → Setup Node.js App**. You should have one application with:

| Field | Value |
|---|---|
| Node.js version | `20.x` (or `18.x`) |
| Application mode | `Production` |
| Application root | `website` |
| Application URL | `vercbd.org` |
| Application startup file | `server.js` |

If there's no application, create it with exactly those values. If the Application URL is a subdomain or a subfolder, change it to the bare domain.

### Step 3 — Fix `public_html/.htaccess`

Open `/home/vercbd/public_html/.htaccess` in the File Manager editor.

- **Keep** the `# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN … END` block exactly as it is.
  **If that block is not there, Step 2 was not done correctly — go back.**
- **Delete every `RewriteRule` containing `[P]`.** This is the 503.
- Paste the contents of `htaccess-for-public_html.txt` below the Passenger block.

Also delete `/home/vercbd/website/.htaccess` — an `.htaccess` in the app root does nothing useful there and only causes confusion.

### Step 4 — Replace `server.js` and `package.json`

Upload the two files from this folder into `/home/vercbd/website/`, overwriting the existing ones.

`package.json` adds `sharp` under `optionalDependencies`, so if the native build fails on your host the install still succeeds and the new `server.js` serves images unoptimised instead of failing. Either way images render.

### Step 5 — Verify the build actually uploaded

In `/home/vercbd/website`, check these exist (hidden files must be visible):

- `.next/BUILD_ID`
- `.next/server/app/` — should contain `index.html`, `about.html`, `admin.html`, … (~40 files)
- `.next/static/chunks/`
- `public/assets/` — ~49 images including `logo.png`

`.next` is a dotfolder, and ZIP uploads and FTP clients routinely skip it. If `.next/server/app` is missing, re-upload `next_build.zip` and extract it into `/home/vercbd/website`.

### Step 6 — Install and restart

On the **Setup Node.js App** page: click **Run NPM Install**, wait for the green message, then click **Restart**.

### Step 7 — Verify

Open these in order:

1. `https://www.vercbd.org/_diag` — JSON. Check:
   - `"ok": true` (Next.js booted; if `false`, `"error"` holds the stack trace)
   - `"nodeModules": true`
   - `"nextBuildId"` — a real id, not `MISSING`
   - `"prerenderedPages"` — around 40
   - `"publicAssets"` — around 49
   - `"imageOptimisation"` — `"sharp"` ideally, `"disabled (serving originals)"` is fine too

   **This is your diagnostic endpoint from now on.** It replaces the old `/diag`, which fired on *any* URL containing the string "diag".

2. `https://www.vercbd.org/` — the new Next.js homepage, not the old one.
3. `https://www.vercbd.org/about` — 200, hero image visible.
4. `https://www.vercbd.org/admin` — admin panel loads.
5. `https://www.vercbd.org/some-random-url` — should now be a **404**, not a 503.

If anything still fails, `/home/vercbd/website/stderr.log` has the real Node error.

---

## Cleanup and housekeeping

- Delete `website.zip` (54 MB), `next_build.zip` (8 MB) and `assets.zip` (43 MB) from the server once extraction is confirmed. Keeping `assets.zip` in `/home/vercbd/website/` is optional — the new `server.js` will auto-extract it only if `public/assets/logo.png` is missing.
- `/home/vercbd/public_html/_next` and `/assets` (if they exist as copies or symlinks) can stay — Apache serving them is faster than Node. Just remember to refresh them on every deploy, or delete them and let the app serve everything from one place.
- `frontend/.env.local` still points at `NEXT_PUBLIC_API_URL=http://localhost:3001`. It happens not to matter right now — `AuthContext` and `ContentContext` store everything in the browser's `localStorage`, so the admin panel needs no backend. Worth knowing: **admin content lives per-browser and is not shared between devices or users, and clearing site data wipes it.** When you're ready to make the CMS real, that's when the `backend/` Express + Prisma app needs deploying and that variable needs a public URL.

## For the next deploy

Rebuild locally, then upload `.next`, `public`, `server.js`, `package.json` and `next.config.js` — nothing else is needed at runtime. Never re-add a `[P]` proxy rule to `.htaccess`.
