import { updateProduct } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

// /api/products/update
export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const productId = requestBody.productId
    const updateInfo: Partial<DrizzleProduct> = requestBody.updateInfo

    // Validate and sanitize the updateInfo object to ensure it matches the schema
    const updatedProduct: Partial<DrizzleProduct> = {
      name: updateInfo.name,
      category: updateInfo.category,
      description: updateInfo.description,
      image: updateInfo.image,
      brand: updateInfo.brand,
      active: updateInfo.active,
      coffeeDetails: updateInfo.coffeeDetails,
    }

    await updateProduct(productId, updatedProduct)

    return NextResponse.json("Product updated successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
