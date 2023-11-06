import React, { useState } from 'react';
import { Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; 
import { login } from '../services/authService';
import logo from '../../images/uob.png'

function Login() {
  const { dispatch } = useUser();
  const navigate = useNavigate();

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
    <div className='form contMargin'>

      <Form onSubmit={handleSubmit}>
      <img src={logo} className='bg-logo' alt="Logo"  />
      <h1 className='listUntapTitle'>Login</h1>
      <br />
        {error && <Alert variant="danger">{error}</Alert>}
        <InputGroup size='lg'>
          <InputGroup.Text id='inputGroup-sizing-lg'>Username</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            type='text'
            name='username'
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
            value={formData.username}
          />
        </InputGroup>
        <br />
        <InputGroup size='lg'>
          <InputGroup.Text id='inputGroup-sizing-lg'>Password</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            type='password'
            name='password'
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
            value={formData.password}
          />
        </InputGroup>
        <br />
        <Button type='submit' className='btn-extra' size='lg'>
          Login
        </Button>  
      </Form>
    </div>
  );
}

export default Login;
