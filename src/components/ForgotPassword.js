
import React, { useRef, useState } from 'react'
import {Card , Button , Form} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import {Authorization} from 'aws-amplify';
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const [email , setEmail] = useState("");
    const emailRef = useRef()
    const navigate = useNavigate();

    const handleSubmitFunction = async (e) => {
        e.preventDefault()
        try {
            await Authorization.forgotPassword(email)
            navigate('/FPV')
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Container className="mt-10 d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                <div className="m-4 w-100" style={{maxWidth : '350px'}}>
                    <Card>
            <Card.Body>
               <h2 className='mb-3 text-center'>Reset Password <i className="fa fa-key text-center"></i></h2>
                
                <Form onSubmit={handleSubmitFunction}>
                    
                    <Form.Group className="mt-2" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        ref={emailRef} 
                        placeholder="Enter your Email here"
                        onChange={(data) => setEmail(data.target.value)}
                        required/>
                    </Form.Group>
                    <p className="pt-3 text-muted">Please enter you email inorder to reset your password we will sent you a link</p>
                    <Button className="w-100 mt-1 " type="submit">Give me Link</Button>
                </Form>
            </Card.Body>
        </Card>

            <div className='w-100 text-center mt-2'>
                        <a href='/Signin'>Back to Login</a>
                    </div>
                </div>
        </Container>
    )
}

export default ForgotPassword;