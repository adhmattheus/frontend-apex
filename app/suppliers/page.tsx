import { SuppliersContent } from "@/components/suppliers-content";
import { getSuppliers } from "../actions";

export const metadata = {
  title: "Suppliers - StockFlow",
  description: "Manage your suppliers",
};

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="container mx-auto py-8 px-4">
      <SuppliersContent suppliers={suppliers} />
    </div>
  );
}
