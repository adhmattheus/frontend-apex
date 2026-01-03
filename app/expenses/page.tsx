import { ExpensesContent } from "@/components/expenses-content";
import { getExpenses } from "../actions";

export const metadata = {
  title: "Expenses - StockFlow",
  description: "Manage operational expenses",
};

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <div className="container mx-auto py-8 px-4">
      <ExpensesContent expenses={expenses} />
    </div>
  );
}
