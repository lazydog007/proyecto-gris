export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  brand: "ventanita" | "tropico"
  category: string
}

export const products: Product[] = [
  // Ventanita Products
  {
    id: "v1",
    name: "Ventanita T-Shirt",
    description: "Comfortable cotton t-shirt with Ventanita logo.",
    price: 24.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Apparel",
  },
  {
    id: "v2",
    name: "Ceramic Mug",
    description: "Handcrafted ceramic mug with Ventanita branding.",
    price: 18.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Drinkware",
  },
  {
    id: "v3",
    name: "Canvas Tote Bag",
    description:
      "Durable canvas tote with Ventanita logo, perfect for shopping.",
    price: 15.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Accessories",
  },
  {
    id: "v4",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated bottle with Ventanita branding.",
    price: 29.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Drinkware",
  },
  {
    id: "v5",
    name: "Ventanita Cap",
    description: "Adjustable cotton cap with embroidered Ventanita logo.",
    price: 22.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Apparel",
  },
  {
    id: "v6",
    name: "Coffee Scoop",
    description: "Precision coffee scoop with Ventanita branding.",
    price: 12.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "ventanita",
    category: "Accessories",
  },

  // Tropico Products
  {
    id: "t1",
    name: "Signature Blend - Whole Bean",
    description:
      "Our signature blend with notes of chocolate, caramel, and citrus. 12oz bag.",
    price: 16.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Whole Bean",
  },
  {
    id: "t2",
    name: "Signature Blend - Ground",
    description:
      "Our signature blend with notes of chocolate, caramel, and citrus. 12oz bag.",
    price: 16.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Ground",
  },
  {
    id: "t3",
    name: "Single Origin Colombia - Whole Bean",
    description:
      "Bright and fruity Colombian coffee with notes of berries and honey. 12oz bag.",
    price: 18.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Whole Bean",
  },
  {
    id: "t4",
    name: "Single Origin Colombia - Ground",
    description:
      "Bright and fruity Colombian coffee with notes of berries and honey. 12oz bag.",
    price: 18.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Ground",
  },
  {
    id: "t5",
    name: "Single Origin Ethiopia - Whole Bean",
    description:
      "Floral Ethiopian coffee with notes of jasmine, bergamot, and peach. 12oz bag.",
    price: 19.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Whole Bean",
  },
  {
    id: "t6",
    name: "Single Origin Ethiopia - Ground",
    description:
      "Floral Ethiopian coffee with notes of jasmine, bergamot, and peach. 12oz bag.",
    price: 19.99,
    image: "/ventanita.jpeg?height=300&width=300",
    brand: "tropico",
    category: "Ground",
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
