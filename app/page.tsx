import { getProducts } from "@/app/actions";
import { ProductsGrid } from "@/components/product/products-grid";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="grid gap-2">
          <h1
            className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600 
               hover:from-primary/90 hover:to-purple-600/90 transition-all"
          >
            Products Management
          </h1>

          <p className="text-muted-foreground text-pretty">
            Manage your product catalog
          </p>
        </div>
        <Link href="/sales">
          <Button className="gap-2 from-primary hover:bg-purple-600/90 shadow-sm shadow-primary/25">
            <ShoppingCart />
            Go to Sales
          </Button>
        </Link>
      </div>
      <ProductsGrid initialProducts={products} />
    </div>
  );
}
