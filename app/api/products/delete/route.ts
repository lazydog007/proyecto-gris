import { deleteProduct } from "@/lib/db/action/products.action"
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@/lib/get-auth"

// /api/products/delete
export async function DELETE(req: NextRequest) {
  try {
    // Check if user is logged in
    const { user } = await getAuth()

    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    const requestBody = await req.json()
    const productId: string = requestBody.productId
    const companyId: string = requestBody.companyId
    await deleteProduct(companyId, productId)
    return NextResponse.json("product deleted successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
