import { getSales } from "@/app/actions";
import { SalesHistoryTable } from "@/components/sales-history-table";

export default async function SalesHistoryPage() {
  const sales = await getSales();

  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      <div className="grid gap-2">
        <h1 className="text-4xl font-bold text-primary">Sales History</h1>
        <p className="text-muted-foreground text-pretty">
          View and manage all your sales transactions
        </p>
      </div>

      <SalesHistoryTable sales={sales} />
    </div>
  );
}
