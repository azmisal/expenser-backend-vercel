const express = require("express");
const router = express.Router();
const Expense = require("../model/expense");

router.post("/",async (req, res) => {
  const { userId, amount } = req.body; // Only userId and amount are required

  if (!userId || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Get current year, month (1-based), and day
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-based in JavaScript, so we add 1
    const day = today.getDate();

    // Fetch the user's expense data for the given year and month
    const expense = await Expense.findOne({ userId, year });
    if (!expense) {
      return res.status(404).json({ message: "Expense data not found for this user." });
    }

    // Find the month's data for the specified month
    const monthData = expense.months.find((m) => m.month === month);
    if (!monthData) {
      return res.status(404).json({ message: "Monthly data not found for this user." });
    }

    // Find the day's data for the specified day
    const dayData = monthData.expenses.find((e) => e.day === day);
    if (!dayData) {
      return res.status(404).json({ message: "Expense data for this day not found." });
    }

    // Subtract the added expense from the remaining daily limit
    // if (dayData.amount - amount < 0) {
    //   return res.status(400).json({ message: "Expense exceeds remaining daily limit." });
    // }
    dayData.amount -= amount;

    // Save the updated expense data
    await expense.save();

    // Respond with a success message
    res.status(200).json({ message: "Expense updated successfully", balance: dayData.amount });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;


