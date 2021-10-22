import React, { Component } from 'react'
import axios from 'axios';

export default class Expense extends Component {
    constructor(props){
        super(props);
        this.state={
            DateOfExpense: '',
            ItemName: '',
            ItemCost: 0,
            ItemCategory: 'none',
            ExpenseDescription: ''
        }
    }

    handleAddExpense = () => {
        this.props.showAlert("Expense Added Successfully","success");
    }  
    
    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
          this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/create/expense', this.state)
            .then((result)=>{
                this.props.showAlert("Expense Added Successfully","success");
            })
            .catch(err => {
                console.error(err);
                this.props.showAlert("Expense is not Added Successfully","danger");
            });
    }

    
    render() {
        const { DateOfExpense,ItemName,ItemCost,ItemCategory,ExpenseDescription } = this.state;
        return (
            <>
            <div className="d-flex justify-content-center container my-4">
    
                <div style={{minWidth: "41vw"}}>
                    <h2 className="text-center" style={{marginTop: "4vh",fontFamily: 'Shadows Into Light , cursive'}}>Add Expense</h2>
                    <br /><br /><br />
                    <div className="d-flex justify-content-around" style={{width: "20vw"}}>
                    <button className="btn btn-primary text-center" style={{"marginLeft" : "298px","minWidth": "206px"}}data-bs-toggle="collapse"data-bs-target="#multiCollapseExample1" type="button" aria-expanded="false" aria-controls="multiCollapseExample1">Description About Page</button>
                    </div>
                    <div className="row">
                    <div className="col">
                        <div className="collapse multi-collapse" id="multiCollapseExample1">
                        <div className="card card-body" style={{marginTop: "5vh"}}>
                            Here You can add your expense data which you want to track.After that you can also view the data and report made based on your expense data. 
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Date of Expense</label>
                        <input type="date" name="DateOfExpense" value={DateOfExpense} onChange={this.onChange} className="form-control" id="exampleFormControlInput1" placeholder="dd-mm-yyyy" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label fw-bold">Item Name</label>
                        <input type="text" name="ItemName" value={ItemName} onChange={this.onChange} className="form-control" id="exampleFormControlInput2" placeholder="Item Name" required/>    
                    </div>
                    <label htmlFor="exampleFormControlInput3" className="form-label fw-bold">Item Cost</label>
                    <div className="input-group mb-3">
                        <br /><input type="number" name="ItemCost" value={ItemCost} onChange={this.onChange} placeholder="Cost" id="exampleFormControlInput4" className="form-control" aria-label="Item Cost" aria-describedby="basic-addon2" required/>
                        <span className="input-group-text" id="basic-addon2">{this.props.currency_symbol}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="disabledSelect" className="form-label fw-bold">Item Category</label>
                        <select id="disabledSelect" name="ItemCategory" value={ItemCategory} onChange={this.onChange} placeholder="--Select an Option--" className="form-select">
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
                        <textarea className="form-control" name="ExpenseDescription" onChange={this.onChange} value={ExpenseDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary fw-bold" onClick={this.handleAddExpense}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                    </svg> Add Expense</button>
                    </form>
                </div>
            </div>
            </>
        )
    }
}
