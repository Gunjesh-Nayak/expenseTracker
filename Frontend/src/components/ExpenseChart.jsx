import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// const data = [
//   { month: "Jan", amount: 100 },
//   { month: "Feb", amount: 900 },
//   { month: "Mar", amount: 400 },
//   { month: "Apr", amount: 1100 },
//   { month: "May", amount: 850 },
//   { month: "Jun", amount: 950 },
//   { month: "Jul", amount: 1000 },
// ];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
        ₹{payload[0].value}
      </div>
    );
  }
  return null;
};

const ExpenseChart = ({data}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Activity Summary
        </h2>
        
      </div>

      {/* Chart */}
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="category" />
            <YAxis />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#colorAmt)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;