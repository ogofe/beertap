import {GlobalStore} from '../../App';
import React, { useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components';
import {Button, div, Form, Dropdown, Container} from 'react-bootstrap';
import { faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function AddUsers() {
  const [user, setUser] = useState({
    username: "",
    password : '',
    full_name:"",
    email: "",
    role: ""
  })

  const {apiUrl} = useContext(GlobalStore)
  const navigate = useNavigate()

  const handleChange = (e) => {
      setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  console.log(user)

  const handleClick = async e => {
    e.preventDefault()
    const userUrl = `${apiUrl}/users/register`
    try {
        await axios.post(userUrl, user)
        navigate("/users")
    } catch (err) {
        console.log(err)
        
    }
  }

  return (
    <div className="page">
      <Container className='form contMargin'>
          <BackButton path="/users" />

          <h2 className="listUntapTitle">Add New Staff</h2>

          <div className="row p-2 bg-light rounded">
            
            <div className="col-sm-12 col-md-6 my-2">
              <div size="lg">
                <label className="form-label" id="div-sizing-lg">Full Name</label>
                <Form.Control
                  onChange={handleChange} 
                  name='full_name'
                  aria-label="Large"
                  aria-describedby="div-sizing-sm"
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-6 my-2">
              <div size="lg">
                <label className="form-label" id="div-sizing-lg">Email</label>
                <Form.Control
                  onChange={handleChange} 
                  name='email'
                  aria-label="Large"
                  aria-describedby="div-sizing-sm"
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-6 my-2">
              <div size="lg">
                <label className="form-label" id="div-sizing-lg">Username</label>
                <Form.Control
                  onChange={handleChange} 
                  name='username'
                  aria-label="Large"
                  aria-describedby="div-sizing-sm"
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-6 my-2">
              <div size="lg">
                <label className="form-label" id="div-sizing-lg">Password</label>
                <Form.Control
                  onChange={handleChange}
                  type='password' 
                  name='password'
                  aria-label="Large"
                  aria-describedby="div-sizing-sm"
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-6 my-2">
              <div size='lg'>
                <label className="form-label" id='div-sizing-lg'>Role</label>
                <Dropdown className="w-100">
                  <Dropdown.Toggle className="w-100" variant='secondary' id='dropdown-basic'>
                    {user.role || 'Select Role'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setUser({ ...user, role: 'Super Admin' })}>Super Admin</Dropdown.Item>
                    <Dropdown.Item onClick={() => setUser({ ...user, role: 'Admin' })}>Admin</Dropdown.Item>
                    <Dropdown.Item onClick={() => setUser({ ...user, role: 'Basic User' })}>Basic User</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="p-2 rounded bg-light mt-3">
            <Button className='btn-extra' variant='primary' size='md' onClick={handleClick}>
              <FontAwesomeIcon icon={faUser} className="mx-2" />
              Save User
            </Button>
          </div>
      </Container>
    </div>
  )
}

export default AddUsers