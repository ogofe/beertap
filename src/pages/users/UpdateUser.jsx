import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form, Dropdown } from 'react-bootstrap';

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

  useEffect(() => {
    // Fetch existing data from the API
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${userId}`);
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
    const userUrl = `http://localhost:5001/api/users/${userId}`;
    try {
      await axios.put(userUrl, user);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
 <div className='form contMargin'>
        <h1>Update Staff</h1>
        <div>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Username</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name='username'
          value={user.username} 
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
          value={user.password}
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
          value={user.full_name}
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
          value={user.email}
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
                <Dropdown.Item onClick={() => handleRoleSelect('Super Admin')}>Super Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleSelect('Admin')}>Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleSelect('Basic User')}>Basic User</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </div>
        <div className='btn-div'>
        <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
            Update
        </Button>
        <Button variant='primary' size='lg' href={"/users"} className="update-link btn-extra">
            Back
        </Button>
    </div>

      </div>
    </>
  );
}

export default UpdateUser;
