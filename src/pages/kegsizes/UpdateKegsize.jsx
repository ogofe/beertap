import {GlobalStore} from '../../App';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { BackButton } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

function UpdateKegsize() {
  const [kegsize, setKegsize] = useState({
    size: '',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const {apiUrl} = useContext(GlobalStore)
  const kegsizeId = location.pathname.split('/')[3];
  //console.log(supplierId)

  useEffect(() => {
    // Fetch existing data from the API
    const fetchKegsize = async () => {
      try {
        const response = await axios.get(`${apiUrl}/kegsizes/${kegsizeId}`);
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
    const kegsizeUrl = `${apiUrl}/kegsizes/${kegsizeId}`;
    try {
      await axios.put(kegsizeUrl, kegsize);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/kegsizes');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Container className='form contMargin'>
        
        <BackButton path={"/kegsizes"} />

        <h2 className='listUntapTitle'> Update Keg Size </h2>

        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        <div className="bg-light p-2 rounded" size='lg'>
          <div className="" style={{maxWidth: 500}} size='lg'>
            <label className="form-label" id='inputGroup-sizing-lg'>Keg Size</label>
            <Form.Control
              onChange={handleChange}
              name='size'
              value={kegsize.size}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            />
          </div>
        </div>

          <div className="bg-light p-2 rounded my-3">
            <Button className='btn-extra w-fit' variant='success' size='md' onClick={handleClick}>
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </Button>
          </div>
      </Container>
    </div>
  );
}

export default UpdateKegsize;
