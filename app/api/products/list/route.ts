import { getProducts } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  try {
    let products: DrizzleProduct[] = await getProducts()

    // Sort products so that "tropico" appears before "ventanita"
    products.sort((a, b) => {
      const priorityBrands = ["tropico", "ventanita"]
      const aPriority = priorityBrands.indexOf(a.brand!.toLowerCase())
      const bPriority = priorityBrands.indexOf(b.brand!.toLowerCase())

      // If both brands are in the priority list, sort by their index in the array
      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority
      }

      // If only one brand is in the priority list, it comes first
      if (aPriority !== -1) return -1
      if (bPriority !== -1) return 1

      // Otherwise, maintain original order
      return 0
    })

    return NextResponse.json(products!)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
