"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const brands = [
  {
    name: "Ventanita Café",
    description:
      "A specialty coffee shop focused on exceptional espresso-based drinks and a curated coffee experience.",
    image: "/placeholder.svg?height=600&width=800",
    href: "/ventanita",
    color: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-100",
  },
  {
    name: "Trópico",
    description: "A premium coffee brand with its own laboratory, dedicated to exploring the finest coffee flavors.",
    image: "/placeholder.svg?height=600&width=800",
    href: "/tropico",
    color: "bg-gray-50",
    textColor: "text-gray-900",
    borderColor: "border-gray-200",
    hoverColor: "hover:bg-gray-100",
  },
]

export default function BrandShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our Brands
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {brands.map((brand) => (
            <motion.div key={brand.name} variants={itemVariants}>
              <Card className={`overflow-hidden border ${brand.borderColor}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className={`p-8 ${brand.color}`}>
                  <h3 className={`text-2xl font-bold mb-3 ${brand.textColor}`}>{brand.name}</h3>
                  <p className={`mb-6 ${brand.textColor}/80`}>{brand.description}</p>
                  <Button asChild variant="outline" className={`${brand.textColor} border-current ${brand.hoverColor}`}>
                    <Link href={brand.href}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

