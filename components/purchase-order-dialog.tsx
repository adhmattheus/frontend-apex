"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import {
  createPurchaseOrder,
  getProducts,
  type Supplier,
} from "../app/actions";

type PurchaseOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: Supplier[];
};

export function PurchaseOrderDialog({
  open,
  onOpenChange,
  suppliers,
}: PurchaseOrderDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [items, setItems] = useState<
    { productId: string; quantity: number; unitCost: number }[]
  >([{ productId: "", quantity: 0, unitCost: 0 }]);
  const [products, setProducts] = useState<any[]>([]);

  const handleOpen = async (isOpen: boolean) => {
    if (isOpen) {
      const prods = await getProducts();
      setProducts(prods);
    } else {
      setSelectedSupplier("");
      setItems([{ productId: "", quantity: 0, unitCost: 0 }]);
    }
    onOpenChange(isOpen);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 0, unitCost: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const expectedDateStr = formData.get("expectedDate") as string;

    const validItems = items.filter(
      (item) => item.productId && item.quantity > 0 && item.unitCost > 0
    );

    if (validItems.length === 0) {
      toast.success("Please add at least one valid item");

      setLoading(false);
      return;
    }

    try {
      const result = await createPurchaseOrder({
        supplierId: selectedSupplier,
        items: validItems,
        expectedDate: expectedDateStr ? new Date(expectedDateStr) : undefined,
        notes: formData.get("notes") as string,
      });

      if (result.success) {
        toast.success("Purchase order created successfully.");
        handleOpen(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Purchase Order</DialogTitle>
          <DialogDescription>
            Create a new purchase order from a supplier
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select
                  value={selectedSupplier}
                  onValueChange={setSelectedSupplier}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers
                      .filter((s) => s.status === "active")
                      .map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedDate">Expected Delivery</Label>
                <Input id="expectedDate" name="expectedDate" type="date" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Order Items *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <Card key={index} className="p-3">
                  <div className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-5 space-y-2">
                      <Label>Product</Label>
                      <Select
                        value={item.productId}
                        onValueChange={(val) =>
                          updateItem(index, "productId", val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3 space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-3 space-y-2">
                      <Label>Unit Cost (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unitCost || ""}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "unitCost",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="0.00"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes about this order"
                rows={2}
              />
            </div>

            <Card className="p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Total Order Value:
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </Card>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedSupplier}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
