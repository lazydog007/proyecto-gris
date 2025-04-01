"use client"

import type React from "react"

import { useCart } from "@/components/cart-provider"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h1 className="text-2xl font-bold mb-4">Tu Carrito esta vacio</h1>
              <p className="text-muted-foreground mb-6">
                Agrega un cafecito a ver que se siente.
              </p>
              <Button asChild>
                <Link href="/products">Ver Productos</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create order object
    const order = {
      customer: formData,
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal,
      orderDate: new Date().toISOString(),
    }

    // Log order to console
    console.log("Order Enviada:", order)

    // Simulate processing
    setTimeout(() => {
      clearCart()
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-4">
                Gracias por tu compra!
              </h1>
              <p className="text-muted-foreground mb-6">
                Tu orden ha sido recivida, seras contactado por Whatsapp para
                coordinar el pago.
              </p>
              <Button asChild>
                <Link href="/products">Continua Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          <Link
            href="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Devuelta a La Tiendita
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-4">
                  Carrito de la Felicidad
                </h2>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-3 flex">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <p>Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                  </div>
                  {/* <div className="flex justify-between mb-2">
                    <p>Shipping</p>
                    <p className="font-medium">Calculated at next step</p>
                  </div> */}
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <p>Total</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Informacion de Contacto
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre(s)</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido(s)</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefono (Whatsapp)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Direccion de Envio
                      </h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Direccion</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">Codigo Postal</Label>
                            <Input
                              id="zip"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Informacion Adicional
                      </h2>
                      <div className="space-y-2">
                        {/* <Label htmlFor="notes">Order Notes (optional)</Label> */}
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Completar Orden"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
