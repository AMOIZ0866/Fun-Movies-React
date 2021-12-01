import { AdminNavbar } from '../navbars/adminnavbar'
import Subbutton from '../common/buttons'
import { SearchButton } from '../common/inputfield'
import React, { useState, useEffect } from 'react'
import { InputField } from '../common/inputfield'

function usePosts() {
    const [posts, setPosts] = useState([])
    const [val, setval] = useState('')
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


export const FetchProduct = () => {


    const prodlist = usePosts()
    const [val, setval] = useState('')
    const [products, setproducts] = useState([])
    const [term, setTerm] = useState('')
    const [filteredTerms, setFilteredTerms] = useState([])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://127.0.0.1:8000/getproductstock', requestOptions)
            .then((response) => response.json())
            .then((data) => { setproducts(data['data']) })
            .catch((error) => console.log(error.message));
    }, []);

    useEffect(() => {
        const filteredItems = products.filter((item) => {
            return item.product_name.toLowerCase().includes(term.toLowerCase())
        })
        setFilteredTerms(filteredItems)
    }, [term])




    const handlechange = (e) => {
        setTerm(e.target.value)
    }
    const handleSubmit = (e) => {
        setval(e.target.value)
        setTerm('')
    }


    const renderHeader = () => {
        let headerElement = ['Product Name', 'Product Price', 'Quantity']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        if (products.length > 0) {
            return (filteredTerms) &&
                filteredTerms.map((item) => {
                    return (
                        <tr key={item.id}>
                            {/* <td><Productfield value={id} name={id} readonly={readonly} onChange={handleChange}/></td> */}
                            <td>{item.product_name}</td>
                            <td>{item.product_price}</td>
                            <td>{item.stock}</td>

                        </tr>
                    )
                })
        }
        else {
            return (products) &&
                products.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>{item.product_price}</td>
                            <td>{item.stock}</td>

                        </tr>
                    )
                })
        }
    }

    return (
        <div>
            <div className="image-background">
                <div className="image-box__overlay"></div>
                <div class="image-box__content">
                    <AdminNavbar />
                    {
                        <div className="container">
                            <div className="row">
                                <div className="row pb-4">
                                    <div className="pt-2 col-lg-6 col-md-3 col-sm-">
                                        <InputField
                                            value={term}
                                            onChange={handlechange}
                                        />

                                    </div>
                                    <div className="col-lg-6 pt-2 col-md-3 col-sm-">
                                    <button
      className="btn btn-primary"
      type="button"
      value="value"
      onClick={handleSubmit}
    ><span className="p-5">Search All</span></button>
                                   
                                    </div>
                                   
                                </div>
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
                    }


                </div>
            </div>

        </div>

    )
}


