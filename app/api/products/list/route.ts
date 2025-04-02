import { getProducts } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { getAuth } from "@/lib/get-auth"
import { stringToBoolean } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { user } = await getAuth()

    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const companyId = searchParams.get("companyId")!
    const menu = searchParams.get("menu")!

    let products: DrizzleProduct[] = await getProducts(
      companyId!,
      stringToBoolean(menu)
    )
    products = products.sort((a, b) => {
      if (a.category === "Promos" && b.category !== "Promos") {
        return -1
      }
      if (a.category !== "Promos" && b.category === "Promos") {
        return 1
      }
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
