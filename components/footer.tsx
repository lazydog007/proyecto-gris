import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className=" text-lg font-medium mb-4">Proyecto Gris</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            No hay luz sin oscuridad.
          </p>
        </div>

        <div>
          <h3 className=" text-lg font-medium mb-4">Nuestas Marcas</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/ventanita"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ventanita Café
              </Link>
            </li>
            <li>
              <Link
                href="/tropico"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Trópico
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className=" text-lg font-medium mb-4">Contacto</h3>
          <address className="not-italic text-sm text-muted-foreground">
            <p>Email: hello@proyectogris.com</p>
            <p className="mt-1">Phone: +1 (555) 123-4567</p>
          </address>
        </div>

        <div>
          <h3 className=" text-lg font-medium mb-4">Redes Sociales</h3>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Proyecto Gris. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
