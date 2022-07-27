import React, { useRef, useState } from 'react'
import {Card , Button , Form} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import {Authorization} from 'aws-amplify';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function Signin(authprops) {

    //Variable Section
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate();

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    //function section

    const handleSubmitFunction = async (e) => {
        e.preventDefault()

        try {
            const user = await Authorization.signIn(username,password)
            localStorage.setItem('token', user.signInUserSession.accessToken.jwtToken);
            localStorage.setItem('email',username);
            navigate('/Home')
        }

        catch(err) {
            swal({
                title: "Wrong info!",
                text: err.message,
                icon: "error",
                button: "Done!",
            });
        }
    }

    const handleAlreadyHaveAccount = () => {

    }

    const handleForgotPassword = () => {
}


  return (
    <>
            <Container className="mt-10 d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                <div className="m-4 w-100" style={{maxWidth : '300px'}}>
                    <Card>
            <Card.Body>
               <h2 className='mb-3 text-center'>Sign In <i className="fa-solid fa-right-to-bracket text-center pl-4"></i></h2>
                
                <Form onSubmit={handleSubmitFunction}>
                    <Form.Group className="" id="name">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control 
                        type="text" 
                        ref={usernameRef} 
                        placeholder="Enter your email here"
                        onChange={(data) => setUserName(data.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group className="mt-2" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        ref={passwordRef}
                        placeholder="Enter your password here"
                        onChange={(data) => setPassword(data.target.value)} 
                        required/>
                    </Form.Group>
                    
                    <Button className="w-100 mt-3" type="submit">Log in</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <a href='/Signup' onClick={handleAlreadyHaveAccount}>Dont have Account? Sign up</a>
        </div>
        <div className='w-100 text-center mt-2'>
            <a href='/ForgotPass' onClick={handleForgotPassword}>Forgot Password? Reset It?</a>
        </div>
                </div>
            </Container>
    </>
  )
}
