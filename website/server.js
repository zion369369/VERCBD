// server.js — VERCBD production entry point for cPanel (CloudLinux / Phusion Passenger)
//
// Responsibilities, in order:
//   1. Serve /_next/static/* and /public/* directly (fast, no Next.js round-trip).
//   2. Serve /_next/image?url=... from the original file when `sharp` is not
//      installed, so next/image never breaks on shared hosting.
//   3. Hand everything else to Next.js.
//   4. If Next.js fails to boot, fall back to the pre-rendered HTML in
//      .next/server/app so the public site still answers 200 instead of 500.
//
// This file must NOT rewrite /home/<user>/public_html/.htaccess. Apache config
// is managed by cPanel + the .htaccess shipped alongside this project.

const http = require('http');
const fs = require('fs');
const path = require('path');

const APP_DIR = __dirname;
const NEXT_DIR = path.join(APP_DIR, '.next');
const PUBLIC_DIR = path.join(APP_DIR, 'public');
const STATIC_DIR = path.join(NEXT_DIR, 'static');
const PRERENDER_DIR = path.join(NEXT_DIR, 'server', 'app');

let handle = null;
let initError = null;
let readyPromise = null;

// ---------------------------------------------------------------------------
// One-time, non-destructive bootstrap
// ---------------------------------------------------------------------------

// If public/assets did not survive the upload but assets.zip did, unpack it.
(function bootstrapAssets() {
  try {
    const marker = path.join(PUBLIC_DIR, 'assets', 'logo.png');
    if (fs.existsSync(marker)) return;

    const candidates = [
      path.join(APP_DIR, 'assets.zip'),
      path.join(APP_DIR, '..', 'assets.zip'),
    ];
    for (const zip of candidates) {
      if (!fs.existsSync(zip)) continue;
      try {
        require('child_process').execSync(`unzip -o "${zip}" -d "${APP_DIR}"`, {
          stdio: 'ignore',
        });
        console.log('[vercbd] extracted assets from ' + zip);
        break;
      } catch (e) {
        console.warn('[vercbd] could not extract ' + zip + ': ' + e.message);
      }
    }
  } catch (e) {
    console.warn('[vercbd] asset bootstrap skipped: ' + e.message);
  }
})();

// Can Next.js actually optimise images here? It needs two things in production:
// a working `sharp` native build, and a writable .next/cache/images directory.
// Shared hosting often lacks one or both, and then every /_next/image URL 500s
// while plain <img> tags keep working — the classic "some images don't load".
// Decide once at boot; if either check fails, serve the original files instead.
const canOptimiseImages = (function () {
  if (process.env.VERCBD_UNOPTIMIZED_IMAGES === '1') {
    console.warn('[vercbd] VERCBD_UNOPTIMIZED_IMAGES=1 — serving original images');
    return false;
  }
  try {
    const sharp = require('sharp');
    if (!sharp || !sharp.versions) throw new Error('sharp loaded but looks broken');
  } catch (e) {
    console.warn('[vercbd] sharp unavailable (' + e.message + ') — serving original images');
    return false;
  }
  try {
    const cacheDir = path.join(NEXT_DIR, 'cache', 'images');
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.accessSync(cacheDir, fs.constants.W_OK);
  } catch (e) {
    console.warn('[vercbd] .next/cache/images not writable — serving original images');
    return false;
  }
  return true;
})();

// ---------------------------------------------------------------------------
// Next.js
// ---------------------------------------------------------------------------

try {
  const next = require('next');
  const app = next({ dev: false, dir: APP_DIR });
  handle = app.getRequestHandler();
  readyPromise = app.prepare().catch((err) => {
    initError = err;
    console.error('[vercbd] next.prepare() failed:', err);
  });
} catch (err) {
  initError = err;
  console.error('[vercbd] could not load Next.js:', err);
}

// ---------------------------------------------------------------------------
// Static file serving
// ---------------------------------------------------------------------------

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

// Join `rel` onto `root`, refusing anything that escapes the root (../ etc).
function safeJoin(root, rel) {
  try {
    const decoded = decodeURIComponent(rel).replace(/^\/+/, '');
    const full = path.resolve(root, decoded);
    const base = path.resolve(root) + path.sep;
    if (full !== path.resolve(root) && !full.startsWith(base)) return null;
    return full;
  } catch (e) {
    return null;
  }
}

function sendFile(req, res, filePath, { immutable = false } = {}) {
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (e) {
    return false;
  }
  if (!stats.isFile()) return false;

  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Content-Length': stats.size,
    'Last-Modified': stats.mtime.toUTCString(),
    'Cache-Control': immutable
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600, must-revalidate',
  };

  if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end();
    return true;
  }

  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
  return true;
}

// Map a request path to a file on disk, or null.
function resolveStatic(pathname) {
  if (pathname.startsWith('/_next/static/')) {
    const file = safeJoin(STATIC_DIR, pathname.slice('/_next/static/'.length));
    return file ? { file, immutable: true } : null;
  }

  // Everything under public/ is reachable at the site root (/assets/..,
  // /fonts/.., /favicon.ico, /logo.png, ...).
  if (pathname === '/' || pathname.endsWith('/')) return null;
  const file = safeJoin(PUBLIC_DIR, pathname);
  if (file && fs.existsSync(file)) {
    return { file, immutable: pathname.startsWith('/assets/') };
  }
  return null;
}

