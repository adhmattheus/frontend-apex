import { getProducts } from "@/app/actions";
import { SalesContent } from "@/components/sales-content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SalesPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="grid gap-2">
          <h1
            className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600 
               hover:from-primary/90 hover:to-purple-600/90 transition-all"
          >
            Sales Management
          </h1>
          <p className="text-muted-foreground text-pretty">
            Add products to cart and complete sales transactions
          </p>
        </div>
        <Link href="/">
          <Button className="gap-2 from-primary hover:bg-purple-600/90 shadow-sm shadow-primary/25">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
      <SalesContent products={products} />
    </div>
  );
}
