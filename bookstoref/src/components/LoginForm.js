import axios from "axios";
import { useState } from "react";
import { Alert, Form, FormGroup ,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const LoginForm = () =>{


    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password , setPassword] = useState("");

    const [error, setError] = useState(null);

    const handleUsername = (event) => {

        setUserName(event.target.value);
    }

    const handlePassword = (event) => {

        setPassword(event.target.value);
    }

    const userLogin = async (event) => {
        event.preventDefault();

        if(username === ""){
            setError("Username is required");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else if(password === ""){
            setError("Password is required");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else{

            try {
                const response = await axios.post("http://localhost:8080/auth/login", {
                    username: username,
                    password: password
                });

                localStorage.setItem("token",response.data);

                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

                if(response.status===200){
                    console.log('user loged successfully');

                    localStorage.setItem('username', username);
                }

               

                navigate("/");

            } catch (error) {
                console.error("Error:", error);
                setError(error.response?.data || "An error occurred");

                setTimeout(() => {
                    setError(null);
                }, 2000);
            }
        }


    }



    return(
        <>
        <div className="loginfrom">
            <h2 className="logintext">Log in</h2>
                <FormGroup className="logformgroup">
                   
                    <Form onSubmit={userLogin} className="logform">
                    <Form.Group className="mb-3">
                        <Form.Label className="usernametext" htmlFor="username">Username</Form.Label>
                            <Form.Control value={username} type="text" className="username" onChange={handleUsername} autoComplete="username" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="usernametext" >Password</Form.Label>
                            <Form.Control value={password} type="password" className="password" onChange={handlePassword} />
                        </Form.Group>
                        
                        <div className="logbutton">
                            <Button type="submit" className="">Log in</Button>
                        </div>
                        {error && <Alert className="log-alert" variant="danger">{error}</Alert>}
                        

                    </Form>
                </FormGroup>

            </div>
        
        
        </>
    )


}
export default LoginForm;