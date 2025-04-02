import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProduct(id: string) {
  // In a real application, this would fetch from your database
  // For now, returning mock data if the ID matches
  if (id === "prod_1") {
    return {
      id: "prod_1",
      brand: "Mountain Brew",
      description: "Premium Ethiopian coffee with rich flavor profile",
    }
  }

  if (id === "prod_2") {
    return {
      id: "prod_2",
      brand: "Coffee Artisans",
      description: "Colombian single-origin coffee with caramel notes",
    }
  }

  return null
}

export default async function DeleteProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Delete Product</CardTitle>
          <CardDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{product.brand}</p>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/shop">Cancel</Link>
          </Button>
          <form action={`/api/products/${product.id}/delete`} method="POST">
            <Button variant="destructive" type="submit">
              Delete Product
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
