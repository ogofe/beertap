import React, { useEffect, useContext, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { ResponsiveTable } from '../../components';
import { Button, Container, InputGroup, FormControl, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBeerMugEmpty, faChevronRight, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import {GlobalStore} from '../../App'
import 'bootstrap/dist/css/bootstrap.min.css';



const Headers = [
  { id: 0, Header: 'Tap Number', accessor: 'tap_number'},
  { id: 1, Header: 'Beer Name', accessor: 'name'},
  { id: 2, Header: 'Beer Type', accessor: 'type'},
  { id: 3, Header: 'Brewery Name', accessor: 'name'},
  { id: 4, Header: 'Supplier Name', accessor: 'name'},
  { id: 5, Header: 'Description', accessor: 'description'},
  { id: 6, Header: 'Flavor', accessor: 'flavor_details'},
  { id: 7, Header: 'Price per Keg ($)', accessor: 'price_per_keg'},
  { id: 8, Header: 'Serving Sizes', accessor: 'serving_sizes'},
  { id: 9, Header: 'Price per Service Size ($)', accessor: 'price_per_serving_size'},
  { id: 10, Header: 'Arrival Date', accessor: 'arrival_date'},
  { id: 11, Header: 'Status', accessor: 'status'},
]

function Beers() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [beers, setBeers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Manage search functionality
  const maxRecords = 10; // Define the maximum number of records per table
  const [activePage, setActivePage] = useState(0);
  const {apiUrl} = useContext(GlobalStore)
  const beerUrl = `${apiUrl}/beers/`

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
      const response = await axios.get(`${apiUrl}/breweries/${breweryId}`);
      return response.data.name; // Assuming the brewery name is available in the response
    } catch (err) {
      console.log(err);
      return "Unknown Brewery"; // Handle errors gracefully
    }
  };

  // Define an async function to fetch the supplier name based on supplier_id
  const fetchSupplierName = async (supplierId) => {
    try {
      const response = await axios.get(`${apiUrl}/suppliers/${supplierId}`);
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
    <div className="page">
      <Container className='contMargin'>
        <h1 className='listUntapTitle text-left mb-3 pt-5'>Beer Stock</h1>
        
        <div className='d-flex justify-content-between mb-3'>
          <InputGroup className='w-50'>
            <FontAwesomeIcon style={{
             padding: '11px', backgroundColor: 'grey', color: '#fff',
             borderRadius: '4px 0px 0px 4px'
            }} icon={faSearch} />
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

          <div className="mx-2">
            <Button variant='primary' size='md' className="w-fit mr-3">
              <Link to="/beers/add" className="update-link">
                Order Beer 
                <FontAwesomeIcon className="mx-2" icon={faBeerMugEmpty} />
              </Link>
            </Button>
          </div>
        </div>
        
        {deleteConfirmation && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>
        )}

        {/* Add the search input field */}
        
        <Fragment>

          {/* table */}
          <div className="table-wrapper">
            <Table responsive className="rounded nowrap brewery-table table table-responsive table-striped">
              <thead className="rounded">
                <tr className='text-white'>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Tap Number</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Beer Name</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Beer Type</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Brewery Name</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Supplier Name</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Description</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Flavor</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Price per Keg ($)</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Serving Sizes</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Price per Service Size ($)</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Arrival Date</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Status</th>
                  <th colspan="1" className='bg-dark text-white w-fit tbl-left'>Add To Tap</th>
                </tr>
              </thead>

              <tbody>
                {beers.length > 1 && beers.slice(start, end).map((beer) => (
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
                    <td className="d-flex tbl-left">
                      <Button className="mx-2">
                        <Link to={`/beers/update/${beer.product_id}`} className="update-link">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Button>

                      <Button 
                      onClick={() => handleDelete(beer.product_id)} 
                      variant="dark"
                      disabled={true}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}

                {beers.length < 1 && (

                  <tr>
                    <td colspan="13" className="text-danger font-weight-bold"> SORRY No beers to show</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          
          {beers.length > 1 &&
            <div>
            <Button
              onClick={handlePrevious}
              disabled={activePage === 0}
              style={{
                // background: 'none',
                color: 'black',
                border: 'none',
              }}
              className=""
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Previous 
            </Button>

            <Button
              onClick={handleNext}
              className="mx-2"
              disabled={activePage === Math.ceil(beers.length / maxRecords) - 1}
              style={{
                // background: 'none',
                color: 'black',
                border: 'none',
              }}
            >
              Next <FontAwesomeIcon icon={faChevronRight} />
            </Button>
            </div>
          }
        </Fragment>
      </Container>
    </div>
  );
}

export default Beers;

/*


*/