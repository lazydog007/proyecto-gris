"use client"

import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Proyecto Gris", href: "/" },
  // { name: "Ventanita Café", href: "/ventanita" },
  // { name: "Trópico", href: "/tropico" },
  { name: "La Tiendita", href: "/shop" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine the current theme based on the pathname
  const getNavbarClasses = () => {
    if (pathname === "/ventanita" || pathname.startsWith("/ventanita/")) {
      return isScrolled
        ? "bg-green-50/80 backdrop-blur-md border-b border-green-100"
        : "bg-transparent"
    } else if (pathname === "/tropico" || pathname.startsWith("/tropico/")) {
      return isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
        : "bg-transparent"
    } else {
      return isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
        : "bg-transparent"
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        getNavbarClasses()
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-medium">
          Proyecto Gris
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative font-medium text-sm transition-colors hover:text-foreground/80",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.name}
              {(pathname === item.href ||
                pathname.startsWith(`${item.href}/`)) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <div className="flex items-center space-x-4">
          <CartDrawer />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-6 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
