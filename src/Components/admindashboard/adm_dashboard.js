import './adm_dashboard.css'
import { AdminNavbar } from '../navbars/adminnavbar'
import React, { useEffect } from "react";
import Subbutton from "../common/buttons";
import { Modal } from 'react-responsive-modal';
import { ReviewInputField, InputField } from '../common/inputfield'
import { useState, useContext } from "react";
import { UserContext } from '../appContext';
import { ModelPopup } from '../testing/testing';
import swal from 'sweetalert';
import { height, offsetParent } from 'dom-helpers';

function usePosts() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:8000/getproductstock', requestOptions)
      .then((response) => response.json())
      .then((data) => setPosts(data['data']))
      .catch((error) => console.log(error.message));
  }, []);
  return posts
}

export const AdminDashboard = () => {
  const { ischeck, setchecked } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(true);
  const [reviews, setreviews] = useState([])
  const [sprod, selproduct] = useState([])
  const [totalrate, setrate] = useState([])
  const [totalreview, settreviews] = useState([])
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenAlert = () => setAlert(true);
  const onCloseAlert  = () => setAlert(false);
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  const productlist = usePosts()
  const [inputValue, setInputValue] = useState({ product_review: "", product_rating: "" });
  const { product_review, product_rating } = inputValue;
  const { user, setusername } = useState('')
  const handlereview = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };
  const reviewsubmit = e => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/addreview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "product_name": sprod, "user": localStorage.getItem('username'), "product_review": product_review, "product_rating": product_rating }),
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
          // let items = [...totalreview];
          // console.log(items)
          // const objIndex = items.findIndex((obj => obj.order_id === orderid));
          // console.log(objIndex)
          // let item= loginresp['data']
          // console.log(item)
          // items[objIndex] = item;
          // console.log(items)
          // setPosts(items);
          // console.log(posts)
          // setInputValue({ product_review: "", product_rating: "" })
        }
      )
      .catch(error => console.log("Error detected: " + error))
  }


  const postData = async (prod) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "product_name": prod }),
    }
    const response = await fetch('http://127.0.0.1:8000/getreview', requestOptions)
    const loginresp = await response.json()
    setreviews(loginresp['data'])
    let x = 0;
    for (let i = 0; i < loginresp['data'].length; i++) {
      x = x + parseInt(loginresp['data'][i]['product_rating'])
    }
    let y = x / loginresp['data'].length;
    settreviews(loginresp['data'].length)
    setrate(y)
  }
  const viewdetails = async (e, posts) => {
    e.preventDefault()
    selproduct(posts.product_name)
    await postData(posts.product_name)
    setOpen(true);
  }

  const renderHeader = () => {
    let headerElement = ['Poduct Name','Product Stock']
    return headerElement.map((key, index) => {
        return <th style={{color:"white"}} key={index}>{key.toUpperCase()}</th>
    })
}
const renderBody = () => {
    return productlist.map((post, sIndex) => {
        return (
            <tr className="text-center" style={{color:"white"}}>
                <td>{post.stock <5 ? <p style={{ fontFamily: 'courier' }}>{post.product_name}</p> : null}</td>
                <td>{post.stock <5 ? <p style={{ fontFamily: 'courier' }}>{post.stock}</p> : null}</td>                
            </tr>
        )
    })
}
const respalert = (e) =>{
  setchecked(false);
  setAlert(false);
  
}

  return (
    <div>
      <AdminNavbar />
      
        {alert && ischeck?
         <div style={styles}>
         <Modal open={alert} onClose={onCloseAlert} center>
         <div className="row p-5">
           <h1 className="text-center" style={{color:"red"}}>Stock Alert</h1>
                     <table id='employee' className="col-lg-12 col-md-6 col-sm- pt-3">
                         <thead>
                             <tr>{renderHeader()}</tr>
                         </thead>
                         <tbody>
                         {renderBody()}
                         </tbody>
                     </table>
                     <div><Subbutton type="button" onClick={(e) => { respalert(e) }} buttonText="Checked" /></div>
                 </div>
         </Modal>
     </div>:<div/> }
       


      <div style={styles}>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="pt-5">
            {
              productlist.length > 0 ? (
                productlist.map((post, sIndex) => (
                  <div>
                    <div>{post.product_name === sprod ? <h4>Product Name: <span style={{ fontFamily: 'courier' }}>{post.product_name}</span></h4> : null}</div>
                    <div>{post.product_name === sprod ? <h4>Product Description:</h4> : null}</div>
                    <div>{post.product_name === sprod ? <p style={{ fontFamily: 'courier' }}>{post.product_desc}</p> : null}</div>
                  </div>
                ))
              ) : (
                <h1>Loading posts...</h1>
              )}
          </div>
          <div className="row">
            <div>
              <form>
                <fieldset>
                  <InputField
                    type="text"
                    value={product_rating}
                    placeholder="Product Rating"
                    label=""
                    name="product_rating"
                    onChange={handlereview}
                  />
                  <br />
                  <ReviewInputField
                    type="text"
                    value={product_review}
                    placeholder="Product Review"
                    label=""
                    name="product_review"
                    onChange={handlereview}
                  />
                  <Subbutton onClick={reviewsubmit} type="button" buttonText="Add" />
                </fieldset>
              </form>
            </div>
          </div>
          <h4 className="text-center"> Reviews and Ratings</h4>
          <div className="container-fluid pb-3 mx-auto" style={{ width: "800px" }}>
            <div className="row justify-content-center mx-0 mx-md-auto">
              <div className="col-lg-12 col-md-11 px-1 px-sm-2">
                <div className="card border-0 px-3">
                  <div className="row  bg-light">
                    <div className="px-3 mx-2 col-5" style={{ backgroundColor: "#98FB98" }}>
                      <p className="sm-text mb-0 text-center">OVERALL RATING</p>
                      <h4 className="text-center">{totalrate}</h4>
                    </div>
                    <div className="col-5" style={{ backgroundColor: "grey" }}>
                      <p className="sm-text mb-0 text-center" style={{ color: "#014421" }}>ALL REVIEWS</p>
                      <h4 className="text-center" style={{ color: "#014421" }}>{totalreview}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container bg-light pb-2" style={{ height: "150px" }}>
            {
              reviews.length > 0 ? (
                reviews.map((post, sIndex) => (
                  <div>
                    <div className="pt-3 pb-3" >
                      <div className="row" style={{ backgroundColor: "#6052a5" }}>
                        <div className="col-4 pt-2"><li style={{ color: "#98FB98", fontSize: "20px" }}>{post.user}</li><p style={{ color: "white" }}>{post.product_review}</p></div>
                        {/* <p>{post.reviewdate}</p> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>Loading posts...</h1>
              )}
          </div>
        </Modal>
      </div>
      <div className="image-background">
        <div class="image-box__content">
          <div className="container pt-5">
            <div className="row">
              {
                productlist.length > 0 ? (
                  productlist.map((post, sIndex) => (
                    <div className="col-lg-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img style={{ height: "240px" }} key={post.sIndex} src={post.imageurl} alt="" />
                            <h2 key={post.sIndex}>{post.product_name}</h2>
                            <p key={post.sIndex}>${post.product_price}</p>
                            <div><Subbutton type="button" onClick={(e) => { viewdetails(e, post) }} buttonText="View Details" /></div>
                          </div>
                        </div>
                        <div className="choose">
                        </div>
                      </div>
                    </div>

                  ))
                ) : (
                  <h1>Loading posts...</h1>
                )}

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}




