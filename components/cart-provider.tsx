"use client"

import { CartItem } from "@/lib/types"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize client-side rendering flag
  useEffect(() => {
    setIsClient(true)

    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse saved cart", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient && items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isClient])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (prevItem) =>
          prevItem.product.id === item.product.id &&
          prevItem.optionPrice?.weight === item.optionPrice?.weight
      )

      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.product.id === item.product.id &&
          prevItem.optionPrice?.weight === item.optionPrice?.weight
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
            : prevItem
        )
      } else {
        return [
          ...prevItems,
          {
            product: item.product,
            optionPrice: item.optionPrice,
            quantity: item.quantity,
          },
        ]
      }
    })

    // Open cart when adding items
    setIsCartOpen(true)
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Updated subtotal calculation using optionPrice
  const subtotal = items.reduce(
    (total, item) => total + (item.optionPrice?.price || 0) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
