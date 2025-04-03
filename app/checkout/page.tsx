"use client"

import type React from "react"
import { v4 as uuidv4 } from "uuid"

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
import { useState } from "react"

interface FormData {
  client: {
    name: string
    email: string
    phone: string
  }
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notes: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState<FormData>({
    client: {
      name: "Christian",
      email: "christian@gmail.com",
      phone: "04123456789",
    },
    address: {
      street: "Avenida Vargas entre carreras 24 y 25",
      city: "Barquisimeto",
      state: "Lara",
      zipCode: "3001",
      country: "Venezuela", // Default country
    },
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
              <h1 className="text-2xl font-bold mb-4">Tu Carrito está vacío</h1>
              <p className="text-muted-foreground mb-6">
                Agrega un cafecito a ver qué se siente.
              </p>
              <Button asChild>
                <Link href="/shop">Ver Productos</Link>
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
    const [parent, child] = name.split(".") as [keyof FormData, string]
    if (child) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(typeof prev[parent] === "object" && prev[parent] !== null
            ? prev[parent]
            : {}),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData,
          items: items,
          subtotal: subtotal,
        }),
      })

      if (response.ok) {
        clearCart()
        setIsSubmitting(false)
        setIsSuccess(true)
      } else {
        console.error("Failed to create order:", await response.json())
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      setIsSubmitting(false)
    }
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
                ¡Gracias por tu compra!
              </h1>
              <p className="text-muted-foreground mb-6">
                Tu orden ha sido recibida, serás contactado por Whatsapp para
                coordinar el pago.
              </p>
              <Button asChild>
                <Link href="/shop">Continúa Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          <Link
            href="/shop"
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
                    <div key={uuidv4()} className="py-3 flex">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            "/" + item.product.image ||
                            "/ventanita.jpeg" ||
                            "/placeholder.svg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        {item.optionPrice && (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {item.optionPrice?.weight} -{" "}
                              {item.optionPrice?.grind}
                            </p>
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          $
                          {(
                            (item.optionPrice?.price || 0) * item.quantity
                          ).toFixed(2)}
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
                        Información de Contacto
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="client.name">Nombre Completo</Label>
                          <Input
                            id="client.name"
                            name="client.name"
                            value={formData.client.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client.email">Email</Label>
                          <Input
                            id="client.email"
                            name="client.email"
                            type="email"
                            value={formData.client.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client.phone">
                            Teléfono (Whatsapp)
                          </Label>
                          <Input
                            id="client.phone"
                            name="client.phone"
                            type="tel"
                            value={formData.client.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Dirección de Envío
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2 cols-span-1 md:col-span-1">
                            <Label htmlFor="address.street">Pais</Label>
                            <Input
                              id="address.country"
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleChange}
                              disabled={true}
                              required
                            />
                          </div>
                          <div className="space-y-2 cols-span-1 md:col-span-2">
                            <Label htmlFor="address.street">Dirección</Label>
                            <Input
                              id="address.street"
                              name="address.street"
                              value={formData.address.street}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="address.city">Ciudad</Label>
                            <Input
                              id="address.city"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address.state">Estado</Label>
                            <Input
                              id="address.state"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address.zipCode">
                              Código Postal
                            </Label>
                            <Input
                              id="address.zipCode"
                              name="address.zipCode"
                              value={formData.address.zipCode}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Información Adicional
                      </h2>
                      <div className="space-y-2">
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
