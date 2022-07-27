import React, { useRef, useState } from 'react'
import {Card , Button , Form} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import {Authentication} from 'aws-amplify';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const ForgotPassVeri = (authinfo) => {

    const codeRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const navigate = useNavigate();

    const [code , setCode] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");


    const handleAlreadyHaveAccount = () => {
            
    }

    const handleSubmitFunction = async (e) => {
        e.preventDefault();
        try{
            await Authentication.forgotPasswordSubmit(email,code,password);
            swal({
                title: "Good job!",
                text: "Password Changed Sucessfully!",
                icon: "success",
                button: "Done!",
            });
        }   
        catch(error) {
            swal({
                title: "Wrong info!",
                text: error.message,
                icon: "error",
                button: "Done!",
            });
            console.log(error)
        }

    }

    return (
         <Container className="mt-10 d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                <div className="m-4 w-100" style={{maxWidth : '350px'}}>
                    <Card>
            <Card.Body>
               <h2 className='mb-3 text-center'>Reset Password <i className="fa fa-unlock-alt text-center"></i></h2>
                
                <Form onSubmit={handleSubmitFunction}>
                    <Form.Group className="" id="name">
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control 
                        type="text" 
                        ref={codeRef} 
                        placeholder="Enter your verification code here"
                        onChange={(data) => setCode(data.target.value)}
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
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        ref={passwordRef}
                        placeholder="Enter your new Password here"
                        onChange={(data) => setPassword(data.target.value)} 
                        required/>
                    </Form.Group>
                   
                    <div className='w-100 text-center mt-2'>
                        <a href='/Signin' onClick={handleAlreadyHaveAccount}>Already Have an Account? Log in</a>
                    </div>
                    
                    <Button className="w-100 mt-3" type="submit">Change Password</Button>
                </Form>
            </Card.Body>
        </Card>
        
                </div>
            </Container>
    )
}

export default ForgotPassVeri;