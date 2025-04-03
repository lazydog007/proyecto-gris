"use server"
import { updateOrder } from "@/lib/db/action/orders.action"
import { DrizzleOrder } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

// /api/orders/update
export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const orderId = requestBody.orderId
    const updateInfo: Partial<DrizzleOrder> = requestBody.updateInfo

    // Validate and sanitize the updateInfo object to ensure it matches the schema
    const updatedOrder: Partial<DrizzleOrder> = {
      items: updateInfo.items,
      subtotal: updateInfo.subtotal,
      total: updateInfo.total,
      client: updateInfo.client,
      address: updateInfo.address,
      orderStatus: updateInfo.orderStatus,
      courier: updateInfo.courier,
      trackingNumber: updateInfo.trackingNumber,
      payment: updateInfo.payment,
      updateDate: new Date().toISOString(),
    }

    await updateOrder(orderId, updatedOrder)

    return NextResponse.json("Order updated successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
