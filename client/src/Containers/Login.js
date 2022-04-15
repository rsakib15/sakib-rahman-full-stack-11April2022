import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASEURL } from 'constants/ServerData';

const Login = ({handleLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
    }, []);

    const emailValidation = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const loginUser =() => {
        if(email === "" || password === ""){
            alert("Please enter email and password");
            return;
        }

        if(!emailValidation(email)){
            alert("Please enter valid email");
            return;
        } 
         
        let data = {
            'email': String(email).toLowerCase(),
            'password': password,
        };

        try{
            axios.post(`${BASEURL}/api/login`, data).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('name', res.data.name);
                    handleLoggedIn(true);
                    navigate("/")
                }
                else {
                    alert('Something went wrong');
                }
            }).catch(errr => alert('Please enter valid email and password'));
        }
        catch(err){
            alert('Something went wrong');
        }
    };

    const handleEmailChange =(email) => {
        setEmail(email);
    };

    const handlePasswordChange = (password) => {
        setPassword(password);
    };

    return (
        <div className="flex flex-col items-center pt-10 w-screen h-screen bg-gray-200 text-gray-700">
            <div className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
                <label className="font-semibold text-xs" htmlFor="emailField">Email</label>
                <input autoComplete="off" className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" id="emailField" type="text" onChange={(e) => handleEmailChange(e.target.value)}/>
                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                <input autoComplete="off" className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" id="passwordField" type="password" onChange={(e) => handlePasswordChange(e.target.value)}/>
                <button class="lg:w-full flex items-center justify-center w-9 h-9 rounded-md bg-black text-white mt-4" onClick={() => loginUser()}>LOGIN</button>
                <div className="flex mt-6 justify-center text-xs">
                    <span className="mx-1 text-gray-500">Don't have account?</span>
                    <Link className="text-blue-400 hover:text-blue-500" to="/registration">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default (Login);
