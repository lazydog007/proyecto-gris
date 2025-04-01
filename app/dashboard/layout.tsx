import { Header } from "@/components/header"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 p-8 pt-24">{children}</main>
      </div>
    </div>
  )
}
