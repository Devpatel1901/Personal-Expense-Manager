const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeSchema = new Schema({
    ID:{
        type: Number,
        require: true
    },
    DateOfIncome:{
        type: Date,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Amount:{
        type: Number,
        required: true
    },
    Category:{
        type:String,
        required: true
    },
    IncomeDescription:{
        type:String
    },
});
const Income = mongoose.model('Income',IncomeSchema);
module.exports = Income;