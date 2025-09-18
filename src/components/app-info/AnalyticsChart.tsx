import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Legend,
} from "recharts";
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
    { month: "Apr", forms: 22, submissions: 320 },
    { month: "May", forms: 25, submissions: 430 },
    { month: "Jun", forms: 19, submissions: 280 },
    { month: "Jul", forms: 31, submissions: 510 },
    { month: "Aug", forms: 29, submissions: 610 },
    { month: "Sep", forms: 33, submissions: 720 },
    { month: "Oct", forms: 28, submissions: 450 },
    { month: "Nov", forms: 26, submissions: 380 },
    { month: "Dec", forms: 34, submissions: 800 },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {/* make chart container wider than mobile viewport */}
      <div className="md:min-w-[500px] min-w-[900px]">
        <ChartContainer
          config={{
            forms: { label: "Forms Created", color: "var(--chart-1)" },
            submissions: { label: "Submissions", color: "var(--chart-2)" },
          }}
          className="min-h-[256px] w-full"
        >
          <BarChart accessibilityLayer data={charData} margin={{ top: 20 }}>
            <Legend verticalAlign="top" height={36} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="forms" fill="var(--chart-1)" barSize={20} radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="submissions"
              fill="var(--chart-2)"
              barSize={20}
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
