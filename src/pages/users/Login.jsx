import React, { useState, useContext } from 'react';
import { Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; 
import { login } from '../services/authService';
import logo from '../../images/uob.png'
import {GlobalStore} from '../../App';

function Login() {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const {onLogin, translateError} = useContext(GlobalStore)


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    navigate('/beers');
  };

  function showMessage(level, message){
    setMessage({ level, message })
    setTimeout(() => setMessage(null), 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      showMessage('info', 'All fields are required');
      return;
    }

    try {
      const response = await login(formData.username, formData.password);

      if (response.status === 200 && response.data.token) {
        showMessage('success', `Welcome Back ${formData.username}!`)
        dispatch({ type: 'LOGIN', payload: { username: formData.username, token: response.data.token } });
        handleLoginSuccess(response.data.token);
        return onLogin({ user: formData.username, ...response.data })
      } else {
        showMessage('danger', 'Incorrect username or password');
      }
    } catch (error) {
      showMessage('danger', translateError(error).body);
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className='page'>
      <div className=''>
        <img src={logo} style={{height: 200, width: 200}} className='bg-logo d-block mx-auto ' alt="Logo"  />

        <div className="bg-white mx-auto p-3 rounded shadow-lg border-0 d-block" style={{maxWidth: '500px'}}>
          <Form onSubmit={handleSubmit}>
            <h5 className='listUntapTitle p-3 text-white rounded border-bottom text-center bg-beer' >LOGIN</h5>
          
            {message && <Alert variant={message.level || "danger"}>{message.message}</Alert>}

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
              
              <div size='lg' className="mt-2">
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

            <p className="m-0 px-3"> <Link to="/password-reset">Forgot your Password? </Link> </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
