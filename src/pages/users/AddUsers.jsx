import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form, Dropdown} from 'react-bootstrap'

function AddUsers() {
    const [user, setUser] = useState({
        username: "",
        password : '',
        full_name:"",
        email: "",
        role: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(user)

    const handleClick = async e => {
        e.preventDefault()
        const userUrl = "http://localhost:5001/api/users/register"
        try {
            await axios.post(userUrl, user)
            navigate("/users")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <>
    <div className='form contMargin'>
        <h1>Add New Staff</h1>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Username</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='username'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Password</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          type='password' 
          name='password'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Full Name</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='full_name'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Email</InputGroup.Text>
        <Form.Control
          onChange={handleChange} 
          name='email'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        </InputGroup>
        </div>
        <div>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>Role</InputGroup.Text>
            <Dropdown>
              <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                {user.role || 'Select Role'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setUser({ ...user, role: 'Super Admin' })}>Super Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => setUser({ ...user, role: 'Admin' })}>Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => setUser({ ...user, role: 'Basic User' })}>Basic User</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </div>
        <div className="btn-div">
        <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>Add</Button>
        <Button variant='primary' size='lg' href={"/users"} className="update-link btn-extra">
            Back
        </Button>
        </div>
    </div>
    </>
  )
}

export default AddUsers