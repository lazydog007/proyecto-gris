import { ProductForm } from "../../product-form"
import { notFound } from "next/navigation"

async function getProduct(id: string) {
  // In a real application, this would fetch from your database
  // For now, returning mock data if the ID matches
  if (id === "prod_1") {
    return {
      id: "prod_1",
      category: "Coffee",
      description: "Premium Ethiopian coffee with rich flavor profile",
      price: 14.99,
      image: "/placeholder.svg?height=100&width=100",
      brand: "Mountain Brew",
      coffeeDetails: {
        flavorNotes: ["Blueberry", "Chocolate", "Citrus"],
        roastLevel: "Medium",
        processingMethod: "Washed",
        variety: "Heirloom",
        region: "Yirgacheffe, Ethiopia",
        weights: ["250g", "500g", "1kg"],
        grindSizes: ["Whole Bean", "Espresso", "Filter", "French Press"],
      },
    }
  }

  if (id === "prod_2") {
    return {
      id: "prod_2",
      category: "Coffee",
      description: "Colombian single-origin coffee with caramel notes",
      price: 12.99,
      image: "/placeholder.svg?height=100&width=100",
      brand: "Coffee Artisans",
      coffeeDetails: {
        flavorNotes: ["Caramel", "Nutty", "Brown Sugar"],
        roastLevel: "Medium-Dark",
        processingMethod: "Washed",
        variety: "Castillo",
        region: "Huila, Colombia",
        weights: ["250g", "500g"],
        grindSizes: ["Whole Bean", "Espresso", "Filter"],
      },
    }
  }

  return null
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  )
}

