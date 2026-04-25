import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  time: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Expense", expenseSchema);