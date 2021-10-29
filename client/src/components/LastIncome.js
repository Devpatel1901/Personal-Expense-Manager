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
        fetch("/get/income")
          .then((res) => res.json())
          .then((result)=> {
              this.setState({
                  items: result,
                  isLoaded: true
              })
              var arr = [];
              arr.push(result[result.length - 1]);
              if (result.length < 0)
              {
                  this.setState({
                      items: arr,
                      isLoaded: false
                  })
              }
              else{
                this.setState({
                    items: arr,
                    isLoaded: true
                })
              }
        });
    }

    render() {
        return (
            <div className="contanier">
            <table className="table table-hover" style={{border: "2px solid #0d6efd"}}>
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date Of Income</th>
                            <th scope="col">Amount (In {this.props.currency_symbol})</th>
                            <th scope="col">Income Description</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                            <tbody>
                        {this.state.isLoaded && this.state.items.map((item) =>{
                                    return (<tr key={item._id}>
                                    <td>{item.Category}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.DateOfIncome.slice(0,10)}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.IncomeDescription}</td>
                                    <td><Link to="/home/view_income">Show All Records</Link></td>
                                    </tr>)
                                    })}
                            </tbody>
                    </table>
        </div>
        )
    }
}
