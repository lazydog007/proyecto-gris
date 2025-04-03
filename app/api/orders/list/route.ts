import { getOrders } from "@/lib/db/action/orders.action"
import { DrizzleOrder } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

// /api/orders/list
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const orderStatus = searchParams.get("status") // Optional filter by status

    let orders: DrizzleOrder[] = await getOrders()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
