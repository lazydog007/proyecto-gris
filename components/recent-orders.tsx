import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>You have 23 orders in progress</CardDescription>
        </div>
        <Link href="/dashboard/orders">
          <Button variant="outline">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

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

const recentOrders = [
  {
    id: "ORD-7352",
    customer: "John Smith",
    date: "2023-03-15",
    amount: 125.99,
    status: "paid",
  },
  {
    id: "ORD-7353",
    customer: "Sarah Johnson",
    date: "2023-03-15",
    amount: 89.99,
    status: "pending",
  },
  {
    id: "ORD-7354",
    customer: "Michael Brown",
    date: "2023-03-14",
    amount: 254.99,
    status: "shipped",
  },
  {
    id: "ORD-7355",
    customer: "Emily Davis",
    date: "2023-03-14",
    amount: 149.99,
    status: "paid",
  },
  {
    id: "ORD-7356",
    customer: "Robert Wilson",
    date: "2023-03-13",
    amount: 32.5,
    status: "cancelled",
  },
]

