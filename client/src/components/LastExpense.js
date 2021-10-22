import React, { Component } from 'react'
import {Link } from "react-router-dom";
export default class LastExpense extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            items: [],
            isLoaded: false
        }
    }

    componentDidMount()
    {
        fetch("/get/expense")
          .then((res) => res.json())
          .then((result)=> {
              this.setState({
                  items: result,
                  isLoaded: true
              })
              var arr = [];
              arr.push(result[result.length - 1]);
              this.setState({
                  items: arr,
                  isLoaded: true
              })
            // console.log(this.state.items);
        });
    }

    render() {
        return (
            <div className="contanier">
            <table className="table table-hover" style={{border: "2px solid #ff4040"}}>
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Date Of Expense</th>
                            <th scope="col">Cost (In {this.props.currency_symbol})</th>
                            <th scope="col">Expense Description</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                            <tbody>
                        {this.state.isLoaded && this.state.items.map((item) =>{
                                    return (<tr key={item._id}>
                                    <td>{item.ItemCategory}</td>
                                    <td>{item.ItemName}</td>
                                    <td>{item.DateOfExpense.slice(0,10)}</td>
                                    <td>{item.ItemCost}</td>
                                    <td>{item.ExpenseDescription}</td>
                                    <td><Link to="/home/view_expense">Show All Records</Link></td>
                                    </tr>)
                                    })}
                            </tbody>
                    </table>
        </div>
        )
    }
}
