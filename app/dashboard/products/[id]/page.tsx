import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProduct(id: string) {
  // In a real application, this would fetch from your database
  // For now, returning mock data if the ID matches
  if (id === "prod_1") {
    return {
      id: "prod_1",
      category: "Coffee",
      description: "Premium Ethiopian coffee with rich flavor profile",
      price: 14.99,
      image: "/placeholder.svg?height=100&width=100",
      brand: "Mountain Brew",
      coffeeDetails: {
        flavorNotes: ["Blueberry", "Chocolate", "Citrus"],
        roastLevel: "Medium",
        processingMethod: "Washed",
        variety: "Heirloom",
        region: "Yirgacheffe, Ethiopia",
        weights: ["250g", "500g", "1kg"],
        grindSizes: ["Whole Bean", "Espresso", "Filter", "French Press"],
      },
    }
  }

  if (id === "prod_2") {
    return {
      id: "prod_2",
      category: "Coffee",
      description: "Colombian single-origin coffee with caramel notes",
      price: 12.99,
      image: "/placeholder.svg?height=100&width=100",
      brand: "Coffee Artisans",
      coffeeDetails: {
        flavorNotes: ["Caramel", "Nutty", "Brown Sugar"],
        roastLevel: "Medium-Dark",
        processingMethod: "Washed",
        variety: "Castillo",
        region: "Huila, Colombia",
        weights: ["250g", "500g"],
        grindSizes: ["Whole Bean", "Espresso", "Filter"],
      },
    }
  }

  return null
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price)

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/products/${product.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" asChild>
            <Link href={`/products/${product.id}/delete`}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.description}
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{product.brand}</CardTitle>
            <CardDescription>
              <Badge variant="outline">{product.category}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p>{product.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Price
              </h3>
              <p className="text-2xl font-bold">{formattedPrice}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Coffee Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Roast Level
                  </h4>
                  <p>{product.coffeeDetails.roastLevel}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Processing Method
                  </h4>
                  <p>{product.coffeeDetails.processingMethod}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Variety
                  </h4>
                  <p>{product.coffeeDetails.variety}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Region
                  </h4>
                  <p>{product.coffeeDetails.region}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Flavor Notes
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.coffeeDetails.flavorNotes.map((note) => (
                    <Badge key={note} variant="secondary">
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Available Weights
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.coffeeDetails.weights.map((weight) => (
                      <Badge key={weight} variant="outline">
                        {weight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Grind Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.coffeeDetails.grindSizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
