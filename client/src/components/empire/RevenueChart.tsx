import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign } from "lucide-react";

const data = [
  { week: "Week 1", revenue: 150000 },
  { week: "Week 2", revenue: 280000 },
  { week: "Week 3", revenue: 420000 },
  { week: "Week 4", revenue: 380000 },
  { week: "Week 5", revenue: 650000 },
  { week: "Week 6", revenue: 890000 },
];

export function RevenueChart() {
  return (
    <Card className="bg-black/50 border-[#28A745]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[#28A745]" />
          Revenue Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#28A745" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#28A745" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #28A745",
                  borderRadius: "4px",
                }}
                formatter={(value) => [`$${(value as number).toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#28A745"
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
