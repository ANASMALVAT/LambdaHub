import React from 'react'
import axios from 'axios'; 
import {useState , useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import "./searchfile.css";



const theme = createTheme();
export default function SearchFile() {

  const [search, setSearch] = useState("");
  const [SearchVal, setSearchVal] = useState("");
  const [findFile,setFindFile] = useState("");
  const [files,Setfiles] = useState([]);
  var navigate = useNavigate()
  
  const [fileType,setfileType] = useState({
    'py' : "PYTHON FILE",
    'java' : "JAVA FILE",
    'c' : "C FILE",
    'cpp' : "C++ FILE",
    'js' : 'JAVASCRIPT FILE',
    'jsx' : 'REACT JAVASCRIPT FILE',
    'pl':'PERL FILE',
    'php':'PHP FILE',
    'swift':'SWIFT FILE'
  })

  const TransferView = (f) => {
    console.log(f);
    navigate("/viewfile", {state: 
              {
                file : {...f}
              }
            });
  }

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', 
    {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

    const StyledButton = styled(Button)({
      color: "#fff",
      backgroundColor: "#F6F8FA",
      padding: "15px",
      "&:active": {
        backgroundColor: "#F6F8FA",
      },
      "&:hover": {
        backgroundColor: "#F6F8FA",
      },
    });

    const handleSearch = () => {
        setFindFile(search);
    };

      useEffect(() => {
        axios.post("https://wbg6loavw8.execute-api.us-east-1.amazonaws.com/getFiles/",{
        searchQuery : findFile
        }).then((response) => {
          var resFiles = JSON.parse(JSON.stringify(response.data.files))
          Setfiles(resFiles);
        }).catch((error) => {
          alert(error)
        });
        }, [findFile]);

        return (
          <>
            <div className="search-bars">
            {/* <input className="Disc" type='textarea' value = {desc} onChange = { e => setDesc(e.target.value)} placeholder="Write Disription of Lambda Function"></input> */}

              <TextField
                id="outlined-textarea"
                label="search file here"
                labelClassName="ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important"
                placeholder="Lambda File"
                className='searchfield'
                multiline
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  width: 500,
                  background: "#F6F8FA",
                  borderRadius: "7px",
                  color:"black",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important',
                }}
              />
              <div className="search-button">
                <Button variant="outlined" sx = {{height: 45, color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={handleSearch}
                          startIcon={<SavedSearchIcon />}>

                 Search
                </Button>
              </div>
              <div className="search-button-upload">
                <Button variant="outlined" sx = {{ color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={() => {
                            navigate('/upload')
                          }} 
                          startIcon={<CloudUploadIcon/>}>
                  Upload To LambdaHub
                </Button>
                <Button variant="outlined" sx = {{ color:'black',textSize:'14px',marginLeft:"20px", marginRight:"20px",textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={() => {
                            navigate('/profile')
                          }} 
                          >
                  Profile
                </Button>
                <Button variant="outlined" sx = {{ color:'black',textSize:'14px', textTransform: 'none',fontWeight:'lighter',background:'transparent', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace !important'}}
                          onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/Signin')
                          }} 
                          >
                  Logout
                </Button>
              </div>
            </div>
            <div className='filesContent'>
            <Box sx={{ width: '60%', justifyContent:'center',alignContent:'center'}}>
              <Stack spacing={2} >
                {
                files.map((f) => 
                (
                  <Card sx={{ maxWidth: '100%', minWidth: '40%',border: '1px solid lightgray',}}  >
                    <div className='image'>
                        <CardMedia
                          component="img"
                          height="150"
                          className='img'
                          image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsnWZ37aaXUDpQ2lJuYRsKBkasy8WrordGA&usqp=CAU"
                          onClick = { () => TransferView(f)}
                          sx={{  
                            border: '1px solid lightgray',
                            borderRadius: '4px',
                            width: '10%',
                            height : '80px',
                            borderRadius:'60%',
                            margin:"10px",
                            cursor:'pointer'}}
                        />
                    </div>
                          <CardContent sx={{fontFamily: '12px-apple-system', margin:0, padding:2}}>
                          <div className = 'discription'>{f.Discription}</div>
                          </CardContent>
                         <CardActions disableSpacing>
                          <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more" >
                            <ExpandMoreIcon />
                          </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded}   timeout="auto" unmountOnExit>
                          <div className = 'downLikes'>
                            <CardContent>
                              Stars: {f.Downloads}
                            </CardContent>
                            <CardContent>
                              Downloads: {f.Downloads}
                            </CardContent>
                            <CardContent>
                              File: {f.file_name}
                            </CardContent>
                            </div>
                          </Collapse>
                  </Card>
                ))}
            </Stack>
          </Box>
        </div>
      </>
);
}


