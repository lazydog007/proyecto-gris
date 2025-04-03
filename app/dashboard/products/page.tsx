"use client"
import { useQuery } from "@tanstack/react-query"
import { AddProductDialog } from "./add-product-dialog"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function ProductsPage() {
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
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <AddProductDialog />
      </div>
      {!productsDataLoading && (
        <DataTable columns={columns} data={productsData} />
      )}
    </div>
  )
}
