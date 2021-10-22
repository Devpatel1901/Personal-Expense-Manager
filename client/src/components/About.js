import React from 'react'

export default function About() {
    return (
        <>
        <div className="d-flex justify-content-evenly my-5">
                <p style={{"textAlign":"center","marginTop":"10vh","marginLeft":"10px","fontWeight":"bold","fontSize":"25px"}}>
                    Track your Expense Record with Expense Manager Simplify your business spend with expensemanager, automating every step of the expense claim process so your people can concentrate on their core roles, not shuffling paper!
                </p>
            <img src="https://images.squarespace-cdn.com/content/v1/58e3e70f440243062e6bb28a/1546958560439-6U9FNJMMVBTMBENKZ5AB/Screen+Shot+2019-01-08+at+9.42.10+AM.png?format=1500w" style={{"width": "50%","height": "40vh","marginRight":"25px"}}className="img" alt="abc"/>
        </div>
        <div>
            <p style={{textAlign: "center",marginTop: "5vh",fontSize: "25px"}} className="card-title"><b>About Expense Manager</b></p>
            <div style={{backgroundColor: "cyan",textAlign: "center",width: "5vw",height: "0.8vh",marginLeft:"47vw",marginTop: "2.5vh"}}></div>
            <br/>
        </div>
        <div className="container">
            <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                It is very Easy to use and Very Efficient for data Manage
                </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                <strong>This app User Interface is very good and easy to understand.</strong> You can track all your Expense and Income record very efficiently. This website has Dashboard for summary and and Comparsion of Expense and Income.
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Graph based Analyzation
                </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                <strong>This Website has graph reports on expense and income.</strong> This Website has different page for analyzation your money inflow and outflow. We have graph based comparsion for income and expenses.So you can have knowledge about expense and income ratio. 
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Why this website is important for daily basis?
                </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                <strong>This website is very useful in daily basis in small vendor shop or for Budget Management in home.</strong> It is very easy to manage expenses in this website so you this app can be used by very naive user who are new to website they can also use this.
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
