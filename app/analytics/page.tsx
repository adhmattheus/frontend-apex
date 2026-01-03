import { AnalyticsContent } from "@/components/analytics-content";
import { getAnalytics } from "../actions";

export const metadata = {
  title: "Analytics - StockFlow",
  description: "Business analytics and insights",
};

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  return (
    <div className="container mx-auto py-8 px-4">
      <AnalyticsContent analytics={analytics} />
    </div>
  );
}
