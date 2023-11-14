import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, div, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Skeleton} from '../../components'
import {GlobalStore} from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTruck, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
// import PDFDocument from '../../contexts/PDFDocument';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

function AddBeer() {
  const [beer, setBeer] = useState({
    tap_number: null,
    name: '',
    type: '',
    brewery_id: '',
    supplier_id: '',
    description: '',
    flavor_details: '',
    price_per_keg: '',
    arrival_date: '',
    keg_size_id: '',
    serving_sizes: '',
    price_per_serving_size: '',
    category_id: null,
    tap_id: null,
    status: 'ordered', // Default status is "ordered"
  });

  const [breweries, setBreweries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [kegSizes, setKegSizes] = useState([]);
  const [orderedItems, setOrderedItems] = useState([])
  const [supplierNames, setSupplierNames] = useState({}); 
  const [breweryNames, setBreweryNames] = useState({});
  const [kegsize, setKegsize] = useState({}); 
  const [pageLoading, setPageLoading] = useState(true); 
  // const [error, setError] = useState(null);
  // const [isDisabled, setIsDisabled] = useState(true); // Set it to true to initially disable the input
  const navigate = useNavigate();
  
  // get api Url from GlobalStore
  const {apiUrl} = useContext(GlobalStore)

  const orderedItemsTableRef = useRef(null);


  // function to save table as pdf
  // const exportTableAsPDF = () => {
  //   const input = orderedItemsTableRef.current;
  
  //   if (input) {
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
  //       pdf.save('ordered-items.pdf');
  //     });
  //   }
  // };

  // Exporting as CSV

  function exportTableAsCSV(table, filename) {
    const rows = table.querySelectorAll('tr');
    const csv = [];
  
    for (let i = 0; i < rows.length; i++) {
      const row = [];
      const cols = rows[i].querySelectorAll('td, th');
  
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
  
      csv.push(row.join(','));
    }
  
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
  

  useEffect(() => {
    // Fetch breweries and suppliers to populate dropdowns
    axios
      .get(`${apiUrl}/breweries`)
      .then((response) => {
        setBreweries(response.data);
                        // Create a map of supplier IDs to names
                        const breweryNamesMap = {};
                        response.data.forEach((brewery) => {
                           breweryNamesMap[brewery.brewery_id] = brewery.name;
                        });
                        setBreweryNames(breweryNamesMap);
      })
      .catch((error) => {
        console.error('Error fetching breweries:', error);
      });

    axios
      .get('${apiUrl}/suppliers')
      .then((response) => {
        setSuppliers(response.data);
                // Create a map of supplier IDs to names
                const supplierNamesMap = {};
                response.data.forEach((supplier) => {
                  supplierNamesMap[supplier.supplier_id] = supplier.name;
                });
                setSupplierNames(supplierNamesMap);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });

    // Fetch keg sizes from the kegsizes table
    axios
      .get('${apiUrl}/kegsizes')
      .then((response) => {
        setKegSizes(response.data);
                                // Create a map of supplier IDs to names
                                const kegsizesMap = {};
                                response.data.forEach((kegsize) => {
                                   kegsizesMap[kegsize.keg_size_id] = kegsize.size;
                                });
                                setKegsize(kegsizesMap);
      })
      .catch((error) => {
        console.error('Error fetching keg sizes:', error);
      });
  }, []);

  useEffect(() => {
    // Load ordered items from local storage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];
    setOrderedItems(storedItems);

    setTimeout(() => setPageLoading(false), 1000)
  }, []);

    // Function to add the current beer to the list of ordered items
    const addBeerToOrder = () => {
      const newOrderedItems = [...orderedItems, beer];
      setOrderedItems(newOrderedItems);
  
      // Save the updated ordered items to local storage
      localStorage.setItem('orderedItems', JSON.stringify(newOrderedItems));
      // Reload the page
      window.location.reload();
  
      setBeer({
        // Reset the beer state after adding to the order
      });
      
    };


  // Function to remove a beer from the order list
  const removeBeerFromOrder = (index) => {
    const updatedItems = [...orderedItems];
    updatedItems.splice(index, 1);
    setOrderedItems(updatedItems);

    // Update local storage after removing an item
    localStorage.setItem('orderedItems', JSON.stringify(updatedItems));
  };
  

  const handleChange = (e) => {
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmailToStaff = async (orderedBeer) => {
    try {

      // Construct the email body
      const body = `
        NOTIFICATION - New order with ${supplierNames[orderedBeer.supplier_id]}
        Please print and replace your ordered beer list from the attachment.
      `;

      const recipientEmail = 'staff@example.com'; // Replace with the staff's email
      const subject = `New ${supplierNames[orderedBeer.supplier_id]} Beer Order for Location...`;

      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Open the default email client with the pre-filled email
      window.location.href = mailtoLink;
    } catch (error) {
      console.error('Error sending email to staff:', error);
    }
  };

  // function to get all beers from local storage and push to database to handle order
  const handleClick = async (e) => {
  e.preventDefault();
  const beerUrl = '${apiUrl}/beers/';

  try {
    // Get all orders from local storage
    const localOrders = JSON.parse(localStorage.getItem('orderedItems')) || [];
    //console.log(localOrders)

    // Iterate through each order and send it to the database
    for (const localOrder of localOrders) {
      const orderedBeer = { ...localOrder, status: 'ordered' };
      console.log(orderedBeer)
      const response = await axios.post(beerUrl, orderedBeer);

      if (response.data) {
        // Send an email to the staff with beer details for each order if needed
        sendEmailToStaff(orderedBeer);
      } else {
        console.error('No data received from the API for order:', orderedBeer);
      }
    }

    // Export table as pdf
    // exportTableAsPDF();

    // Export table as CSV
    exportTableAsCSV(document.querySelector('.brewery-table'), 'ordered-items.csv');


    // Clear the orders from local storage after they are successfully sent to the database
    localStorage.removeItem('orderedItems');

    // Navigate to the beers page or do other actions as needed
    navigate('/beers');
  } catch (err) {
    console.error('Error adding orders:', err);
  }
};


  // // Function to handle the Order button click
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const beerUrl = '${apiUrl}/beers/';

  //   try {
  //     // Order the beer (update its status to "Ordered")
  //     const orderedBeer = { ...beer, status: 'ordered' };
  //     const response = await axios.post(beerUrl, orderedBeer);

  //     // Check if the response contains the newly created beer data
  //     if (response.data) {
  //       // Send an email to the staff with beer details
  //       sendEmailToStaff();
  //     } else {
  //       console.error('No data received from the API');
  //     }

  //     navigate('/beers');
  //   } catch (err) {
  //     console.error('Error adding beer:', err);
  //   }
  // };

  if (pageLoading){
    return(
      <div className="page">
      <Skeleton className="mt-5" />
      </div>
    )
  }

  return (
    <div className="page">
      <Container className='contMargin'>
        <div className=''>
          <Button
              variant='dark'
              size='md'
              href={"/beers"}
              className="mt-5 mb-2 btn-extra"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <b> Back </b>
          </Button>

          <h1 className='listUntapTitle '>Order Beer</h1>       

          <div className="form my-3 bg-light p-2 rounded">
            {/* <div size="lg">
              <label className="form-label"id="tap_number">Tap Number</label>
              <Form.Control
                onChange={handleChange}
                name="tap_number"
                type="number"
                aria-describedby="tap_number"
                disabled={isDisabled}
              />
            </div> */}

            <div className="row">
              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="name">Beer Name</label>
                  <Form.Control
                    onChange={handleChange}
                    name="name"
                    type="text"
                    aria-describedby="name"
                  />
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="type">Type of Beer</label>
                  <Form.Control
                    onChange={handleChange}
                    name="type"
                    aria-describedby="type"
                  />
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div>
                  <label className="form-label"htmlFor="brewery_id">Brewery:</label>
                  <select
                    className="form-select"
                    name="brewery_id"
                    onChange={handleChange}
                    defaultValue={''}
                  >
                    <option value="" disabled>
                      Select Brewery
                    </option>
                    {breweries.map((brewery) => (
                      <option key={brewery.brewery_id} value={brewery.brewery_id}>
                        {brewery.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div>
                  <label className="form-label"htmlFor="supplier_id">Supplier:</label>
                  <select
                    className="form-select"
                    name="supplier_id"
                    onChange={handleChange}
                    defaultValue={''}
                  >
                    <option value="" disabled>
                      Select Supplier
                    </option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.supplier_id} value={supplier.supplier_id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-8">
                <div size="lg">
                  <label className="form-label"id="description">Brief Description</label>
                  <Form.Control
                    as="textarea" // Use textarea for brief description
                    onChange={handleChange}
                    name="description"
                    aria-describedby="description"
                  />
                </div>
              </div>

              <hr className="mx-0 px-0 my-3" />

              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="flavor_details">Flavor Details</label>
                  <Form.Control
                    onChange={handleChange}
                    name="flavor_details"
                    type="text"
                    aria-describedby="flavor_details"
                  />
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="price_per_keg">Price Per Keg ($)</label>
                  <Form.Control
                    onChange={handleChange}
                    name="price_per_keg"
                    type="number"
                    aria-describedby="price_per_keg"
                  />
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="arrival_date">Arrival Date</label>
                  <Form.Control
                    onChange={handleChange}
                    name="arrival_date"
                    type="date"
                    aria-describedby="arrival_date"
                  />
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div>
                  <label className="form-label"htmlFor="keg_size">Keg Size:</label>
                  <select
                    className="form-select"
                    name="keg_size_id"
                    onChange={handleChange}
                    defaultValue={''}
                  >
                    <option value="" disabled>
                      Select Keg Size
                    </option>
                    {kegSizes.map((kegSize) => (
                      <option key={kegSize.keg_size_id} value={kegSize.keg_size_id}>
                        {kegSize.size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div>
                  <label className="form-label"htmlFor="serving_sizes">Serving Sizes:</label>
                  <select
                    className="form-select"
                    name="serving_sizes"
                    onChange={handleChange}
                    defaultValue={''}
                  >
                    <option value="" disabled>
                      Select Serving Sizes
                    </option>
                    <option value="16oz">16oz</option>
                    <option value="10oz">10oz</option>
                    <option value="6oz">6oz</option>
                  </select>
                </div>
              </div>

              <div className="my-2 col-sm-12 col-md-4">
                <div size="lg">
                  <label className="form-label"id="price_per_serving_size">
                    Price Per Serving ($)
                  </label>
                  <Form.Control
                    onChange={handleChange}
                    name="price_per_serving_size"
                    type="number"
                    aria-describedby="price_per_serving_size"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-2 bg-light rounded mt-2 my-4">
            {/* <Button
            variant='primary'
            size='lg'
             className='btn-extra' onClick={handleClick}>
              Order
            </Button> */}
            <Button
              variant="info"
              size="md"
              className="bold w-fit btn-extra"
              onClick={addBeerToOrder}
            >
             <FontAwesomeIcon icon={faSave} /> Save to Queue
            </Button>
          </div>
        </div>
        
        <hr />

        {/* Display the table of ordered items */}
        <div>
          <h3 className="listUntapTitle">Order Queue </h3>
          
          <div className="table-wrapper">
            <table className='table table-responsive table-striped brewery-table' ref={orderedItemsTableRef}>
              <thead>
                <tr className='tbl-left'>
                  <th className="tbl-left bg-dark text-white"> Beer Name</th>
                  <th className="tbl-left bg-dark text-white"> Beer Type</th>
                  <th className="tbl-left bg-dark text-white"> Brewery</th>
                  <th className="tbl-left bg-dark text-white"> Supplier</th>
                  <th className="tbl-left bg-dark text-white"> Description</th>
                  <th className="tbl-left bg-dark text-white"> Flavor</th>
                  <th className="tbl-left bg-dark text-white"> Price Per Keg $</th>
                  <th className="tbl-left bg-dark text-white"> Arrival Date</th>
                  <th className="tbl-left bg-dark text-white"> Keg Size</th>
                  <th className="tbl-left bg-dark text-white"> Serving Size</th>
                  <th className="tbl-left bg-dark text-white"> Price Per Serving $</th>
                  <th className="tbl-left bg-dark text-white"> Status</th>
                  <th className="tbl-left bg-dark text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderedItems.map((item, index) => (
                  <tr key={index} className='tbl-left'>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{breweryNames[item.brewery_id]}</td>
                    <td>{supplierNames[item.supplier_id]}</td>
                    <td>{item.description}</td>
                    <td>{item.flavor_details}</td>
                    <td>{item.price_per_keg}</td>
                    <td>{item.arrival_date}</td>
                    <td>{kegsize[item.keg_size_id]}</td>
                    <td>{item.serving_sizes}</td>
                    <td>{item.price_per_serving_size}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeBeerFromOrder(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orderedItems.length > 0 && (
            <div className="p-2 bg-light rounded">
              <Button
                variant="danger"
                size="md"
                className="bold w-fit btn-extra"
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faTruck} /> Place Beer Order
              </Button>
            </div>
          )}
        </div>

      </Container>  
    </div>
  );
}

export default AddBeer;
