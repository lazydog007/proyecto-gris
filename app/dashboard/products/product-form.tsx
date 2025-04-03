"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { DrizzleProduct } from "@/lib/db/schema"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ProductFormProps {
  initialData?: DrizzleProduct
}
const weightOptions = ["100g", "200g", "250g", "340g", "1000g"]
const grindSizeOptions = [
  "Grano Entero",
  "Turco",
  "Espresso",
  "Filtradito",
  "Prensa Francesa",
  "Cold Brew",
  "AeroPress",
  "Greca / Moka Pot",
  "Drip",
]
export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [formData, setFormData] = useState(
    initialData || {
      name: "Cafe Ventanita Tolva",
      category: "Cafe",
      description: "",
      image: "",
      brand: "ventanita",
      active: true,
      coffeeDetails: {
        flavorNotes: ["Chocolate", "Caramelo", "Frutos Secos"],
        roastLevel: "Medio",
        processingMethod: "Lavado",
        variety: "Catimor",
        region: "Sanare, Lara",
        altitude: "1200msm",
        grindSizes: ["Grano Entero", "Filtradito"],
        weightPrices: [
          { weight: "250g", price: 8 },
          { weight: "500g", price: 15 },
          { weight: "1kg", price: 25 },
        ],
      },
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCoffeeDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails!,
        [field]: value,
      },
    }))
  }

  const addWeightPrice = (weight: string, price: number) => {
    if (!weight.trim() || price <= 0) return
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails!,
        weightPrices: [...prev.coffeeDetails!.weightPrices, { weight, price }],
      },
    }))
  }

  const removeWeightPrice = (weight: string) => {
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails!,
        weightPrices: prev.coffeeDetails!.weightPrices.filter(
          (item) => item.weight !== weight
        ),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.category || !formData.brand) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      console.log("Submitting form data:", formData)
      const response = await fetch("/api/products/create", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.API_KEY!,
        },
        body: JSON.stringify({
          formData: formData,
        }),
      })

      if (response.ok) {
        toast({
          title: `Item creado ${formData.name}`,
          duration: 1000,
        })
        window.location.reload()
        // router.push("/dashboard/products")
        // router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to save the product.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleUpdate = async () => {
    if (!initialData?.id) return

    try {
      setIsUpdating(true)
      console.log("Updating product data:", formData)
      const response = await fetch("/api/products/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: initialData.id,
          updateInfo: formData,
        }),
      })

      if (response.ok) {
        toast({
          title: "Product updated",
          description: `Successfully updated ${formData.name}`,
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: "Failed to update the product.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }
  const handleDelete = async () => {
    if (!initialData?.id) return

    try {
      setIsDeleting(true)
      const response = await fetch(
        `/api/products/delete?id=${initialData.id}`,
        {
          method: "DELETE",
        }
      )

      if (response.ok) {
        toast({
          title: "Product deleted",
          description: `Successfully deleted ${initialData.name}`,
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the product.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const addCustomItem = (
    field: "flavorNotes" | "grindSizes",
    value: string
  ) => {
    if (!value.trim()) return
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails!,
        [field]: [...prev.coffeeDetails![field], value],
      },
    }))
  }

  const removeCustomItem = (
    field: "flavorNotes" | "grindSizes",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails!,
        [field]: prev.coffeeDetails![field].filter((item) => item !== value),
      },
    }))
  }

  const handleToggleActive = () => {
    setFormData((prev) => ({
      ...prev,
      active: !prev.active,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Marca</label>
          <Input
            name="brand"
            value={formData.brand!}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoría</label>
          <Input
            name="category"
            value={formData.category!}
            onChange={handleChange}
            placeholder="Categoría"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Activo</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active!}
              onChange={handleToggleActive}
              id="active-toggle"
            />
            <label htmlFor="active-toggle" className="text-sm">
              {formData.active ? "Activo" : "Inactivo"}
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <Textarea
          name="description"
          value={formData.description!}
          onChange={handleChange}
          placeholder="Descripción del producto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nivel de tueste</label>
          <Input
            name="roastLevel"
            value={formData.coffeeDetails!.roastLevel}
            onChange={(e) =>
              handleCoffeeDetailsChange("roastLevel", e.target.value)
            }
            placeholder="Nivel de tueste"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Método de procesamiento
          </label>
          <Input
            name="processingMethod"
            value={formData.coffeeDetails!.processingMethod}
            onChange={(e) =>
              handleCoffeeDetailsChange("processingMethod", e.target.value)
            }
            placeholder="Método de procesamiento"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Variedad</label>
          <Input
            name="variety"
            value={formData.coffeeDetails!.variety}
            onChange={(e) =>
              handleCoffeeDetailsChange("variety", e.target.value)
            }
            placeholder="Variedad"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Región</label>
          <Input
            name="region"
            value={formData.coffeeDetails!.region}
            onChange={(e) =>
              handleCoffeeDetailsChange("region", e.target.value)
            }
            placeholder="Región"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Altitud</label>
          <Input
            name="altitude"
            value={formData.coffeeDetails!.altitude}
            onChange={(e) =>
              handleCoffeeDetailsChange("altitude", e.target.value)
            }
            placeholder="Altitud"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Notas de sabor</label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails!.flavorNotes.map((note) => (
              <Badge key={note}>
                {note}
                <button
                  type="button"
                  onClick={() => removeCustomItem("flavorNotes", note)}
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Agregar nota de sabor"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomItem("flavorNotes", e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Pesos y Precios</label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails!.weightPrices.map(({ weight, price }) => (
              <Badge key={weight}>
                {weight} - ${price}
                <button type="button" onClick={() => removeWeightPrice(weight)}>
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Agregar peso (e.g., 250g)"
              id="weight-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const weightInput = document.getElementById(
                    "weight-input"
                  ) as HTMLInputElement
                  const priceInput = document.getElementById(
                    "price-input"
                  ) as HTMLInputElement
                  if (weightInput && priceInput) {
                    const weight = weightInput.value
                    const price = parseFloat(priceInput.value)
                    addWeightPrice(weight, price)
                    weightInput.value = ""
                    priceInput.value = ""
                  }
                }
              }}
            />
            <Input
              placeholder="Agregar precio"
              id="price-input"
              type="number"
              step="0.5"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const weightInput = document.getElementById(
                    "weight-input"
                  ) as HTMLInputElement
                  const priceInput = document.getElementById(
                    "price-input"
                  ) as HTMLInputElement
                  if (weightInput && priceInput) {
                    const weight = weightInput.value
                    const price = parseFloat(priceInput.value)
                    addWeightPrice(weight, price)
                    weightInput.value = ""
                    priceInput.value = ""
                  }
                }
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Tamaños de molienda
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails!.grindSizes.map((grindSize) => (
              <Badge key={grindSize}>
                {grindSize}
                <button
                  type="button"
                  onClick={() => removeCustomItem("grindSizes", grindSize)}
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
          <Select
            onValueChange={(grindSize) => {
              if (grindSize) {
                addCustomItem("grindSizes", grindSize)
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tamaño de molienda" />
            </SelectTrigger>
            <SelectContent>
              {grindSizeOptions.map((grindSize) => (
                <SelectItem key={grindSize} value={grindSize}>
                  {grindSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        {initialData ? (
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar Producto"}
            </Button>
            <Button type="button" onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? "Actualizando..." : "Actualizar Producto"}
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear Producto"}
          </Button>
        )}
      </div>
    </form>
  )
}
