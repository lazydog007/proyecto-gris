"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { DrizzleProduct } from "@/lib/db/schema"
import { useQuery } from "@tanstack/react-query"

export default function ShopsPage() {
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

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 md:pt-24 md:pb-24">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {'"LA TIENDITA"'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Envios a toda Venezuela y el mundo enteroooo
            </p>
          </div>
          {productsDataLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando productos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsData?.map((product: DrizzleProduct) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {productsData?.length === 0 && !productsDataLoading && (
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
