"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DrizzleProduct } from "@/lib/db/schema"
import { EditProductDialog } from "./edit-product-dialog"

export const columns: ColumnDef<DrizzleProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "image",
  //   header: "Image",
  //   cell: ({ row }) => {
  //     const image = row.getValue("image") as string
  //     return (
  //       <div className="flex items-center justify-center">
  //         <Image
  //           src={image || "/placeholder.svg"}
  //           alt={row.getValue("description")}
  //           width={50}
  //           height={50}
  //           className="rounded-md object-cover"
  //         />
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marca
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("category")}</Badge>
    },
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => {
      const category = row.getValue("category")
      const coffeeDetails = row.original.coffeeDetails

      if (category === "Cafe" && coffeeDetails?.weightPrices?.length) {
        const prices = coffeeDetails.weightPrices.map((wp) => wp.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        const formattedMin = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(minPrice)

        const formattedMax = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(maxPrice)

        return (
          <div>
            {formattedMin} - {formattedMax}
          </div>
        )
      }

      return <div>N/A</div>
    },
  },

  {
    accessorKey: "weightSizes",
    header: "Weight Sizes",
    cell: ({ row }) => {
      const category = row.getValue("category")
      const coffeeDetails = row.original.coffeeDetails

      if (category === "Cafe" && coffeeDetails?.weightPrices?.length) {
        return (
          <div className="flex flex-wrap gap-2">
            {coffeeDetails.weightPrices.map((wp) => (
              <Badge key={wp.weight} variant="outline">
                {wp.weight}
              </Badge>
            ))}
          </div>
        )
      }

      return <div>N/A</div>
    },
  },
  {
    accessorKey: "",
    header: "Modify",
    cell: ({ row }) => {
      const product = row.original
      return <EditProductDialog product={product} />
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/products/${product.id}`}>View details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/products/${product.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              asChild
            >
              <Link href={`/products/${product.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
