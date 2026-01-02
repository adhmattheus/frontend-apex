"use client";

import type { Product } from "@/app/actions";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { ProductDialog } from "@/components/product/product-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ProductsTableProps {
  initialProducts: Product[];
}

export function ProductsTable({ initialProducts }: ProductsTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Product Catalog</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            total
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <DataTable columns={columns} data={products} />

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          // Refresh will happen via revalidatePath
          window.location.reload();
        }}
      />
    </div>
  );
}
