"use client";

import { getCustomerAnalytics } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar, Eye, Search, ShoppingBag, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type CustomerAnalytics = {
  name: string;
  totalSpent: number;
  totalPurchases: number;
  lastPurchase: Date;
  sales: any[];
};

export function CustomersContent() {
  const [customers, setCustomers] = useState<CustomerAnalytics[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<
    CustomerAnalytics[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerAnalytics | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const loadCustomers = async () => {
    const data = await getCustomerAnalytics();
    setCustomers(data);
    setFilteredCustomers(data);
  };

  const handleViewDetails = (customer: CustomerAnalytics) => {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  };

  // Calculate stats
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpendPerCustomer =
    totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active customers
            </p>
          </CardContent>
        </Card>

        <Card className="border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From all customers
            </p>
          </CardContent>
        </Card>

        <Card className="border-info/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Spend</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgSpendPerCustomer.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.name}
            className="hover:shadow-lg transition-all duration-200 hover:border-primary/30"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <CardDescription className="mt-1">
                    Member since{" "}
                    {format(
                      customer.sales[customer.sales.length - 1]?.createdAt ||
                        new Date(),
                      "MMM yyyy"
                    )}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {customer.totalPurchases}{" "}
                  {customer.totalPurchases === 1 ? "sale" : "sales"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-bold text-success">
                    {customer.totalSpent.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Purchase</span>
                  <span className="font-medium">
                    {format(customer.lastPurchase, "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg per Sale</span>
                  <span className="font-medium">
                    {(
                      customer.totalSpent / customer.totalPurchases
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleViewDetails(customer)}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedCustomer?.name}
            </DialogTitle>
            <DialogDescription>
              Complete purchase history and analytics
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6 mt-4">
              {/* Customer Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Spent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">
                      {selectedCustomer.totalSpent.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      {selectedCustomer.totalPurchases}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg per Sale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-info">
                      {(
                        selectedCustomer.totalSpent /
                        selectedCustomer.totalPurchases
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Purchase History */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Purchase History</h3>
                <div className="space-y-3">
                  {selectedCustomer.sales
                    .sort(
                      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                    )
                    .map((sale) => (
                      <Card
                        key={sale.id}
                        className="hover:border-primary/30 transition-colors"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-medium">
                                {format(sale.createdAt, "PPP")}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(sale.createdAt, "p")}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-success">
                                {sale.total.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </div>
                              <Badge variant="outline" className="mt-1">
                                {sale.paymentMethod}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {sale.items.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm bg-muted/50 p-2 rounded"
                              >
                                <span>
                                  {item.quantity}x {item.productName}
                                </span>
                                <span className="font-medium">
                                  {(item.quantity * item.price).toLocaleString(
                                    "en-US",
                                    {
                                      style: "currency",
                                      currency: "USD",
                                    }
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
