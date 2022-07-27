import React, {  useState } from 'react'
import {Card , Button , Form, FormGroup} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import Amplify , { Storage} from '@aws-amplify/core';

import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import S3FileUpload, { uploadFile } from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;

const FileUploadingPage = (authprops) => {

    const config = {
        bucketName: 'cloudprojectdal',
        region: 'us-east-1',
        accessKeyId: 'ASIAU7MDS6UCTCLK5XWV',
        secretAccessKey: 'c5Q8vuBeqo4jKUnoOf9W8ZpEJVyhmB5rMw6bk8fxR',
    }

    const navigate = useNavigate();

    const [functionName , setName] = useState("");
    const [tags , setTags] = useState("");
    const [description , setDescription] = useState("");
    const [file , setfile] = useState(null)

    const handleSubmitFunction = async(e) => {
        e.preventDefault()

        console.log(file)

        // uploadFile(file , config)
        // .then(data => console.log(data))
        // .catch(err => console.error(err))

        S3FileUpload
        .uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }


  return (
 
   <>
        <Container className="mt-10 d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
                <div className="m-4 w-100" style={{maxWidth : '700px'}}>
                    <Card>
            <Card.Body>
                <h2 className='mb-3 text-center'>File Upload <i className="fa-solid fa-file-arrow-up text-center"></i></h2>
                
               <Form onSubmit={handleSubmitFunction}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of Function</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name of Function" onChange={(data) => setName(data.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" id="name">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Tags of Functions for Easy searching "
                        onChange={(data) => setTags(data.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        onChange={(data) => setDescription(data.target.value)}
                    />
                    </Form.Group>
                    
                    <FormGroup>
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={(data) => setfile(data.target.files[0])}
                         />
                    </FormGroup>
                <Button className="w-100 mt-3" type="submit">Upload File</Button>
            </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <p>Upload your creative ideas here so everone can use that </p>
            </div>
                </div>
            </Container>
   </>

  )
}

export default FileUploadingPage