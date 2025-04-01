"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { getCategories, products } from "@/lib/products"
import { useState } from "react"

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ventanita" | "tropico">(
    "all"
  )
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const ventanitaCategories = getCategories("ventanita")
  const tropicoCategories = getCategories("tropico")

  const filteredProducts = products.filter((product) => {
    if (activeTab !== "all" && product.brand !== activeTab) return false
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
            <p>Envios a nivel nacional para toda Venezuela 🇻🇪 </p>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value as "all" | "ventanita" | "tropico")
              setActiveCategory(null)
            }}
            className="mb-8"
          >
            {/* <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="ventanita">Ventanita</TabsTrigger>
                <TabsTrigger value="tropico">Trópico</TabsTrigger>
              </TabsList>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div> */}

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
                Todas las categorías
              </Button>

              <TabsContent value="all" className="m-0">
                <div className="flex flex-wrap">
                  {[...ventanitaCategories, ...tropicoCategories].map(
                    (category) => (
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
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ventanita" className="m-0">
                <div className="flex flex-wrap">
                  {ventanitaCategories.map((category) => (
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
              </TabsContent>

              <TabsContent value="tropico" className="m-0">
                <div className="flex flex-wrap">
                  {tropicoCategories.map((category) => (
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
              </TabsContent>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  {activeTab === "all" && (
                    <Badge
                      className={`absolute top-2 right-2 z-10 ${
                        product.brand === "ventanita"
                          ? "bg-green-600"
                          : "bg-black"
                      }`}
                    >
                      {product.brand === "ventanita" ? "Ventanita" : "Trópico"}
                    </Badge>
                  )}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
