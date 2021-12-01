import './navbar.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {  NavDropdown } from 'react-bootstrap'
import swal from 'sweetalert';
import { UserContext } from "../appContext";
export const UserNavbar = () => {
  let history = useNavigate();
  const { islogged, setLogged } = useContext(UserContext);
  const { isadmin, setadmin } = useContext(UserContext);
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
      history("/userdashboard");
    }
    else if (value==='View Cart'){
      history("/viewcart");
    }
    else if (value==='Order'){
      history("/vieworder");
    } 
    else if (value==='History'){
      history("/OrderHistory");
    } 
    else if(value==='profile'){
      history("/profileview");
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
              <p class="nav-link" onClick={() => handleClick("View Cart")}>View Cart</p>
              </li>
              <li>
              <NavDropdown class="nav-item" title="View Orders" id="navcolor">
          <NavDropdown.Item href={false} onClick={() => handleClick("Order")}>Order</NavDropdown.Item>
          <NavDropdown.Item href={false} onClick={() => handleClick("History")}>History</NavDropdown.Item>
        </NavDropdown>
                </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("profile")}>{localStorage.getItem('username').toUpperCase()}</p>
              </li>
              <li class="nav-item">
                <p class="nav-link" onClick={() => handleClick("Logout")}>Logout</p>
              </li>
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
