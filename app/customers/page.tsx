import { CustomersContent } from "@/components/customers-content";
import { Suspense } from "react";

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      <div className="grid gap-2">
        <h1 className="text-4xl font-bold text-primary"> Customer Analytics</h1>
        <p className="text-muted-foreground text-pretty">
          Detailed sales analysis by customer
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CustomersContent />
      </Suspense>
    </div>
  );
}
