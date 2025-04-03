import { boolean, json, pgTable, text } from "drizzle-orm/pg-core"
import { CartItem } from "../types"

// drizzle-orm
// drizzle-kit -> provides migration
// pushes changes: npx drizzle-kit push

export type WeightPrice = {
  weight: string // e.g., "250g", "500g", "1kg"
  price: number // Price for the specific weight
}

export type CoffeeDetails = {
  flavorNotes: string[]
  roastLevel: string
  processingMethod: string
  variety: string
  region: string
  altitude: string
  grindSizes: string[]
  weightPrices: WeightPrice[] // Array of weight-price pairs
}

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  description: text("description"),
  image: text("image"), // image url
  brand: text("brand"),
  active: boolean("active").default(true),
  coffeeDetails: json("coffee_details").$type<CoffeeDetails>(),
})

export type DrizzleProduct = typeof products.$inferSelect

export type Address = {
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}
export type Client = {
  name: string
  email: string
  phone: string
}
export type Payment = {
  paymentMethod: string // e.g., "credit_card", "paypal"
  paymentName: string // Name on the payment method
  paymentStatus: string // e.g., "paid", "pending", "failed"
  paymentDate: string // ISO string format
}

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  createDate: text("create_date").notNull(), // ISO string format
  updateDate: text("update_date"), // ISO string format
  items: json("items").$type<CartItem[]>(), // Array of CartItem
  subtotal: text("subtotal").notNull(), // Store as string to handle currency precision
  total: text("total").notNull(), // Store as string to handle currency precision
  client: json("client").$type<Client>(), // Client identifier
  address: json("address").$type<Address>(), // Shipping address
  orderStatus: text("order_status").notNull(), // e.g., "pending", "shipped", "delivered"
  courier: text("courier"), // Courier name
  trackingNumber: text("tracking_number"), // Tracking number for the shipment
  payment: json("payment").$type<Payment>(),
})

export type DrizzleOrder = typeof orders.$inferSelect
