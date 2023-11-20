import {GlobalStore} from '../../App';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { BackButton } from '../../components';


function UpdateSupplier() {
  const [supplier, setSupplier] = useState({
    name: '',
  });
  const {apiUrl} = useContext(GlobalStore)
  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const supplierId = location.pathname.split('/')[3];
  //console.log(supplierId)

  useEffect(() => {
    // Fetch existing data from the API
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${apiUrl}/suppliers/${supplierId}`);
        // Set the existing data as the initial state for the input field
        setSupplier(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleChange = (e) => {
    setSupplier((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const supplierUrl = `${apiUrl}/suppliers/${supplierId}`;
    try {
      await axios.put(supplierUrl, supplier);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/suppliers');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Container className='form contMargin'>
        <BackButton path="/suppliers" />

        <h2 className='listUntapTitle'>Update Supplier</h2>

        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        <div className='bg-light p-2 rounded'>
          <div size='lg' style={{maxWidth: '500px'}}>
            <label className="form-label" id='inputGroup-sizing-lg'> Supplier Name </label>
            <Form.Control
              onChange={handleChange}
              name='name'
              value={supplier.name}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
          
            />
          </div>
        </div>

        <div className="bg-light rounded p-2 my-3">
          <Button className='btn-extra bold w-fit' variant='success' size='md' onClick={handleClick}>
            <FontAwesomeIcon icon={faSave} /> Update
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default UpdateSupplier;
