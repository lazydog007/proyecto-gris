import { getProducts } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    let products: DrizzleProduct[] = await getProducts()

    return NextResponse.json(products!)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
