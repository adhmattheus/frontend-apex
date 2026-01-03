"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AnalyticsContentProps = {
  analytics: {
    salesByDay: Record<string, number>;
    topProducts: {
      id: string;
      name: string;
      quantity: number;
      revenue: number;
    }[];
    salesGrowth: number;
    currentMonthTotal: number;
    lastMonthTotal: number;
    categoryRevenue: Record<string, number>;
    expensesByCategory: Record<string, number>;
    totalOrders: number;
    averageOrderValue: number;
  };
};

export function AnalyticsContent({ analytics }: AnalyticsContentProps) {
  // Prepare sales by day data
  const salesChartData = Object.entries(analytics.salesByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30)
    .map(([date, revenue]) => ({
      date: new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      revenue,
    }));

  // Prepare top products data
  const topProductsData = analytics.topProducts.slice(0, 8).map((p) => ({
    name: p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name,
    revenue: p.revenue,
    quantity: p.quantity,
  }));

  // Prepare category revenue data
  const categoryData = Object.entries(analytics.categoryRevenue).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Prepare expenses by category data
  const expensesData = Object.entries(analytics.expensesByCategory).map(
    ([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    })
  );

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Business insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">
                R$ {analytics.currentMonthTotal.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {analytics.salesGrowth >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={`text-xs font-medium ${
                    analytics.salesGrowth >= 0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {analytics.salesGrowth >= 0 ? "+" : ""}
                  {analytics.salesGrowth.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{analytics.totalOrders}</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold">
                R$ {analytics.averageOrderValue.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Per transaction
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Last Month</p>
              <p className="text-2xl font-bold">
                R$ {analytics.lastMonthTotal.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Previous period
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Sales Trend (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value?: number) => [
                `R$ ${(value ?? 0).toFixed(2)}`,
                "Revenue",
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Products and Category Revenue */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                className="text-xs"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value?: number) => [
                  `R$ ${(value ?? 0).toFixed(2)}`,
                  "Revenue",
                ]}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent! * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value?: number) => [
                  `R$ ${(value ?? 0).toFixed(2)}`,
                  "Revenue",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Expenses Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expensesData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value?: number) => [
                `R$ ${(value ?? 0).toFixed(2)}`,
                "Amount",
              ]}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
