import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default class View_Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          filter: "none",
          isLoaded: false,
          update: false,
          Totalsum: 0,
          data: {
            _id: '0',
            DateOfExpense: '',
            ItemName: '',
            ItemCost: 0,
            ItemCategory: 'none',
            ExpenseDescription: ''},
        };
    }

    componentDidMount(){
        fetch("/get/expense")
          .then((res) => res.json())
          .then((result)=> {
                if (this.state.filter === "none" || this.state.filter === "all")
                {
                    var sum = 0;
                    for (var i = 0 ; i < result.length ; i++)
                    {
                        sum += result[i].ItemCost;
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
                        if (result[j].ItemCategory === this.state.filter)
                        {
                            sum1 += result[j].ItemCost;
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
        var data = {ID : id}; 
        if (this.myalert())
        {
            alert("Record Successfully deleted");
        }
        else
        {
            return
        }
        axios.post("http://localhost:3001/delete/expense",data)
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
        doc.html(document.querySelector("#expense_records"),{
            callback: function(pdf){
                var pageCount  = doc.internal.getNumberOfPages();
                pdf.deletePage(pageCount);
                pdf.save("Expense.pdf");
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
                        DateOfExpense: this.state.items[i].DateOfExpense.slice(0,10),
                        ItemCategory: this.state.items[i].ItemCategory,
                        ItemCost: this.state.items[i].ItemCost,
                        ItemName: this.state.items[i].ItemName,
                        ExpenseDescription: this.state.items[i].ExpenseDescription
                    }
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/update/expense', this.state.data)
            .then((result)=>{
                alert("Record Updated Successfully");
                this.componentDidMount();
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    render() {
        return (
            <div className="container" style={{fontFamily: "'Cormorant Garamond', serif",marginTop: "8vh"}}>
                <h1>View Expenses</h1>
                <hr />
                <div className="container">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                        <label htmlFor="disabledSelect" className="form-label fw-bold">Category Filter For Expense:</label>
                    </div>
                    <div className="p-2 bd-highlight">
                        <select id="disabledSelect" style={{width: "20vw"}} value={this.state.filter} name="ItemCategory" onChange={this.handleFilter} className="form-select">
                                <option value="none" disabled>--Select a Filter Based On Category--</option>
                                <option value="all">Show All</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Bill Payment">Bill Payment</option>
                                <option value="Repair Work">Repair Work</option>
                                <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-primary" style={{marginLeft: "450px"}}onClick={this.downloadPDF}>Download Expense Record as PDF</button>
                    </div>
                </div>
                </div>
                <div className="my-5" id="expense_records" style={{height: "37vh",position: "relative"}}>
                    <h4 className="text-center">{`Total Expense for selected filtered category is: ${this.props.currency_symbol.slice(48,49)}. ${this.state.Totalsum}`}</h4>
                    <div style={{backgroundColor: "#ff4040" , fontSize: "20px" , color: "white" ,   padding: "0px 10px",marginTop: "15px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                    </svg> History of Expenses
                    </div>
                    <table className="table table-hover" style={{border: "0.7px solid #ff4040"}}>
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
                                    <td>
                                        <button className="btn btn-outline-warning" style={{marginRight: "10px"}} data-toggle="tooltip" onClick={(e) => {this.updateRecord(item._id)}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-placement="bottom" title="Edit Expense Record">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg> Update
                                        </button>
                                        |
                                        <button className="btn btn-outline-danger" style={{marginLeft: "10px"}} data-toggle="tooltip" onClick={(e) => {this.deleteRecord(item._id)}} data-placement="bottom" title="Delete Expense Record">
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
                                <h5 className="modal-title" id="exampleModalLabel">Expense Update Form</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Date of Expense</label>
                                    <input type="date" name="DateOfExpense" value={this.state.data.DateOfExpense} onChange={this.onChange} className="form-control" id="exampleFormControlInput1" placeholder="dd-mm-yyyy" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label fw-bold">Item Name</label>
                                    <input type="text" name="ItemName" value={this.state.data.ItemName} onChange={this.onChange} className="form-control" id="exampleFormControlInput2" placeholder="Item Name" required/>    
                                </div>
                                <label htmlFor="exampleFormControlInput3" className="form-label fw-bold">Item Cost</label>
                                <div className="input-group mb-3">
                                    <br /><input type="number" name="ItemCost" value={this.state.data.ItemCost} onChange={this.onChange} placeholder="Cost" id="exampleFormControlInput4" className="form-control" aria-label="Item Cost" aria-describedby="basic-addon2" required/>
                                    <span className="input-group-text" id="basic-addon2">{this.props.currency_symbol}</span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="disabledSelect" className="form-label fw-bold">Item Category</label>
                                    <select id="disabledSelect" name="ItemCategory" value={this.state.data.ItemCategory} onChange={this.onChange} placeholder="--Select an Option--" className="form-select">
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
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Expense Description</label>
                                    <textarea className="form-control" name="ExpenseDescription" onChange={this.onChange} value={this.state.data.ExpenseDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
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
        )
    }
}
