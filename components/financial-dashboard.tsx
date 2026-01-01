"use client"

import type { Transaction } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calendar, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react"

interface FinancialDashboardProps {
  summary: {
    cashBalance: number
    dailyTotal: number
    monthlyTotal: number
    totalSales: number
    totalCancelations: number
  }
  transactions: Transaction[]
}

export function FinancialDashboard({ summary, transactions }: FinancialDashboardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-primary">{formatCurrency(summary.cashBalance)}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <ArrowUpCircle className="h-3 w-3 text-success" />
                {summary.totalSales} sales
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1">
                <ArrowDownCircle className="h-3 w-3 text-destructive" />
                {summary.totalCancelations} canceled
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Sales</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-success">{formatCurrency(summary.dailyTotal)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Sales</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-primary">{formatCurrency(summary.monthlyTotal)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">All financial transactions and activities</p>
            </div>
            <Badge variant="secondary" className="font-mono">
              {transactions.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Sale ID</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      <div className="flex flex-col items-center gap-2">
                        <DollarSign className="h-8 w-8 text-muted-foreground/50" />
                        <p>No transactions yet</p>
                        <p className="text-xs">Complete a sale to see transactions here</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {transaction.type === "sale" ? (
                            <>
                              <div className="h-8 w-8 rounded-md bg-success/10 flex items-center justify-center">
                                <ArrowUpCircle className="h-4 w-4 text-success" />
                              </div>
                              <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
                                Sale
                              </Badge>
                            </>
                          ) : (
                            <>
                              <div className="h-8 w-8 rounded-md bg-destructive/10 flex items-center justify-center">
                                <ArrowDownCircle className="h-4 w-4 text-destructive" />
                              </div>
                              <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                                Canceled
                              </Badge>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">#{transaction.saleId}</code>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold text-base ${
                            transaction.type === "sale" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "sale" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(transaction.createdAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
