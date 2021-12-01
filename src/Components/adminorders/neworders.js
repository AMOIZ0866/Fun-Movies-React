import React from 'react'
import { useState, useContext, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import './adminorder.css';
import swal from 'sweetalert';
import Select from 'react-select';
import { AdminNavbar } from '../navbars/adminnavbar';
import Subbutton from '../common/buttons';

function usePosts() {
    let posts=[]
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://127.0.0.1:8000/getorders', requestOptions)
            .then((response) => response.json())
            .then((data) => posts=((data['data'])
            
            ))
            .catch((error) => console.log(error.message));
    console.log(posts)
    return posts
}

export default function Adminorder() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [orderid, setorderid] = useState(false);
    const onOpenModal = () => setOpen(true);
    const [posts, setPosts] = useState([])
    const [details, setdetails] = useState([])
    const onCloseModal = () => setOpen(false);
    const options = [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Processed', label: 'Processed'},
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Completed', label: 'Completed' }
      ]


      const postData = async () => {
        const requestOptions = {
                        method: 'GET',
                       headers: { 'Content-Type': 'application/json' }
                }
            const response = await fetch('http://127.0.0.1:8000/getorders', requestOptions )
            const loginresp = await response.json()
           
            let items = [...posts];
            items=loginresp['data']
            console.log(items)
            setPosts(items);
        }
       
    useEffect(() => {
        postData()
    }, []);

    const handleChange2 = e => {
        setSelectedValue(e.value);
      }
    // const posts = usePosts()
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center",
    };
    const removeData = (order_id) => {
        fetchdetails(order_id)
        setorderid(order_id)
        setOpen(true)
    } 
    const updateorder = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "order_id": orderid, "order_status":selectedValue }),
        }
        const response = await fetch('http://localhost:8000/updateorders', requestOptions )
        const loginresp = await response.json()
        if (loginresp['status'] === 201) {
                 await swal({
                    title: "Status",
                    text: "Updated Successfully",
                    icon: "success",
                    timer: 3000,
                    button: false
                  })
                  let items = [...posts];
                  console.log(items)
                  const objIndex = items.findIndex((obj => obj.order_id === orderid));
                  console.log(objIndex)
                  let item= loginresp['data']
                  console.log(item)
                  items[objIndex] = item;
                  console.log(items)
                  setPosts(items);
                  console.log(posts)
                }
    }

    const updatestatus = () =>{
        updateorder()
    }

    const fetchdetails = (order_id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "order_id": order_id }),
        }
        fetch('http://localhost:8000/getuserorderdetails', requestOptions)
            .then((response) => response.json())
            .then((data) => setdetails((data['data'])))
            .catch((error) => console.log(error.message));
    }
    
    const renderHeader = () => {
        let headerElement = ['Order Id', 'Order Status','Order Date','Address', 'Total Bill', 'View Details']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return posts.map((post, sIndex) => {
            if (post.order_status === "Placed"){
                return (
                    // posts.order_status=== "Placed"?
                    <tr>
                       
                        <td>{post.order_id}</td>
                        <td>{post.order_status }</td>
                        <td>{post.order_date }</td>
                        <td>{post.order_address}</td>
                        <td>{post.order_total}</td>
                        <td className='opration'>
                         <button className='button' onClick={() => removeData(post.order_id)}>View Detail</button>
                        </td>
                    </tr>
                    // : <tr>
                        
                    // </tr>
                )
            }
            else{
               return null;
            }
            
        })
    }

    const renderHeader2 = () => {
        let headerElement = ['Order Id', 'Product Name','Quantity', 'Price']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody2 = () => {
        return details.map((post, sIndex) => {
            return (
                <tr style={{color:"white"}}>
                    <td>{post.order_id}</td>
                    <td>{post.product_name}</td>
                    <td>{(post.quantity)}</td>
                    <td>{post.price}</td>
                </tr>
            )
        })
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
    
    


    return (
        <div>
            <AdminNavbar />
            <div style={styles}>
                <Modal open={open} onClose={onCloseModal} center>
                <div className="container" style={{height:"400px"}}>
                <div className="pt-3">
                      <label htmlFor="input-field form-control " class="control-label">Select Status</label>
                      <Select
                        placeholder="Select Status"
                        value={options.find(obj => obj.value === selectedValue)} // set selected value
                        styles={customStyles}
                        options={options}
                        onChange={handleChange2} // assign onChange function
                      />
                    </div>
                    <div>
                    <Subbutton onClick={updatestatus} type="button" buttonText="Update Status" />
                        </div>
               
               
                        <div className="row">
                            <table id='employee' className="col-lg-12 col-md-6 col-sm-">
                                <thead>
                                    <tr>{renderHeader2()}</tr>
                                </thead>
                                <tbody>
                                {renderBody2()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="image-background">
                <div class="image-box__content">
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
                    </div>

                </div>
            </div>
        </div>
    )
}
