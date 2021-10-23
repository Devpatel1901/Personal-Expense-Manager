const express = require("express");
const connectToMongo = require('./db');
const Expense = require('./models/Expense');
const Income = require('./models/Income');
const User = require('./models/User');
const Budget = require('./models/Budget');
const PORT = process.env.PORT || 3001;
const cors = require('cors')

const app = express();

connectToMongo();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.use(cors())

app.get("/get/expense_data",(req,res)=>{
    var id ='1';
    var Total_Expense = 0;
    Expense.find({ID: id},function(err,docs){
      if (err){
        console.error(err);
        res.json({message:"Do not able to fetch data"});
      }
      else
      {
        var cost = 0;
        for (var i = 0 ; i < docs.length ; i++)
        {
          var obj = docs[i];
          cost += obj.ItemCost;
        }
        Total_Expense = cost;
        res.json({expense:Total_Expense.toString()});
      }
    });
});

app.get("/get/income_data",(req,res)=>{
  var id ='1';
  var Total_Income = 0;
  Income.find({ID: id},function(err,docs){
    if (err){
      console.error(err);
      res.json({message:"Do not able to fetch data"});
    }
    else
    {
      var cost = 0;
      for (var i = 0 ; i < docs.length ; i++)
      {
        var obj = docs[i];
        cost += obj.Amount;
      }
      Total_Income = cost;
      res.json({income:Total_Income.toString()});
    }
  });
});

app.get("/expense/category",(req,res) => {
  var id = '1';
  Expense.find({ID: id}, function (err, docs) {
    if (err){
        console.log(err);
        res.json({message: "Do not able to fetch data"});
    }
    else{
        var result = docs;
        var Food = 0;
        var Transportation = 0;
        var Pay_Bills = 0;
        var Repair_Work = 0;
        var Clothes = 0;
        var Other = 0;
        result.map((data)=>{
          var cost = data.ItemCost;
          var ItemCategory = data.ItemCategory;
          if (ItemCategory == 'Food')
          {
            Food += cost;
          }
          else if(ItemCategory == 'Transportation')
          {
            Transportation += cost;
          } 
          else if(ItemCategory == 'Bill Payment')
          {
            Pay_Bills += cost;
          }
          else if(ItemCategory == 'Repair Work')
          {
            Repair_Work += cost;
          }
          else if(ItemCategory == 'Clothes')
          {
            Clothes += cost;
          }
          else if(ItemCategory == 'Other')
          {
            Other += cost;
          }
        });
        category = [
          ['Category', 'Expense of this month'],
          ['Food', Food],
          ['Transportation', Transportation],
          ['Clothes', Clothes],
          ['Bill Payment', Pay_Bills],
          ['Repair Work', Repair_Work],
          ['Other', Other],
        ];
    }
  });
  res.json({category: category});
});

app.get("/income/category",(req,res) => {
  var id = '1';
  Income.find({ID: id}, function (err, docs) {
    if (err){
        console.log(err);
        res.json({message: "Do not able to fetch data"});
    }
    else{
        var result = docs;
        var Salary = 0;
        var Bonus = 0;
        var Overtime = 0;
        var Other = 0;
        result.map((data)=>{
          var cost = data.Amount;
          var ItemCategory = data.Category;
          if (ItemCategory == 'Salary')
          {
            Salary += cost;
          }
          else if(ItemCategory == 'Bonus')
          {
            Bonus += cost;
          } 
          else if(ItemCategory == 'Overtime')
          {
            Overtime += cost;
          }
          else if(ItemCategory == 'Other')
          {
            Other += cost;
          }
        });
        category = [
          ['Category', 'Expense of this month'],
          ['Salary', Salary],
          ['Bonus', Bonus],
          ['Overtime', Overtime],
          ['Other', Other],
        ];
    }
  });
  res.json({category: category});
});

app.post('/create/expense', function(req, res) {
  Expense.create({
    ID: 1,
    DateOfExpense: req.body.DateOfExpense,
    ItemName: req.body.ItemName,
    ItemCost: req.body.ItemCost,
    ItemCategory: req.body.ItemCategory,
    ExpenseDescription: req.body.ExpenseDescription
  }).then(user => res.json(user))
  .catch(err => console.log(err))
});

