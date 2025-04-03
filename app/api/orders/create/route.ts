import { createOrder } from "@/lib/db/action/orders.action"
import { DrizzleOrder } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// /api/orders/create
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const formData = requestBody.formData

    console.log("Form data received:", formData)

    const order: DrizzleOrder = {
      id: uuidv4(),
      createDate: new Date().toISOString(),
      updateDate: null,
      items: formData.items,
      subtotal: formData.subtotal,
      total: formData.total,
      client: formData.client,
      address: formData.address,
      orderStatus: formData.orderStatus,
      courier: formData.courier,
      trackingNumber: formData.trackingNumber,
      payment: formData.payment,
    }

    console.log("Order to be created:", order)

    await createOrder(order)

    return NextResponse.json("Order created successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
