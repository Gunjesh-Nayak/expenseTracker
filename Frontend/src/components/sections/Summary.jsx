import React, { useState, useEffect } from "react";
import ExpensePieChart from "../ExpensePieChart";
import ExpenseChart from "../ExpenseChart";
import API from "../../api/axios";

const Summary = ({ Data }) => {
  console.log("Data in Summary:", Data); // Check if data is received correctly
  const [budget, setBudget] = useState("");
  const [data, setData] = useState([]);
  const [tempBudget, setTempBudget] = useState("");
  const getData = () => API.get("/expense/data", { withCredentials: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        // setBudget(res.data.budget);
        console.log(res.data.expenses); // expenses data here
        setData(res.data.expenses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // const data = [
  //   { month: "Jan", amount: 5000 },
  //   { month: "Feb", amount: 7000 },
  //   { month: "Mar", amount: 4000 },
  //   { month: "Apr", amount: 9000 },
  //   { month: "May", amount: 1000 },
  // ];

  //   // const data = res.data.expenses || []; // default to empty array if no expenses

  const handleBudgetChange = () => {
    setBudget(tempBudget);
  };

  const totalExpenses = data.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <div>
        <div className="mb-6">
          <h2 className="text-2xl mb-4">My Activity</h2>

          <div className="flex gap-4">
            {/* Chart Card */}
            <div className="w-2/3 shadow ">
              <ExpenseChart data={data} />
            </div>

            {/* Budget Card */}
            <div className="w-1/3 bg-white h-85 text-black rounded-xl p-4 shadow flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Budget</h3>

              <p className="text-xl font-medium">₹ {budget || 0}</p>

              <input
                type="number"
                value={tempBudget}
                placeholder="Set your budget"
                onChange={(e) => setTempBudget(e.target.value)}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
              />

              <button
                onClick={handleBudgetChange}
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Set Budget
              </button>

              <div className="mt-0">
                <p>Total Expenses:</p>
                <p className="text-lg font-semibold">₹ {totalExpenses}</p>
              </div>

              <div>
                <p>Remaining:</p>
                <p
                  className={`text-lg font-semibold ${
                    budget - totalExpenses < 0
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  ₹ {budget ? budget - totalExpenses : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className=" rounded-xl p-2 shadow flex gap-4 ">
          <ExpensePieChart data={data} />
          <div className="flex flex-col gap-2 h-full w-1/3">
            <p className="font-semibold text-lg">Last expenses</p>
            <div className="flex gap-2 flex-col h-80 overflow-y-hidden border border-gray-400 rounded p-2">
              {[...Data].reverse().map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex justify-between bg-gray-800 text-white p-3 mb-2 rounded-lg w-full"
                >
                  <p>{item.description}</p>
                  <p>₹ {item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
