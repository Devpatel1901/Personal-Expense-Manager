import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <Pdf targetRef={ref} filename="Expense.pdf">
        {({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Download Expense Record as PDF</button>}
      </Pdf>
      <div className="container" ref={ref}>
        <table className="table table-hover" style={{border: "0.7px solid #ff4040"}}>
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Date Of Expense</th>
                            <th scope="col">Cost (In {props.currency_symbol})</th>
                            <th scope="col">Expense Description</th>
                            </tr>
                        </thead>
                            <tbody>
                        {props.data.map((item) =>{
                                    return (<tr key={item._id}>
                                    <td>{item.ItemCategory}</td>
                                    <td>{item.ItemName}</td>
                                    <td>{item.DateOfExpense.slice(0,10)}</td>
                                    <td>{item.ItemCost}</td>
                                    <td>{item.ExpenseDescription}</td>
                                    </tr>)
                                    })}
                            </tbody>
                    </table>
      </div>
    </>
  );
}

export default PDF;