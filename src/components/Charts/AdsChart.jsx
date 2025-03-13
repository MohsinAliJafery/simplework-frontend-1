import React from "react";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "socialMediaAds", bought: 275, fill: "var(--color-socialMediaAds)" },
  { browser: "searchEngineAds", bought: 200, fill: "var(--color-searchEngineAds)" },
  { browser: "displayBannerAds", bought: 187, fill: "var(--color-displayBannerAds)" },
  { browser: "emailMarketingAds", bought: 173, fill: "var(--color-emailMarketingAds)" },
  { browser: "other", bought: 90, fill: "var(--color-other)" },
]
const chartConfig = {
  bought: {
    label: "Bought",
  },
  socialMediaAds: {
    label: "Social Media",
    color: "hsl(var(--chart-1))",
  },
  searchEngineAds: {
    label: "Search Engine",
    color: "hsl(var(--chart-2))",
  },
  displayBannerAds: {
    label: "Display Banner",
    color: "hsl(var(--chart-3))",
  },
  emailMarketingAds: {
    label: "Email Marketing",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function AdsChart() {
  return (
    <div className="dark">
      <Card>
      <CardHeader>
        <CardTitle>Top Ads - Most Purchased</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label
              }
            />
            <XAxis dataKey="bought" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="bought" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Social Media Ads up by 25.6% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing most bought Adverts
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default AdsChart;
