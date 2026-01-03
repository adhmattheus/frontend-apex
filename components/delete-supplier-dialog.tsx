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
import { deleteSupplier, type Supplier } from "../app/actions";

type DeleteSupplierDialogProps = {
  supplier: Supplier | null;
  onOpenChange: (open: boolean) => void;
};

export function DeleteSupplierDialog({
  supplier,
  onOpenChange,
}: DeleteSupplierDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!supplier) return;

    setLoading(true);
    try {
      const result = await deleteSupplier(supplier.id);
      if (result.success) {
        toast.success("he supplier has been deleted successfully.");

        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to delete supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={!!supplier} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{supplier?.name}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
