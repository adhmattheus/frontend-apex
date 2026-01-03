"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { receivePurchaseOrder, type PurchaseOrder } from "../app/actions";

type ReceivePurchaseDialogProps = {
  purchaseOrder: PurchaseOrder | null;
  onOpenChange: (open: boolean) => void;
};

export function ReceivePurchaseDialog({
  purchaseOrder,
  onOpenChange,
}: ReceivePurchaseDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleReceive = async () => {
    if (!purchaseOrder) return;

    setLoading(true);
    try {
      const result = await receivePurchaseOrder(purchaseOrder.id);
      if (result.success) {
        toast.success("Order received. Stock has been updated successfully.");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to receive order");
      }
    } catch (error) {
      toast.error("Failed to receive order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!purchaseOrder) return null;

  return (
    <AlertDialog open={!!purchaseOrder} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Receive Purchase Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to receive this purchase order? This will add
            the following items to your inventory:
            <ul className="mt-3 space-y-1">
              {purchaseOrder.items.map((item, index) => (
                <li key={index} className="text-sm font-medium">
                  • {item.productName}: +{item.quantity} units
                </li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReceive}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Receive Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
