import { CustomersContent } from "@/components/customers-content";
import { Suspense } from "react";

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Customer Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Detailed sales analysis by customer
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CustomersContent />
      </Suspense>
    </div>
  );
}
