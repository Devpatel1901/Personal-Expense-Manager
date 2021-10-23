import React, { useState } from 'react';
import {Link } from "react-router-dom";
import { Redirect } from 'react-router';
import data from "./data/Currency.json";
import axios from 'axios';

export default function Signup() {

    const [redirect, setredirect] = useState(false);
    const [selectedValue, setselectedValue] = useState({value: ""});
    const [Name, setName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    
    const onDropdownChange = (e) => {
        setselectedValue({value: e.target.value});
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
    
            const data = {NameField: Name , EmailField: Email , PasswordField: Password , Currency: selectedValue.value};
    
            console.log(Name);
            console.log(Email);
            console.log(Password);
            console.log(selectedValue.value);
    
            axios.post('http://localhost:3001/create/user', data)
                 .then((result)=>{
                     console.log(result);
                     alert(`User Added Successfully and Your Account ID Number is: ${result.data}.Please Remeber Your Account number for future login`);
                     setredirect(true);
                 })
                 .catch(err => {
                     console.error(err);
                     alert("User is not Added Successfully");
                 });
    }
    return (
        <>
            {!redirect?<Redirect to="/sign-up" />:<Redirect to="/login" />}
            <div className="container">
                <hr />
                <h1 className="text-center">Personal Expense Manager - User Sign Up</h1>
                <hr />
            </div>
            <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="Name" className="form-label">Name</label>
                    <input type="text" name="Name" className="form-control" onChange={onChangeName} id="Name" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" onChange={onChangeEmail} name="Email" className="form-control" id="Email" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" name="Password" onChange={onChangePassword} className="form-control" id="Password" required/>
                </div>
                <div className="mb-3">
                    <label for="currency" className="form-label">Choose your currency: </label>

                    <select name="currency" id="currency" value={selectedValue.value} onChange={onDropdownChange} required>
                        <option value="none" selected hidden>--Please Select an Option--</option>
                        {data.map((e)=>{
                            return (<option key={e.name} value={e.name}>{e.name}</option>)
                        })}
                    </select>
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
