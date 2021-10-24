import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default class Manage_budget extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            add: false,
            update: false,
            data:{
                BudgetAmount: 0,
                Category: 'none'
            },
            update_data:{
                _id: '',
                BudgetAmount: 0,
                Category: 'none'
            }
        }
    }

    componentDidMount(){
        fetch("/get/budget")
          .then((res) => res.json())
          .then((result)=> {this.setState({
              items: result,
              isLoaded: true
          })});
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
        axios.post("http://localhost:3001/delete/budget",data)
        .then(()=>{
            this.componentDidMount();
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    onChange = (e) => {
        this.setState({data: {...this.state.data,[e.target.name]: e.target.value}})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.data.Category);
        axios.post('http://localhost:3001/add/budget', this.state.data)
            .then((result)=>{
                console.log(result);
                alert("Budget Added Succesfully");
                // alert("Record Updated Successfully");
                this.componentDidMount();
            })
            .catch(err => {
                console.error(err);
            });
    }

    onChange1 = (e) => {
        this.setState({update_data: { ...this.state.update_data,[e.target.name]: e.target.value }});
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
                    update_data:{
                        _id: id,
                        BudgetAmount: this.state.items[i].BudgetAmount,
                        Category: this.state.items[i].Category,
                    }
                })
            }
        }
    }

    handleUpdateSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/update/budget', this.state.update_data)
            .then((result)=>{
                alert("Record Updated Successfully");
                this.componentDidMount();
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleAdd = () => {
        this.setState({
            add: true
        })
    }

    downloadPDF = () => {
        //p - portrait
        //pt - points
        //a3 - page size
        var doc = new jsPDF("l","pt","a3");
        doc.html(document.querySelector("#budget_records"),{
            callback: function(pdf){
                var pageCount  = doc.internal.getNumberOfPages();
                pdf.deletePage(pageCount);
                pdf.save("Budget.pdf");
            }
        })
    }

    render() {
        return (
            <>
            <div className="container" style={{fontFamily: "'Cormorant Garamond', serif",marginTop: "8vh"}}>
                <h1>Manage Budget</h1>
                <hr />
                <div className="container">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-success fw-bold" onClick={this.handleAdd} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                            </svg> Add New Budget</button>        
                        </div>
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-primary" style={{marginLeft: "52vw"}} onClick={this.downloadPDF}>Download Budget Record as PDF</button>
                        </div>
                    </div>
                </div>
                <div className="my-5" id="budget_records">
                    <div style={{backgroundColor: "#ff7818" , fontSize: "20px" , color: "white" , padding: "0px 10px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg> History of Budget
                    </div>
                    <table className="table table-hover" style={{border: "0.7px solid #ff7818"}}>
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Budget Amount (In {this.props.currency_symbol})</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoaded && this.state.items.map((item)=>{
                                return (<tr key={item._id}>
                                    <th>{item.Category}</th>
                                    <td>{item.BudgetAmount}</td>
                                    <td>
                                        <button className="btn btn-outline-warning" style={{marginRight: "10px"}} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={(e)=>{this.updateRecord(item._id)}} data-toggle="tooltip" data-placement="bottom" title="Edit Budget Record">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg> Update
                                        </button>
                                        |
                                        <button className="btn btn-outline-danger" style={{marginLeft: "10px"}} onClick={(e)=>{this.deleteRecord(item._id)}} data-toggle="tooltip" data-placement="bottom" title="Delete Budget Record">
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
                {this.state.add && 
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Budget Form</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="disabledSelect" className="form-label fw-bold">Budget Category</label>
                                    <select id="disabledSelect" name="Category" value={this.state.data.Category} onChange={this.onChange} placeholder="--Select an Option--" className="form-select">
                                        <option value="none" disabled>--Please Select an Option--</option>
                                        <option value="Food">Food</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Clothes">Clothes</option>
                                        <option value="Bill Payment">Bill Payment</option>
                                        <option value="Repair Work">Repair Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <label htmlFor="exampleFormControlInput3" className="form-label fw-bold">Budget Amount</label>
                                <div className="input-group mb-3">
                                    <br /><input type="number" name="BudgetAmount" value={this.state.data.BudgetAmount} onChange={this.onChange} placeholder="Cost" id="exampleFormControlInput4" className="form-control" aria-label="Item Cost" aria-describedby="basic-addon2" required/>
                                    <span className="input-group-text" id="basic-addon2">{this.props.currency_symbol}</span>
                                </div>
                                <br />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add Budget</button>
                            </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>}
                    {this.state.update && 
                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Budget Form</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleUpdateSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="disabledSelect" className="form-label fw-bold">Budget Category</label>
                                    <select id="disabledSelect" name="Category" value={this.state.update_data.Category} onChange={this.onChange1} placeholder="--Select an Option--" className="form-select">
                                        <option value="none" disabled>--Please Select an Option--</option>
                                        <option value="Food">Food</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Clothes">Clothes</option>
                                        <option value="Bill Payment">Bill Payment</option>
                                        <option value="Repair Work">Repair Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <label htmlFor="exampleFormControlInput3" className="form-label fw-bold">Budget Amount</label>
                                <div className="input-group mb-3">
                                    <br /><input type="number" name="BudgetAmount" value={this.state.update_data.BudgetAmount} onChange={this.onChange1} placeholder="Cost" id="exampleFormControlInput4" className="form-control" aria-label="Item Cost" aria-describedby="basic-addon2" required/>
                                    <span className="input-group-text" id="basic-addon2">{this.props.currency_symbol}</span>
                                </div>
                                <br />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Update Budget</button>
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

