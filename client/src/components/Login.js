import React,{useState} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from 'axios';

export default function Login() {

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [ID, setID] = useState(null);
    const [password, setpassword] = useState(null);

    const onchangeID = (e) => {
        setID(e.target.value);
    }

    const onchangePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {IDField: ID , PasswordField: password};

        axios.post("http://localhost:3001/get/userdetails",data)
        .then((res)=>{
            if (res.data === "")
            {
                setisLoggedIn(false);
                alert("Account ID Number or Password is incorrect");
            }
            else if (res.data._id !== ID && res.data.password !== password)
            {
                setisLoggedIn(false);
                alert("Account ID Number or Password is incorrect");
            }
            else if (res.data._id === ID && res.data.password === password)
            {
                setisLoggedIn(true);
                alert("Successsfully Logged In!!");
            }
            else
            {
                setisLoggedIn(true);
                alert("Successsfully Logged In!!");
            }
            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        })
        
    }

    return (
        <>
        {!isLoggedIn?<Redirect to="/login"/>:<Redirect to={`/home/dashboard?id=${ID}`}/>}
        <div className="container">
            <p className="text-center">
                <hr />
                <h1>Personal Expense Manager - User Login</h1>
                <hr />
            </p>
        </div>
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="ID" className="form-label">Account ID Number</label>
                    <input type="text" name="ID" onChange={onchangeID} className="form-control" id="ID" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">Account ID Number given by system when you create your account.</div>
                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={onchangePassword} className="form-control" id="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="container text-center">
                <Link to="/">
                    <button type="button" className="btn btn-primary mx-3">Back to Home Page</button>
                </Link>
        </div>
        </>
    )
}
