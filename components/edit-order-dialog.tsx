"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DrizzleOrder } from "@/lib/db/schema"
import { OrderForm } from "./order-form"

interface EditOrderDialogProps {
  order: DrizzleOrder
}
export function EditOrderDialog({ order }: EditOrderDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Modificar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifica la Order</DialogTitle>
        </DialogHeader>
        <OrderForm initialData={order} />
      </DialogContent>
    </Dialog>
  )
}
