"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DrizzleProduct } from "@/lib/db/schema"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: DrizzleProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, 1)
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={
            "/" + product.image + "?height=300&width=300" ||
            "/ventanita.jpeg?height=300&width=300"
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex-grow p-6">
        <div className="space-y-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          {product.category === "Cafe" && product.coffeeDetails && (
            <div className="mt-4 space-y-1 text-sm">
              {product.coffeeDetails.region && (
                <p>
                  <strong>Región:</strong> {product.coffeeDetails.region}
                </p>
              )}
              {product.coffeeDetails.processingMethod && (
                <p>
                  <strong>Proceso:</strong>{" "}
                  {product.coffeeDetails.processingMethod}
                </p>
              )}
              {product.coffeeDetails.variety && (
                <p>
                  <strong>Variedad:</strong> {product.coffeeDetails.variety}
                </p>
              )}
              {product.coffeeDetails.roastLevel && (
                <p>
                  <strong>Tostado:</strong> {product.coffeeDetails.roastLevel}
                </p>
              )}
              {product.coffeeDetails.flavorNotes &&
                product.coffeeDetails.flavorNotes.length > 0 && (
                  <p>
                    <strong>Notas de Sabor:</strong>{" "}
                    {product.coffeeDetails.flavorNotes.join(", ")}
                  </p>
                )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        {product.coffeeDetails?.weightPrices &&
        product.coffeeDetails.weightPrices.length > 0 ? (
          <span className="font-medium">
            Desde ${product.coffeeDetails.weightPrices[0].price.toFixed(2)}
          </span>
        ) : (
          <span className="font-medium">Precio no disponible</span>
        )}
        <Button size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
