import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to your admin console
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button>Export Reports</Button>
      </div>
    </div>
  )
}
