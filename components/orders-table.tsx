"use client"

import { useQuery } from "@tanstack/react-query"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { DrizzleOrder } from "@/lib/db/schema"
import { useState } from "react"
import { EditOrderDialog } from "./edit-order-dialog"

function OrderStatus({ status }: { status: string }) {
  const statusStyles = {
    paid: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
    shipped: "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
  }

  const statusClass = statusStyles[status as keyof typeof statusStyles] || ""

  return (
    <Badge variant="outline" className={statusClass}>
      {status}
    </Badge>
  )
}

export function OrdersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["getOrdersData"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/orders/list`, {
          cache: "no-store",
        })
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data: DrizzleOrder[] = await response.json()

        console.log("Fetched orders data:", data)
        return data
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch orders. Please try again later.",
          variant: "destructive",
        })
        throw error
      }
    },
  })

  const columns: ColumnDef<DrizzleOrder>[] = [
    {
      accessorKey: "id",
      header: "Orden",
      cell: ({ row }) => (
        <div className="font-medium">#{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "client.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.original.client!.name,
    },
    {
      accessorKey: "client.email",
      header: "Email",
      cell: ({ row }) => row.original.client!.email,
    },
    {
      accessorKey: "createDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) =>
        new Date(row.getValue("createDate")).toLocaleDateString("es-Es"),
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Monto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => row.original.items!.length,
    },
    {
      accessorKey: "orderStatus",
      header: "Status",
      cell: ({ row }) => <OrderStatus status={row.getValue("orderStatus")} />,
    },
    {
      id: "modify",
      cell: ({ row }) => {
        const order = row.original
        return <EditOrderDialog order={order} />
      },
    },
  ]

  const filteredData =
    statusFilter === "all"
      ? ordersData ?? []
      : (ordersData ?? []).filter((order) => order.orderStatus === statusFilter)

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {ordersData?.length ?? 0}{" "}
          orders
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
