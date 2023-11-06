import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Beers() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [beers, setBeers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Manage search functionality
  const maxRecords = 10; // Define the maximum number of records per table
  const [activePage, setActivePage] = useState(0);
  const beerUrl = "http://localhost:5001/api/beers/";

  const [breweryNames, setBreweryNames] = useState({});
  const [supplierNames, setSupplierNames] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  //const navigate = useNavigate();

  // Calculate the range of records to display on the current page
  const start = activePage * maxRecords;
  const end = start + maxRecords;

  useEffect(() => {
    // Fetch all beers using the useEffect
    const fetchAllBeers = async () => {
      try {
        const res = await axios.get(beerUrl);
        setBeers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBeers();
  }, [isDeleted]);

  useEffect(() => {
    // Fetch all brewery names and store them in the state
    const fetchBreweryNames = async () => {
      const names = {};
      for (const beer of beers.slice(start, end)) {
        const breweryName = await fetchBreweryName(beer.brewery_id);
        names[beer.product_id] = breweryName;
      }
      setBreweryNames(names);
    };

    const fetchSupplierNames = async () => {
      const names = {};
      for (const beer of beers.slice(start, end)) {
        const supplierName = await fetchSupplierName(beer.supplier_id);
        names[beer.supplier_id] = supplierName;
      }
      setSupplierNames(names);
    };

    fetchBreweryNames();
    fetchSupplierNames();
  }, [beers, start, end]);

  // Helper function to format a date string as a short date (e.g., "MM/DD/YYYY")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Define an async function to fetch the brewery name based on brewery_id
  const fetchBreweryName = async (breweryId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/breweries/${breweryId}`);
      return response.data.name; // Assuming the brewery name is available in the response
    } catch (err) {
      console.log(err);
      return "Unknown Brewery"; // Handle errors gracefully
    }
  };

  // Define an async function to fetch the supplier name based on supplier_id
  const fetchSupplierName = async (supplierId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/suppliers/${supplierId}`);
      return response.data.name; // Assuming the supplier name is available in the response
    } catch (err) {
      console.log(err);
      return "Unknown Supplier"; // Handle errors gracefully
    }
  };

  useEffect(() => {
    // Check if a delete confirmation message is stored in localStorage
    const storedConfirmation = localStorage.getItem('deleteConfirmation');
    if (storedConfirmation) {
      setDeleteConfirmation(storedConfirmation);
      // Clear the stored message to prevent displaying it on subsequent visits
      localStorage.removeItem('deleteConfirmation');
    }
  }, []); // Run this effect only once on initial load

  const handleDelete = (id) => {
    // Display a confirmation prompt
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');

    if (confirmDelete) {
      const deleteUrl = `${beerUrl}${id}`;
      axios
        .delete(deleteUrl)
        .then((response) => {
          setIsDeleted(true);
          const confirmationMessage = 'Record deleted successfully.';
          setDeleteConfirmation(confirmationMessage);
          // Store the confirmation message in localStorage
          localStorage.setItem('deleteConfirmation', confirmationMessage);
          // Reload the page
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setIsDeleted(false);
          setDeleteConfirmation('Failed to delete the record.');
        });
    }

  };

  const handleNext = () => {
    if (activePage < Math.ceil(beers.length / maxRecords) - 1) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevious = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  // Define a function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Define a function to perform the search based on the search query
  const handleSearch = () => {
    // Filter beers based on the search query
    const filtered = filterBeers(searchQuery);
    // Reset the active page to 0 when performing a search
    setActivePage(0);
    // Set the filtered beers as the current display
    setBeers(filtered);
  };

  // Define a function to reset the search and show all beers
  const resetSearch = async () => {
    setSearchQuery('');
    try {
      const res = await axios.get(beerUrl);
      setBeers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Define a function to filter beers based on search query
  const filterBeers = (query) => {
    return beers.filter((beer) =>
      beer.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      <Container className='contMargin'>
        <br />
        <div className='orderNew'>
        <h1 className='orderTitle listUntapTitle'>Beer Stock</h1>
            <Button variant='primary' size='lg'>
              <Link to="/beers/add" className="update-link">
                Order Beer
              </Link>
            </Button>
        </div><br />
        
        {deleteConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>
        )}

        {/* Add the search input field */}
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='Search Beer Inventory by name...'
            aria-label='Search Beer'
            aria-describedby='basic-addon2'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            variant='outline-primary'
            id='button-addon2'
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant='outline-secondary'
            id='button-addon2'
            onClick={resetSearch}
          >
            Clear
          </Button>
        </InputGroup>

        {beers.length === 0 ? (
          <p className='noBeers'>SORRY : No Beers Found</p>
        ) : (
          <>
            <table className="brewery-table">
              <thead>
                <tr>
                  <th className='tbl-left'>Tap Number</th>
                  <th className='tbl-left'>Beer Name</th>
                  <th className='tbl-left'>Beer Type</th>
                  <th className='tbl-left'>Brewery Name</th>
                  <th className='tbl-left'>Supplier Name</th>
                  <th className='tbl-left'>Description</th>
                  <th className='tbl-left'>Flavor</th>
                  <th className='tbl-left'>Price per Keg ($)</th>
                  <th className='tbl-left'>Serving Sizes</th>
                  <th className='tbl-left'>Price per Service Size ($)</th>
                  <th className='tbl-left'>Arrival Date</th>
                  <th className='tbl-left'>Status</th>
                  <th>Add To Tap</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {beers.slice(start, end).map((beer) => (
                  <tr key={beer.product_id}>
                    <td className='tbl-left'>{beer.tap_number}</td>
                    <td className='tbl-left'>{beer.name}</td>
                    <td className='tbl-left'>{beer.type}</td>
                    <td className='tbl-left'>{breweryNames[beer.product_id]}</td>
                    <td className='tbl-left'>{supplierNames[beer.supplier_id]}</td>
                    <td className='tbl-left'>{beer.description}</td>
                    <td className='tbl-left'>{beer.flavor_details}</td>
                    <td className='tbl-left'>{beer.price_per_keg}</td>
                    <td className='tbl-left'>{beer.serving_sizes}</td>
                    <td className='tbl-left'>{beer.price_per_serving_size}</td>
                    <td className='tbl-left'>{formatDate(beer.arrival_date)}</td>
                    <td
                      className="tbl-left"
                      style={{
                        fontWeight: 'bolder',
                        fontSize: '15px',
                        color:
                          beer.status === 'upcoming'
                            ? 'grey'
                            : beer.status === 'on-tap'
                            ? 'tomato'
                            :beer.status === 'ordered'
                            ? 'orange'
                            :beer.status === 'delivered'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {beer.status}
                    </td>
                    <td>
                      <Button>
                        <Link to={`/beers/update/${beer.product_id}`} className="update-link">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Button>
                    </td>
                    <td>
                      {/* <Button 
                      onClick={() => handleDelete(beer.product_id)} 
                      variant="dark"
                      disabled={true}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Button
                onClick={handlePrevious}
                disabled={activePage === 0}
                style={{
                  background: 'none',
                  color: 'black',
                  border: 'none',
                }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={activePage === Math.ceil(beers.length / maxRecords) - 1}
                style={{
                  background: 'none',
                  color: 'black',
                  border: 'none',
                }}
              >
                Next
              </Button>
            </div>
            <br />
            <Button variant='primary' size='lg'>
              <Link to="/beers/add" className="update-link">
                Order Beer
              </Link>
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default Beers;
