import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import {BackButton} from '../../components';
import { Button, Container, Form } from 'react-bootstrap';
import {GlobalStore} from '../../App';
import useRoleBasedAccess from '../../hooks/useRole';


function UpdateBrewery() {
  const [brewery, setBrewery] = useState({
    name: '',
    location:'',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  useRoleBasedAccess(['Super Admin', 'Admin'])
  const location = useLocation();
  const breweryId = location.pathname.split('/')[3];
  const {apiUrl, notify, translateError} = useContext(GlobalStore)
  // Fetch existing data from the API

  const fetchBrewery = async () => {
    try {
      const response = await axios.get(`${apiUrl}/breweries/${breweryId}`);
      if (response.status === 200){
        notify({
          title: 'Success',
          level: 'success',
          body: "Successfully got data from server"
        })
      }else{
        notify({
          title: 'Success',
          level: 'danger',
          body: "Successfully got data from server"
        })
      }
      // Set the existing data as the initial state for the input field
      console.log("DATA:", response.data)
      setBrewery(response.data);
    } catch (err) {
      console.log(err);
      const error = translateError(err)
      notify({
        title: error.title,
        timeout: 5000,
        level: 'danger',
        body: error.body
      })
    }
  };

  useEffect(() => {
    fetchBrewery();

    // eslint-disable-next-line
  }, [breweryId]);

  const handleChange = (e) => {
    setBrewery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const breweryUrl = `${apiUrl}/breweries/${breweryId}`;
    try {
      await axios.put(breweryUrl, brewery);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/breweries');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Container className='form contMargin'>
        <BackButton path="/breweries" />

        <h2 className='listUntapTitle'>Update Brewery</h2>
        
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}
        
        <div className="bg-light p-2 rounded">
          <div size='lg' className="mb-2">
            <label className="form-label" id='inputGroup-sizing-lg'>Brewery Name</label>
            <Form.Control
              onChange={handleChange}
              name='name'
              value={brewery.name}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            />
          </div>
       
          <div size='lg'>
            <label className="form-label" id='inputGroup-sizing-lg'>Location</label>
            <Form.Control
              onChange={handleChange}
              name='location'
              value={brewery.location}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            />
          </div>
        </div>

        <div className="bg-light rounded p-2 my-3">
          <Button className='btn-extra w-fit bold' variant='success' size='md' onClick={handleClick}>
            <FontAwesomeIcon icon={faSave} /> Save Changes
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default UpdateBrewery;
