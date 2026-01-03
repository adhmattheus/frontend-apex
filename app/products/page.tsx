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
          <h1 className="text-4xl font-bold text-primary">
            Products Management
          </h1>

          <p className="text-muted-foreground text-pretty">
            Manage your product catalog
          </p>
        </div>
        <Link href="/sales">
          <Button className="bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
            <ShoppingCart />
            Go to Sales
          </Button>
        </Link>
      </div>
      <ProductsGrid initialProducts={products} />
    </div>
  );
}
