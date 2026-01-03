import { getReceivables } from "@/app/actions";
import { ReceivablesTable } from "@/components/receivables-table";

export default async function ReceivablesPage() {
  const receivables = await getReceivables();

  return (
    <div className="bg-background p-4 gap-4 grid">
      <div className="grid gap-2">
        <h1 className="text-4xl font-bold text-primary">Accounts Receivable</h1>
        <p className="text-muted-foreground text-pretty">
          Manage pending and overdue payments
        </p>
      </div>

      <ReceivablesTable receivables={receivables} />
    </div>
  );
}
