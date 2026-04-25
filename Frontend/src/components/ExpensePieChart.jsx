import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#f97316",
  "#22c55e",
  "#fb923c",
  "#facc15",
  
  "#ef4444",
];

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black text-white px-3 py-2 rounded-md text-sm">
        <p>{data.category}</p>
        <p>₹ {data.amount}</p>
      </div>
    );
  }
  return null;
};

const ExpensePieChart = ({ data }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl flex items-center w-2/3 justify-between">
      
      {/* Chart */}
      <div className="w-1/2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              activeIndex={-1} // default
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            {/* ✅ Tooltip added */}
            <Tooltip content={<CustomTooltip />} />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-1/2 space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">
          Expense Analytics
        </h2>

        {data.map((item, index) => (
          <div key={index} className="flex items-center text-stone-600 gap-3">
            
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />

            <div>
              <p className="font-medium">{item.category}</p>
              <p className="text-gray-500">₹{item.amount}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;