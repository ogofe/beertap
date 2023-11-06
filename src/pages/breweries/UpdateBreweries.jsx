import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';

function UpdateBrewery() {
  const [brewery, setBrewery] = useState({
    name: '',
    location:'',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const breweryId = location.pathname.split('/')[3];

  useEffect(() => {
    // Fetch existing data from the API
    const fetchBrewery = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/breweries/${breweryId}`);
        // Set the existing data as the initial state for the input field
        setBrewery(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBrewery();
  }, [breweryId]);

  const handleChange = (e) => {
    setBrewery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const breweryUrl = `http://localhost:5001/api/breweries/${breweryId}`;
    try {
      await axios.put(breweryUrl, brewery);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/breweries');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Update Brewery</h1>
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}
          <div>
    <InputGroup size='lg'>
      <InputGroup.Text id='inputGroup-sizing-lg'>Brewery Name</InputGroup.Text>
      <Form.Control
        onChange={handleChange}
        name='name'
        value={brewery.name}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />
    </InputGroup>
  </div>
  <div>
    <InputGroup size='lg'>
      <InputGroup.Text id='inputGroup-sizing-lg'>Location</InputGroup.Text>
      <Form.Control
        onChange={handleChange}
        name='location'
        value={brewery.location}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />
    </InputGroup>
  </div>
        <div className="btn-div">
        <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
          Update
        </Button>
        <Button variant='primary' size='lg' href={"/breweries"} className="update-link btn-extra">
            Back
        </Button>
        </div>
      </div>
    </>
  );
}

export default UpdateBrewery;
