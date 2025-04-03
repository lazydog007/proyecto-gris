"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function ShopsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const { data: productsData, isLoading: productsDataLoading } = useQuery({
    queryKey: ["getProductsData"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/products/list`, {
          cache: "no-store",
        })
        return response.json()
      } catch (error) {
        throw error
      }
    },
  })

  const categories = Array.from(
    new Set(productsData?.map((product: any) => product.category))
  )

  const filteredProducts = productsData?.filter((product: any) => {
    if (activeCategory && product.category !== activeCategory) return false
    return true
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              "LA TIENDITA"
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Envios a toda Venezuela y el mundo enteroooo
            </p>
          </div>

          {/* <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div
              className={`md:flex space-y-4 md:space-y-0 md:space-x-4 mb-6 ${
                showFilters ? "block" : "hidden md:flex"
              }`}
            >
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
                className="mr-2 mb-2"
              >
                All Categories
              </Button>

              <div className="flex flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="mr-2 mb-2"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div> */}

          {productsDataLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts?.map((product: any) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {filteredProducts?.length === 0 && !productsDataLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
