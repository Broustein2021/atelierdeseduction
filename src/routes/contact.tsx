import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { generalInquiryText, site, waUrl } from "@/data/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-rose-deep">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">
        Venir, écrire, commander.
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        La conversation se passe sur WhatsApp. La boutique est à
        Riviera-Bonoumin, Résidence RYAN. Confirmez votre visite avant de vous
        déplacer.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-line bg-paper p-6">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted">
              <Phone className="size-3.5" />
              WhatsApp & téléphone
            </p>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-3 block font-display text-3xl text-ink"
            >
              {site.phoneDisplay}
            </a>
            <Button asChild variant="whatsapp" size="lg" className="mt-5 w-full">
              <a
                href={waUrl(generalInquiryText)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                Ouvrir WhatsApp
              </a>
            </Button>
          </div>

          <div className="rounded-xl border border-line bg-paper p-6">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted">
              <MapPin className="size-3.5" />
              Boutique
            </p>
            <p className="mt-3 text-[15px] leading-relaxed">
              {site.addressLine}
              <br />
              Abidjan, Côte d'Ivoire
            </p>
            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-burgundy underline-offset-4 hover:underline"
            >
              Itinéraire
            </a>
          </div>

          <div className="rounded-xl border border-line bg-paper p-6">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted">
              <Clock className="size-3.5" />
              Horaires
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-muted">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              Merci de confirmer votre passage sur WhatsApp.
            </p>
          </div>

          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-line bg-paper p-6 text-sm hover:border-ink/30"
          >
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
              Facebook
            </p>
            <p className="mt-2 font-display text-2xl">
              L'atelier de la séduction
            </p>
            <p className="mt-1 text-muted">Arrivages, pièces du jour, stories.</p>
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-sand lg:col-span-3 min-h-[420px]">
          <iframe
            title="Carte — L'Atelier de la Séduction, Riviera-Bonoumin"
            src={site.mapEmbed}
            className="h-full min-h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
