const express = require("express");
const router = express.Router();
const Expense = require("../model/expense");
const User = require("../model/user");

router.post("/",async (req,res)=>{
    const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyLimit = Math.floor(user.monthlyLimit / daysInMonth);

    let expense = await Expense.findOne({ userId: user.userId, year });

    if (!expense) {
      expense = new Expense({
        userId: user.userId,
        year: year,
        limit: dailyLimit,
        months: [],
      });
    }
    

    const monthData = expense.months.find((m) => m.month === month);
    if (!monthData) {
      expense.months.push({
        month: month,
        expenses: Array.from({ length: daysInMonth-1 }, (_, index) => ({
          day: index + 1,
          amount: dailyLimit,
        })),
      });
    }


    await expense.save();

    res.status(200).json({ message: "Initialised expenses for the user", data:expense });
  } catch (err) {
    console.log("Ran into an Error:", err);
    res.status(500).json({ message: "Failed to initialise expenses", error: err });
  }
});


module.exports = router;