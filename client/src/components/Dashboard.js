import React,{useState} from "react";
import Clock from "./Clock";
import axios from 'axios';
import LastExpense from "./LastExpense";
import LastIncome from "./LastIncome";

export default function Dashboard(props) {

  const [total_expense, settotal_expense] = useState(null);
  const [total_income, settotal_income] = useState(null);
  React.useEffect(()=>{
    axios.get("/get/expense_data")
    .then(function(response){
      var item = response.data;
      settotal_expense(item.expense);
    })
    axios.get("/get/income_data")
    .then(function(response){
      var item = response.data;
      settotal_income(item.income);
    })
  },[]);

  return (
    <>
      <div className="container my-4" style={{fontFamily: "'Cormorant Garamond', serif"}}>
        <h1>Widgets</h1>
        <hr />
      </div>
      <div className="container" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "16.5px"}}>
          <Clock/>
      </div>
      <div className="container my-4" style={{fontFamily: "'Cormorant Garamond', serif"}}>
        <h1>Dashboard</h1>
        <hr />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-6 col-md-4">
              <div style={{backgroundColor: "#ff4040" , height: "175px" , padding: "5px 15px" , fontSize: "20px" , fontFamily: "Bonheur Royale, cursive"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
               </svg><br />
               <p className="fw-bold">{props.currency_symbol} {total_expense}</p>
               <p className="fw-bold">Current Expense This Month</p>
              </div>
          </div>
          <div className="col-6 col-md-4">
              <div style={{backgroundColor: "#0d6efd" , height: "175px" , padding: "5px 15px" , fontSize: "20px" , fontFamily: "Bonheur Royale, cursive"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
              </svg><br />
               <p className="fw-bold">{props.currency_symbol} {total_income}</p>
               <p className="fw-bold">Current Income This Month</p>
              </div>
          </div>
          <div className="col-6 col-md-4">
              <div style={{backgroundColor: "#ff7818" , height: "175px" , padding: "5px 15px" , fontSize: "20px" , fontFamily: "Bonheur Royale, cursive"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
              </svg><br />
              <p className="fw-bold">{(total_income/total_expense).toString().slice(0,5)}</p>
              <p className="fw-bold">Income Expense Ratio</p>
              </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1  style={{fontFamily: "'Cormorant Garamond', serif"}}>Last Expense Record Added</h1>
        <hr />
        <LastExpense currency_symbol={props.currency_symbol}/>
      </div>
      <div className="container">
        <h1  style={{fontFamily: "'Cormorant Garamond', serif"}}>Last Income Record Added</h1>
        <hr />
        <LastIncome currency_symbol={props.currency_symbol}/>
      </div>
    </>
  )
}
