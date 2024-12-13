const Expense = require("../model/expense"); // Adjust the path to your Expense model
const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.post("/",async (req, res) => {
  const { userId } = req.body; // Ensure proper extraction of userId
  try {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // Month is 1-based
    const day = new Date().getDate();

    // Fetch the specific user's expense data
    const expense = await Expense.findOne({ userId, year });
    if (!expense) {
      return res.status(404).json({ message: "Expense data not found for this user." });
    }

    // Find the month's data
    const monthData = expense.months.find((m) => m.month === month);
    if (!monthData) {
      return res.status(404).json({ message: "Monthly data not found for this user." });
    }

    // Fetch today's balance
    const todayExpense = monthData.expenses.find((e) => e.day === day);
    if (!todayExpense) {
      return res.status(404).json({ message: "Today's data not found for this user." });
    }

    return res.status(200).json({ message: "Today's balance", balance: todayExpense.amount });
  } catch (err) {
    console.error("Error fetching today's balance:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
