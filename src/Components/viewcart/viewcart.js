import React from 'react'
import { useState, useContext } from "react";
import { UserContext } from '../appContext';
import { UserNavbar } from '../navbars/usernavbar';
import Subbutton from '../common/buttons';
import { ReviewInputField } from '../common/inputfield';
import swal from 'sweetalert';
import './viewcart.css'


export const ViewCart = () => {
    const { plist, setplist } = useContext(UserContext);
    const { totalbill, settotal } = useContext(UserContext);
    const { orderlist, setorderlist } = useContext(UserContext);
    const [address, setaddress] = useState(true);
    const [inputValue, setInputValue] = useState({ order_address: "", order_phone: "" });
    const { order_address, order_phone } = inputValue;
    const handleaddress = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(inputValue);
    };

    const incrementquan = (e, product_name) => {
        let items = [...plist];
        const objIndex = items.findIndex((obj => obj.product_name === product_name));
        let item = { ...items[objIndex] };
        item.quantity += 1;
        items[objIndex] = item;
        let newbill = totalbill+parseInt(item.product_price)
        settotal(newbill)
        console.log(items)
        setplist(items);
        console.log(plist)
        // calculate();
    }
    const decrementquan = (e, product_name) => {
        let items = [...plist];
        const objIndex = items.findIndex((obj => obj.product_name === product_name));
        let item = { ...items[objIndex] };
        item.quantity -= 1;
        let newbill = totalbill-parseInt(item.product_price)
        settotal(newbill)
        items[objIndex] = item;
        if (item.quantity === 0) {
            const del = plist.filter(plist => product_name !== plist.product_name)
            setplist(del)

        }
        else {
            setplist(items);
        }
        // calculate();
    }

    const removeData = (product_name) => {
        let items = [...plist];
        const objIndex = items.findIndex((obj => obj.product_name === product_name));
        let item = { ...items[objIndex] };
        items[objIndex] = item;
        let deduction= parseInt(item.quantity) * parseInt(item.product_price)
        let newbill = totalbill - deduction
        settotal(newbill)
        const del = plist.filter(plist => product_name !== plist.product_name)
        setplist(del)
        // calculate();
    }

    const add_address = () => {
        if(address === false){
            setaddress(true)
        }
        else{
            setaddress(false)
        }
        
    }
    const postorder = async (list) => {
        console.log(list)
        const requestOptions = {
                        method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({"order_status":"Placed","order_address":order_address,"order_contact":order_phone,"order_user":localStorage.getItem('username'),"order_total":totalbill ,"detail":plist})
                }
            const response = await fetch('http://localhost:8000/postorder', requestOptions )
            const loginresp = await response.json()
            if (loginresp['status'] === 201) {
                     await swal({
                        title: "ORDER IS PLACED",
                        text: "YOUR ORDER NO IS "+loginresp['data'],
                        icon: "success",
                        button: "OK"
                      })
                    }
        // setLogindata({...logindata, ...loginresp})
        }
    const placeorder = e => {
        e.preventDefault()
        let list = [...orderlist];
        list['order_address']=order_address;
        list['order_contact']=order_phone;
        list['order_user']="user";
        list['order_total']=totalbill;
        list['details']=plist;
        orderlist.push(list)
        // setorderlist(list)
        // console.log(orderlist)
        postorder(list)


        
    }

    const renderHeader = () => {
        let headerElement = ['Product Name', 'Product Price', 'Quantity', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return plist && plist.map(({ id, product_name, product_price, quantity }) => {

            return (
                <tr key={id}>
                    {/* <td><Productfield value={id} name={id} readonly={readonly} onChange={handleChange}/></td> */}
                    <td>{product_name}</td>
                    <td>{product_price}</td>
                    <td><span><button className="btn-decrement" onClick={(e) => { decrementquan(e, product_name) }}>-</button></span><span style={{ paddingLeft: '10px', paddingRight: '10px' }}>{quantity}</span><span>
                        <button className="btn-increment" onClick={(e) => { incrementquan(e, product_name) }}>+</button></span></td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(product_name)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div>
            <div className="image-background">
                <div className="image-box__overlay"></div>
                <div class="image-box__content">
                    <UserNavbar />
                    {
                        address ?
                            <div className="container">
                                <div className="row">
                                    <table id='employee' className="col-lg-12 col-md-6 col-sm-">
                                        <thead>
                                            <tr>{renderHeader()}</tr>
                                        </thead>
                                        <tbody>
                                            {renderBody()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row pt-5 d-flex flex-row-reverse">
                                    <table id='employee' className="col-lg-3 col-md-3 col-sm-3">
                                        <tbody>
                                            <td className="bg-dark">Total Bill</td>
                                            <td className="bg-dark">{totalbill}</td>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pt-5 d-flex flex-row-reverse">
                                    <Subbutton onClick={add_address} type="button" buttonText="Add Address" /></div>
                            </div> :
                            <div className="container ">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-lg-9">
                                        <form style={{ backgroundColor: "rgba(0, 0, 0, 0.8)"}} className="p-3">
                                            <fieldset>
                                            <legend>Address Form</legend>
                                                <label for="exampleFormControlTextarea1">Address</label>
                                                <textarea class="form-control" onChange={handleaddress} name="order_address" value={order_address} id="exampleFormControlTextarea1" rows="3"></textarea>
                                                <br />
                                                <div className="col-lg-4">
                                                <label for="exampleFormControlTextarea1">Contact</label>
                                                <input className="form-control" type="text" value={order_phone} placeholder="Phone" name="order_phone" onChange={handleaddress}></input>
                                                </div>
                                               <div className=" pt-2 d-flex d-inline-flex">
                                               <Subbutton type="button" onClick={placeorder} buttonText="Place Order" />
                                                <Subbutton type="button" onClick={add_address} buttonText="Back to Cart" /> 
                                               </div>
                                            </fieldset>
                                        </form>

                                    </div>
                                </div>

                            </div>}


                </div>
            </div>

        </div>
    )
}
