import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';

function UpdateCategory() {
  const [category, setCategory] = useState({
    name: '',
    type:'',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split('/')[3];

  useEffect(() => {
    // Fetch existing data from the API
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/categories/${categoryId}`);
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
    const categoryUrl = `http://localhost:5001/api/categories/${categoryId}`;
    try {
      await axios.put(categoryUrl, category);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/categories');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Update Category</h1>
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}
          <div>
    <InputGroup size='lg'>
      <InputGroup.Text id='inputGroup-sizing-lg'>Category Name</InputGroup.Text>
      <Form.Control
        onChange={handleChange}
        name='name'
        value={category.name}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />
    </InputGroup>
  </div>
  <div>
    <InputGroup size='lg'>
      <InputGroup.Text id='inputGroup-sizing-lg'>Type</InputGroup.Text>
      <Form.Control
        onChange={handleChange}
        name='type'
        value={category.type}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />
    </InputGroup>
  </div>
      <div className="btn-div">
      <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
          Update
        </Button>
        <Button variant='primary' size='lg' href={"/categories"} className="update-link btn-extra">
            Back
        </Button>
      </div>
      </div>
    </>
  );
}

export default UpdateCategory;
