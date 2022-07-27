import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import React,{useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {useLocation, useNavigate} from 'react-router-dom'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import './viewfile.css'
import axios from 'axios'
import AWS from 'aws-sdk';
import SearchFile from './SearchFile';

var Buffer = require('buffer').Buffer
const config =
{
  bucketName : "lambda-hub-team-43-a",
  region: "us-east-1",
  accessKeyId: "ASIA5ZNVE7Z5PC4JZU5N",
  secretAccessKey: "iUcLXmlEPc+Bt0/OxobuIr6lQ7pvYADAL1K25kQw",
  sessionToken: "FwoGZXIvYXdzEIz//////////wEaDFjQGSM6aH3SbePRBSLAAbQEecaXh7dCYA07WUHNUYR7yj0cyVyKY49SXzWWuuSG3CAkw5a+fnvI7axy8VwjNQ9dp6dXZitKP466271b79w9QhJtX85tPyYMo550VopBiJq8mdngTbTNk6kueN0O2G17M9hboGCHMPflO8sMBrd2gEF8H9UN3kO+cnb/0vci/AMzaR+0fgt+i72bfqev1QwMiKhKMXb3XcVwYICPF7TO9ZxnPPdqlxOgLxjHXHNlN7a5gqo7XPyMR8U47MtVgyix4oCXBjItZQfqUrCCmmpasgDO3hhnbM1CvWbtzPukpZlczpPgkuI0QhhsPkMT6HVxAZ04"}

AWS.config.update({ region:config.region, credentials: new AWS.Credentials(config.accessKeyId, config.secretAccessKey,config.sessionToken)});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
export default function ViewFile(props){
    var navigate = useNavigate();
    const { state } = useLocation();
    var f = state.file

    const DownloadFile = (f) => {

        var downloads = parseInt(f.Downloads)
        downloads = downloads + 1

        var params = {
                TableName: 'lamdahub',
                Key: {
                "key" : { S : f.key }
                },
                UpdateExpression: "set Downloads = :d",
                ExpressionAttributeValues: {
                ':d' : { N: downloads.toString() }  
                }
          };
          
          dynamodb.updateItem(params,function(err, data) {
                if (err) console.log(err);
                else console.log(data);
          });
        
        window.open(f.url,'_blank', 'noopener,noreferrer');
    }

    const starIt = (f) => {

        // var downloads = parseInt(f.Downloads)
        // downloads = downloads + 1

        // var params = {
        //     TableName: 'lamdahub',
        //     Key: {
        //       "key" : { S : f.key }
        //     },
        //     UpdateExpression: "set Downloads = :d",
        //     ExpressionAttributeValues: {
        //       ':d' : { N: downloads.toString() }  
        //     }
        //   };
          
        //   dynamodb.updateItem(params,function(err, data) {
        //         if (err) console.log(err);
        //         else console.log(data);
        //   });
          
        // window.open(f.url,'_blank', 'noopener,noreferrer');

    }

    const FetchData = async () => {
 
            // var url = props.file.url;
            await fetch(f.url)
            .then ((response) => response.text())
            .then (data => {
                data += "\n";
                filew += data;
            })
            SetCodeData(filew)
    }

   const [CodeData, SetCodeData] = useState(``);
   var filew =  ``;
   useEffect(() => {FetchData()}, [CodeData])

    var size = Buffer.byteLength(CodeData, "utf-8");
    return (
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
        <div className = 'codeblock'>
            <div className = 'inside'>
                <div className='header'>
                    <div className='icons'> 
                {/* onClick={window.location.href = chk } */}
                        <div className='likes'>
                                <StarBorderTwoToneIcon sx={{fontSize:"19px",margin:"10px"}}></StarBorderTwoToneIcon>
                                <div className='likefont'>Star: </div>
                                <div className='likenum'>{f.Stars}</div>
                        </div>
                        <div className='downloads'>
                                <CloudDownloadOutlinedIcon sx={{fontSize:"19px",margin:"10px"}}></CloudDownloadOutlinedIcon>
                                <div className='downfont'>Downloads: </div>
                                <div className='downnum'>{f.Downloads}</div>
                        </div>

                        <div className='size'>
                                <div className='sizefont'>Size: </div>
                                <div className=''> {size/1000}KB</div>
                        </div>
                    </div>
                    <div className='downloadSection'>
                        <div className='cloudDownload'>
                            <Button variant="outlined" sx = {{color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                            onClick={() => DownloadFile(f)} startIcon={<CloudDownloadIcon />}>
                                    Download
                            </Button>
                        </div>
                        <div className='cloudDownload'>
                            <Button variant="outlined" sx = {{color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                            onClick={() => starIt(f)}>
                                    <StarBorderTwoToneIcon sx={{fontSize:"19px",margin:"5px"}}></StarBorderTwoToneIcon> Star it
                            </Button>
                        </div>
                        <div className='cloudDownload'>
                            <Button variant="outlined" sx = {{color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                            onClick={() => DownloadFile(f)}>
                                    Update
                            </Button>
                        </div>
                    </div>
                </div>
                <SyntaxHighlighter  language="javascript"
                lassName={"syntax-highlighter"}
                    useInlineStyles={true}
                    showLineNumbers={true}
                    wrapLines={true}
                    lowlight={true} 
                    customStyle = {{
                        lineHeight: "1.9",
                        fontSize: "0.85em",
                        margin: 20,
                        linePaddinng:10,
                    }}
                    >
                    {CodeData}
                </SyntaxHighlighter>
            </div>
        </div>
    </>
  );
};

