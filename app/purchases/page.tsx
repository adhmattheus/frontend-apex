import { PurchasesContent } from "@/components/purchases-content";
import { getPurchaseOrders, getSuppliers } from "../actions";

export const metadata = {
  title: "Purchase Orders - StockFlow",
  description: "Manage purchase orders and inventory",
};

export default async function PurchasesPage() {
  const [purchaseOrders, suppliers] = await Promise.all([
    getPurchaseOrders(),
    getSuppliers(),
  ]);

  return (
    <PurchasesContent purchaseOrders={purchaseOrders} suppliers={suppliers} />
  );
}
