import { SuppliersContent } from "@/components/suppliers-content";
import { getSuppliers } from "../actions";

export const metadata = {
  title: "Suppliers - StockFlow",
  description: "Manage your suppliers",
};

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return <SuppliersContent suppliers={suppliers} />;
}
