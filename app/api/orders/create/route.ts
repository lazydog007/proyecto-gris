import { createOrder } from "@/lib/db/action/orders.action"
import { DrizzleOrder } from "@/lib/db/schema"
import { CartItem } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"

// /api/orders/create
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const formData = requestBody.formData
    const items: CartItem[] = requestBody.items
    const subtotal = requestBody.subtotal

    console.log("Form data received:", formData)

    console.log("Form data:", formData)
    const order: DrizzleOrder = {
      id: crypto.randomUUID(),
      createDate: new Date().toISOString(),
      updateDate: null,
      // items: items.map((item) => ({
      //   id: item.product.id,
      //   name: item.product.name,
      //   option: item.optionPrice?.weight,
      //   price: item.optionPrice?.price,
      //   quantity: item.quantity,
      //   subtotal: (item.optionPrice?.price || 0) * item.quantity,
      // })),
      items: items.map((item) => ({
        product: item.product,
        optionPrice: item.optionPrice,
        quantity: item.quantity,
      })),
      subtotal: subtotal.toFixed(2),
      total: subtotal.toFixed(2),
      client: formData.client,
      address: formData.address,
      orderStatus: "pending",
      courier: null,
      trackingNumber: null,
      payment: {
        paymentMethod: "unpaid",
        paymentName: formData.client.name,
        paymentStatus: "pending",
        paymentDate: new Date().toISOString(),
      },
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
