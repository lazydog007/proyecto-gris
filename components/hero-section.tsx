"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

import Navbar from "@/components/navbar"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      <Navbar />

      <motion.div
        style={{ opacity, scale, y }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
          <span className="block">Proyecto</span>
          <span className="block mt-2">Gris</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-gray-600">
          Crafting exceptional coffee experiences through our brands Ventanita Café and Trópico
        </p>
      </motion.div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0,rgba(0,0,0,0.05)_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <p className="text-sm text-gray-500 mb-2">Discover our brands</p>
        <ArrowDown className="h-5 w-5 animate-bounce text-gray-400" />
      </motion.div>
    </section>
  )
}

