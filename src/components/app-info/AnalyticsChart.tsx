import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Legend,
} from "recharts";
import type { ChartConfig } from "../ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AnalyticsChart = () => {
  const charData = [
    { month: "Jan", forms: 30, submissions: 240 },
    { month: "Feb", forms: 20, submissions: 139 },
    { month: "Mar", forms: 27, submissions: 980 },
  ];

  const chartConfig = {
    forms: {
      label: "Forms Created",
      color: "var(--chart-1)",
    },
    submissions: {
      label: "Submissions",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[256px] w-full">
      <BarChart
        accessibilityLayer
        data={charData}
        margin={{
          top: 20,
        }}
      >
        <Legend verticalAlign="top" height={36} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey={"forms"} fill="var(--chart-1)" barSize={30} radius={4}>
          <LabelList
            position={"top"}
            offset={12}
            className=" fill-foreground"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey={"submissions"}
          fill="var(--chart-2)"
          barSize={30}
          radius={4}
        >
          <LabelList
            position={"top"}
            offset={12}
            className=" fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default AnalyticsChart;
