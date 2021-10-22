import React,{useState,useEffect} from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default function ExpenseReport() {
    const [category, setcategory] = useState(null);
    useEffect(() => {
        fetch("/expense/category")
            .then((res) => res.json())
            .then((category) => setcategory(category.category));
    });
    return (
        <>
            <div className="container" style={{fontFamily: "'Cormorant Garamond', serif",marginTop: "8vh"}}>
                    <h1>Expense Report</h1>
                    <hr />
            </div>
            <div className="container d-flex justify-content-around">
                <div>
                    <BarChart data={category} chart="Expense"/>
                </div>
                <div>
                    <PieChart data={category} chart="Expense"/>
                </div>
            </div>
        </>
    )
}
