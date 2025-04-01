"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen, close } = useSidebarToggle()

  // Function to handle clicks on the main content
  const handleMainContentClick = () => {
    if (isOpen) {
      close()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className="flex-1 p-8 pt-20 w-full"
          onClick={handleMainContentClick}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
