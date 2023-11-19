import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, div, Form, Dropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTruckFast, faChevronLeft, faPenFancy, faCancel } from '@fortawesome/free-solid-svg-icons';
import {BackButton} from '../../components'
import {GlobalStore} from '../../App'

function UpdateUser() {
  const [user, setUser] = useState({
    username: "",
    password : '',
    full_name:"",
    email: "",
    role: ""
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split('/')[3];
 //console.log(user.username)
  const {apiUrl} = useContext(GlobalStore)

  useEffect(() => {
    // Fetch existing data from the API
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        // Set the existing data as the initial state for the input field
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userId]);

   // Handle text change
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle dropdown select value
  const handleRoleSelect = (selectedRole) => {
    setUser((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const userUrl = `${apiUrl}/users/${userId}`;
    try {
      await axios.put(userUrl, user);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Container className='form contMargin'>
        <BackButton path="/users" />

        <h2> Update Staff </h2>
        
        <div className="row p-2 rounded bg-light">
          <div className="col-sm-12 my-2 col-md-6">
            <div size="lg">
              <label className="form-label" id="div-sizing-lg">Username</label>
              <Form.Control
                onChange={handleChange}
                name='username'
                value={user.username} 
                aria-label="Large"
                aria-describedby="div-sizing-sm"
              />
            </div>
          </div>

          <div className="col-sm-12 my-2 col-md-6">
            <div size="lg">
              <label className="form-label" id="div-sizing-lg">Password</label>
              <Form.Control
                onChange={handleChange}
                type='password' 
                name='password'
                value={user.password}
                aria-label="Large"
                aria-describedby="div-sizing-sm"
              />
            </div>
          </div>

          <div className="col-sm-12 my-2 col-md-6">
            <div size="lg">
              <label className="form-label" id="div-sizing-lg">Full Name</label>
              <Form.Control
                onChange={handleChange} 
                name='full_name'
                value={user.full_name}
                aria-label="Large"
                aria-describedby="div-sizing-sm"
              />
            </div>
          </div>

          <div className="col-sm-12 my-2 col-md-6">
            <div size="lg">
              <label className="form-label" id="div-sizing-lg">Email</label>
              <Form.Control
                onChange={handleChange} 
                name='email'
                value={user.email}
                aria-label="Large"
                aria-describedby="div-sizing-sm"
              />
            </div>
          </div>

          <div className="col-sm-12 my-2 col-md-6">
            <div size='lg'>
              <label className="form-label" id='div-sizing-lg'>Role</label>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant='secondary' className="w-100" id='dropdown-basic'>
                  {user.role || 'Select Role'}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  <Dropdown.Item onClick={() => handleRoleSelect('Super Admin')}>Super Admin</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRoleSelect('Admin')}>Admin</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRoleSelect('Basic User')}>Basic User</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        
        <div className='bg-light p-2 rounded my-3'>
          <Button className='btn-extra w-fit' variant='success' size='md' onClick={handleClick}>
            <FontAwesomeIcon icon={faSave} />  Save Changes
          </Button>
        </div>

      </Container>
    </div>
  );
}

export default UpdateUser;
