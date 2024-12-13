const mongoose = require("mongoose");
const { validate } = require("./user");

const expenseSchema = new mongoose.Schema({
    userId:{
        type: String, required:true
    },
    year: { type: Number, required: true },
    limit:{type:Number, required:true},
    months:[
        {
            month:{type:Number, required:true},
            expenses:[
                {
                    day:{type: Number},
                    amount:{type: Number}
                }
            ]
        }
    ]
});

module.exports = mongoose.model("Expense",expenseSchema);

