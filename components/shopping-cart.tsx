"use client";

import { createSale } from "@/app/actions";
import type { CartItem } from "@/components/sales-content";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Banknote,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  Receipt,
  ShoppingBag,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import Image from "next/image";
import { toast } from "sonner";

interface ShoppingCartProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  onClose: () => void;
}

export function ShoppingCart({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  cartTotal,
  onClose,
}: ShoppingCartProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [customerName, setCustomerName] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const requiresCustomerName = ["credit_card", "invoice"].includes(
    paymentMethod
  );

  const paymentIcons = {
    credit_card: CreditCard,
    invoice: Receipt,
    debit_card: CreditCard,
    cash: Banknote,
    pix: Smartphone,
  };

  const handleConfirmSale = async () => {
    if (requiresCustomerName && !customerName.trim()) {
      toast.warning("Customer name is required for deferred payments");

      return;
    }

    setIsProcessing(true);
    const items = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const result = await createSale(
      items,
      paymentMethod,
      requiresCustomerName ? customerName : undefined
    );

    if (result.success) {
      const paymentInfo = requiresCustomerName ? " (Payment pending)" : "";
      toast.success(`Total: $${cartTotal.toFixed(2)}${paymentInfo}`);

      clearCart();
      setCustomerName("");
      setIsConfirmOpen(false);
      onClose();
      window.location.reload();
    } else {
      toast.error(result.error || "Failed to complete sale");
    }
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl rounded-full" />
          <div className="relative bg-muted/50 rounded-full p-6 backdrop-blur-sm">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 mt-6">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">
          Add products to get started
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-2xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Shopping Cart
          </SheetTitle>
          <Badge
            variant="secondary"
            className="text-xs font-semibold px-3 py-1"
          >
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </Badge>
        </div>
        <SheetDescription>
          Review your items and complete the sale
        </SheetDescription>
      </SheetHeader>

      <ScrollArea className="flex-1">
        <div className="space-y-4 pr-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0 border">
                <Image
                  src={item.product.imageUrl || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
                  {item.product.name}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-lg font-bold text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {item.product.stock - item.quantity} left
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary hover:border-primary bg-transparent"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={item.product.stock}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.product.id,
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    className="h-8 w-16 text-center font-semibold"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary hover:border-primary bg-transparent"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Remove from cart"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <p className="text-lg font-bold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  x{item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="payment" className="text-sm font-semibold">
            Payment Method
          </Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger id="payment" className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Credit Card (30 days)</span>
                </div>
              </SelectItem>
              <SelectItem value="invoice">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  <span>Invoice (30 days)</span>
                </div>
              </SelectItem>
              <SelectItem value="debit_card">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Debit Card</span>
                </div>
              </SelectItem>
              <SelectItem value="cash">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  <span>Cash</span>
                </div>
              </SelectItem>
              <SelectItem value="pix">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>PIX</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {requiresCustomerName && (
          <div className="space-y-3 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <Label htmlFor="customer" className="text-sm font-semibold">
              Customer Name
            </Label>
            <Input
              id="customer"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Required for deferred payment methods
            </p>
          </div>
        )}

        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <Badge variant="secondary" className="text-xs">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25"
          onClick={() => setIsConfirmOpen(true)}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Complete Sale
        </Button>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Sale</AlertDialogTitle>
            <AlertDialogDescription>
              Complete this sale for ${cartTotal.toFixed(2)} via{" "}
              {paymentMethod.replace("_", " ")}?
              {requiresCustomerName &&
                ` Payment will be pending for ${customerName}.`}
              {!requiresCustomerName &&
                " This will update product stock and cash balance immediately."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSale}
              disabled={isProcessing}
            >
              {isProcessing && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
