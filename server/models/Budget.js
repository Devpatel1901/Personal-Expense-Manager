const mongoose = require('mongoose');
const { Schema } = mongoose;

const BudgetSchema = new Schema({
    ID:{
        type: Number,
        required: true
    },
    BudgetAmount:{
        type: Number,
        required: true
    },
    Category:{
        type:String,
        required: true
    },
});
const Budget = mongoose.model('Budget',BudgetSchema);
module.exports = Budget;