import {
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
  Outlet,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/layout/Shell";
import { NotFound } from "@/components/not-found";
import appCss from "../styles.css?url";
const APP_NAME = "L’Atelier de la Séduction";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Lingerie féminine à Abidjan — Riviera-Bonoumin. Photos sans retouches. Commandez sur WhatsApp.",
      },
      { name: "theme-color", content: "#7A2E3A" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "preload",
        href: "/fonts/outfit-300-600.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/cormorant-500-600.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: Root,
});

function Root() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  return (
    <html lang="fr" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh bg-cream font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          {isAdmin ? <Outlet /> : <Shell />}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
