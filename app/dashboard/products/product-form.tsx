"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ProductFormProps {
  initialData?: {
    id?: string
    name: string
    category: string
    description?: string
    price: number
    image: string
    brand: string
    coffeeDetails: {
      flavorNotes: string[]
      roastLevel: string
      processingMethod: string
      variety: string
      region: string
      weights: string[]
      grindSizes: string[]
    }
  }
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [formData, setFormData] = useState(
    initialData || {
      name: "Cafe Ventanita Tolva",
      category: "Cafe",
      description: "",
      price: 5,
      image: "",
      brand: "ventanita",
      coffeeDetails: {
        flavorNotes: ["Chocolate"],
        roastLevel: "Medio",
        processingMethod: "Lavado",
        variety: "Catimor",
        region: "Sanare, Lara",
        weights: ["250g", "500g", "1000g"],
        grindSizes: ["Grano Entero", "Filtradito"],
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
        ...prev.coffeeDetails,
        [field]: value,
      },
    }))
  }

  const addCustomItem = (field: string, value: string) => {
    if (!value.trim()) return
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails,
        [field]: [...prev.coffeeDetails[field], value],
      },
    }))
  }

  const removeCustomItem = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      coffeeDetails: {
        ...prev.coffeeDetails,
        [field]: prev.coffeeDetails[field].filter(
          (item: string) => item !== value
        ),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.brand
    ) {
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
        router.push("/dashboard/products")
        router.refresh()
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

  const handleDelete = async () => {
    if (!initialData?.id) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/products/${initialData.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Product deleted",
          description: `Successfully deleted ${initialData.name}`,
        })
        router.push("/products")
        router.refresh()
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
            value={formData.brand}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoría</label>
          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Categoría"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción del producto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nivel de tueste</label>
          <Input
            name="roastLevel"
            value={formData.coffeeDetails.roastLevel}
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
            value={formData.coffeeDetails.processingMethod}
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
            value={formData.coffeeDetails.variety}
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
            value={formData.coffeeDetails.region}
            onChange={(e) =>
              handleCoffeeDetailsChange("region", e.target.value)
            }
            placeholder="Región"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Notas de sabor</label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails.flavorNotes.map((note) => (
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
          <label className="block text-sm font-medium">Pesos</label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails.weights.map((weight) => (
              <Badge key={weight}>
                {weight}
                <button
                  type="button"
                  onClick={() => removeCustomItem("weights", weight)}
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Agregar peso"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomItem("weights", e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Tamaños de molienda
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.coffeeDetails.grindSizes.map((grindSize) => (
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
          <Input
            placeholder="Agregar tamaño de molienda"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomItem("grindSizes", e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        {initialData && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar Producto"}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Guardando..."
            : initialData
            ? "Actualizar Producto"
            : "Crear Producto"}
        </Button>
      </div>
    </form>
  )
}
