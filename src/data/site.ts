export const site = {
  name: "L'Atelier de la Séduction",
  shortName: "AS",
  tagline: "Une pépite pour la beauté que tu es",
  city: "Abidjan",
  neighborhood: "Riviera-Bonoumin",
  addressLine: "Résidence RYAN, Riviera-Bonoumin",
  addressFull: "Résidence RYAN, Riviera-Bonoumin, Abidjan, Côte d'Ivoire",
  phoneDisplay: "01 40 24 22 21",
  phoneTel: "+2250140242221",
  whatsapp: "2250140242221",
  facebook:
    "https://www.facebook.com/people/Latelier-de-la-s%C3%A9duction/61587586820834/",
  hours: [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "10h — 19h" },
    { day: "Mercredi", hours: "10h — 19h" },
    { day: "Jeudi", hours: "10h — 19h" },
    { day: "Vendredi", hours: "10h — 19h" },
    { day: "Samedi", hours: "10h — 19h" },
    { day: "Dimanche", hours: "Sur rendez-vous" },
  ],
  mapEmbed:
    "https://maps.google.com/maps?q=Riviera%20Bonoumin%20Residence%20Ryan%20Abidjan&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Riviera+Bonoumin+Residence+Ryan+Abidjan",
} as const;

export function waUrl(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const generalInquiryText =
  "Bonjour, je vous contacte depuis le site L'Atelier de la Séduction. J'aimerais des informations sur vos pièces.";
