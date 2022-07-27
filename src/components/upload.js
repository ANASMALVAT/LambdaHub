import React, {useState} from "react";
import AWS from 'aws-sdk';
import Button from '@mui/material/Button';
import { Alert } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import './upload.css'

var Crypto = require("crypto-js");
// window.Buffer = window.Buffer || require("buffer").Buffer;

  const config =
  {
    bucketName : "lambda-hub-team-43-a",
    region: "us-east-1",
    accessKeyId: "ASIA5ZNVE7Z5PC4JZU5N",
    secretAccessKey: "iUcLXmlEPc+Bt0/OxobuIr6lQ7pvYADAL1K25kQw",
    sessionToken: "FwoGZXIvYXdzEIz//////////wEaDFjQGSM6aH3SbePRBSLAAbQEecaXh7dCYA07WUHNUYR7yj0cyVyKY49SXzWWuuSG3CAkw5a+fnvI7axy8VwjNQ9dp6dXZitKP466271b79w9QhJtX85tPyYMo550VopBiJq8mdngTbTNk6kueN0O2G17M9hboGCHMPflO8sMBrd2gEF8H9UN3kO+cnb/0vci/AMzaR+0fgt+i72bfqev1QwMiKhKMXb3XcVwYICPF7TO9ZxnPPdqlxOgLxjHXHNlN7a5gqo7XPyMR8U47MtVgyix4oCXBjItZQfqUrCCmmpasgDO3hhnbM1CvWbtzPukpZlczpPgkuI0QhhsPkMT6HVxAZ04"    }

AWS.config.update({ region:config.region, credentials: new AWS.Credentials(config.accessKeyId, config.secretAccessKey,config.sessionToken)});
var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var s3 = new AWS.S3({apiVersion: "2006-03-01", params: { Bucket: config.bucketName }});

function Dropzone() {

  let Filedata = new FormData();
  var navigate = useNavigate();
  function setFile(event) {
  Filedata.append('file',event);
  }

  const [desc, setDesc] = useState("");
  const uploadData = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(Filedata);
    var curTime = Date.now()
    const key = Filedata.get('file').name + curTime;
    var Dynamo_Params = { TableName: "lamdahub", 
    Item: { key :{S: key}, url :{ S: `https://${config.bucketName}.s3.amazonaws.com/${key}`} , Discription :{S: desc}, file_name :{ S : Filedata.get('file').name }, email :{ S: localStorage.getItem('email')}, Downloads:{N: "0"}, Stars:{N: "0" }}
    
    };

    dynamo.putItem(Dynamo_Params, function(err, data) {
      if(err){
        Alert(err.message)
      }else{
        console.log(data)
      }
    });
    dynamo.updateItem(

    )

    //  Storing in to the S3 Bucket
    let upload_params = {Bucket: config.bucketName, Key: key, Body:Filedata.get('file')};
    let upload = new AWS.S3.ManagedUpload({params: upload_params});
    let prom = upload.promise();
    window.location.reload();
    // prom.then(
    //     function(data) {Alert("Uploaded Succesfully!")},
    //     function(err) {console.log("Failed to upload with error:", err.message);}); 
    }
  
  return(
  <>
              <div className="search-bars">
            {/* <input className="Disc" type='textarea' value = {desc} onChange = { e => setDesc(e.target.value)} placeholder="Write Disription of Lambda Function"></input> */}

              <div className="search-button-upload">
                <Button variant="outlined" sx = {{ color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={() => {
                            navigate('/home')
                          }} 
                          startIcon={<SavedSearchIcon/>}>
                  Search File
                </Button>
              </div>
              <div className="search-button-upload">
                <Button variant="outlined" sx = {{ color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/Signin')
                          }} 
                          startIcon={<SavedSearchIcon/>}>
                  Logout
                </Button>
              </div>
            </div>
  <div>
    <div className="UploadComponents">
        <div className="OuterDisc">
          <input className="Disc" type='textarea' value = {desc} onChange = { e => setDesc(e.target.value)} placeholder="Write Disription of Lambda Function"></input>
        </div>
        <div className="Select">
            <input className = "SelectFile"  style={{borderRadius : "0px" }} type="file" name ="file"  onChange = {event => setFile(event.target.files[0])} required/>
        </div>
        <div>
        <Button variant="outlined" sx = {{height: 35, width : 100, color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
              onClick={event => uploadData(event)}
              startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
        </div>
      </div>
  </div> 
  </>
  )
}

export default Dropzone;