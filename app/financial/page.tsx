import { getFinancialSummary, getTransactions } from "@/app/actions"
import { FinancialDashboard } from "@/components/financial-dashboard"

export default async function FinancialPage() {
  const summary = await getFinancialSummary()
  const transactions = await getTransactions()

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 pb-6 border-b">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your revenue, sales, and financial transactions in real-time
        </p>
      </div>

      <FinancialDashboard summary={summary} transactions={transactions} />
    </div>
  )
}
