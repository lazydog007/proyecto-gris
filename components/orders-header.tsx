import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function OrdersHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ordenes</h1>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-8 sm:w-[300px]"
          />
        </div>
        {/* <Button>Export</Button> */}
      </div>
    </div>
  )
}
