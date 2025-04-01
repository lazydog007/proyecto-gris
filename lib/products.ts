export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  brand: "ventanita" | "tropico"
  category: string
  region?: string
  coffeeVariety?: string
  process?: string
  roastLevel?: string
  flavorNotes?: string[]
}

export const products: Product[] = [
  // Ventanita Products
  {
    id: "v1",
    name: "Cafe Ventanita - 200g",
    description: "El cafe de la tolva!",
    price: 8,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Cafe",
    region: "Sanare, Lara",
    coffeeVariety: "Catimor",
    process: "Lavado",
    roastLevel: "Medio",
    flavorNotes: ["Mandarina", "Chocolate", "Caramelo", "Canela"],
  },
  {
    id: "v2",
    name: "Tropico Original - 1kg",
    description: "El regreso del Luigi",
    price: 20,
    image: "/tropico.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Cafe",
    region: "Rio Claro, Lara",
    coffeeVariety: "Villanueva 26",
    process: "Lavado",
    roastLevel: "Medio Oscuro",
    flavorNotes: ["Chocolate Oscuro", "Caramelo", "Cacao"],
  },
  {
    id: "v3",
    name: "Cafe 1600 - 200g",
    description: "El cafe de la gran posada Altos de Veracruz",
    price: 8,
    image: "/cafe1600-verde.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Cafe",
    region: "Sanare, Lara",
    coffeeVariety: "Catimor",
    process: "Natural",
    roastLevel: "Medio",
    flavorNotes: ["Afrutado", "Mora", "Cacao", "Caramelo"],
  },
  {
    id: "v4",
    name: "Cafe 1600 - 200g (Molido)",
    description: "El cafe de la gran posada Altos de Veracruz",
    price: 8,
    image: "/cafe1600-azul.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Cafe",
    region: "Sanare, Lara",
    coffeeVariety: "Catimor",
    process: "Natural",
    roastLevel: "Medio",
    flavorNotes: ["Afrutado", "Mora", "Cacao", "Caramelo"],
  },
  {
    id: "v5",
    name: "Cafe 5 Frailes - 250g (Molido)",
    description: "Un natural del cluster centrooccidental del cafe",
    price: 8,
    image: "/cafe5frailes.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Cafe",
    region: "Sanare, Lara",
    coffeeVariety: "Catimor",
    process: "Natural",
    roastLevel: "Medio",
    flavorNotes: ["Afrutado", "Mora", "Cacao", "Caramelo"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByBrand(brand: "ventanita" | "tropico"): Product[] {
  return products.filter((product) => product.brand === brand)
}

export function getCategories(brand: "ventanita" | "tropico"): string[] {
  const categories = new Set<string>()
  products
    .filter((product) => product.brand === brand)
    .forEach((product) => categories.add(product.category))

  return Array.from(categories)
}
