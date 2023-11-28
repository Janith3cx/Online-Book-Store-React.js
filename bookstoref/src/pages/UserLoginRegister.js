import { Input } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";


const UserLoginRegister = ()=>{

    // Loigin part

    

    // Registration part

    
    return(
        <>
        <div className="userlogredbody">
            <div className="login-form">
                <LoginForm/>
           </div>
           
           <div className="register-form">
                <RegisterForm/>
           </div>
        </div>
        </>
    );
}
export default UserLoginRegister;