import { OrdersTable } from "@/components/orders-table"
import { OrdersHeader } from "@/components/orders-header"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <OrdersHeader />
      <OrdersTable />
    </div>
  )
}

