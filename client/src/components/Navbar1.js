import {Switch, Route,Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Component } from "react";
import Expense from "./Expense";
import Alert from "./Alert";
import ViewExpense from "./View_Expense";
import Income from "./Income";
import ViewIncome from "./View_Income";
import data from "./data/Currency.json";
import ExpenseReport from "./ExpenseReport";
import IncomeReport from "./IncomeReport";
import Managebudget from "./Manage_budget";


export default class Navbar1 extends Component {
  constructor(props)
  {
    super(props);
    this.state = {currency: " "};
  }

  componentDidMount()
  {
    var currency_symbol = data.map( (data) => {
      var result;
      if (this.props.currency_name === data.name)
      {
        // console.log(data.symbol_native);
        result = data.symbol;
        return (result);
      }
      return result;
    })
    this.setState({currency: currency_symbol});
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Personal Expense Manager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginLeft: "23vw" }}
              >
                <li className="nav-item">
                  <Link className="nav-link" to="/home/dashboard">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-house"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                      />
                    </svg>{" "}
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/home/add_expense"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrows-angle-expand"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                      />
                    </svg>{" "}
                    Expense
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/add_expense"
                      >
                        Add Expense
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/view_expense"
                      >
                        View Expense
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/chart_expense"
                      >
                        Expense Reports
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/home/add_income"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cash-stack"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                    </svg>{" "}
                    Income
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/add_income"
                      >
                        Add Income
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/view_income"
                      >
                        View Income
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/home/chart_income"
                      >
                        Income Reports
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/home/manage_budget"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-archive"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>{" "}
                    Manage Budget
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
              <Route path="/home/dashboard">
                <Dashboard currency_symbol={this.state.currency}/>
              </Route>
              <Route path="/home/add_expense">
                <Alert alert={this.props.alert}/>
                <Expense showAlert={this.props.showAlert} currency_symbol={this.state.currency}/>
              </Route>
              <Route path="/home/view_expense">
                <ViewExpense currency_symbol={this.state.currency} showAlert={this.props.showAlert}/>
              </Route>
              <Route path="/home/chart_expense">
                <ExpenseReport/>
              </Route>
              <Route path="/home/add_income">
                <Alert alert={this.props.alert}/>
                <Income showAlert={this.props.showAlert} currency_symbol={this.state.currency}/>
              </Route>
              <Route path="/home/view_income">
                <ViewIncome currency_symbol={this.state.currency} showAlert={this.props.showAlert}/>
              </Route>
              <Route path="/home/chart_income">
                <IncomeReport/>
              </Route>
              <Route path="/home/manage_budget">
                <Managebudget currency_symbol={this.state.currency}/>
              </Route>
        </Switch>
      </div>
    );
  }
}
