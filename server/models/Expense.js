const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    ID:{
        type: Number,
        require: true
    },
    DateOfExpense:{
        type: Date,
        required: true
    },
    ItemName:{
        type: String,
        required: true,
    },
    ItemCost:{
        type: Number,
        required: true
    },
    ItemCategory:{
        type:String,
    },
    ExpenseDescription:{
        type:String
    }
});
const Expense = mongoose.model('expense',ExpenseSchema);
module.exports = Expense;