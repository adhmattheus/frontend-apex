"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Eye,
  MoreVertical,
  Package,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { PurchaseOrder, Supplier } from "../app/actions";

import { format } from "date-fns";
import { PurchaseOrderDialog } from "./purchase-order-dialog";
import { ReceivePurchaseDialog } from "./receive-purchase-dialog";
import { ViewPurchaseDialog } from "./view-purchase-dialog";

type PurchasesContentProps = {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
};

export function PurchasesContent({
  purchaseOrders,
  suppliers,
}: PurchasesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "received" | "canceled"
  >("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingPO, setViewingPO] = useState<PurchaseOrder | null>(null);
  const [receivingPO, setReceivingPO] = useState<PurchaseOrder | null>(null);

  const filteredOrders = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "received":
        return "default";
      case "pending":
        return "secondary";
      case "canceled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
            Purchase Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage inventory purchases from suppliers
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search purchase orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "received" ? "default" : "outline"}
              onClick={() => setStatusFilter("received")}
              size="sm"
            >
              Received
            </Button>
            <Button
              variant={statusFilter === "canceled" ? "default" : "outline"}
              onClick={() => setStatusFilter("canceled")}
              size="sm"
            >
              Canceled
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No purchase orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-mono text-sm">{po.id}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{po.items.length} items</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    R$ {po.total.toFixed(2)}
                  </TableCell>
                  <TableCell>{format(po.orderDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    {po.expectedDate
                      ? format(po.expectedDate, "dd/MM/yyyy")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(po.status)}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewingPO(po)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {po.status === "pending" && (
                          <DropdownMenuItem onClick={() => setReceivingPO(po)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Receive Order
                          </DropdownMenuItem>
                        )}
                        {po.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => {}}
                            className="text-destructive"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <PurchaseOrderDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        suppliers={suppliers}
      />
      <ViewPurchaseDialog
        purchaseOrder={viewingPO}
        onOpenChange={(open) => !open && setViewingPO(null)}
      />
      <ReceivePurchaseDialog
        purchaseOrder={receivingPO}
        onOpenChange={(open) => !open && setReceivingPO(null)}
      />
    </div>
  );
}
