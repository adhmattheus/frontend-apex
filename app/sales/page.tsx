import { SalesContent } from "@/components/sales-content"
import { getProducts } from "@/app/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SalesPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Sales</h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Add products to cart and complete sales transactions
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <SalesContent products={products} />
      </div>
    </div>
  )
}
