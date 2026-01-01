import { getProducts } from "@/app/actions";
import { ProductsGrid } from "@/components/products-grid";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              Products Management
            </h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Manage your product catalog with full CRUD operations
            </p>
          </div>
          <Link href="/sales">
            <Button
              size="lg"
              className="cursor-pointer gap-2 bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25"
            >
              <ShoppingCart className="h-5 w-5" />
              Go to Sales
            </Button>
          </Link>
        </div>
        <ProductsGrid initialProducts={products} />
      </div>
    </div>
  );
}
