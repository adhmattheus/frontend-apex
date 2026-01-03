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
          <h1 className="text-4xl font-bold text-primary">New Sale</h1>
          <p className="text-muted-foreground text-pretty">
            Add products to cart and complete sales transactions
          </p>
        </div>
        <Link href="/">
          <Button className="bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
      <SalesContent products={products} />
    </div>
  );
}
