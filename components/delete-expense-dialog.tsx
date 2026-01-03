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
import { deleteExpense, type Expense } from "../app/actions";

type DeleteExpenseDialogProps = {
  expense: Expense | null;
  onOpenChange: (open: boolean) => void;
};

export function DeleteExpenseDialog({
  expense,
  onOpenChange,
}: DeleteExpenseDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!expense) return;

    setLoading(true);
    try {
      const result = await deleteExpense(expense.id);
      if (result.success) {
        toast.success("The expense has been deleted successfully.");

        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to delete expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={!!expense} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{expense?.description}</strong>? This action cannot be
            undone.
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
