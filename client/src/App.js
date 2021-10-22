import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import React, { useState } from 'react'
import Navbar1 from "./components/Navbar1";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) =>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 2000);
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            <Navbar1 alert={alert} showAlert={showAlert} currency_name="Indian Rupee"/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/sign-up">
            <Signup/>
          </Route>
          <Route path="/">
            <Navbar />
            <About />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
