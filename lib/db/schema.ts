import { doublePrecision, json, pgTable, text } from "drizzle-orm/pg-core"

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
  grindSizes: string[]
  weightPrices: WeightPrice[] // Array of weight-price pairs
}

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  image: text("image"), // image url
  brand: text("brand"),
  coffeeDetails: json("coffee_details").$type<CoffeeDetails>(),
})

export type DrizzleProduct = typeof products.$inferSelect
