import { AddProductDialog } from "./add-product-dialog"
import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getProducts() {
  // In a real application, this would fetch from your database
  // For now, returning mock data that matches your schema
  return [
    {
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
    },
    {
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
    },
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <AddProductDialog />
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