app.post('/create/income', function(req, res) {
  Income.create({
    ID: 1,
    DateOfIncome: req.body.DateOfIncome,
    Name: req.body.Name,
    Amount: req.body.Amount,
    Category: req.body.IncomeCategory,
    IncomeDescription: req.body.IncomeDescription
  }).then(user => res.json(user))
  .catch(err => console.log(err))
});

app.get('/get/expense', (req,res) => {
    var id = '1';
    Expense.find({ID: id}, function (err, docs) {
      if (err){
          console.log(err);
          res.json({message: "Do not able to fetch data"});
      }
      else{
          res.send(docs);
      }
  });
});

app.get('/get/income', (req,res) => {
    var id = '1';
    Income.find({ID: id}, function (err, docs) {
      if (err){
          console.log(err);
          res.json({message: "Do not able to fetch data"});
      }
      else{
          res.send(docs);
      }
  });
});

app.post("/delete/expense",(req,res)=>{
    Expense.findByIdAndDelete({_id:req.body.ID},function (err){
      if(err){
        res.send(err);
      }
      else
      {
        res.send({message: "Record Succeessfully deleted"});
      }
    })
});

app.post("/delete/income",(req,res)=>{
  Income.findByIdAndDelete({_id:req.body.ID},function (err){
    if(err){
      res.send(err);
    }
    else
    {
      res.send({message: "Record Succeessfully deleted"});
    }
  })
});

app.post('/update/expense', function(req, res) {
  Expense.findByIdAndUpdate(req.body._id,{
    DateOfExpense: req.body.DateOfExpense,
    ItemName: req.body.ItemName,
    ItemCost: req.body.ItemCost,
    ItemCategory: req.body.ItemCategory,
    ExpenseDescription: req.body.ExpenseDescription},function(err,docs){
      if (err){
        console.log(err)
      }
      else
      {
        res.send(docs);
      }
    })
});

app.post('/update/income', function(req, res) {
  Income.findByIdAndUpdate(req.body._id,{
    DateOfIncome: req.body.DateOfIncome,
    Name: req.body.Name,
    Amount: req.body.Amount,
    IncomeCategory: req.body.IncomeCategory,
    IncomeDescription: req.body.IncomeDescription},function(err,docs){
      if (err){
        console.log(err)
      }
      else
      {
        console.log(docs);
        res.send(docs);
      }
    })
});


app.post('/create/user', function(req, res) {
  var newUser = {
    Name: req.body.NameField,
    Email: req.body.EmailField,
    Password: req.body.PasswordField,
    CurrencyName: req.body.Currency
  }
  User.create({
    Name: req.body.NameField,
    Email: req.body.EmailField,
    Password: req.body.PasswordField,
    CurrencyName: req.body.Currency
  }).then(user => res.json(user._id))
  .catch(err => console.log(err))

});

app.post('/get/userdetails',function(req,res){
  User.findOne({
    $and: [
        {
            _id: req.body.IDField
        },
        {
            Password: req.body.PasswordField
        }
    ]
},function(err,docs){
    if (err){
      res.send(err);
    }
    else
    {
      res.send(docs);
    }
  })
});

app.post("/add/budget",function(req,res){
  Budget.create({
    ID: 1,
    BudgetAmount: req.body.BudgetAmount,
    Category: req.body.Category
  })
  .then(user=>res.json(user))
  .catch(err => console.log(err))
});

app.get('/get/budget', (req,res) => {
  var id = '1';
  Budget.find({ID: id}, function (err, docs) {
    if (err){
        console.log(err);
        res.json({message: "Do not able to fetch data"});
    }
    else{
        res.send(docs);
    }
});
});

app.post("/delete/budget",(req,res)=>{
  Budget.findByIdAndDelete({_id:req.body.ID},function (err){
    if(err){
      res.send(err);
    }
    else
    {
      res.send({message: "Record Succeessfully deleted"});
    }
  })
});

app.post('/update/budget', function(req, res) {
  Budget.findByIdAndUpdate(req.body._id,{
    BudgetAmount: req.body.BudgetAmount,
    Category: req.body.Category,},function(err,docs){
      if (err){
        console.log(err)
      }
      else
      {
        res.send(docs);
      }
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