// /_next/image?url=<encoded>&w=..&q=.. — return the untouched source file.
// Only used when sharp is unavailable, so real optimisation still wins when
// the dependency is installed.
function serveUnoptimisedImage(req, res, query) {
  const raw = query.get('url');
  if (!raw || /^https?:\/\//i.test(raw)) return false; // remote images: let Next try

  let target = null;
  if (raw.startsWith('/_next/static/')) {
    target = safeJoin(STATIC_DIR, raw.slice('/_next/static/'.length));
  } else {
    target = safeJoin(PUBLIC_DIR, raw);
  }
  if (!target || !fs.existsSync(target)) return false;

  return sendFile(req, res, target, { immutable: true });
}

// ---------------------------------------------------------------------------
// Degraded mode: serve the pre-rendered HTML when Next.js cannot boot
// ---------------------------------------------------------------------------

function servePrerendered(req, res, pathname) {
  let rel = pathname.replace(/\/+$/, '');
  if (rel === '') rel = '/index';
  const file = safeJoin(PRERENDER_DIR, rel + '.html');
  if (!file || !fs.existsSync(file)) return false;

  const body = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-cache',
  });
  res.end(req.method === 'HEAD' ? undefined : body);
  return true;
}

function diagnostics() {
  const ls = (p) => (fs.existsSync(p) ? fs.readdirSync(p).slice(0, 60) : 'MISSING');
  return {
    ok: !initError,
    error: initError ? String(initError.stack || initError.message) : null,
    node: process.version,
    appDir: APP_DIR,
    imageOptimisation: canOptimiseImages ? 'sharp' : 'disabled (serving originals)',
    nodeModules: fs.existsSync(path.join(APP_DIR, 'node_modules')),
    nextBuildId: fs.existsSync(path.join(NEXT_DIR, 'BUILD_ID'))
      ? fs.readFileSync(path.join(NEXT_DIR, 'BUILD_ID'), 'utf8').trim()
      : 'MISSING',
    dotNext: ls(NEXT_DIR),
    dotNextServer: ls(path.join(NEXT_DIR, 'server')),
    prerenderedPages: fs.existsSync(PRERENDER_DIR)
      ? fs.readdirSync(PRERENDER_DIR).filter((f) => f.endsWith('.html')).length
      : 'MISSING',
    staticChunks: fs.existsSync(STATIC_DIR) ? ls(STATIC_DIR) : 'MISSING',
    publicAssets: fs.existsSync(path.join(PUBLIC_DIR, 'assets'))
      ? fs.readdirSync(path.join(PUBLIC_DIR, 'assets')).length
      : 'MISSING',
  };
}

// ---------------------------------------------------------------------------
// Request handling
// ---------------------------------------------------------------------------

const server = http.createServer(async (req, res) => {
  let parsed;
  try {
    parsed = new URL(req.url || '/', 'http://localhost');
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad Request');
  }
  const pathname = parsed.pathname;

  // 1. Health / diagnostics (exact path only).
  if (pathname === '/_diag') {
    const body = JSON.stringify(diagnostics(), null, 2);
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(body);
  }

  // 2. next/image without sharp -> stream the original file.
  if (pathname === '/_next/image' && !canOptimiseImages) {
    if (serveUnoptimisedImage(req, res, parsed.searchParams)) return;
  }

  // 3. Build output and public/ files.
  const hit = resolveStatic(pathname);
  if (hit && sendFile(req, res, hit.file, { immutable: hit.immutable })) return;

  // 4. Wait for Next.js.
  if (readyPromise) {
    try {
      await readyPromise;
    } catch (e) {
      initError = initError || e;
    }
  }

  // 5. Normal path.
  if (!initError && handle) {
    try {
      return await handle(req, res);
    } catch (err) {
      // A single failed request must not put the whole process into
      // degraded mode, so initError is deliberately left alone here.
      console.error('[vercbd] request failed:', pathname, err);
      if (res.headersSent) return res.end();
    }
  }

  // 6. Degraded mode — never show a raw 500 to the public.
  //    Skip for React Server Component requests: returning HTML to the client
  //    router corrupts client-side navigation.
  const isRsc = parsed.searchParams.has('_rsc') || Boolean(req.headers['rsc']);
  if (!isRsc && servePrerendered(req, res, pathname)) return;

  res.writeHead(503, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(
    '<!doctype html><meta charset="utf-8"><title>VERC — temporarily unavailable</title>' +
      '<div style="font:16px/1.6 system-ui,sans-serif;max-width:720px;margin:12vh auto;padding:0 24px">' +
      '<h1 style="font-size:22px">The site is being updated</h1>' +
      '<p>Please try again in a few minutes.</p>' +
      '<p style="color:#64748b;font-size:13px">Administrators: see <code>/_diag</code> and <code>stderr.log</code>.</p>' +
      '</div>'
  );
});

// ---------------------------------------------------------------------------
// Listen. Under Passenger the socket is provided by the runtime; PORT is only
// used for local testing.
// ---------------------------------------------------------------------------

if (typeof PhusionPassenger !== 'undefined') {
  server.listen('passenger', () => console.log('[vercbd] listening on passenger socket'));
} else {
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log('[vercbd] listening on http://127.0.0.1:' + port));
}
