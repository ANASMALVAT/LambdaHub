import React, { useRef, useState } from 'react'
import {Card , Button , Form} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import {Authorization} from 'aws-amplify';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function Signup(AuthoInfo) {

    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const navigate = useNavigate();
    const [username , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    //function section
    const handleSubmitFunction = async (e) => {
        e.preventDefault()
        try {
            const res = await Authorization.signUp({
                username,
                password,
                attributes : {
                    email : email
                }
            })
            navigate('/Signin')
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


  return (
    <>
            <Container className="mt-10 d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                <div className="m-4 w-100" style={{maxWidth : '300px'}}>
                    <Card>
            <Card.Body>
               <h2 className='mb-3 text-center'>Sign up <i className="fa-solid fa-user-plus text-center"></i></h2>
                
                <Form onSubmit={handleSubmitFunction}>
                    <Form.Group className="" id="name">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control 
                        type="text" 
                        ref={usernameRef} 
                        placeholder="Enter your Name here"
                        onChange={(data) => setUserName(data.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group className="mt-2" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        ref={emailRef} 
                        placeholder="Enter your Email here"
                        onChange={(data) => setEmail(data.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group className="mt-2" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        ref={passwordRef}
                        placeholder="Enter your Password here"
                        onChange={(data) => setPassword(data.target.value)} 
                        required/>
                    </Form.Group>
                    
                    <Button className="w-100 mt-3" type="submit">Register</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <a href='/Signin' >Already Have Account? Sign in</a>
        </div>
    </div>
    </Container>
    </>
  )
}
