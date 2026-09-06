import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { generalInquiryText, waUrl } from "@/data/site";

export function WhatsAppFloat() {
  return (
    <a
      href={waUrl(generalInquiryText)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-wa text-paper shadow-soft transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-6"
      aria-label="Écrire sur WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
