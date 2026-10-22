import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";

/**
 * Dynamic sitemap: published products are read from the catalogue, so an item
 * added in the back office is indexable immediately (the old static file had
 * to be edited by hand and drifted out of date).
 */

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/boutique", changefreq: "daily", priority: "0.9" },
  { path: "/guide-tailles", changefreq: "monthly", priority: "0.4" },
  { path: "/a-propos", changefreq: "monthly", priority: "0.4" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
] as const;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(
  loc: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `<url><loc>${escapeXml(loc)}</loc>${lastmodTag}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // A database hiccup must not serve a 500 to crawlers: fall back to the
        // static pages, which are always valid.
        let products: { slug: string; lastmod: string }[] = [];
        try {
          const { listSitemapEntries } = await import("@/lib/products-server");
          products = await listSitemapEntries();
        } catch {
          products = [];
        }

        const entries = [
          ...STATIC_PAGES.map((page) =>
            urlEntry(`${SITE_URL}${page.path}`, page.changefreq, page.priority),
          ),
          ...products.map((product) =>
            urlEntry(
              `${SITE_URL}/produit/${product.slug}`,
              "weekly",
              "0.8",
              product.lastmod,
            ),
          ),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control":
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
