import React, { useState } from 'react'
import { Productfield } from '../common/inputfield'
import axios from 'axios'
import './updateproduct.css'

const URL = 'https://jsonplaceholder.typicode.com/users'

export const Table = () => {

    const [inputValue, setInputValue] = useState({readonly:true});
    const [idvalue, setIdvalue] = useState("");
  const {id,readonly} = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };
    const [employees, setEmployees] = React.useState([])

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email','email', 'phone', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return employees && employees.map(({ id, name, email, phone }) => {
            
            return (
                <tr key={id}>
                    <td><Productfield value={id} name={id} readonly={readonly} onChange={handleChange}/></td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Update</button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}
