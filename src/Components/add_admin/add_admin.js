import './add_admin.css'
import React, { useState } from 'react'
import { InputField } from '../common/inputfield'
import Subbutton from '../common/buttons';
import swal from 'sweetalert';
import { AdminNavbar } from '../navbars/adminnavbar'
export const Add_Admin = () => {
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
    return (
        <div className="image-background">
            <div className="image-box__overlay"></div>
            <div class="image-box__content">
            <AdminNavbar/>
                <div className="row">
                    <div className="col">
                        <div className="container d-flex justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "500px" }}>
                            <form class="form-horizontal">
                            <fieldset className="pb-5 pt-3">
                  <legend>Add Admin</legend>
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
                  <Subbutton onClick={handleSubmit} type="button" buttonText="Add Admin" />
                  </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}



