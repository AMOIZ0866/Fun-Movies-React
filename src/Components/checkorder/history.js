import React from 'react'
import { useState, useContext, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import './order_status.css'
import { UserNavbar } from '../navbars/usernavbar';

function usePosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "order_user": localStorage.getItem('username').toUpperCase() }),
        }
        fetch('http://127.0.0.1:8000/getuserorder', requestOptions)
            .then((response) => response.json())
            .then((data) => setPosts((data['data'])))
            .catch((error) => console.log(error.message));
    }, []);
    console.log(posts)
    return posts


}

export default function OrderHistory() {


    const [open, setOpen] = useState(false);
    const [orderid, setorderid] = useState(false);
    const onOpenModal = () => setOpen(true);
    const [details, setdetails] = useState([])
    const onCloseModal = () => setOpen(false);
    const posts = usePosts()
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    };
    const removeData = (order_id) => {
        fetchdetails(order_id)
        setOpen(true)
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
        let headerElement = ['Order Id', 'Order Status','Order Date','Address', 'Total Bill', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return posts.map((post, sIndex) => {
            if (post.order_status === "Rejected" || post.order_status === "Completed" ){
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
    


    return (
        <div>
            <UserNavbar />
            <div style={styles}>
                <Modal open={open} onClose={onCloseModal} center>
                <div className="container pt-5">
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
