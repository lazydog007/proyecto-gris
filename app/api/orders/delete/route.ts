import { deleteOrder } from "@/lib/db/action/orders.action"
import { NextRequest, NextResponse } from "next/server"
export const revalidate = 0
// /api/orders/delete
export async function DELETE(req: NextRequest) {
  try {
    console.log("Reached DELETE API")
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get("id") || "0"
    await deleteOrder(orderId)
    return NextResponse.json("Order deleted successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
