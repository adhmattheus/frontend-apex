import { getReceivables } from "@/app/actions"
import { ReceivablesTable } from "@/components/receivables-table"

export default async function ReceivablesPage() {
  const receivables = await getReceivables()

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Accounts Receivable
        </h1>
        <p className="text-muted-foreground mt-2">Manage pending and overdue payments</p>
      </div>

      <ReceivablesTable receivables={receivables} />
    </div>
  )
}
