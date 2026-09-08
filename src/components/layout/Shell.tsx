import { Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

export function Shell() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip bg-cream text-ink">
      <Header />
      <div className="flex-1 pb-20 sm:pb-8">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
