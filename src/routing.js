import React from "react";
import { SignUpForm  } from './Components/Signup/Signup';
import { LoginUpForm } from './Components/Login/Login';
import {AddProduct} from './Components/addproduct/addproduct'
import { AddProductStock } from "./Components/addstock/addstock";
import { AdminDashboard } from "./Components/admindashboard/adm_dashboard";
import { UserDashboard } from "./Components/userdashboard/userdashboard";
import { ViewCart } from "./Components/viewcart/viewcart";
import ViewOrderStatus from "./Components/checkorder/order_status";
import Adminorder from "./Components/adminorders/neworders";
import { FetchProduct } from "./Components/fetchproducts/fetchproducts";
import { Add_Admin } from "./Components/add_admin/add_admin";
import { useContext } from "react";
import { UserContext } from "./Components/appContext";
import { ProfileView } from "./Components/profileview/profile";
import ProcessedOrder from "./Components/adminorders/processedorder";
import RejectedOrder from "./Components/adminorders/rejectedorder";
import CompleteOrder from './Components/adminorders/completedorder'
import ShippedOrder from "./Components/adminorders/shippedorder";
import OrderHistory from "./Components/checkorder/history"
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
 export const Rounting = ()=> {
  const { islogged, setLogged } = useContext(UserContext);
  const { isadmin, setadmin } = useContext(UserContext);
    return (
      <BrowserRouter> 
        <Routes >
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LoginUpForm />}/>
          <Route path="/addproduct" element={islogged && isadmin ?<AddProduct/>:<LoginUpForm />} />
          <Route path="/admindashboard" element={islogged && isadmin ?<AdminDashboard/>:<LoginUpForm />} />
          <Route path="/userdashboard" element={islogged?<UserDashboard/>:<LoginUpForm />} />
          <Route path="/addStock" element={islogged && isadmin ?<AddProductStock/>:<LoginUpForm />} />
          <Route path="/viewcart" element={islogged?<ViewCart/>:<LoginUpForm />} />
          <Route path="/vieworder" element={islogged?<ViewOrderStatus/>:<LoginUpForm />} />
          <Route path="/OrderHistory" element={islogged?<OrderHistory/>:<LoginUpForm />} />

          

          <Route path="/fetchorders" element={islogged && isadmin ?<Adminorder/>:<LoginUpForm />} />
          <Route path="/fetchstock" element={islogged && isadmin ?<FetchProduct/>:<LoginUpForm />} />
          <Route path="/addadmin" element={islogged && isadmin ?<Add_Admin/>:<LoginUpForm />} />
          <Route path="/ProcessedOrder" element={islogged && isadmin ?<ProcessedOrder/>:<LoginUpForm />} />
          <Route path="/RejectedOrder" element={islogged && isadmin ?<RejectedOrder/>:<LoginUpForm />} />
          <Route path="/ShippedOrder" element={islogged && isadmin ?<ShippedOrder/>:<LoginUpForm />} />
          <Route path="/CompleteOrder" element={islogged && isadmin ?<CompleteOrder/>:<LoginUpForm />} />
          <Route path="/profileview" element={islogged ?<ProfileView/>:<LoginUpForm />} />
          </Routes>
      </BrowserRouter>
      
    );
}
