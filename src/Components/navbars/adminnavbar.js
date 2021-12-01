import './navbar.css'
import { useNavigate } from "react-router-dom";
import {  NavDropdown } from 'react-bootstrap'

import { useState, useEffect } from "react";
import { useContext } from "react";
import Select from 'react-select';
import swal from 'sweetalert';
import { UserContext } from "../appContext";

export const AdminNavbar = () => {
  const [selectedValue, setSelectedValue] = useState();
  const { islogged, setLogged } = useContext(UserContext);
  const { isadmin, setadmin } = useContext(UserContext);
  let history = useNavigate(); const options = [
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Processed', label: 'Processed'},
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Completed', label: 'Completed' }
  ]
  const handleChange2 = e => {
    setSelectedValue(e.value);
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      width: '200px',

      color: 'black'
      // padding: 20,
    }),
  }  

  const postData = async () => {
    const requestOptions = {
                    method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ "username": localStorage.getItem('username'), "password": localStorage.getItem('password') })
            }
        const response = await fetch('http://localhost:8000/logout', requestOptions )
        const loginresp = await response.json()
        if (loginresp['status'] === 200) {
               
                  await swal({
                    title: "Logout",
                     text: "Logout Successfully",
                     icon: "success",
                     timer: 2000,
                     button: false
                   })
                }
    // setLogindata({...logindata, ...loginresp})
    }


  function handleClick(value) {
    if (value==='Home'){
      history("/admindashboard");
    }
    else if (value==='Add Products'){
      history("/addproduct");
    }
    else if(value==='Add Stock'){
      history("/addStock");
    }
    else if(value==='profile'){
      history("/profileview");
    }
    else if(value==='Add Admin'){
      history("/addadmin");
    }
    else if(value==='Check Stock'){
      history("/fetchstock");
    }
    else if(value==='New Orders'){
      history("/fetchorders");
    }
    else if(value==='Proces Orders'){
      history("/ProcessedOrder");
    }
    else if(value==='Shipped Orders'){
      history("/ShippedOrder");
    }
    else if(value==='Completed Orders'){
      history("/CompleteOrder");
    }
    else if(value==='Rejected Orders'){
      history("/RejectedOrder");
    }
    else if(value==='Logout'){
      postData()
      localStorage.removeItem('islogged')
      localStorage.removeItem('isadmin')
      localStorage.removeItem('password')
      localStorage.removeItem('username')
      setLogged(false)
      setadmin(false)
      history("/");
    }
  }


    return (
      <div>
      <header id="header_class" style={{color:'black'}} class="fixed-top bg-light container-fluid bg-dark">
   <div className="row" >
    <div className="col-lg-3">
      <h2 className="header_lg me-auto  flex-row pt-2" style={{color:'#B91646', fontFamily:'cursive'}}>SHOP AMAZE</h2>
      </div>
    <div className="col-lg-9"><div className="d-flex flex-row-reverse">
       <nav class="navbar navbar-expand-lg" id="navbar">
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
           aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon bg-dark"></span>
         </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Home")}>Home</p>
              </li>
              <li class="nav-item">
              <p class="nav-link" onClick={() => handleClick("Add Products")}>Add Products</p>
              </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Add Stock")}>Add Stock</p>
              </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Add Admin")}>Add Admin</p>
              </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Check Stock")}>Check Stock</p>
              </li>
              <li>
              <NavDropdown class="nav-item" title="Orders" id="navcolor">
          <NavDropdown.Item href={false} onClick={() => handleClick("New Orders")}>New Order</NavDropdown.Item>
          <NavDropdown.Item href={false} onClick={() => handleClick("Process Orders")}>Processed</NavDropdown.Item>
          <NavDropdown.Item href={false} onClick={() => handleClick("Shipped Orders")}>Shipped</NavDropdown.Item>
          <NavDropdown.Item href={false} onClick={() => handleClick("Completed Orders")}>Complete</NavDropdown.Item>
          <NavDropdown.Item href={false} onClick={() => handleClick("Rejected Orders")}>Rejected</NavDropdown.Item>         
        </NavDropdown>
                </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("profile")}>{localStorage.getItem('username').toUpperCase()}</p>
              </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Logout")}>Logout</p>
              </li>
              

              {/* <li class="nav-item">
                <a class="nav-link " href="./">Check Stock</a>
              </li>
              <li><a class="nav-link scrollto" href="./">Contact</a></li> */}
            </ul>
          </div>
        </nav>
      </div>
    </div>
    </div>
  </header>
  </div>
    )
}
