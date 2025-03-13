import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

/**
 * @typedef {Object} ChartDataItem
 * @property {string} date
 * @property {number} newSellers
 * @property {number} newBuyers
 */

/** @type {ChartDataItem[]} */
const chartData = [
  { date: "2024-04-01", newSellers: 222, newBuyers: 150 },
  { date: "2024-04-02", newSellers: 97, newBuyers: 180 },
  { date: "2024-04-03", newSellers: 167, newBuyers: 120 },
  { date: "2024-04-04", newSellers: 242, newBuyers: 260 },
  { date: "2024-04-05", newSellers: 373, newBuyers: 290 },
  { date: "2024-04-06", newSellers: 301, newBuyers: 340 },
  { date: "2024-04-07", newSellers: 245, newBuyers: 180 },
  { date: "2024-04-08", newSellers: 409, newBuyers: 320 },
  { date: "2024-04-09", newSellers: 59, newBuyers: 110 },
  { date: "2024-04-10", newSellers: 261, newBuyers: 190 },
];

const chartConfig = {
  newSellers: { label: "New Sellers", color: "hsl(var(--chart-1))" },
  newBuyers: { label: "New Buyers", color: "hsl(var(--chart-2))" },
};

export function AdminCurrentMonthStats() {
  const [activeChart, setActiveChart] = React.useState("newSellers");

  const total = React.useMemo(
    () => ({
      newSellers: chartData.reduce((acc, curr) => acc + curr.newSellers, 0),
      newBuyers: chartData.reduce((acc, curr) => acc + curr.newBuyers, 0),
    }),
    []
  );

  return (
    <div className="dark">
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-b-gray-900 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>User Statistics - This Month</CardTitle>
          <CardDescription>March 2025, so far</CardDescription>
        </div>
        <div className="flex">
          {Object.keys(chartConfig).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-gray-900 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Growing up by 4.8% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
        Showing user growth count for March
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}
