import BrandShowcase from "@/components/brand-showcase"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BrandShowcase />
      <Footer />
    </main>
  )
}
