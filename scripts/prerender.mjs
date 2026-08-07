import puppeteer from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const routes = [
  "/",
  "/about/",
  "/services/",
  "/services/architectural-design/",
  "/services/interior-design/",
  "/services/authority-submissions/",
  "/services/craftsmanship/",
  "/contact/",
  "/project/ritz-carlton-langkawi/",
  "/project/rabbit-hole-kl/",
  "/project/courtyard-house/",
  "/project/eco-sanctuary/",
  "/project/east-meets-west/",
  "/project/iconic-terrace/",
  "/project/sutera-terrace/",
  "/project/indah-putra/",
  "/project/horizon-hills/",
  "/project/chicha-san-chen/",
  "/project/winter-pavillion/",
  "/project/founders-penang/",
  "/project/aor-house/",
  "/project/langkawi-kitchen/",
  "/project/beach-grill/",
];

// Simple static file server for dist/
function startServer(port) {
  const mime = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  };

  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let url = req.url.split("?")[0];
      let filePath = join(DIST, url);

      // SPA fallback
      if (!existsSync(filePath) || !filePath.includes(".")) {
        filePath = join(DIST, "index.html");
      }

      try {
        const data = readFileSync(filePath);
        const ext = "." + filePath.split(".").pop();
        res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  console.log("Starting prerender...");
  const PORT = 4173;
  const server = await startServer(PORT);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Rendering: ${route}`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait a bit for any animations/lazy content
    await new Promise((r) => setTimeout(r, 1000));

    /*
     * Strip portal-rendered floating widgets before saving.
     *
     * WhatsAppChatWidget renders through createPortal into document.body, and it
     * only appears after mount (`if (!mounted) return null`). Puppeteer runs a
     * real browser, so the effect fires and the widget ends up baked into the
     * captured HTML — as a direct child of <body>, outside React's root.
     *
     * On a real visit that static copy is served, React then hydrates and mounts
     * its OWN copy, and the page ends up with TWO identical buttons stacked at
     * the same fixed position. Measured live 2026-08-07: two <a> to wa.me, both
     * z-index 9999, one with React props and one without.
     *
     * Today the tracked (React) copy happens to win, because equal z-index means
     * the later DOM node paints on top and React's is appended after. That is
     * luck, not design — flip the order and every WhatsApp click stops being
     * counted while the button still works, which is exactly the kind of silent
     * analytics failure that is invisible until someone asks why leads dropped.
     *
     * React re-creates the widget on mount regardless, so removing it here costs
     * nothing and leaves exactly one button.
     */
    await page.evaluate(() => {
      document
        .querySelectorAll('body > a[aria-label="Contact us on WhatsApp"], body > div > a[href*="wa.me"]')
        .forEach((el) => (el.closest('body > *') || el).remove());
    });

    const html = await page.content();

    // Determine output path
    const outDir = route === "/" ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    console.log(`  → Saved: ${join(outDir, "index.html")}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${routes.length} pages successfully!`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
