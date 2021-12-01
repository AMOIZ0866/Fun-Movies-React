import './addproduct.css'
import React, { useState,useEffect } from 'react'
import { InputField } from '../common/inputfield'
import Subbutton from '../common/buttons';
import Select from 'react-select'
import swal from 'sweetalert';
import { AdminNavbar } from '../navbars/adminnavbar';
export const AddProduct = () => {
  const [inputValue, setInputValue] = useState({ product_name: "", product_desc: "", imageurl: "", product_price: 0 });
  const { product_name, product_desc, product_price, imageurl } = inputValue;
  const [compinputValue, setCompInputValue] = useState({ comp_name: "", comp_desc: "", comp_contact: "" });
  const { comp_name, comp_desc, comp_contact } = compinputValue;
  const [selectedValue, setSelectedValue] = useState();
  const [complist, setComplist] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  }; 

  const companyhandleChange = (e) => {
    const { name, value } = e.target;
    setCompInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const response = await fetch('http://127.0.0.1:8000/addcompany', requestOptions)
      const json = await response.json();
      setComplist(json['data'])
    };
    fetchData();
  },[]);



  const postcompData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "comp_name": comp_name, "comp_desc": comp_desc, "comp_contact": comp_contact })
    }
    const response = await fetch('http://127.0.0.1:8000/addcompany', requestOptions)
    const loginresp = await response.json()
    if (loginresp['status'] === 201) {
      await swal({
        title: "Company",
        text: "Company Added Successfully",
        icon: "success",
        timer: 2000,
        button: false
      })
      setComplist(loginresp['data'])
      setCompInputValue({ comp_name: "", comp_contact: "", comp_desc: "" })
    }
  }


  const postproductData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "product_name": product_name, "product_desc": product_desc, "comp_name": selectedValue,
        "imageurl": imageurl, "product_price": product_price
      })
    }
    const response = await fetch('http://127.0.0.1:8000/addproduct', requestOptions)
    const loginresp = await response.json()
    if (loginresp['status'] === 201) {
      await swal({
        title: "Product",
        text: "Product Added Successfully",
        icon: "success",
        timer: 2000,
        button: false
      })
      setInputValue({ product_name: "", product_desc: "", comp_name: "", imageurl: "", product_price: 0 })

      // navigate('/addproduct')
    }
  }

  const handleCompSubmit = e => {
    e.preventDefault()
    postcompData()
  }

  // set value for default selection


  // handle onChange event of the dropdown
  const handleChange2 = e => {
    setSelectedValue(e.label);
  }





  const handleSubmit = e => {
    e.preventDefault()
    postproductData()
    // fetch(`https://hooks.zapier.com/hooks/catch/1239764/oo73gyz/`, {
    //   method: 'POST',
    //   body: JSON.stringify({ email, comment }),
    // })
    alert(`Submitting Name  ${product_name} ${product_desc}${product_price}  ${selectedValue}`)
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
      <div className="image-background">
         <div className="image-box__overlay"></div>
        <div class="image-box__content">
          <AdminNavbar/>
          <div className="row">
            <div className="col">
              <div className="container d-flex justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "500px" }}>
                <form class="form-horizontal">
                  <fieldset className="pt-3 pb-5">
                    <legend>PRODUCTS</legend>
                    <InputField
                      type="text"
                      value={product_name}
                      placeholder="Product Name"
                      label="PRODUCT NAME"
                      name="product_name"
                      onChange={handleChange}
                    />
  
                    <div className="pt-3" style={{ width: "220px", paddingLeft: "20px" }}>
                      <label htmlFor="input-field form-control " class="control-label">Select Company</label>
                      <Select
                        placeholder="Select Option"
                        value={complist.find(obj => obj.value === selectedValue)} // set selected value
                        styles={customStyles}
                        options={complist.map((d) => {
                          return {
                            value: d['comp_name'],
                            label: d['comp_name']
                          };
                        }
                        )}
                        onChange={handleChange2} // assign onChange function
                      />
                    </div>
                    <InputField
                      type="text"
                      value={product_desc}
                      placeholder="PRODUCT DESCRIPTION"
                      label="PRODUCT DESCRIPTION"
                      name="product_desc"
                      onChange={handleChange}
                    />
                    <InputField
                      type="text"
                      value={imageurl}
                      placeholder="PRODUCT URL"
                      label="PRODUCT URL"
                      name="imageurl"
                      onChange={handleChange}
                    />
  
                    <InputField
                      type="text"
                      value={product_price}
                      placeholder="Enter Price"
                      label="Price"
                      name="product_price"
                      onChange={handleChange}
                    />
  
                    <Subbutton onClick={handleSubmit} type="button" buttonText="AddProduct" />
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="col">
              <div className="container d-flex justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 1)", width: "400px" }}>
                <form class="form-horizontal">
                  <fieldset className="pt-3 pb-5">
                    <legend>Company Details</legend>
                    <InputField
                      type="text"
                      value={comp_name}
                      placeholder="Company Name"
                      label="Company Name"
                      name="comp_name"
                      onChange={companyhandleChange}
                    />
  
  
                    <InputField
                      type="text"
                      value={comp_desc}
                      placeholder="Company DESCRIPTION"
                      label="Company DESCRIPTION"
                      name="comp_desc"
                      onChange={companyhandleChange}
                    />
  
                    <InputField
                      type="text"
                      value={comp_contact}
                      placeholder="Contact No"
                      label="Contact No"
                      name="comp_contact"
                      onChange={companyhandleChange}
                    />
                    <Subbutton onClick={handleCompSubmit} type="button" buttonText="Add Details" />
                    {/* <div className="text-center"> <button onClick={handleSubmit} type="button" class="btn btn-primary">AddProduct</button></div> */}
                  </fieldset>
                </form>
              </div>
            </div>
  
          </div>
        </div>
      </div>
  
    )
  }
 



