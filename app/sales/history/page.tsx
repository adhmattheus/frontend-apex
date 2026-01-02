import { getSales } from "@/app/actions";
import { SalesHistoryTable } from "@/components/sales-history-table";

export default async function SalesHistoryPage() {
  const sales = await getSales();

  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      <div className="grid gap-2">
        <h1
          className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600 
               hover:from-primary/90 hover:to-purple-600/90 transition-all"
        >
          Sales History
        </h1>
        <p className="text-muted-foreground text-pretty">
          View and manage all your sales transactions
        </p>
      </div>

      <SalesHistoryTable sales={sales} />
    </div>
  );
}
