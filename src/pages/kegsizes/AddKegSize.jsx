import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form} from 'react-bootstrap'

function AddKegSize() {
    const [kegsize, setKegsize] = useState({
        size: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setKegsize((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(kegsize)

    const handleClick = async e => {
        e.preventDefault()
        const kegsizeUrl = "http://localhost:5001/api/kegsizes/"
        console.log(kegsizeUrl)
        try {
            await axios.post(kegsizeUrl, kegsize)
            navigate("/kegsizes")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <>
    <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Add New Keg Size</h1>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Keg Size</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='size'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        <div className="btn-div">
        <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>Add</Button>
        <Button variant='primary' size='lg' href={"/kegsizes"} className="update-link btn-extra">
            Back
        </Button>
        </div>
    </div>
    </>
  )
}

export default AddKegSize