import { getFinancialSummary, getProducts, getSales } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const summary = await getFinancialSummary();
  const products = await getProducts();
  const sales = await getSales();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const lowStockProducts = products.filter(
    (p) => p.stock < 10 && p.status === "active"
  );
  const activeProducts = products.filter((p) => p.status === "active").length;
  const recentSales = sales.filter((s) => s.status === "completed").slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-4 gap-4 grid">
      {/* Hero Section */}
      <div className="grid gap-2">
        <h1 className="text-4xl font-bold text-primary">Home</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome to Apex Management System
        </p>
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cash Balance
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {formatCurrency(summary.cashBalance)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <ArrowUpCircle className="h-3 w-3 text-success" />
                {summary.totalSales} sales
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-2">
                <ArrowDownCircle className="h-3 w-3 text-destructive" />
                {summary.totalCancelations} canceled
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Sales
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-success">
              {formatCurrency(summary.dailyTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Sales
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {formatCurrency(summary.monthlyTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeProducts} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
            <p className="text-xs text-muted-foreground">
              {summary.totalSales} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {lowStockProducts.length}
            </div>
            <p className="text-xs text-muted-foreground">Below 10 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sales.filter((s) => s.paymentStatus === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-3">
              <Link href="/products">
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                  <Package className="h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
              <Link href="/sales">
                <Button className="w-full justify-start gap-3 bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success">
                  <ShoppingCart className="h-4 w-4" />
                  New Sale
                </Button>
              </Link>
              <Link href="/receivables">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/5 bg-transparent"
                >
                  <DollarSign className="h-4 w-4" />
                  Accounts Receivable
                </Button>
              </Link>
              <Link href="/financial">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/5 bg-transparent"
                >
                  <TrendingUp className="h-4 w-4" />
                  Financial Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Low Stock Alert</CardTitle>
              <Badge
                variant="outline"
                className="border-warning/30 bg-warning/10 text-warning"
              >
                {lowStockProducts.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto opacity-50" />
                <p className="text-sm">All products are well stocked</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-warning/30 bg-warning/10 text-warning font-semibold"
                    >
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
                {lowStockProducts.length > 4 && (
                  <Link href="/products">
                    <Button variant="ghost" className="w-full text-sm">
                      View all {lowStockProducts.length} items
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Sales</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest completed transactions
              </p>
            </div>
            <Link href="/sales/history">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {recentSales.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto opacity-50" />
              <p>No sales yet</p>
              <p className="text-sm">Start making sales to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {sale.customerName || "Customer"} - {sale.items.length}{" "}
                        items
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sale.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-success">
                      {formatCurrency(sale.total)}
                    </p>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {sale.paymentMethod}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
