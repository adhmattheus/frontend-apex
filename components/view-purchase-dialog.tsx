"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Building2, Calendar, Package } from "lucide-react";
import type { PurchaseOrder } from "../app/actions";

type ViewPurchaseDialogProps = {
  purchaseOrder: PurchaseOrder | null;
  onOpenChange: (open: boolean) => void;
};

export function ViewPurchaseDialog({
  purchaseOrder,
  onOpenChange,
}: ViewPurchaseDialogProps) {
  if (!purchaseOrder) return null;

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
    <Dialog open={!!purchaseOrder} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Purchase Order Details</span>
            <Badge variant={getStatusVariant(purchaseOrder.status)}>
              {purchaseOrder.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono font-medium">
                  {purchaseOrder.id}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Supplier:</span>
                <span className="font-medium">
                  {purchaseOrder.supplierName}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">
                  {format(purchaseOrder.orderDate, "dd/MM/yyyy")}
                </span>
              </div>
              {purchaseOrder.expectedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Expected:</span>
                  <span className="font-medium">
                    {format(purchaseOrder.expectedDate, "dd/MM/yyyy")}
                  </span>
                </div>
              )}
              {purchaseOrder.receivedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Received:</span>
                  <span className="font-medium">
                    {format(purchaseOrder.receivedDate, "dd/MM/yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Cost</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {item.unitCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {(item.quantity * item.unitCost).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-semibold">
                    Total:
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    R$ {purchaseOrder.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {purchaseOrder.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {purchaseOrder.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
