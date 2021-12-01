//Modal.js
import React, { useEffect, useRef } from 'react';
import styles from './testing.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import swal from 'sweetalert';

// import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export const Navbarstatus =()=>{

  // const { islogged, setLogged } = useContext(UserContext);
  // const { isadmin, setadmin } = useContext(UserContext);
  // let history = useNavigate();
  // const postData = async () => {
  //   const requestOptions = {
  //                   method: 'POST',
  //                  headers: { 'Content-Type': 'application/json' },
  //                  body: JSON.stringify({ "username": localStorage.getItem('username'), "password": localStorage.getItem('password') })
  //           }
  //       const response = await fetch('http://localhost:8000/logout', requestOptions )
  //       const loginresp = await response.json()
  //       if (loginresp['status'] === 200) {
               
  //                 await swal({
  //                   title: "Logout",
  //                    text: "Logout Successfully",
  //                    icon: "success",
  //                    timer: 2000,
  //                    button: false
  //                  })
  //               }
  //   // setLogindata({...logindata, ...loginresp})
  //   }


  function handleClick(value) {
    // if (value==='Home'){
    //   history("/admindashboard");
    // }
    // else if (value==='Add Products'){
    //   history("/addproduct");
    // }
    // else if(value==='Add Stock'){
    //   history("/addStock");
    // }
    // else if(value==='profile'){
    //   history("/profileview");
    // }
    // else if(value==='Add Admin'){
    //   history("/addadmin");
    // }
    // else if(value==='Logout'){
    //   postData()
    //   localStorage.removeItem('islogged')
    //   localStorage.removeItem('isadmin')
    //   localStorage.removeItem('password')
    //   localStorage.removeItem('username')
    //   setLogged(false)
    //   setadmin(false)
    //   history("/");
    // }
  }
const handleSubmit = (e) =>{
  alert('k')
}

    return(
  
    
      <div className="row">
       <div className="col-lg-2 col-md-1 col-sm-1 col-xs-1  bg-light">
       <div class=" navBg pl-0 pr-0">
  <nav class="nav  navbar-toggleable-sm">
    <div class="navbar  flex-column mt-md-0  pt-md-0  p-0" id="navbarWEX">
      <h1>SHOP AMAZE</h1>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}} class="nav-link"><i class="fa fa-dashboard"> </i><span>Dashboard </span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-music" aria-hidden="true"></i><span>Media</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-file-text-o" aria-hidden="true"></i><span>Pages</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-commenting-o" aria-hidden="true"></i><span>Comments</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-paint-brush" aria-hidden="true"></i><span>Appearance</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-plug" aria-hidden="true"></i><span>Plugins</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-users" aria-hidden="true"></i><span>Users</span></a>
      <a href={() => false} onClick={(e)=>{handleSubmit(e)}}  class="nav-link"><i class="fa fa-wrench" aria-hidden="true"></i><span>Tools</span></a>
    </div>
  </nav>
</div>
       </div>
  <div className="col-lg-10 col-md-11 col-sm-11 col-xs-11 bg-primary">
    <p>kasnjknafkjnkdjfnckjsdncjkdnscjk</p>
  </div>

     </div>

 
       
    )
}