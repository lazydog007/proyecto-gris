import { updateProduct } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { getAuth } from "@/lib/get-auth"
import { NextRequest, NextResponse } from "next/server"

// /api/products/update
export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const currentProduct: DrizzleProduct = requestBody.product
    const updateInfo = requestBody.updateInfo
    const companyId = requestBody.companyId

    const { user } = await getAuth()

    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    const updatedProduct: Partial<DrizzleProduct> = {
      storeId: currentProduct.storeId,
      name: updateInfo.name,
      price: updateInfo.price,
      category: updateInfo.category,
      currency: updateInfo.currency,
      favorite: updateInfo.favorite,
      notes: updateInfo.notes,
    }

    await updateProduct(companyId, currentProduct.productId, updatedProduct)

    return NextResponse.json("Product updated successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
