import { createProduct } from "@/lib/db/action/products.action"
import { DrizzleProduct } from "@/lib/db/schema"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// /api/products/create
export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuth()

    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    const requestBody = await req.json()
    const formData = requestBody.formData
    const companyId = requestBody.companyId
    const menu = requestBody.menu
    const createExpenseFlag = requestBody.createExpense

    const product: DrizzleProduct = {
      productId: uuidv4(),
      companyId: companyId,
      storeId: null,
      name: formData.name,
      price: formData.price,
      category: formData.category,
      currency: formData.currency,
      favorite: formData.favorite,
      createdBy: user.id,
      createdAt: new Date(),
      notes: formData.notes,
      quantity: formData.quantity,
      location: formData.location,
      menu: menu,
    }

    await createProduct(product)

    if (createExpenseFlag) {
      const walletId = formData.walletId
      const amount = formData.quantity * formData.price

      const expense: DrizzleExpense = {
        expenseId: uuidv4(),
        category: formData.category,
        name: formData.name,
        userId: user.id,
        companyId: companyId,
        storeId: formData.storeId,
        createdAt: new Date(),
        amount: amount,
        currency: formData.currency,
        walletId: walletId,
        notes: formData.notes,
      }

      await createExpense(expense)

      const currentCurrency: Currency = {
        symbol: formData.currency!,
        exchangeRate: 1,
        source: "manual",
      }

      const transaction: DrizzleTransaction = {
        transactionId: uuidv4(),
        transactionType: "egreso",
        paymentMethod: "expense",
        paymentMethodId: null,
        createdAt: new Date(),
        userId: user.id,
        saleId: null,
        companyId: companyId,
        clientIdentification: null,
        amount: amount * -1,
        currency: currentCurrency,
        storeId: formData.storeId,
        status: null,
        notes: `inventario ${formData.name}`,
        walletId: walletId,
        expenseId: expense.expenseId,
      }

      await createTransaction(transaction)

      if (walletId) {
        const wallet = await getWallet(companyId)
        const currentWallet = wallet.find((w) => w.walletId === walletId)
        if (currentWallet) {
          const newBalance = currentWallet.balance! - amount
          await updateWalletBalance(walletId, newBalance)
        }
      }
    }

    return NextResponse.json("product created successfully")
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
