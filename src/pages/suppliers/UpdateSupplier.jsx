import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';

function UpdateSupplier() {
  const [supplier, setSupplier] = useState({
    name: '',
  });

  const [updateConfirmation, setUpdateConfirmation] = useState(null); // Added state for update confirmation
  const navigate = useNavigate();
  const location = useLocation();
  const supplierId = location.pathname.split('/')[3];
  //console.log(supplierId)

  useEffect(() => {
    // Fetch existing data from the API
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/suppliers/${supplierId}`);
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
    const supplierUrl = `http://localhost:5001/api/suppliers/${supplierId}`;
    try {
      await axios.put(supplierUrl, supplier);
      setUpdateConfirmation('Record updated successfully.'); // Set the update confirmation message
      navigate('/suppliers');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='form contMargin'>
        <br />
        <h1 className='listUntapTitle'>Update Supplier</h1>
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}
        <InputGroup size='lg'>
          <InputGroup.Text id='inputGroup-sizing-lg'>Supplier Name</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            name='name'
            value={supplier.name}
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
        
          />
        </InputGroup>
          <div className="btn-div">
          <Button className='btn-extra' variant='primary' size='lg' onClick={handleClick}>
          Update
        </Button>
        <Button variant='primary' size='lg' href={"/suppliers"} className="update-link btn-extra">
            Back
        </Button>
          </div>
      </div>
    </>
  );
}

export default UpdateSupplier;
