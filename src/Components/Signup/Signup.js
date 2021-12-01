import './signup.css'
import React, { useState } from 'react'
import swal from 'sweetalert';
import {InputField} from '../common/inputfield';
import Subbutton from '../common/buttons';



export const SignUpForm = () => {
  const [inputValue, setInputValue] = useState({first_name:"",last_name:"", username: "", email: "", password: "" });
  const { first_name,last_name, username, email, password } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };
  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // mode: 'no-cors',
      body: JSON.stringify({"first_name":first_name,"last_name":last_name, "username": username, "password": password, "email": email }),
    }).then(response => response.json())
      .then(data => console.log(data['status'])).then(
        data => {
          swal({
            title: "Done!",
            text: "Added Successfully",
            icon: "success",
            timer: 2000,
            button: false
          })
          setInputValue({first_name:"",last_name:"",username:"",email:"",password:""})
        }

      )
      .catch(error => console.log("Error detected: " + error))
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
                  <legend>Sign Up Form</legend>
                  <InputField
                    type="text"
                    value={first_name}
                    placeholder="Enter Your Firstname"
                    label="FirstName"
                    name="first_name"
                    onChange={handleChange}
                  />
                   <InputField
                    type="text"
                    value={last_name}
                    placeholder="Enter Your Lastname"
                    label="LastName"
                    name="last_name"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={username}
                    placeholder="Enter Your Username"
                    label="UserName"
                    name="username"
                    onChange={handleChange}
                  />
                   <InputField
                    type="text"
                    value={email}
                    placeholder="Enter Your Email"
                    label="Email"
                    name="email"
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
                  <Subbutton onClick={handleSubmit} type="button" buttonText="SignUp" />
                  </fieldset>
                 <div className="text-center pt-2 pb-3">
                  <p className="small fw-bold  mb-0">Have Account? <a href="./" className="link-danger">Login</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


