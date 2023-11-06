import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UpdateBeer() {
  const [beer, setBeer] = useState({
    tap_number: '',
    // name: '',
    // type: '',
    // brewery_id: '',
    // supplier_id: '',
    // description: '',
    // flavor_details: '',
    // price_per_keg: '',
    // arrival_date: '',
    // keg_size: '',
    // serving_sizes: '',
    // price_per_serving_size: '',
    // category_id: null,
    // tap_id: null,
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);
  const beerId = location.pathname.split('/')[3];
  //const { beerId } = useParams();

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/beers/${beerId}`);
        setBeer(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBeer();
  }, [beerId]);

  const handleChange = (e) => {
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const beerUrl = `http://localhost:5001/api/beers/${beerId}`;
    try {
      await axios.put(beerUrl, beer);
      setUpdateConfirmation('Record updated successfully.');
      navigate('/beers');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Add Tap Number</h1>
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        {/* Add other form fields here */}
        <div>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>Tap Number</InputGroup.Text>
            {beer.tap_number !== undefined && (
              <Form.Control
                onChange={handleChange}
                type='number'
                name='tap_number'
                value={beer.tap_number}
                aria-label='Large'
                aria-describedby='inputGroup-sizing-sm'
              />
            )}
          </InputGroup>
        </div>

        <div>
          <InputGroup size='lg'>
            <InputGroup.Text id='inputGroup-sizing-lg'>Name</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              name='name'
              value={beer.name}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
              disabled = {isDisabled}
            />
          </InputGroup>
        </div>

        {/* Add more fields similarly */}

        <div className='btn-div'>
          <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
            Add
          </Button>
          <Button variant='primary' size='lg' href='/beers' className='update-link btn-extra'>
            Back
          </Button>
        </div>
      </div>
    </>
  );
}

export default UpdateBeer;
