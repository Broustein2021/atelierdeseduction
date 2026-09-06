export const categories = [
  { id: "ensembles", label: "Ensembles" },
  { id: "nuisettes", label: "Nuisettes" },
  { id: "bodies", label: "Bodies" },
  { id: "dessous", label: "Dessous" },
  { id: "nuit", label: "Nuit & lounge" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const colors = [
  { id: "ivoire", label: "Ivoire", swatch: "#F3E6D8" },
  { id: "rose", label: "Rose", swatch: "#E4B7B0" },
  { id: "bordeaux", label: "Bordeaux", swatch: "#7A2E3A" },
  { id: "noir", label: "Noir", swatch: "#1F1A19" },
  { id: "nude", label: "Nude", swatch: "#C4A484" },
] as const;

export type ColorId = (typeof colors)[number]["id"];

export const sizeOptions = ["S", "M", "L", "XL", "XXL"] as const;

export type Product = {
  id: string;
  slug: string;
  ref: string;
  name: string;
  category: CategoryId;
  colors: ColorId[];
  price: number;
  short: string;
  description: string;
  material: string;
  care: string;
  sizes: string[];
  images: string[];
  isNew?: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "pepite-rose",
    slug: "ensemble-pepite-rose",
    ref: "AS-PEP-R",
    name: "Ensemble Pépite Rose",
    category: "ensembles",
    colors: ["rose"],
    price: 18000,
    short: "Trois pièces en dentelle florale, photo sans retouche.",
    description:
      "La pépite de l'atelier, telle que photographiée en boutique. Un ensemble trois pièces en dentelle florale rose — soutien-gorge, culotte et porte-jarretelles — pensé pour célébrer la silhouette sans artifice. Toutes nos photos sont sans retouches.",
    material: "Dentelle florale stretch, tulle, élastiques recouverts",
    care: "Lavage à la main, séchage à plat, ne pas tordre",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/ensemble-pepite-rose.jpg",
      "/images/products/ensemble-rose.jpg",
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "dentelle-ivoire",
    slug: "ensemble-dentelle-ivoire",
    ref: "AS-DEN-IV",
    name: "Ensemble Dentelle Ivoire",
    category: "ensembles",
    colors: ["ivoire"],
    price: 18000,
    short: "Dentelle ivoire, ruban soie, la lumière du matin.",
    description:
      "Un deux-pièces ivoire en dentelle fine, posé comme une pièce de joaillerie. Le soutien-gorge et la culotte assortie épousent la peau sans la contraindre — une base précieuse pour le quotidien comme pour la soirée.",
    material: "Dentelle de Calais-style, tulle stretch, finitions satin",
    care: "Lavage délicat à la main, séchage à l'ombre",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/products/ensemble-ivoire.jpg"],
    isNew: true,
    featured: true,
  },
  {
    id: "dentelle-rose",
    slug: "ensemble-dentelle-rose",
    ref: "AS-DEN-RS",
    name: "Ensemble Dentelle Rose",
    category: "ensembles",
    colors: ["rose"],
    price: 18000,
    short: "Rose poussière, chaîne d'or, dentelle florale.",
    description:
      "Le rose de l'atelier — ni flashy, ni pâle. Une dentelle florale posée sur soie blush, pour celles qui veulent une couleur douce mais présente. Disponible aussi en ivoire.",
    material: "Dentelle florale, tulle, élastiques satinés",
    care: "Lavage à la main, éviter le sèche-linge",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/ensemble-rose.jpg",
      "/images/products/ensemble-pepite-rose.jpg",
    ],
    isNew: true,
  },
  {
    id: "camisole-bordeaux",
    slug: "camisole-soie-bordeaux",
    ref: "AS-CAM-BX",
    name: "Camisole Soie Bordeaux",
    category: "nuit",
    colors: ["bordeaux"],
    price: 22000,
    short: "Soie bordeaux, short assorti, chute de lumière.",
    description:
      "Une camisole en soie bordeaux et son short assorti. Le tombé est liquide, la couleur celle de la robe maille de la boutique. À porter pour soi, le soir, ou sous une veste le dimanche.",
    material: "Satin de soie, bretelles réglables, coutures françaises",
    care: "Lavage à la main à l'eau froide, fer doux sur l'envers",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/camisole-bordeaux.jpg"],
    featured: true,
  },
  {
    id: "nuisette-ivoire",
    slug: "nuisette-soie-ivoire",
    ref: "AS-NUI-IV",
    name: "Nuisette Soie Ivoire",
    category: "nuisettes",
    colors: ["ivoire"],
    price: 25000,
    short: "Longue nuisette ivoire, cintre or, mur d'atelier.",
    description:
      "Une nuisette longue en soie ivoire, photographiée sur cintre dans l'esprit de l'atelier. Le tissu prend la lumière, la longueur allonge la silhouette. Une pièce de nuit qui se suffit à elle-même.",
    material: "Satin de soie, bretelles spaghetti, fente discrète",
    care: "Lavage à la main, séchage à plat",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/products/nuisette-ivoire.jpg"],
    featured: true,
  },
  {
    id: "body-noir",
    slug: "body-dentelle-noir",
    ref: "AS-BDY-NR",
    name: "Body Dentelle Noir",
    category: "bodies",
    colors: ["noir"],
    price: 20000,
    short: "Dentelle noire, dessin floral, présence nette.",
    description:
      "Le body noir de l'atelier : dentelle florale, encolure travaillée, bas second peau. Une pièce unique qui remplace l'ensemble quand on veut une ligne continue. À porter sous une chemise, ou pour soi.",
    material: "Dentelle stretch, tulle, pressions à l'entrejambe",
    care: "Lavage à la main, ne pas essorer",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/body-noir.jpg"],
  },
  {
    id: "ensemble-nude",
    slug: "ensemble-nude-cachemire",
    ref: "AS-NUD-CA",
    name: "Ensemble Nude Cachemire",
    category: "ensembles",
    colors: ["nude"],
    price: 16000,
    short: "Nude chaud, dentelle, le teint plutôt que la mode.",
    description:
      "Un nude pensé pour les carnations chaudes — pas un beige froid. Dentelle et tulle, culotte taille haute, soutien-gorge qui disparaît sous les vêtements clairs. La pièce de fond de dressing.",
    material: "Dentelle stretch, tulle, microfibre",
    care: "Lavage délicat, séchage à l'ombre",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/products/ensemble-nude.jpg"],
  },
  {
    id: "nuisette-bordeaux",
    slug: "nuisette-satin-bordeaux",
    ref: "AS-NUI-BX",
    name: "Nuisette Satin Bordeaux",
    category: "nuisettes",
    colors: ["bordeaux"],
    price: 24000,
    short: "Satin bordeaux, vanity de marbre, parfum d'atelier.",
    description:
      "Une nuisette courte en satin bordeaux, le tombé d'une robe du soir en plus intime. La couleur signature de la boutique — celle de la maille côtelée portée en magasin.",
    material: "Satin, bretelles réglables, ourlet biais",
    care: "Lavage à la main, fer doux",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/nuisette-bordeaux.jpg"],
    isNew: true,
  },
  {
    id: "soutien-ivoire",
    slug: "soutien-gorge-dentelle-ivoire",
    ref: "AS-SG-IV",
    name: "Soutien-gorge Dentelle Ivoire",
    category: "dessous",
    colors: ["ivoire"],
    price: 12000,
    short: "Armatures légères, dentelle ivoire, brin de gypsophile.",
    description:
      "Un soutien-gorge à armatures en dentelle ivoire, bonnets dessinés pour tenir sans comprimer. Se porte avec la culotte assortie de l'ensemble dentelle, ou seul sous une chemise ouverte.",
    material: "Dentelle, tulle, armatures enrobées, dos double crochet",
    care: "Lavage à la main, crochets fermés",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/soutien-ivoire.jpg"],
  },
  {
    id: "trois-pieces",
    slug: "ensemble-trois-pieces-nuit",
    ref: "AS-3P-NT",
    name: "Ensemble Trois Pièces Nuit",
    category: "ensembles",
    colors: ["ivoire", "bordeaux"],
    price: 28000,
    short: "Soutien-gorge, culotte, porte-jarretelles — ivoire et bordeaux.",
    description:
      "L'ensemble complet de l'atelier : trois pièces en dentelle ivoire soulignée de bordeaux. Pour une soirée, une lune de miel, ou simplement le plaisir de s'habiller pour soi. Quantités limitées.",
    material: "Dentelle, tulle, jarretelles amovibles, finitions satin",
    care: "Lavage à la main pièce par pièce",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/products/ensemble-trois-pieces.jpg"],
    isNew: true,
    featured: true,
  },
  {
    id: "peignoir-ivoire",
    slug: "peignoir-soie-ivoire",
    ref: "AS-PEG-IV",
    name: "Peignoir Soie Ivoire",
    category: "nuit",
    colors: ["ivoire"],
    price: 32000,
    short: "Long peignoir de soie, ceinture, fauteuil d'atelier.",
    description:
      "Le peignoir long en soie ivoire — la pièce qui ferme une tenue de nuit, ou s'ouvre sur rien. Tombé ample, ceinture à nouer, manches qui bougent avec le geste. Une présence dans la chambre.",
    material: "Satin de soie, ceinture assortie, poches invisibles",
    care: "Lavage à la main, fer doux sur l'envers",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/products/peignoir-ivoire.jpg"],
    featured: true,
  },
];

export const categoryLabel: Record<CategoryId, string> = {
  ensembles: "Ensembles",
  nuisettes: "Nuisettes",
  bodies: "Bodies",
  dessous: "Dessous",
  nuit: "Nuit & lounge",
};

export const colorLabel: Record<ColorId, string> = {
  ivoire: "Ivoire",
  rose: "Rose",
  bordeaux: "Bordeaux",
  noir: "Noir",
  nude: "Nude",
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const rest = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...same, ...rest].slice(0, limit);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function newProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function productMessage(
  product: Product,
  opts?: { size?: string; color?: string },
): string {
  const parts = [
    `Bonjour, je suis intéressée par ${product.name} (Réf: ${product.ref})`,
  ];
  if (opts?.color) parts.push(`couleur ${opts.color}`);
  if (opts?.size) parts.push(`taille ${opts.size}`);
  const extra = opts?.color || opts?.size ? ` — ${parts.slice(1).join(", ")}` : "";
  return `${parts[0]}${extra}. Pouvez-vous me confirmer la disponibilité et le mode de paiement ?`;
}
