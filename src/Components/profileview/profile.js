import './profile.css'
import React, { useState, useEffect } from 'react'
import { InputField } from '../common/inputfield'
import Subbutton from '../common/buttons';
import Select from 'react-select'
import swal from 'sweetalert';
import {  useContext } from "react";
import { UserContext } from '../appContext';
import { AdminNavbar } from '../navbars/adminnavbar'
import { UserNavbar } from '../navbars/usernavbar';
export const ProfileView = () => {
    const [inputValue, setInputValue] = useState({first_name:"",last_name:"", username: "", email: "", password: "" });
    const { first_name,last_name, username, email, password } = inputValue;
    const { isadmin, setadmin } = useContext(UserContext);
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
        fetch('http://127.0.0.1:8000/addadmin', {
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

      useEffect(() => {
        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": localStorage.getItem('username')}),
          }
          const response = await fetch('http://localhost:8000/getuser', requestOptions)
          const json = await response.json();
          setInputValue({first_name:json[0].first_name,last_name:json[0].last_name,username:json[0].username,email:json[0].email,password:json[0].password})
        };
        fetchData();
      },[]);

    return (
        <div className="image-background">
            <div className="image-box__overlay"></div>
            <div class="image-box__content">
            {isadmin ? <AdminNavbar/>:<UserNavbar/>}
            
                <div className="row">
                 
                    <div className="col">
                        <div className="container d-flex justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "500px" }}>
                            <form class="form-horizontal">
                            <fieldset className="pb-3 pt-3">
                            <div className='text-center' ><img className="" src={'https://www.linkpicture.com/q/profileimg.png'}  height={100} width={100}/> </div>
                  <legend className="text-center">User Profile</legend>
                  
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
                  <Subbutton onClick={handleSubmit} type="button" buttonText="Update" />
                  </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}



