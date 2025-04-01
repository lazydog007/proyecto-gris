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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Client = {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  lastOrder: string
  status: "active" | "inactive"
}

const data: Client[] = [
  {
    id: "CLT-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    orders: 5,
    totalSpent: 549.95,
    lastOrder: "2023-03-15",
    status: "active",
  },
  {
    id: "CLT-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    orders: 3,
    totalSpent: 329.97,
    lastOrder: "2023-03-10",
    status: "active",
  },
  {
    id: "CLT-1003",
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "(555) 345-6789",
    orders: 8,
    totalSpent: 1254.92,
    lastOrder: "2023-03-14",
    status: "active",
  },
  {
    id: "CLT-1004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 456-7890",
    orders: 2,
    totalSpent: 199.98,
    lastOrder: "2023-02-28",
    status: "inactive",
  },
  {
    id: "CLT-1005",
    name: "Robert Wilson",
    email: "rwilson@example.com",
    phone: "(555) 567-8901",
    orders: 1,
    totalSpent: 32.5,
    lastOrder: "2023-01-15",
    status: "inactive",
  },
  {
    id: "CLT-1006",
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    phone: "(555) 678-9012",
    orders: 6,
    totalSpent: 789.94,
    lastOrder: "2023-03-13",
    status: "active",
  },
  {
    id: "CLT-1007",
    name: "David Martinez",
    email: "dmartinez@example.com",
    phone: "(555) 789-0123",
    orders: 4,
    totalSpent: 429.96,
    lastOrder: "2023-03-05",
    status: "active",
  },
  {
    id: "CLT-1008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 890-1234",
    orders: 2,
    totalSpent: 259.98,
    lastOrder: "2023-02-20",
    status: "active",
  },
  {
    id: "CLT-1009",
    name: "Thomas White",
    email: "twhite@example.com",
    phone: "(555) 901-2345",
    orders: 7,
    totalSpent: 879.93,
    lastOrder: "2023-03-11",
    status: "active",
  },
  {
    id: "CLT-1010",
    name: "Jessica Clark",
    email: "jclark@example.com",
    phone: "(555) 012-3456",
    orders: 1,
    totalSpent: 45.99,
    lastOrder: "2023-01-30",
    status: "inactive",
  },
]

function ClientStatus({ status }: { status: string }) {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400",
  }

  const statusClass = statusStyles[status as keyof typeof statusStyles] || ""

  return (
    <Badge variant="outline" className={statusClass}>
      {status}
    </Badge>
  )
}

export function ClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()

        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "orders",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Orders
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "totalSpent",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Total Spent
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("totalSpent"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: "lastOrder",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Last Order
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <ClientStatus status={row.getValue("status")} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.id)}>
                Copy Client ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit client</DropdownMenuItem>
              <DropdownMenuItem>View orders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
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
          Showing {table.getRowModel().rows.length} of {data.length} clients
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

