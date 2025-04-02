import { createProduct } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// /api/products/create
export async function POST(req: NextRequest) {
  try {
    // const { user } = await getAuth()

    // if (!user) {
    //   return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    // }
    const requestBody = await req.json()
    const formData = requestBody.formData

    console.log("Form data received:", formData)

    const product: DrizzleProduct = {
      id: uuidv4(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      brand: formData.brand,
      coffeeDetails: formData.coffeeDetails,
    }

    console.log("Product to be created:", product)

    // BUG: coffeeDetails are not getting through to the db

    await createProduct(product)

    return NextResponse.json("product created successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
