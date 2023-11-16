import React, { useState, useContext } from 'react';
import { Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; 
import { login } from '../services/authService';
import logo from '../../images/uob.png'
import {GlobalStore} from '../../App';

function Login() {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const {onLogin} = useContext(GlobalStore)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    // console.log(token)
    navigate('/beers');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    return onLogin()

    try {
      const response = await login(formData.username, formData.password);

      if (response.status === 200 && response.data.token) {
        dispatch({ type: 'LOGIN', payload: { username: formData.username, token: response.data.token } });
        handleLoginSuccess(response.data.token);
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      setError('Incorrect username or password');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className='page'>
      <div className=''>
        <img src={logo} style={{height: 200, width: 200}} className='bg-logo d-block mx-auto ' alt="Logo"  />

        <div className="bg-white mx-auto p-3 shadow-lg border-0 d-block" style={{maxWidth: '500px'}}>
          <Form onSubmit={handleSubmit}>
            <h5 className='listUntapTitle p-3 text-white rounded border-bottom text-center bg-beer' >LOGIN</h5>
          
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-2 p-3">
              <div size='lg'>
                <label className="form-label"id='inputGroup-sizing-lg'>Username</label>
                <Form.Control
                  onChange={handleChange}
                  type='text'
                  name='username'
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                  value={formData.username}
                />
              </div>
              
              <div size='lg'>
                <label className="form-label"id='inputGroup-sizing-lg'>Password</label>
                <Form.Control
                  onChange={handleChange}
                  type='password'
                  name='password'
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                  value={formData.password}
                />
              </div>
            </div>
            
            <Button type='submit' className='btn-extra bg-beer mx-auto border-0 px-3 py-2 hover bold mb-2 d-block' size='md'>
              Login
            </Button>

            <p className="m-0 px-3"> <a href="/password-reset">Forgot your Password? </a> </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
