"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DrizzleProduct } from "@/lib/db/schema"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  product: DrizzleProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedWeight, setSelectedWeight] = useState(
    product.coffeeDetails?.weightPrices?.[0] || null
  )
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (selectedWeight) {
      addItem({
        product: product,
        optionPrice: {
          option: selectedWeight.weight,
          price: selectedWeight.price,
        },
        quantity,
      })
    }
  }

  // Function to determine roast level color
  const getRoastLevelColor = (level: string) => {
    console.log(level)
    switch (level?.toLowerCase()) {
      case "ligero":
        return "bg-amber-200"
      case "medio":
        return "bg-amber-400"
      case "medio oscuro":
        return "bg-amber-600"
      case "oscuro":
        return "bg-amber-800"
      default:
        return "bg-amber-400"
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        {/* New arrival badge */}
        {/* {product.isNew && (
          <Badge className="absolute top-3 left-3 z-10 bg-emerald-600 hover:bg-emerald-700">
            Nuevo
          </Badge>
        )} */}

        {/* Quick view button */}

        <div className="relative aspect-square overflow-hidden">
          <Image
            src={
              "/" + product.image + "?height=400&width=400" ||
              "/ventanita.jpeg?height=400&width=400" ||
              "/placeholder.svg"
            }
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <CardContent className="flex-grow p-5 space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {product.brand}
              </p>
              <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
            </div>

            {product.coffeeDetails?.roastLevel && (
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full ${getRoastLevelColor(
                    product.coffeeDetails.roastLevel.toLowerCase()
                  )}`}
                />
                <span className="text-xs mt-1">
                  {product.coffeeDetails.roastLevel}
                </span>
              </div>
            )}
          </div>
          {/* Flavor notes pills */}
          {product.coffeeDetails?.flavorNotes &&
            product.coffeeDetails.flavorNotes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {product.coffeeDetails.flavorNotes.map((note, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs rounded-full border border-black bg-black/5"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}
        </div>

        {/* Expandable details */}
        {product.category === "Cafe" && product.coffeeDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm animate-in fade-in duration-200">
            {product.coffeeDetails.region && (
              <div>
                <p className="text-gray-500 text-xs">Región</p>
                <p className="font-medium">{product.coffeeDetails.region}</p>
              </div>
            )}
            {product.coffeeDetails.processingMethod && (
              <div>
                <p className="text-gray-500 text-xs">Proceso</p>
                <p className="font-medium">
                  {product.coffeeDetails.processingMethod}
                </p>
              </div>
            )}
            {product.coffeeDetails.variety && (
              <div>
                <p className="text-gray-500 text-xs">Variedad</p>
                <p className="font-medium">{product.coffeeDetails.variety}</p>
              </div>
            )}
            {product.coffeeDetails.altitude && (
              <div>
                <p className="text-gray-500 text-xs">Altitud</p>
                <p className="font-medium">
                  {product.coffeeDetails.altitude}msm
                </p>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 flex items-end justify-between">
          <div className="space-y-2 flex-1">
            {product.coffeeDetails?.weightPrices &&
            product.coffeeDetails.weightPrices.length > 0 ? (
              <>
                <Select
                  value={selectedWeight?.weight}
                  onValueChange={(value) => {
                    const selected = product.coffeeDetails?.weightPrices?.find(
                      (wp) => wp.weight === value
                    )
                    if (selected) setSelectedWeight(selected)
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar peso" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.coffeeDetails.weightPrices.map((wp, idx) => (
                      <SelectItem key={idx} value={wp.weight}>
                        {wp.weight} - ${wp.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold">
                      ${selectedWeight?.price.toFixed(2)}
                    </span>
                    {selectedWeight && (
                      <span className="text-xs text-gray-500">
                        / {selectedWeight.weight}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <span className="text-gray-500">Precio no disponible</span>
            )}
          </div>
        </div>

        <Button
          className="w-full mt-4 hover:bg-amber-900 text-white"
          onClick={handleAddToCart}
          disabled={!selectedWeight}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  )
}
