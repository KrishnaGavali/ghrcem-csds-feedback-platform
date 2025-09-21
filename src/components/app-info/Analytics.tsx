import { databases } from "@/handlers/appwrite";
import AnalyticsChart from "./AnalyticsChart";
import { useEffect, useState } from "react";
import { Query } from "appwrite";

const AnalyticsSection = () => {
  const [totalForms, setTotalForms] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [montlyReport, setMonthlyReport] = useState<[]>([]);

  const fetchAnalyticsData = async () => {
    const totalAnalyticsResponse = await databases.getRow({
      databaseId: import.meta.env.VITE_DATABASE_ID,
      tableId: "analytics",
      rowId: "68cd559d0022c7d915e5",
    });

    if (totalAnalyticsResponse) {
      setTotalForms(totalAnalyticsResponse.FormsCreated);
      setTotalSubmissions(totalAnalyticsResponse.FeedbackTaken);
    }

    const year = new Date().getFullYear();

    const monthlyAnalyticsResponse = await databases.listRows({
      databaseId: import.meta.env.VITE_DATABASE_ID,
      tableId: "analytics",
      queries: [
        Query.equal("Year", year.toString()),
        Query.equal("Month", (new Date().getMonth() + 1).toString()),
        Query.notEqual("Month", "ALL"),
        Query.orderAsc("Month"),
        Query.select(["FormsCreated", "FeedbackTaken", "Month"]),
      ],
    });

    if (monthlyAnalyticsResponse) {
      setMonthlyReport(monthlyAnalyticsResponse.rows as []);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <div className="flex min-h-screen items-start justify-center bg-background">
      <div className="w-full max-w-4xl rounded-lg bg-card p-2 shadow-xl border border-border">
        <div className="flex flex-col justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-primary">
            App Analytics Dashboard
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            (Data is dynamically updated)
          </span>
        </div>

        {/*
          Analytics Cards Section
          This is where you would add your individual data cards (e.g., total users, page views)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example Data Card */}
          <div className="rounded-lg border bg-background p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-sm text-muted-foreground">Total Form Created</p>
            <h2 className="text-2xl font-semibold text-primary mt-1">
              {totalForms}
            </h2>
          </div>
          <div className="rounded-lg border bg-background p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-sm text-muted-foreground">Total Submission</p>
            <h2 className="text-2xl font-semibold text-primary mt-1">
              {totalSubmissions}
            </h2>
          </div>
        </div>

        {/*
          Chart Section
          This is where you would place a chart or more detailed data visualization
        */}
        <div className="mt-8 rounded-lg border bg-background p-6 shadow-sm">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">
            Activity Over Time
          </h3>
          <AnalyticsChart ChartData={montlyReport} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
