"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { DrizzleOrder } from "@/lib/db/schema"
import { useState } from "react"

interface OrderFormProps {
  initialData: DrizzleOrder
}

export function OrderForm({ initialData }: OrderFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    parent: "client" | "address" | "payment"
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }))
  }

  const handleUpdate = async () => {
    try {
      setIsUpdating(true)
      console.log("Actualizando datos de la orden:", formData)
      const response = await fetch("/api/orders/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: initialData.id,
          updateInfo: formData,
        }),
      })

      if (response.ok) {
        toast({
          title: "Orden actualizada",
          description: `La orden #${formData.id} se actualizó correctamente.`,
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar la orden.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error al actualizar la orden:", error)
      toast({
        title: "Error",
        description: "Algo salió mal. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">ID de la Orden</label>
          <Input name="id" value={formData.id} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Estado de la Orden
          </label>
          <Select
            value={formData.orderStatus}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, orderStatus: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="paid">Pagada</SelectItem>
              <SelectItem value="shipped">Enviada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Información del Cliente
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              name="name"
              value={formData.client!.name}
              onChange={(e) => handleNestedChange(e, "client")}
              placeholder="Nombre del Cliente"
              required
            />
          </div>
          <div>
            <Input
              name="email"
              value={formData.client!.email}
              onChange={(e) => handleNestedChange(e, "client")}
              placeholder="Correo Electrónico del Cliente"
              type="email"
              required
            />
          </div>
          <div>
            <Input
              name="phone"
              value={formData.client!.phone}
              onChange={(e) => handleNestedChange(e, "client")}
              placeholder="Teléfono del Cliente"
              type="tel"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Dirección de Envío</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              name="street"
              value={formData.address!.street}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Calle"
              required
            />
          </div>
          <div>
            <Input
              name="city"
              value={formData.address!.city}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Ciudad"
              required
            />
          </div>
          <div>
            <Input
              name="state"
              value={formData.address!.state}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Estado"
              required
            />
          </div>
          <div>
            <Input
              name="zipCode"
              value={formData.address!.zipCode}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Código Postal"
              required
            />
          </div>
          <div>
            <Input
              name="country"
              value={formData.address!.country}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="País"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Artículos de la Orden
        </label>
        <div className="space-y-4">
          {formData.items!.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex flex-col">
                <p className="font-medium text-md">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.optionPrice?.weight} - $
                  {item.optionPrice?.price!.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col md:items-end mt-2 md:mt-0">
                <p className="text-sm">
                  <span className="font-medium">Cantidad:</span> {item.quantity}
                </p>
                <p className="text-sm font-medium">
                  Subtotal: $
                  {(item.quantity * item.optionPrice?.price!).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Información de Pago</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              name="paymentMethod"
              value={formData.payment!.paymentMethod}
              onChange={(e) => handleNestedChange(e, "payment")}
              placeholder="Método de Pago"
              required
            />
          </div>
          <div>
            <Input
              name="paymentName"
              value={formData.payment!.paymentName}
              onChange={(e) => handleNestedChange(e, "payment")}
              placeholder="Nombre en el Método de Pago"
              required
            />
          </div>
          <div>
            <Select
              value={formData.payment!.paymentStatus}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  payment: { ...prev.payment!, paymentStatus: value },
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Estado del Pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Pagado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="failed">Fallido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              name="paymentDate"
              value={formData.payment!.paymentDate}
              onChange={(e) => handleNestedChange(e, "payment")}
              placeholder="Fecha de Pago"
              type="datetime-local"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? "Actualizando..." : "Actualizar Orden"}
        </Button>
      </div>
    </form>
  )
}
