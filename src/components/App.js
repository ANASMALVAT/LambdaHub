import React, {  useState } from "react";
import Signup from "./Signup";
import Home from "./Home";
import {BrowserRouter, Route , Routes , Navigate } from 'react-router-dom'
import Signin from "./Signin";
import ForgotPassword from "./ForgotPassword";
import ForgotPassVeri from "./ForgotPassVeri";
import FileUploadingPage from "./FileUploadingPage";
import SearchFile from "./SearchFile";
import ViewFile from "./viewfile";
import Dropzone from "./upload";
import UserProfile from "./userprofile";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem('token');
  return auth ? children : <Navigate to="/signin" />;
} 

function App() {

  const [isAuth , setIsAuth] = useState(false)
  const [user , setUser] = useState(null)
  

  const setupForAuth = (isAuth) => {
    setIsAuth(isAuth)
  }


  const setupUser = (user) => {
    setUser(user)
  }

  // const authProps = {
  //   isAuth,
  //   user ,
  //   setupForAuth ,
  //   setupUser 
  // }

  return (

    <BrowserRouter>
      {/* <Navbar user= {user} isAuth = {isAuth} setupForAuth = {setupForAuth} setupUser={setupUser} /> */}
    <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route exact path='/Signup' element={<Signup/>}/>
        <Route exact path='/ForgotPass' element={<ForgotPassword/>}/>
        <Route exact path='/FPV' element={<ForgotPassVeri/>}/>
        <Route
          path="/home"
          element={
            <PrivateRoute>
                <SearchFile/>
            </PrivateRoute>
          }
        />
        <Route
          path="/viewfile"
          element={
            <PrivateRoute>
                <ViewFile/>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
                <Dropzone/>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
                <UserProfile/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
