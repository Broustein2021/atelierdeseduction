import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { site, waUrl, generalInquiryText } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-paper [&_span]:text-paper [&_.text-muted]:text-rose" />
          <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-paper/90">
            {site.tagline}.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/60">
            Lingerie choisie à Abidjan. Photos et vidéos sans retouches.
            Commande et paiement uniquement sur WhatsApp.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-rose">
            Visiter
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <Link to="/boutique" className="hover:text-paper">
                Boutique
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-paper">
                L'Atelier
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-paper">
                Contact & plan
              </Link>
            </li>
            <li>
              <Link to="/guide-tailles" className="hover:text-paper">
                Guide des tailles
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-rose">
            Atelier
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>{site.addressLine}</li>
            <li>Abidjan, Côte d'Ivoire</li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-paper">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waUrl(generalInquiryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-paper"
              >
                <WhatsAppIcon className="size-3.5" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Paiement et livraison confirmés sur WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
