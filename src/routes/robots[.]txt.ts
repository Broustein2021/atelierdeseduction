import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";

/**
 * robots.txt is generated from the canonical origin so the sitemap URL follows
 * the shop when it moves to its own domain (the old static file hard-coded the
 * Vercel hostname).
 */

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /admin",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n");

        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
