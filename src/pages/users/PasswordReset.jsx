import React, { useState, useContext } from 'react';
import { Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; 

import logo from '../../images/uob.png'
import {GlobalStore} from '../../App';



export const PasswordReset = ({ props }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')


  const [formData, setFormData] = useState({
    email: '',
    new_password: '',
  });

  function handleSubmit(){

  }

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // useEffect(() => {
  //   // Clear user data from local storage
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role');

  //   // Redirect the user to the login page after logging out
  //   navigate('/');
  // }, [navigate]);

  return (
    <div className='page'>
      <div className=''>
        <img src={logo} style={{height: 200, width: 200}} className='bg-logo d-block mx-auto ' alt="Logo"  />

        <div className="bg-white mx-auto p-3 rounded shadow-lg border-0 d-block" style={{maxWidth: '500px'}}>
          <Form onSubmit={handleSubmit}>
            <h5 className='listUntapTitle p-3 text-white rounded border-bottom text-center bg-beer'>
              PASSWORD RESET
            </h5>
          
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-2 p-3">
              <div size='lg'>
                <label className="form-label"id='inputGroup-sizing-lg'>Email</label>
                <Form.Control
                  onChange={handleChange}
                  type='email'
                  name='email'
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                  value={formData.username}
                />
              </div>
            </div>
            
            <Button type='submit'
              className='w-fit btn-block btn-extra bg-beer mx-auto border-0 px-3 py-2 hover bold mb-2 d-block' size='md'>
              Reset My Password
            </Button>

            <p className="m-0 px-3"> <Link to="/login">Back to Login </Link> </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
