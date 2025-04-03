import { deleteProduct } from "@/lib/db/action/products.action"
import { NextRequest, NextResponse } from "next/server"

// /api/products/delete
export const revalidate = 0

export async function DELETE(req: NextRequest) {
  try {
    // Check if user is logged in
    console.log("Reached DELETE API")
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("id") || "0"
    await deleteProduct(productId)
    return NextResponse.json("product deleted successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
