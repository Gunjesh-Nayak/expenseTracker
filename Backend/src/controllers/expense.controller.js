import ExpenseModel from '../models/expense.model.js';


const addExpense = async (req, res) => {
  try {

    const { description, amount, category } = req.body;
    console.log("USER ID IN CONTROLLER:", req.userId);
    console.log("CONTROLLER HIT");
    const expense = await ExpenseModel.create({ description, amount, category,user: req.userId  });
    res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
}

const getExpenses = async(req, res) => {
    const expenses = await ExpenseModel.find({ user: req.userId });
    res.status(200).json({
        message:"expenses fetch successfully",
        expenses:expenses,
    })
}

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ExpenseModel.findOneAndDelete({
      _id: id,
      user: req.userId, // 🔐 ensures ownership
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Expense not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};


const getData = async (req, res) => {
  try {
    const expenses = await ExpenseModel
      .find({ user: req.userId })
      .select("amount category -_id");

    // 🔥 group + sum
    const grouped = expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    // convert to array (optional, better for frontend)
    const result = Object.entries(grouped).map(([category, total]) => ({
      category,
      amount: total,
    }));

    res.status(200).json({
      message: "Data fetched successfully",
      expenses: result, // ✅ grouped data
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

export default {
  addExpense,
  getExpenses,
  deleteExpense,
  getData,
};