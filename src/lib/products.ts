export type ProductCategory = "vestuário" | "decoração" | "acessórios";

export type ProductVariant = {
  color: string;
  mockup: string;
  hex: string; // "" or "transparent" for clear/transparent variants
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  mockup: string; // default mockup (first/dark variant)
  description: string;
  materials: string;
  sizes?: string[];
  productionTime: string;
  variants?: ProductVariant[];
};

export const products: Product[] = [
  {
    slug: "t-shirt",
    name: "T-shirt personalizada",
    price: 19.9,
    category: "vestuário",
    mockup: "/mockups/t-shirt-black.png",
    description:
      "Usa um design único que só tu tens. Feita em algodão orgânico de alta gramagem, oferece um toque suave e durabilidade lavagem após lavagem. O teu design é impresso com tinta de base aquosa, segura para a pele e com cores vibrantes que não desbotam. Corte unissexo que assenta bem em qualquer silhueta.",
    materials: "100% algodão orgânico penteado, 180 g/m², corte regular unissexo",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    productionTime: "3–5 dias úteis",
    variants: [
      { color: "Preto", mockup: "/mockups/t-shirt-black.png", hex: "#1a1a1a" },
      { color: "Branco", mockup: "/mockups/t-shirt-white.png", hex: "#f0f0f0" },
    ],
  },
  {
    slug: "hoodie",
    name: "Hoodie personalizada",
    price: 39.9,
    category: "vestuário",
    mockup: "/mockups/hoodie-black.png",
    description:
      "Conforto máximo com estilo exclusivo. O peso premium do tecido garante que este hoodie dure anos sem perder a forma. Ideal para os dias mais frescos, com o teu design aplicado por impressão DTG de alta definição que preserva todos os detalhes. Interior suave e felpudo para um aconchego que não passa de moda.",
    materials:
      "80% algodão, 20% poliéster reciclado, 320 g/m², interior felpudo, capuz duplo com cordão",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    productionTime: "3–5 dias úteis",
    variants: [
      { color: "Preto", mockup: "/mockups/hoodie-black.png", hex: "#1a1a1a" },
      { color: "Branco", mockup: "/mockups/hoodie-white.png", hex: "#f0f0f0" },
    ],
  },
  {
    slug: "poster",
    name: "Poster personalizado",
    price: 14.9,
    category: "decoração",
    mockup: "/mockups/poster.png",
    description:
      "Transforma uma parede em algo teu. Impresso em papel fotográfico de alta gramagem com acabamento mate, o teu design ganha vida com cores profundas e contrastes nítidos. Perfeito para quartos, escritórios ou como prenda original. Bordas brancas incluídas para facilitar o emolduramento.",
    materials:
      "Papel fotográfico premium, 250 g/m², acabamento mate anti-reflexo, bordas brancas 5 mm",
    sizes: ["A3 (30×42 cm)", "A2 (42×59 cm)", "A1 (59×84 cm)"],
    productionTime: "2–4 dias úteis",
  },
  {
    slug: "capa-telemovel",
    name: "Capa de telemóvel personalizada",
    price: 17.9,
    category: "acessórios",
    mockup: "/mockups/capa-telemovel.png",
    description:
      "Protege o teu telemóvel com um design que é só teu. A impressão UV de última geração garante cores brilhantes e resistência a riscos do dia a dia. Encaixa perfeitamente no teu modelo e mantém acesso a todos os botões, entradas e câmaras. Ligeira e resistente em simultâneo.",
    materials:
      "Policarbonato rígido 2 mm com revestimento em borracha TPU flexível, impressão UV resistente a riscos",
    sizes: [
      "iPhone 14",
      "iPhone 15",
      "iPhone 15 Pro",
      "iPhone 15 Pro Max",
      "Samsung Galaxy S24",
      "Samsung Galaxy S24+",
      "Samsung Galaxy S24 Ultra",
    ],
    productionTime: "3–5 dias úteis",
  },
  {
    slug: "caneca",
    name: "Caneca personalizada",
    price: 12.9,
    category: "acessórios",
    mockup: "/mockups/caneca-white.png",
    description:
      "O teu café da manhã merece uma caneca com personalidade. O design envolve toda a superfície em 360° e resiste a centenas de lavagens sem desbotar ou descascar. Uma prenda com utilidade garantida, que as pessoas usam todos os dias e nunca esquecem de onde veio.",
    materials:
      "Cerâmica de alta densidade, 325 ml, revestimento vítreo de grau alimentar, apta para micro-ondas e máquina de lavar loiça",
    productionTime: "3–5 dias úteis",
  },
  {
    slug: "autocolantes",
    name: "Autocolantes personalizados",
    price: 7.9,
    category: "acessórios",
    mockup: "/mockups/autocolantes.png",
    description:
      "Pequenos detalhes que fazem a diferença. Pack com 6 autocolantes em vinil de alta qualidade, resistentes à água, ao sol e ao uso diário. Colam em portáteis, garrafas, cadernos ou onde quiseres — e saem sem deixar rasto. Corte de precisão para acabamento profissional.",
    materials:
      "Vinil impermeável premium, laminação mate UV, adesivo removível sem resíduo, corte de contorno, pack de 6 unidades",
    productionTime: "2–3 dias úteis",
  },
  {
    slug: "tote-bag",
    name: "Tote bag personalizada",
    price: 16.9,
    category: "acessórios",
    mockup: "/mockups/tote-bag.png",
    description:
      "Substituí os sacos de plástico com estilo. Em algodão natural resistente, aguenta até 15 kg e sobrevive ao uso diário sem deformar. O design é aplicado em serigrafia de alta definição, com cores que se mantêm vivas mesmo depois de muitas lavagens à máquina.",
    materials:
      "100% algodão natural não branqueado, 220 g/m², alças reforçadas de 70 cm, base plana, costura dupla",
    productionTime: "3–5 dias úteis",
  },
  {
    slug: "quadro",
    name: "Quadro decorativo personalizado",
    price: 29.9,
    category: "decoração",
    mockup: "/mockups/quadro.png",
    description:
      "Arte genuína nas tuas paredes. O teu design é impresso em tela de algodão com tintas de arquivo e esticado à mão sobre uma armação de madeira de pinho. Pronto a pendurar, com suporte já incluído no verso. Uma peça decorativa com presença real que dura décadas.",
    materials:
      "Tela de algodão 340 g/m², armação de madeira de pinho, impressão giclée com tintas de arquivo, espessura 3 cm, bordas impressas",
    sizes: ["30×30 cm", "40×40 cm", "50×50 cm", "60×60 cm"],
    productionTime: "4–6 dias úteis",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + " €";
}
