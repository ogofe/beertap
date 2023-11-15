import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {GlobalStore} from '../../App';
import {BackButton} from '../../components';
import { faSave, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
  const {apiUrl} = useContext(GlobalStore);
  //const { beerId } = useParams();
  const popup = useRef()

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await axios.get(`${apiUrl}/beers/${beerId}`);
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
    const beerUrl = `${apiUrl}/beers/${beerId}`;
    try {
      await axios.put(beerUrl, beer);
      setUpdateConfirmation('Record updated successfully.');
      navigate('/beers');
    } catch (err) {
      console.log(err);
    }
  };

  function showPopup(){
    const overlay = popup.current;
    overlay.classList.add('show');
  }

  function onPopupClose(){
    const overlay = popup.current;
    overlay.classList.remove('show');
  }

  return (
    <div className="page">
      <div className='contMargin'>
        <BackButton path={'/beers'} />

        <div className="d-flex justify-content-between mt-3">
          <h3 className='listUntapTitle'> Edit Beer Details </h3>
        </div>
        
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        <div className="form p-2 rounded my-3 bg-light">
          {!beer?.tap_number && 
            <Button
              variant="info"
              size='md'
              className="w-fit"
              style={{ marginLeft: 'auto'}}
              onClick={showPopup}
            ><FontAwesomeIcon icon={faAdd} /> Add to Tap </Button>
          }
          
          <div className="row">
            {/* Beer Name */}
            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Name </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.name}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                  disabled = {isDisabled}
                />
              </div>
            </div>

            {/* Beer Type */}
            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Type </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.type}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            {/* Beer Brewery */}
            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Brewery Name </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.brewery}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            {/* Beer Supplier */}
            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Supplier Name </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.supplier_id}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-8">
              <div>
                <label className="form-label"> Description </label>
                <Form.Control
                  onChange={handleChange}
                  name='description'
                  as='textarea'
                  value={beer.description}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Flavor Details </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Price Per Keg ($) </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Arrival Date </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Keg Size </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Serving Size </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            <div className="col-sm-12 my-2 col-md-4">
              <div>
                <label className="form-label"> Price Per Serving ($) </label>
                <Form.Control
                  onChange={handleChange}
                  name='name'
                  value={beer.flavor_details}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            {/* Add more fields similarly */}

          </div>
        </div>

        <div className='bg-light p-2 rounded'>
          <Button className='btn-extra bold' variant='primary' size='md' onClick={handleClick}>
            <FontAwesomeIcon icon={faSave} /> Save Changes
          </Button>
        </div>
      </div>

      <div className="overlay" ref={popup}>
        <div className="overlay-inner">
          <TapPopup onClose={onPopupClose} />
        </div>
      </div>
    </div>
  );
}



const TapPopup = ({ show, onClose }) => {
  const [tapNumber, setTapNumber] = useState("")
  const popup = useRef()

  function addToTap(){
    // send a post request to add beer to tap
  }

  function closePopup(){
    onClose()
  }

  return(
    <div className="card p-3 rounded mx-auto" style={{maxWidth: '500px',}}>
      <label className="form-label"> Tap Number </label>
      
      <Form.Control
        onChange={e => setTapNumber(e.target.value)}
        type='number'
        name='tap_number'
        value={tapNumber}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />

      <div className="mt-3">
        <Button className="bold" variant="primary"> Add to Tap </Button>
        <Button onClick={closePopup} className="mx-2 bold" variant="warning"> Cancel </Button>
      </div>
    </div>
  )
}




export default UpdateBeer;
