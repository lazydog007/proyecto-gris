"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// Define the schema for coffee details
const coffeeDetailsSchema = z.object({
  flavorNotes: z.array(z.string()).min(1, "At least one flavor note is required"),
  roastLevel: z.string().min(1, "Roast level is required"),
  processingMethod: z.string().min(1, "Processing method is required"),
  variety: z.string().min(1, "Variety is required"),
  region: z.string().min(1, "Region is required"),
  weights: z.array(z.string()).min(1, "At least one weight option is required"),
  grindSizes: z.array(z.string()).min(1, "At least one grind size is required"),
})

// Define the schema for the product form
const productFormSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Must be a valid URL"),
  brand: z.string().min(1, "Brand is required"),
  coffeeDetails: coffeeDetailsSchema,
})

type ProductFormValues = z.infer<typeof productFormSchema>

// This type is used to define the default values
interface ProductFormProps {
  initialData?: ProductFormValues
}

// Predefined options for multi-select fields
const flavorNotesOptions = [
  "Chocolate",
  "Caramel",
  "Nutty",
  "Fruity",
  "Citrus",
  "Berry",
  "Floral",
  "Spicy",
  "Earthy",
  "Herbal",
  "Vanilla",
  "Honey",
  "Maple",
  "Toffee",
  "Blueberry",
  "Cherry",
  "Apple",
  "Peach",
  "Tropical",
  "Brown Sugar",
]

const grindSizesOptions = [
  "Whole Bean",
  "Extra Coarse",
  "Coarse",
  "Medium-Coarse",
  "Medium",
  "Medium-Fine",
  "Fine",
  "Extra Fine",
  "Turkish",
  "Espresso",
  "Pour Over",
  "French Press",
  "Cold Brew",
  "AeroPress",
  "Moka Pot",
  "Drip",
]

