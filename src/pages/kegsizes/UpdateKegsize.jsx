import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';

function UpdateKegsize() {
  const [kegsize, setKegsize] = useState({
    size: '',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const kegsizeId = location.pathname.split('/')[3];
  //console.log(supplierId)

  useEffect(() => {
    // Fetch existing data from the API
    const fetchKegsize = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/kegsizes/${kegsizeId}`);
        // Set the existing data as the initial state for the input field
        setKegsize(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchKegsize();
  }, [kegsizeId]);

  const handleChange = (e) => {
    setKegsize((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const kegsizeUrl = `http://localhost:5001/api/kegsizes/${kegsizeId}`;
    try {
      await axios.put(kegsizeUrl, kegsize);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/kegsizes');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Update Keg Size</h1>
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}
        <InputGroup size='lg'>
          <InputGroup.Text id='inputGroup-sizing-lg'>Keg Size</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            name='size'
            value={kegsize.size}
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
          />
        </InputGroup>
          <div className="btn-div">
          <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
          Update
        </Button>
        <Button variant='primary' size='lg' href={"/kegsizes"} className="update-link btn-extra">
            Back
        </Button>
          </div>
      </div>
    </>
  );
}

export default UpdateKegsize;
