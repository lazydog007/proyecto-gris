import { eq } from "drizzle-orm"
import { db } from ".."
import { DrizzleProduct, products } from "../schema"

export const getProducts = async (companyId: string, menu: boolean) => {
  const _products = await db
    .select()
    .from(products)
    .orderBy(products.category, products.name)
  return _products
}

export const getProductById = async (productId: string) => {
  const _product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
  return _product
}

export const createProduct = async (product: DrizzleProduct) => {
  console.log("Creating product:", product)
  const _product = await db.insert(products).values(product)
  return _product
}

export const updateProduct = async (
  productId: string,
  product: Partial<DrizzleProduct>
) => {
  const _product = await db
    .update(products)
    .set(product)
    .where(eq(products.id, productId))
  return _product
}

export const deleteProduct = async (companyId: string, productId: string) => {
  const _product = await db.delete(products).where(eq(products.id, productId))
  return _product
}
