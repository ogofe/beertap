import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form, Container, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {GlobalStore} from '../../App';
import {BackButton} from '../../components';
import { faSave, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useRoleBasedAccess from '../../hooks/useRole';


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
  useRoleBasedAccess(['Super Admin', 'Admin'])

  const [updateConfirmation, setUpdateConfirmation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [popupVisible, setPopupVisibility] = useState(false);
  const beerId = location.pathname.split('/')[3];
  const {apiUrl, axios} = useContext(GlobalStore);
  //const { beerId } = useParams();
  const popup = useRef()
  const [breweries, setBreweries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [breweryNames, setBreweryNames] = useState({});
  const [supplierNames, setSupplierNames] = useState({});

  function getBreweries(){
   // Fetch breweries and suppliers to populate dropdowns
    axios.get(`${apiUrl}/breweries`)
    .then((response) => {
      setBreweries(response.data)
      const breweryNamesMap = {};
      response.data.forEach((brewery) => {
         breweryNamesMap[brewery.brewery_id] = brewery.name;
      });
      setBreweryNames(breweryNamesMap);
    })
    .catch((error) => {
      console.error('Error fetching breweries:', error);
    }); 
  }

  function getSuppliers(){
    axios.get(`${apiUrl}/suppliers`)
    .then((response) => {
      setSuppliers(response.data)
      const supplierNamesMap = {};
      response.data.forEach((supplier) => {
        supplierNamesMap[supplier.supplier_id] = supplier.name;
      });
      setSupplierNames(supplierNamesMap);
    })
    .catch((error) => {
      console.error('Error fetching suppliers:', error);
    });
  }

  const fetchBeer = async () => {
    try {
      const response = await axios.get(`${apiUrl}/beers/${beerId}`);
      setBeer(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBreweries();
    getSuppliers();
    fetchBeer();
  }, [beerId]);

  const handleChange = (e) => {
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (data) => {
    const beerUrl = `${apiUrl}/beers/${beerId}`;
    try {
      await axios.put(beerUrl, data);
      setUpdateConfirmation('Record updated successfully.');
      navigate('/beers');
    } catch (err) {
      console.log(err);
    }
  };

  function showPopup(){
    const overlay = popup.current;
    overlay.classList.add('show');
    setPopupVisibility(true)
  }

  function onPopupClose(){
    const overlay = popup.current;
    overlay.classList.remove('show');
    setPopupVisibility(false)
  }

  return (
    <div className="page">
      <Container className='contMargin'>
        <BackButton path={'/beers'} />

        <div className="d-flex justify-content-between mt-3">
          <h3 className='listUntapTitle'> Edit Beer Details </h3>
        </div>
        
        {updateConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{updateConfirmation}</p>
        )}

        <div className="form p-2 rounded my-3 bg-light">
          {!beer.tap_number ?
            <Button
              variant="info"
              size='md'
              className="w-fit"
              style={{ marginLeft: 'auto'}}
              onClick={showPopup}
            >
              <FontAwesomeIcon icon={faAdd} /> Add to Tap
            </Button>
            :
            <div className="d-flex justify-content-between align-items-center">
              <Badge bg="primary" style={{fontSize: '18px'}}> Tap N<u>o</u> : {beer.tap_number} </Badge>
            </div>
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
                  disabled = {true}
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
                  disabled = {true}
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
                  value={breweryNames[beer.brewery_id]}
                  disabled = {true}
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
                  value={supplierNames[beer.supplier_id]}
                  disabled = {true}
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
                  disabled = {true}
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
                  disabled = {true}
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
                  value={beer.price_per_keg}
                  disabled = {true}
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
                  value={beer.arrival_date}
                  disabled = {true}
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
                  value={beer.keg_size_id}
                  disabled = {true}
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
                  value={beer.serving_sizes}
                  disabled = {true}
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
                  value={beer.price_per_serving_size}
                  disabled = {true}
                  aria-label='Large'
                  aria-describedby='inputGroup-sizing-sm'
                />
              </div>
            </div>

            {/* Add more fields similarly */}
          </div>
        </div>
      </Container>

      <div className="overlay" ref={popup}>
        <div className="overlay-inner">
          {popupVisible && <TapPopup editMode={Boolean(beer.tap_number)} onSave={handleClick} beerData={beer} onClose={onPopupClose} />}
        </div>
      </div>
    </div>
  );
}



const TapPopup = ({ show, onClose, beerData, onSave, editMode }) => {
  const [tapNumber, setTapNumber] = useState(beerData.tap_number)
  const [beer, setBeer] = useState(beerData)
  const popup = useRef()

  useEffect(() => {
    setBeer(beerData)
  }, [])

  function addToTap(){
    // send a post request to add beer to tap
    onSave(beer)
    setTimeout(() => onClose(), 500)
  }

  function onChange(e){
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function closePopup(){
    onClose()
  }

  return(
    <div className="card p-3 rounded mx-auto" style={{maxWidth: '500px',}}>
      <label className="form-label"> Tap Number </label>
      
      <Form.Control
        onChange={onChange}
        type='number'
        name='tap_number'
        value={beer.tap_number}
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
      />

      <div className="mt-3">
        <Button onClick={addToTap} className="bold" variant="primary"> {editMode ? `Change Tap` : "Add to Tap"} </Button>
        <Button onClick={closePopup} className="mx-2 bold" variant="warning"> Cancel </Button>
      </div>
    </div>
  )
}




export default UpdateBeer;