const weightOptions = ["100g", "200g", "250g", "340g", "500g", "1kg", "2kg", "5lb"]

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFlavorNote, setNewFlavorNote] = useState("")
  const [newWeight, setNewWeight] = useState("")
  const [newGrindSize, setNewGrindSize] = useState("")

  // Define default values for the form
  const defaultValues: Partial<ProductFormValues> = initialData || {
    category: "Coffee",
    description: "",
    price: 0,
    image: "",
    brand: "",
    coffeeDetails: {
      flavorNotes: [],
      roastLevel: "Medium",
      processingMethod: "Washed",
      variety: "",
      region: "",
      weights: ["250g"],
      grindSizes: ["Whole Bean"],
    },
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProductFormValues) {
    try {
      setIsSubmitting(true)
      // In a real application, this would send data to your API
      console.log("Form submitted:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: initialData ? "Product updated" : "Product created",
        description: `Successfully ${initialData ? "updated" : "created"} ${data.brand}`,
      })

      router.push("/admin/products")
      router.refresh()
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

  async function onDelete() {
    try {
      setIsDeleting(true)
      // In a real application, this would send a delete request to your API
      console.log("Deleting product:", initialData?.id)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Product deleted",
        description: `Successfully deleted ${initialData?.brand}`,
      })

      router.push("/admin/products")
      router.refresh()
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

  // Helper function to add a custom item to an array field
  function addCustomItem(field: any, value: string, setter: (value: string) => void) {
    if (!value.trim()) return

    const currentValues = field.value || []
    if (!currentValues.includes(value)) {
      field.onChange([...currentValues, value])
      setter("")
    }
  }

  // Helper function to remove an item from an array
  function removeArrayItem(field: any, itemToRemove: string) {
    const currentValues = field.value || []
    field.onChange(currentValues.filter((item: string) => item !== itemToRemove))
  }

  const roastLevels = ["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"]
  const processingMethods = ["Washed", "Natural", "Honey", "Anaerobic", "Wet-Hulled"]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details about the product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Product category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coffee Details</CardTitle>
            <CardDescription>Enter specific details about the coffee product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="coffeeDetails.roastLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roast Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select roast level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roastLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coffeeDetails.processingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Processing Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select processing method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {processingMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="coffeeDetails.variety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variety</FormLabel>
                    <FormControl>
                      <Input placeholder="Coffee variety" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coffeeDetails.region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Growing region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Multi-select for Flavor Notes */}
            <FormField
              control={form.control}
              name="coffeeDetails.flavorNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flavor Notes</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value?.map((note) => (
                      <Badge key={note} variant="secondary" className="flex items-center gap-1">
                        {note}
                        <button
                          type="button"
                          onClick={() => removeArrayItem(field, note)}
                          className="ml-1 rounded-full hover:bg-muted p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="justify-between w-full">
                          Select flavor notes
                          <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search flavor notes..." />
                          <CommandList>
                            <CommandEmpty>No flavor note found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                              {flavorNotesOptions.map((note) => (
                                <CommandItem
                                  key={note}
                                  onSelect={() => {
                                    const currentValues = field.value || []
                                    if (!currentValues.includes(note)) {
                                      field.onChange([...currentValues, note])
                                    }
                                  }}
                                >
                                  {note}
                                  {field.value?.includes(note) && <span className="ml-auto">✓</span>}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add custom flavor note"
                        value={newFlavorNote}
                        onChange={(e) => setNewFlavorNote(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCustomItem(field, newFlavorNote, setNewFlavorNote)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addCustomItem(field, newFlavorNote, setNewFlavorNote)}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Multi-select for Weights */}
              <FormField
                control={form.control}
                name="coffeeDetails.weights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Weights</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {field.value?.map((weight) => (
                        <Badge key={weight} variant="secondary" className="flex items-center gap-1">
                          {weight}
                          <button
                            type="button"
                            onClick={() => removeArrayItem(field, weight)}
                            className="ml-1 rounded-full hover:bg-muted p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="justify-between w-full">
                            Select weights
                            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search weights..." />
                            <CommandList>
                              <CommandEmpty>No weight found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {weightOptions.map((weight) => (
                                  <CommandItem
                                    key={weight}
                                    onSelect={() => {
                                      const currentValues = field.value || []
                                      if (!currentValues.includes(weight)) {
                                        field.onChange([...currentValues, weight])
                                      }
                                    }}
                                  >
                                    {weight}
                                    {field.value?.includes(weight) && <span className="ml-auto">✓</span>}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom weight (e.g., 250g)"
                          value={newWeight}
                          onChange={(e) => setNewWeight(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCustomItem(field, newWeight, setNewWeight)
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addCustomItem(field, newWeight, setNewWeight)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Multi-select for Grind Sizes */}
              <FormField
                control={form.control}
                name="coffeeDetails.grindSizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grind Sizes</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {field.value?.map((size) => (
                        <Badge key={size} variant="secondary" className="flex items-center gap-1">
                          {size}
                          <button
                            type="button"
                            onClick={() => removeArrayItem(field, size)}
                            className="ml-1 rounded-full hover:bg-muted p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="justify-between w-full">
                            Select grind sizes
                            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search grind sizes..." />
                            <CommandList>
                              <CommandEmpty>No grind size found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {grindSizesOptions.map((size) => (
                                  <CommandItem
                                    key={size}
                                    onSelect={() => {
                                      const currentValues = field.value || []
                                      if (!currentValues.includes(size)) {
                                        field.onChange([...currentValues, size])
                                      }
                                    }}
                                  >
                                    {size}
                                    {field.value?.includes(size) && <span className="ml-auto">✓</span>}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom grind size"
                          value={newGrindSize}
                          onChange={(e) => setNewGrindSize(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addCustomItem(field, newGrindSize, setNewGrindSize)
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addCustomItem(field, newGrindSize, setNewGrindSize)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {initialData ? (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Product"}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Create Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

