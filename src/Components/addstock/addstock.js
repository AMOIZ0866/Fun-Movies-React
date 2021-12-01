import './addstock.css'
import React, { useState, useEffect } from 'react'
import { InputField } from '../common/inputfield'
import Subbutton from '../common/buttons';
import Select from 'react-select'
import swal from 'sweetalert';
import { AdminNavbar } from '../navbars/adminnavbar'

export const AddProductStock = () => {
    const [inputValue, setInputValue] = useState({ pre_stock: 0, new_stock: 0 });
    const { pre_stock, new_stock } = inputValue;
    const [selectedValue, setSelectedValue] = useState();
    const [prodlist, setprodlist] = useState([])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(inputValue);
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json' },
    //         }
    //         const response = await fetch('http://127.0.0.1:8000/addstock', requestOptions)
    //         const json = await response.json();
    //         setprodlist(json['data'])
    //     };
    //     fetchData();
    // });

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://127.0.0.1:8000/addstock',requestOptions)
          .then((response) => response.json())
          .then((data) => setprodlist(data['data']))
          .catch((error) => console.log(error.message));
      }, []);
    const postproductData = async () => {
        const total=parseInt(pre_stock)+parseInt(new_stock)
        alert(selectedValue)
        alert(total)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "product_name": selectedValue, "product_quantity": total
          })
        }
        const response = await fetch('http://127.0.0.1:8000/addstock', requestOptions)
        const loginresp = await response.json()
        if (loginresp['status'] === 201) {
          await swal({
            title: "Stock",
            text: "Stock Updated Successfully",
            icon: "success",
            timer: 2000,
            button: false
          })
          setInputValue({ pre_stock: 0, new_stock: 0})

          // navigate('/addproduct')
        }
    }
    // handle onChange event of the dropdown
    const handleChange2 = e => {
        setSelectedValue(e.label);
        prodlist.map((d) => {
            if (e.label === d['product_name']){
                setInputValue({ pre_stock: d['product_quantity'], new_stock: 0})
            }
        }
        )
    }
    const handleSubmit = e => {
        e.preventDefault()
        postproductData()
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
                                <fieldset className="pb-5 pt-3">
                                    <legend>ADD STOCK</legend>

                                    <div className="pt-3" style={{ width: "220px", paddingLeft: "20px" }}>
                                        <label htmlFor="input-field form-control " class="control-label">Select Company</label>
                                        <Select
                                            placeholder="Select Option"
                                            value={prodlist.find(obj => obj.value === selectedValue)} // set selected value
                                            styles={customStyles}
                                            options={prodlist.map((d) => {
                                                return {
                                                    value: d['product_name'],
                                                    label: d['product_name']
                                                };
                                            }
                                            )}
                                            onChange={handleChange2} // assign onChange function
                                        />
                                    </div>

                                    <InputField
                                        type="text"
                                        value={pre_stock}
                                        placeholder="Previous Stock"
                                        label="Previous Stock"
                                        name="pre_stock"
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        type="text"
                                        value={new_stock}
                                        placeholder="New Quantity"
                                        label="New Quantity"
                                        name="new_stock"
                                        onChange={handleChange}
                                    />
                                    <Subbutton onClick={handleSubmit} type="button" buttonText="AddProduct" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}



