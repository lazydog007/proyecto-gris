import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentOrders } from "@/components/recent-orders"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardCards />
      <RecentOrders />
    </div>
  )
}
