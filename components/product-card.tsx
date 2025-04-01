"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
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
          src={product.image || "/ventanita.jpeg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex-grow p-6">
        <div className="space-y-1">
          <h3 className="font-medium">{product.name}</h3>
          {/* <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p> */}
          {product.category === "Cafe" && (
            <div className="mt-4 space-y-1 text-sm">
              {product.region && (
                <p>
                  <strong>Región:</strong> {product.region}
                </p>
              )}
              {product.process && (
                <p>
                  <strong>Proceso:</strong> {product.process}
                </p>
              )}
              {product.coffeeVariety && (
                <p>
                  <strong>Variedad:</strong> {product.coffeeVariety}
                </p>
              )}
              {product.roastLevel && (
                <p>
                  <strong>Tostado:</strong> {product.roastLevel}
                </p>
              )}
              {product.flavorNotes && product.flavorNotes.length > 0 && (
                <p>
                  <strong>Notas de Sabor:</strong>{" "}
                  {product.flavorNotes.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <span className="font-medium">${product.price.toFixed(2)}</span>
        <Button size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
