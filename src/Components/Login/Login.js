import './login.css'
import React from 'react'
import swal from 'sweetalert';
import {InputField} from '../common/inputfield';
import Subbutton from '../common/buttons';
import {useNavigate} from 'react-router-dom';
import { useState, useContext } from "react";
import { UserContext } from '../appContext';



export const LoginUpForm = () => {
  let history = useNavigate();
  const { islogged, setLogged } = useContext(UserContext);
  const { isadmin, setadmin } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
  const { username, password } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((previous_state) => ({
      ...previous_state,
      [name]: value,
    }));
    console.log(inputValue);
  };
  const postData = async () => {
    const requestOptions = {
                    method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ "username": username, "password": password })
            }
        const response = await fetch('http://localhost:8000/login', requestOptions )
        const loginresp = await response.json()
        if (loginresp['status'] === 200) {
                if (loginresp['user'] === "admin")
                {
                  await swal({
                    title: "Login",
                     text: "Login Successfully",
                     icon: "success",
                     timer: 2000,
                     button: false
                   })
                   setInputValue({ username: "", password: "" })
                   setLogged(true)
                   setadmin(true)
                   localStorage.setItem('islogged', true,)
                   localStorage.setItem('username',username)
                   localStorage.setItem('password',password)
                   localStorage.setItem('isadmin',true)
                   history('/admindashboard')
                }
                else{
                  await swal({
                    title: "Login",
                     text: "Login Successfully",
                     icon: "success",
                     timer: 2000,
                     button: false
                   })
                   setInputValue({ username: "", password: "" })
                   setLogged(true)
                   setadmin(false)
                   localStorage.setItem('islogged', true,)
                   localStorage.setItem('username',username)
                   localStorage.setItem('password',password)
                  //  localStorage.setItem('isadmin',false)
                   history('/userdashboard')
                }
              
                   
                }
                else
                {
                  await swal({
                    title: "Login",
                     text: "Login Failed",
                     icon: "error",
                     timer: 3000,
                     button: false
                   })
                }
    // setLogindata({...logindata, ...loginresp})
    }

  const handleSubmit = e => {
    e.preventDefault()
    postData()
  }
  return (
    
    <div className="image-background">
      <div className="image-box__overlay"></div>
      <div className="image-box__content">
        <div className="container d-flex justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", width: "400px" }}>
          <div className="row">
            <div className="col-lg-12">
              <form>
                <fieldset>
                  <legend>Login Form</legend>
                  <InputField
                    type="text"
                    value={username}
                    placeholder="Enter Your Username"
                    label="UserName"
                    name="username"
                    onChange={handleChange}
                  />
                  <InputField
                    type="password"
                    value={password}
                    placeholder="Enter Your Password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  
                  <Subbutton onClick={handleSubmit} type="button" buttonText="Login" />
                  
                </fieldset>
                <div className="text-center">
                  <p className="small pl-2 fw-bold  mb-0">Forget <a href="./signup" className="link-danger">Password?</a></p>
                </div>
                <div className="text-center pt-2 pb-3">
                  <p className="small fw-bold  mb-0">Don't Have Account? <a href="./signup" className="link-danger">SignUp</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


