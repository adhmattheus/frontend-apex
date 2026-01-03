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
import { useState } from "react";

import { Expense, markExpenseAsPaid } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type MarkExpensePaidDialogProps = {
  expense: Expense | null;
  onOpenChange: (open: boolean) => void;
};

export function MarkExpensePaidDialog({
  expense,
  onOpenChange,
}: MarkExpensePaidDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleMarkPaid = async () => {
    if (!expense) return;

    setLoading(true);
    try {
      const result = await markExpenseAsPaid(expense.id);
      if (result.success) {
        toast.success("The expense has been marked as paid successfully.");

        onOpenChange(false);
      }
    } catch (error) {
      toast.error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={!!expense} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Expense as Paid</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to mark{" "}
            <strong>{expense?.description}</strong> (R${" "}
            {expense?.amount.toFixed(2)}) as paid?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleMarkPaid}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Mark as Paid
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
