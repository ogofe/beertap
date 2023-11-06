import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form} from 'react-bootstrap'

function AddCategories() {
    const [category, setCategory] = useState({
        name: "",
        type:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCategory((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(category)

    const handleClick = async e => {
        e.preventDefault()
        const categoryUrl = "http://localhost:5001/api/categories/"
        try {
            await axios.post(categoryUrl, category)
            navigate("/categories")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <>
    <div className='form contMargin'>
      <br />
        <h1 className='listUntapTitle'>Add New Category</h1>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Category Name</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='name'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Type</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='type'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
      <div className="btn-div">
      <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>Add</Button>
        <Button variant='primary' size='lg' href={"/categories"} className="update-link btn-extra">
            Back
        </Button>
      </div>
    </div>
    </>
  )
}

export default AddCategories