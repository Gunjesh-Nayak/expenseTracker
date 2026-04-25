import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const Expense = ({ sendData }) => {
  const [expenseDetails, setExpenseDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Transportation");
  const [expenses, setExpenses] = useState([]); 

  const addExpense = (data) => API.post("/expense/add", data);
  const getExpense = () => API.get("/expense/get",{withCredentials: true});


  const handleDelete = async (id) => {
    try {
      await API.delete(`/expense/delete/${id}`, { withCredentials: true });
      // refresh list after deletion
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense:", err.response?.data || err.message);
    }
  };

const fetchExpenses = async () => {
  try {
    const res = await getExpense();
    const data = res.data.expenses;

    setExpenses(data);

    // 🔥 send immediately
    sendData(data);

  } catch (err) {
    console.error(err);
  }
};

  
  
  useEffect(() => {
    fetchExpenses();
  }, []);


  const handleAddExpense = async () => {
    if (!expenseDetails || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addExpense({
        description: expenseDetails,
        amount: Number(amount),
        category,
      });

      //  refresh list after adding
      fetchExpenses();

    } catch (err) {
      console.error("Failed to add expense:", err.response?.data || err.message);
    }

    // reset fields
    setExpenseDetails("");
    setAmount("");
    setCategory("Transportation");
  };

  return (
    <main>
      <h1 className="text-2xl underline">Your Expense Section</h1>

      {/* Input Section */}
      <div className="border border-white text-white m-4 p-3 rounded-xl flex gap-3 flex-wrap">
        
        <input
          type="text"
          value={expenseDetails}
          onChange={(e) => setExpenseDetails(e.target.value)}
          placeholder="Enter expense details"
          className="flex-1 min-w-[200px] px-2 py-1 rounded text-white"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-32 px-2 py-1 rounded text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 rounded text-white"
        >
          <option value="Transportation">Transportation</option>
          <option value="Shopping">Shopping</option>
          <option value="Food&Grocery">Food & Grocery</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        <button
          onClick={handleAddExpense}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </div>

      {/* Expense List */}
      <div className="m-4">
        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          [...expenses].reverse().map((item) => (
            <div
              key={item._id}
              className="flex justify-between bg-gray-800 text-white p-3 mb-2 rounded-lg"
            >
              <span>{new Date(item.time).toLocaleString()}</span>
              <span>{item.description}</span>
              <span>₹{item.amount}</span>
              <span>{item.category}</span>

              <button 
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Expense;