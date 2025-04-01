import { ClientsTable } from "@/components/clients-table"
import { ClientsHeader } from "@/components/clients-header"

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ClientsHeader />
      <ClientsTable />
    </div>
  )
}

