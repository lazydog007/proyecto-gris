"use client"

import { useState } from "react"
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Order = {
  id: string
  customer: string
  email: string
  date: string
  amount: number
  status: "paid" | "pending" | "shipped" | "cancelled"
  items: number
}

const data: Order[] = [
  {
    id: "ORD-7352",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-03-15",
    amount: 125.99,
    status: "paid",
    items: 3,
  },
  {
    id: "ORD-7353",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-03-15",
    amount: 89.99,
    status: "pending",
    items: 2,
  },
  {
    id: "ORD-7354",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-03-14",
    amount: 254.99,
    status: "shipped",
    items: 4,
  },
  {
    id: "ORD-7355",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-03-14",
    amount: 149.99,
    status: "paid",
    items: 2,
  },
  {
    id: "ORD-7356",
    customer: "Robert Wilson",
    email: "rwilson@example.com",
    date: "2023-03-13",
    amount: 32.5,
    status: "cancelled",
    items: 1,
  },
  {
    id: "ORD-7357",
    customer: "Jennifer Taylor",
    email: "jtaylor@example.com",
    date: "2023-03-13",
    amount: 189.99,
    status: "shipped",
    items: 3,
  },
  {
    id: "ORD-7358",
    customer: "David Martinez",
    email: "dmartinez@example.com",
    date: "2023-03-12",
    amount: 75.5,
    status: "paid",
    items: 2,
  },
  {
    id: "ORD-7359",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    date: "2023-03-12",
    amount: 129.99,
    status: "pending",
    items: 1,
  },
  {
    id: "ORD-7360",
    customer: "Thomas White",
    email: "twhite@example.com",
    date: "2023-03-11",
    amount: 219.99,
    status: "shipped",
    items: 4,
  },
  {
    id: "ORD-7361",
    customer: "Jessica Clark",
    email: "jclark@example.com",
    date: "2023-03-11",
    amount: 45.99,
    status: "paid",
    items: 1,
  },
]

function OrderStatus({ status }: { status: string }) {
  const statusStyles = {
    paid: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
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

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <div className="font-medium">#{row.getValue("id")}</div>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
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
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <OrderStatus status={row.getValue("status")} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>Copy Order ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Update status</DropdownMenuItem>
              <DropdownMenuItem>View customer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredData = statusFilter === "all" ? data : data.filter((order) => order.status === statusFilter)

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {data.length} orders
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
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

