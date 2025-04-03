import { DrizzleProduct } from "./db/schema"

export const weightOptions = ["100g", "200g", "250g", "340g", "1000g"]
export const grindSizeOptions = [
  "Grano Entero",
  "Turco",
  "Espresso",
  "Filtradito",
  "Prensa Francesa",
  "Cold Brew",
  "AeroPress",
  "Greca / Moka Pot",
  // "Drip",
]

export const roastLevels = [
  "Ligero",
  "Medio",
  "Medio oscuro",
  "Oscuro",
  "Espresso italiano",
]

export const processingMethods = ["Lavado", "Natural", "Honey", "Fermentado"]

export type CartItem = {
  product: DrizzleProduct
  optionPrice?: { weight?: string; price?: number; grind?: string }
  quantity: number
}
