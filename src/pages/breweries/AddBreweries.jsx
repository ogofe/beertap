import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form} from 'react-bootstrap'

function AddBreweries() {
    const [brewery, setBrewery] = useState({
        name: "",
        location:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBrewery((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(brewery)

    const handleClick = async e => {
        e.preventDefault()
        const breweryUrl = "http://localhost:5001/api/breweries/"
        try {
            await axios.post(breweryUrl, brewery)
            navigate("/breweries")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <>
    <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Add New Brewery</h1>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Brewery Name</InputGroup.Text>
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
        <InputGroup.Text id="inputGroup-sizing-lg">Location</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='location'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
    <div className="btn-div">
    <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>Add</Button>
        <Button variant='primary' size='lg' href={"/breweries"} className="update-link btn-extra">
            Back
        </Button>
    </div>
    </div>
    </>
  )
}

export default AddBreweries