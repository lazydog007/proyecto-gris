import { eq } from "drizzle-orm"
import { db } from ".."
import { DrizzleOrder, orders } from "../schema"

export const getOrders = async () => {
  const _orders = await db.select().from(orders).orderBy(orders.createDate)
  return _orders
}

export const getOrdersByStatus = async (orderStatus: string) => {
  const _orders = await db
    .select()
    .from(orders)
    .where(eq(orders.orderStatus, orderStatus))
  return _orders
}

export const getOrderById = async (orderId: string) => {
  const _order = await db.select().from(orders).where(eq(orders.id, orderId))
  return _order
}

export const createOrder = async (order: DrizzleOrder) => {
  console.log("Creating order:", order)
  const _order = await db.insert(orders).values(order)
  return _order
}

export const updateOrder = async (
  orderId: string,
  order: Partial<DrizzleOrder>
) => {
  const _order = await db
    .update(orders)
    .set(order)
    .where(eq(orders.id, orderId))
  return _order
}

export const deleteOrder = async (orderId: string) => {
  console.log("Deleting order with ID:", orderId)
  const _order = await db.delete(orders).where(eq(orders.id, orderId))
  return _order
}
