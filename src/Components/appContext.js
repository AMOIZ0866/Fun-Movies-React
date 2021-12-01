import React from 'react';
import {Rounting} from '../routing'
import { createContext, useState, useMemo } from "react";

const UserContext = createContext({
  islogged: "",
  isadmin: "",
  ischeck:"",
  plist : [],
  orderlist : [],
  totalbill:0,
  settotal: () => {},
  setplist: () => {},
  setchecked: () => {},
  setLogged: () => {},
  setorderlist: () => {},
  setadmin: () => {}
});

  const LoggedCheck = () => { 
    const [islogged, setLogged] = useState(localStorage.getItem('islogged'));
    const [ischeck, setchecked] = useState(true);
    const [isadmin, setadmin] = useState(localStorage.getItem('isadmin'));
    const [plist, setplist] = useState([]);
    const [totalbill, settotal] = useState(0);
    const [orderlist, setorderlist] = useState([]);
    const value = useMemo(() => ({ islogged,isadmin,orderlist,plist,totalbill,ischeck,setplist,setLogged,settotal,setorderlist,setadmin,setchecked }));
   return (
    <UserContext.Provider value={value}>
      <div>
      <Rounting/>
      </div>
    </UserContext.Provider>
   )
} 

  export{
    UserContext,
  }

  export default LoggedCheck;