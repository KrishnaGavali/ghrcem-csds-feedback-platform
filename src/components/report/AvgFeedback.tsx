"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

type FacultyData = {
  facultyName: string;
  subject: string;
  className: string;
  averageFeedback: number;
};

const facultyFeedback: FacultyData[] = [
  {
    facultyName: "Prof. Gayatri Deshmukh",
    subject: "MLA",
    className: "Second Year B.Tech DS",
    averageFeedback: 90.7,
  },
  {
    facultyName: "Prof. Geetanjali Rokade",
    subject: "CN",
    className: "Second Year B.Tech DS",
    averageFeedback: 90.2,
  },
  {
    facultyName: "Prof. Md. Mirazul Hoque",
    subject: "PT",
    className: "Second Year B.Tech DS",
    averageFeedback: 80.1,
  },
  {
    facultyName: "Prof. Nishigandha Vyavhare",
    subject: "OOP",
    className: "Second Year B.Tech DS",
    averageFeedback: 91.7,
  },
  {
    facultyName: "Prof. RAHUL BORATE",
    subject: "OE1-DSFE",
    className: "Second Year B.Tech DS",
    averageFeedback: 89.7,
  },
];

// config lets shadcn map colors → var(--chart-N)
const chartConfig = {
  averageFeedback: {
    label: "Average Feedback",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function FacultyFeedbackDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Table Section */}
      <Card className="flex-1 border border-border bg-background shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground text-center">
            Faculty Feedback Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-muted">
                <tr>
                  <th className="border border-border px-3 py-2 text-left">
                    Class
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Name of Faculty
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Subject
                  </th>
                  <th className="border border-border px-3 py-2 text-center">
                    Average Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {facultyFeedback.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/40 transition-colors">
                    <td className="border border-border px-3 py-2">
                      {row.className}
                    </td>
                    <td className="border border-border px-3 py-2">
                      {row.facultyName}
                    </td>
                    <td className="border border-border px-3 py-2">
                      {row.subject}
                    </td>
                    <td className="border border-border px-3 py-2 text-center">
                      {row.averageFeedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card className="flex-1 border border-border bg-background shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground text-center">
            Faculty Feedback in Percentage
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[400px]">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={facultyFeedback}
              margin={{ top: 20, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} stroke="var(--muted)" />
              <XAxis
                dataKey="subject"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--foreground)", fontSize: 12 }}
              />
              <YAxis
                domain={[70, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--foreground)", fontSize: 12 }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="averageFeedback"
                fill="var(--color-averageFeedback)" // shadcn resolves → var(--chart-1)
                radius={[6, 6, 0, 0]}
                barSize={36}
              >
                <LabelList
                  dataKey="averageFeedback"
                  position="top"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
