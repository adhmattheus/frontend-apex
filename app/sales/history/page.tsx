import { getSales } from "@/app/actions"
import { SalesHistoryTable } from "@/components/sales-history-table"

export default async function SalesHistoryPage() {
  const sales = await getSales()

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Sales History</h1>
        <p className="text-muted-foreground">View and manage all your sales transactions</p>
      </div>

      <SalesHistoryTable sales={sales} />
    </div>
  )
}
