import {GlobalStore} from '../../App';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {BackButton} from '../../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, div, Form, Container } from 'react-bootstrap';

function UpdateCategory() {
  const [category, setCategory] = useState({
    name: '',
    type:'',
  });

  const {apiUrl} = useContext(GlobalStore)
  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split('/')[3];

  useEffect(() => {
    // Fetch existing data from the API
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories/${categoryId}`);
        // Set the existing data as the initial state for the input field
        setCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const categoryUrl = `${apiUrl}/categories/${categoryId}`;
    try {
      await axios.put(categoryUrl, category);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/categories');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Container className='form contMargin'>
        <BackButton path="/categories" />

        <h2 className='listUntapTitle'>Update Category</h2>
        
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        <div className="p-2 rounded bg-light">

          <div style={{maxWidth: 500}}>
            <div size='lg'>
              <label className="form-label" id='inputGroup-sizing-lg'>Category Name</label>
              <Form.Control
                onChange={handleChange}
                name='name'
                value={category.name}
                aria-label='Large'
                aria-describedby='inputGroup-sizing-sm'
              />
            </div>
          </div>

          <div style={{maxWidth: 500}}>
            <div size='lg'>
              <label className="form-label" id='inputGroup-sizing-lg'>Type</label>
              <Form.Control
                onChange={handleChange}
                name='type'
                value={category.type}
                aria-label='Large'
                aria-describedby='inputGroup-sizing-sm'
              />
            </div>
          </div>
        </div>

        <div className="bg-light rounded p-2 my-3">
          <Button className='btn-extra bold w-fit' variant='success' size='md' onClick={handleClick}>
            <FontAwesomeIcon icon={faSave} /> Save Changes
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default UpdateCategory;
