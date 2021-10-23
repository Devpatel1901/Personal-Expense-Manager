import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';

export default class View_Income extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          items: [],
          filter: "none",
          isLoaded: false,
          update: false,
          Totalsum: 0,
          data:{
            DateOfIncome: '',
            Name: '',
            Amount: 0,
            IncomeCategory: '',
            IncomeDescription: ''
          }
        };
    }

    componentDidMount(){
        fetch("/get/income")
          .then((res) => res.json())
          .then((result)=> {
            if (this.state.filter === "none" || this.state.filter === "all")
            {
                var sum = 0;
                for (var i = 0 ; i < result.length ; i++)
                {
                    sum += result[i].Amount;
                }
                this.setState({
                    isLoaded: true,
                    items: result,
                    Totalsum: sum
                });
            }else{
                var arr = [];
                var sum1 = 0;
                for (var j = 0 ; j < result.length ; j++)
                {
                    if (result[j].Category === this.state.filter)
                    {
                        sum1 += result[j].Amount;
                        arr.push(result[j]);
                    }
                }
                this.setState({
                    isLoaded: true,
                    items: arr,
                    filter: this.state.filter,
                    Totalsum: sum1
                })
            }
            });
    }

    handleFilter = (e) => {
        this.setState({
            filter: e.target.value
        })
        this.componentDidMount();
    }

    myalert = () => {
        var res = false;
        if (window.confirm("Are you sure uou want to delete a record?"))
        {
            res = true;
        }
        else{
            res = false;
        }
        return res;
    }

    deleteRecord = (id) => {
        console.group(id);
        if (this.myalert())
        {
            alert("Record Successfully deleted");
        }
        else
        {
            return
        }
        var data = {ID : id}; 
        axios.post("http://localhost:3001/delete/income",data)
        .then(()=>{
            this.componentDidMount();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    downloadPDF = () => {
        //p - portrait
        //pt - points
        //a3 - page size
        var doc = new jsPDF("l","pt","a3");
        doc.html(document.querySelector("#income_records"),{
            callback: function(pdf){
                var pageCount  = doc.internal.getNumberOfPages();
                pdf.deletePage(pageCount);
                pdf.save("Income.pdf");
            }
        })
    }

    onChange = (e) => {
        this.setState({data: { ...this.state.data,[e.target.name]: e.target.value }});
    }

    updateRecord = (id) => {
        this.setState({
            update: true,
        })
        for (var i = 0 ; i < this.state.items.length ; i++)
        {
            if (this.state.items[i]._id === id)
            {
                this.setState({
                    data:{
                        _id: id,
                        DateOfIncome: this.state.items[i].DateOfIncome.slice(0,10),
                        IncomeCategory: this.state.items[i].IncomeCategory,
                        Amount: this.state.items[i].Amount,
                        Name: this.state.items[i].Name,
                        IncomeDescription: this.state.items[i].IncomeDescription
                    }
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/update/income', this.state.data)
            .then((result)=>{
                this.componentDidMount();
                alert("Record Updated Successfully");
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <>
        <div className="container" style={{fontFamily: "'Cormorant Garamond', serif",marginTop: "8vh"}}>
            <h1>View Incomes</h1>
            <hr />
            <div className="container">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                        <label htmlFor="disabledSelect" className="form-label fw-bold">Category Filter For Expense:</label>
                    </div>
                    <div className="p-2 bd-highlight">
                        <select id="disabledSelect" style={{width: "20vw"}} value={this.state.filter} name="Category" onChange={this.handleFilter} className="form-select">
                        <option value="none" disabled>--Select a Filter Based On Category--</option>
                            <option value="all">Show All</option>
                            <option value="Salary">Salary</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Overtime">Overtime</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-primary" style={{marginLeft: "450px"}}onClick={this.downloadPDF}>Download Income Record as PDF</button>
                    </div>
                </div>
            </div>
        <div className="my-5" id="income_records">
            <h4 className="text-center">{`Total Income for selected filtered category is: ${this.state.Totalsum}`}</h4>
            <div style={{backgroundColor: "#0d6efd" , fontSize: "20px" , color: "white" , padding: "0px 10px",marginTop: "15px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
              </svg> History of Income
            </div>
            <table className="table table-hover" style={{border: "0.7px solid #0d6efd"}}>
                <thead>
                    <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Income</th>
                    <th scope="col">Amount (In {this.props.currency_symbol})</th>
                    <th scope="col">Income Description</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.isLoaded && this.state.items.map((item)=>{
                    return(<tr key={item._id}>
                    <td>{item.Category}</td>
                    <td>{item.Name}</td>
                    <td>{item.DateOfIncome.slice(0,10)}</td>
                    <td>{item.Amount}</td>
                    <td>{item.IncomeDescription}</td>
                    <td>
                        <button className="btn btn-outline-warning" style={{marginRight: "10px"}} data-toggle="tooltip" onClick={(e) => {this.updateRecord(item._id)}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-placement="bottom" title="Edit Income Record">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg> Update
                        </button>
                        |
                        <button className="btn btn-outline-danger" style={{marginLeft: "10px"}} data-toggle="tooltip" data-placement="bottom" onClick={(e) => {this.deleteRecord(item._id)}} title="Delete Income Record">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg> Delete
                        </button> 
                    </td>
                    </tr>)
                    })}
                </tbody>
            </table>
        </div>
        {this.state.update && 
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Income Update Form</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Date of Income</label>
                                            <input type="date" name="DateOfIncome" value={this.state.data.DateOfIncome} onChange={this.onChange} className="form-control" id="exampleFormControlInput1" placeholder="dd-mm-yyyy" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label fw-bold">Name</label>
                                            <input type="text" name="Name" value={this.state.data.Name} onChange={this.onChange} className="form-control" id="exampleFormControlInput2" placeholder="Item Name" required/>    
                                        </div>
                                        <label htmlFor="exampleFormControlInput3" className="form-label fw-bold">Amount</label>
                                        <div className="input-group mb-3">
                                            <br /><input type="number" name="Amount" value={this.state.data.Amount} onChange={this.onChange} placeholder="Cost" id="exampleFormControlInput4" className="form-control" aria-label="Item Cost" aria-describedby="basic-addon2" required/>
                                            <span className="input-group-text" id="basic-addon2">{this.props.currency_symbol}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="disabledSelect" className="form-label fw-bold">Income Category</label>
                                            <select id="disabledSelect" name="IncomeCategory" value={this.state.data.IncomeCategory} onChange={this.onChange} placeholder="--Select an Option--" className="form-select">
                                                <option value="none" disabled>--Please Select an Option--</option>
                                                <option value="Food">Food</option>
                                                <option value="Transportation">Transportation</option>
                                                <option value="Clothes">Clothes</option>
                                                <option value="Bill Payment">Bill Payment</option>
                                                <option value="Repair Work">Repair Work</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Income Description</label>
                                            <textarea className="form-control" name="IncomeDescription" onChange={this.onChange} value={this.state.data.IncomeDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <br />
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Update and Save changes</button>
                                        </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>}
        </div>
    </>
        )
    }
}
