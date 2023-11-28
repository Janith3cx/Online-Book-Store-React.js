import { Input } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jbookstorelogo from '../assets/images/jbookstorelogo.png'

const RegisterForm = () =>{

    const navigate = useNavigate();
    
    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [error, setError] = useState(null);

    const handleRegUsername = (event) => {
        setUsername(event.target.value); 
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleFullName = (event) => {
        setFullName(event.target.value);
    }

    const handleRegPassword = (event) => {
        setPassword(event.target.value);
    }

    const registerUser = async (event) => {
        event.preventDefault();

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (username.length < 6) {
            setError("Username should have atleast 6 characters");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else if (password.length < 6) {
            setError("Password should be atleast 6 characters long");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else if (!regex.test(email)) {
            setError("Email is not valid");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else {
            setError(null);
            
            const currentDate = new Date().toISOString();
            try {
                const response = await axios.post("http://localhost:8080/auth/register", {
                    fullname:fullname,
                    username: username,
                    password: password,
                    email: email

                    
                });
                
                console.log("Response:", response);

                if(response.status===200){
                    console.log('user registed successfully');

               
                    setFullName("");
                    setUsername("");
                    setPassword("");
                    setEmail("");

                    setMessage('User registered successfully');

                                setTimeout(() => {
                                    setMessage('');
                                  }, 2000);

                    
                    
                    try {
                        const cartResponse= await axios.get(`http://localhost:8080/id/${username}`)
                    
                        console.log("user name : ",username);
                        
                        if(cartResponse.status === 200){
                            const userId = cartResponse.data.id;
                            try {
                                const response = await axios.post("http://localhost:8080/cart",{
                                    createdDate:currentDate,
                                    user:{id:userId}
                                });
                    
                                // console.log("Response:", response);
                    
                            if(response.status === 200){
                                console.log("cart post successfully");

                                
                            }
                            } catch (error) {
                                console.error(error);
                            } 

                        }
                    } catch (error) {
                        console.error(error);
                    }
                   
                    

                    
                }
                navigate("/log-reg");
                
            } catch (error) {
                console.error("Error:", error);
                setError(error.response?.data || "An error occurred");

                setTimeout(() => {
                    setError("");
                }, 2000);
            }
            
        }
    }



    

        

    

    
    return(
        <>
             <div className="registerfrom">
                <div>
                
                  <div className="reg-header">
                    <h2 className="registertext">Register</h2>
                    <img src={jbookstorelogo} className='reg-home-logo' alt='logo'></img>
                    <h2 className="reg-shopname">JBOOKSHOP</h2>
                  </div>

                <FormGroup className="regformgroup">
                    <Form onSubmit={registerUser} className="reform">
                    
                    <Form.Group className="mb-3">
                        <Form.Label className="usernametext">Full Name</Form.Label>
                            <Form.Control value={fullname} type="text" className="fullName" onChange={handleFullName} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="usernametext">Username</Form.Label>
                            <Form.Control value={username} type="text" className="username" onChange={handleRegUsername} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="usernametext">Email</Form.Label>
                            <Form.Control value={email} type="text" className="email" onChange={handleEmail} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="usernametext">Password</Form.Label>
                            <Form.Control value={password} type="password" className="password" onChange={handleRegPassword} />
                        </Form.Group>


                        <div className="regbutton">
                            <Button type="submit" className="reg-button">Register</Button>
                        </div>
                        {error && (
                          <Alert className="reg-alert-danger" variant="danger" onClose={()=>setMessage('')}>{message}
                            {JSON.stringify(error)}
                          </Alert>
                        )}
                        {message && <Alert className="reg-success-alert" variant="success" onClose={()=>setMessage('')}>{message}</Alert>}    
                    </Form>
                </FormGroup>
                </div>

            </div>
        
        </>


    );


}
export default RegisterForm;