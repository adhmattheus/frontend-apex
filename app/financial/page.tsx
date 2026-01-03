import { getFinancialSummary, getTransactions } from "@/app/actions";
import { FinancialDashboard } from "@/components/financial-dashboard";

export default async function FinancialPage() {
  const summary = await getFinancialSummary();
  const transactions = await getTransactions();

  return (
    <div className="bg-background p-4 gap-4 grid">
      <div className="grid gap-2">
        <h1 className="text-4xl font-bold text-primary">Financial Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Track your revenue, sales, and financial transactions in real-time
        </p>
      </div>

      <FinancialDashboard summary={summary} transactions={transactions} />
    </div>
  );
}
