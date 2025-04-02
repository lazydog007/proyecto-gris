import { doublePrecision, json, pgTable, text } from "drizzle-orm/pg-core"

// drizzle-orm
// drizzle-kit -> provides migration
// pushes changes: npx drizzle-kit push

export type CoffeeDetails = {
  flavorNotes: string[]
  roastLevel: string
  processingMethod: string
  variety: string
  region: string
  weights: string[]
  grindSizes: string[]
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
