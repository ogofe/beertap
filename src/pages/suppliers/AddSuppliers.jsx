import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form} from 'react-bootstrap'

function AddSuppliers() {
    const [required, setRequired] = [true]
    const [supplier, setSupplier] = useState({
        name: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setSupplier((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(supplier)

    const handleClick = async e => {
        e.preventDefault()
        const supplierUrl = "http://localhost:5001/api/suppliers/"
        console.log(supplierUrl)
        try {
            await axios.post(supplierUrl, supplier)
            navigate("/suppliers")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <>
    <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Add New Supplier</h1>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Supplier Name</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='name'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          setRequired
          
        />
        </InputGroup>
        <div className="btn-div">
        <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>Add</Button>
        <Button variant='primary' size='lg' href={"/suppliers"} className="update-link btn-extra">
            Back
        </Button>
        </div>
    </div>
    </>
  )
}

export default AddSuppliers