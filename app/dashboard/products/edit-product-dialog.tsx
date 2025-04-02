"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DrizzleProduct } from "@/lib/db/schema"
import { ProductForm } from "./product-form"

interface EditProductDialogProps {
  product: DrizzleProduct
}
export function EditProductDialog({ product }: EditProductDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogDescription>Completa este formulario</DialogDescription>
        </DialogHeader>
        <ProductForm initialData={product} />
      </DialogContent>
    </Dialog>
  )
}
