import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, div, Form, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTruckFast, faChevronLeft, faPenFancy, faCancel } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Skeleton, BackButton} from '../../components'
import {GlobalStore} from '../../App';
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
  const [categories, setCategories] = useState([]);
  const [orderedItems, setOrderedItems] = useState([])
  const [supplierNames, setSupplierNames] = useState({}); 
  const [breweryNames, setBreweryNames] = useState({});
  const [kegsize, setKegsize] = useState({}); 
  const [category, setCategory] = useState(""); 
  const [pageLoading, setPageLoading] = useState(true); 
  const [editItemId, setEditItemId] = useState(null); // item for editing
  const [editing, setEditingState] = useState(false); // Set it to true to initially disable editing
  const navigate = useNavigate();
  
  // get api Url from GlobalStore
  const {apiUrl, notify, translateError} = useContext(GlobalStore)

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
  
      for (let j = 0; j < cols.length - 1; j++) {
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

  function getBreweries(){
   // Fetch breweries and suppliers to populate dropdowns
    axios.get(`${apiUrl}/breweries`)
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
  }

  function getSuppliers(){
    axios.get(`${apiUrl}/suppliers`)
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
  }

  function getKegSizes(){
    // Fetch keg sizes from the kegsizes table
    axios.get(`${apiUrl}/kegsizes`)
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
  }

  function getCategories(){
    axios.get(`${apiUrl}/categories`)
    .then((response) => {
      setCategories(response.data);
        // console.log("Categories", response.data)
        // const categoriesMap = {};
        // response.data.forEach((cat) => {
        //    categoriesMap[cat.category_id] = cat.name;
        // });
        // setCategory(categoriesMap);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }

  useEffect(() => {
    getBreweries();

    getSuppliers();

    getKegSizes();

    getCategories();
    
    // Load ordered items from local storage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];
    setOrderedItems(storedItems);

    setTimeout(() => setPageLoading(false), 1000)
  }, []);


  // Function to add the current beer to the list of ordered items
  const addBeerToOrder = (e) => {
    e.preventDefault()
    try{
      const newOrderedItems = [...orderedItems, beer];
      setOrderedItems(newOrderedItems);

      // Save the updated ordered items to local storage
      localStorage.setItem('orderedItems', JSON.stringify(newOrderedItems));

      notify({
        level: 'success',
        title: "Beer Item Added",
        body: `You added ${beer.name} to your order queue!`
      })

      // Reset the beer state after adding to the order
      setBeer({}); 
    }catch (err){
      const processError = translateError(err)
      notify({
        level: 'info',
        title: processError.title,
        body: processError.body
      })
      console.log("Error adding to queue:", err)
    }
  };


  // Function to remove a beer from the order list
  const removeBeerFromOrder = (index) => {
    const updatedItems = [...orderedItems];
    const item = updatedItems [index]
    updatedItems.splice(index, 1);
    setOrderedItems(updatedItems);

    notify({
      level: 'success',
      title: "Beer Item Removed",
      body: `You remover ${item.name} to your order queue!`
    })

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
  const orderBeers = async (e) => {
    e.preventDefault();
    const beerUrl =  `${apiUrl}/beers/`;

    notify({
      level: 'info',
      title: "Processing...",
      body: `Please wait while we record your order!`
    })

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
      const processError = translateError(err)
      notify({
        level: 'info',
        title: processError.title,
        body: processError.body
      })
      console.error('Error adding orders:', err);
    }
  }

  function showOverlay(){
    // show editing form
    // .... code body
  }

  function editQueueItem(itemId){
    setEditingState(true)
    setEditItemId(itemId)
    const info = document.querySelector('#title')
    
    window.scrollTo({
      behavior: 'smooth',
      top: (info.offsetTop - 150)
    })
  }

  function saveBeerChanges(newBeer){
    orderedItems[editItemId] = newBeer
    setEditingState(false)
    setEditItemId(null)
    localStorage.setItem('orderedItems', JSON.stringify(orderedItems))
    notify({
      level: 'success',
      title: "Beer Item Changed",
      body: `You have made changes to ${newBeer.name}`
    })
    window.scrollTo({
      behavior: 'smooth',
      top: (0)
    })
  }

  function cancelEditing(){
    setEditItemId(null)
    setEditingState(false)
    window.scrollTo({
      behavior: 'smooth',
      top: (0)
    })
  }

  // Function to handle the Order button click
  const placeBeerOrder = async (e) => {
    e.preventDefault();
    const beerUrl = `${apiUrl}/beers/`;

    try {
      // Order the beer (update its status to "Ordered")
      const orderedBeer = { ...beer, status: 'ordered' };
      const response = await axios.post(beerUrl, orderedBeer);
      

      // Check if the response contains the newly created beer data
      if (response.data) {
        // Send an email to the staff with beer details
        sendEmailToStaff();
      } else {
        console.error('No data received from the API');
      }

      navigate('/beers');
    } catch (err) {

      console.error('Error adding beer:', err);  
    }
  };

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
          <BackButton path={"/beers"} />

          {editing &&
            <div className="p-3 my-4 bg-warning rounded fadeIn">
              <FontAwesomeIcon size='xl' className="d-block" icon={faPenFancy} />
              <p className="my-2"> You are now editing an item in the order queue, be careful your changes are permanent until altered. </p>
            </div>
          }

          <h1 className='listUntapTitle' id="title">{editing ? "Edit Beer" : "Order Beer" }</h1>       

          {/* Add Beer Form */}
          {editing ? (
              <EditQueueItem
                itemId={editItemId}
                breweries={breweries}
                suppliers={suppliers}
                kegSizes={kegSizes}
                categories={categories}
                orderedItems={orderedItems}
                supplierNames={supplierNames}
                breweryNames={breweryNames}
                onSave={saveBeerChanges}
                onCancel={cancelEditing}
              />
            ):(
              <div>
                <Form onSubmit={addBeerToOrder} id="add-form" className="form my-3 bg-light p-2 rounded">
                  <div className="row">
                    <div className="my-2 col-sm-12 col-md-4">
                      <div size="lg">
                        <label className="form-label"id="name">Beer Name</label>
                        <Form.Control
                          onChange={handleChange}
                          name="name"
                          required
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
                        <label className="form-label"htmlFor="brewery_id">Brewery</label>
                        <Form.Control
                          onChange={handleChange}
                          name="brewery_id"
                          aria-describedby="brewery_id"
                          as="select"
                        >
                          <option selected value="" disabled>
                            Select Brewery
                          </option>
                          {breweries.map((brewery) => (
                            <option key={brewery.brewery_id} value={brewery.brewery_id}>
                              {brewery.name}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>

                    <div className="my-2 col-sm-12 col-md-4">
                      <div>
                        <label className="form-label"htmlFor="supplier_id">Supplier</label>
                        <Form.Control
                          as="select"
                          name="supplier_id"
                          onChange={handleChange}
                          defaultValue={''}
                        >
                          <option value="" selected disabled>
                            Select Supplier
                          </option>
                          {suppliers.map((supplier) => (
                            <option key={supplier.supplier_id} value={supplier.supplier_id}>
                              {supplier.name}
                            </option>
                          ))}
                        </Form.Control>
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
                          min="1.00"
                          step="0.01"
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
                        <label className="form-label"htmlFor="keg_size">Keg Size</label>
                        <Form.Control
                          as="select"
                          name="keg_size_id"
                          onChange={handleChange}
                          defaultValue={''}
                        >
                          <option value="" selected disabled>
                            Select Keg Size
                          </option>
                          {kegSizes.map((kegSize) => (
                            <option key={kegSize.keg_size_id} value={kegSize.keg_size_id}>
                              {kegSize.size}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>

                    <div className="my-2 col-sm-12 col-md-4">
                      <div>
                        <label className="form-label"htmlFor="serving_sizes">Serving Size</label>
                        <Form.Control
                          as="select"
                          name="serving_sizes"
                          onChange={handleChange}
                          defaultValue={''}
                        >
                          <option value="" selected disabled>
                            Select Serving Size
                          </option>
                          <option value="16oz">16oz</option>
                          <option value="10oz">10oz</option>
                          <option value="6oz">6oz</option>
                        </Form.Control>
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
                          step="0.01"
                          min="1.00"
                          type="number"
                          aria-describedby="price_per_serving_size"
                        />
                      </div>
                    </div>
                  </div>
                </Form>

                <div className="p-2 bg-light rounded mt-2 my-4">
                  
                  <Button
                    variant="success"
                    size="md"
                    form="add-form"
                    type="submit"
                    className="bold w-fit btn-extra"
                  >
                   <FontAwesomeIcon icon={faSave} /> Save to Queue
                  </Button>
                </div>
              </div>
            )
          }
          {/* End Add Beer Form */}
          
        </div>
        
        <hr />

        {/* Display the table of ordered items */}
        <div>
          <h3 className="listUntapTitle">Order Queue </h3>
          
          <div className="table-wrapper">
            <table className='table table-responsive table-striped brewery-table' ref={orderedItemsTableRef}>
              <thead>
                <tr className='tbl-left'>
                  <th className="tbl-left bg-dark text-white"> Beer Name </th>
                  <th className="tbl-left bg-dark text-white"> Beer Type </th>
                  <th className="tbl-left bg-dark text-white"> Brewery </th>
                  <th className="tbl-left bg-dark text-white"> Supplier </th>
                  <th className="tbl-left bg-dark text-white"> Description </th>
                  <th className="tbl-left bg-dark text-white"> Flavor </th>
                  <th className="tbl-left bg-dark text-white"> Price Per Keg $ </th>
                  <th className="tbl-left bg-dark text-white"> Arrival Date </th>
                  <th className="tbl-left bg-dark text-white"> Keg Size </th>
                  <th className="tbl-left bg-dark text-white"> Serving Size </th>
                  <th className="tbl-left bg-dark text-white"> Price Per Serving $ </th>
                  <th className="tbl-left bg-dark text-white"> Status </th>
                  <th className="tbl-left bg-dark text-white">Action </th>
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
                      <div className="d-flex">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => editQueueItem(index)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          className="mx-2"
                          onClick={() => removeBeerFromOrder(index)}
                        >
                          Remove
                        </Button>
                      </div>
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
                onClick={orderBeers}
              >
                <FontAwesomeIcon icon={faTruckFast} /> Place Beer Order
              </Button>
            </div>
          )}
        </div>
      </Container>  
    </div>
  );
}



const EditQueueItem = ({
  itemId, breweries, suppliers,
  kegSizes, categories, orderedItems,
  supplierNames, breweryNames, onSave, onCancel,
}) => {

  const [orderQueue, setQueue] = useState([]);
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
  const [pageLoading, setPageLoading] = useState(true); 

  function getAllQueuedItems(){
    // get all queued items from local storage
    const queue = JSON.parse(
                    localStorage.getItem('orderedItems')
                  )

    setQueue(queue)
  }

  function getItemFromQueue(){
    const item = orderedItems[itemId];
    setBeer(item)
  }

  function handleChange(e){
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function saveBeerChanges(){
    onSave(beer)
  }

  function cancelEditing(){
    onCancel()
  }

  useEffect(() => {
    // getAllQueuedItems();
    getItemFromQueue();
  }, [])

  return(
    <div> 
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
            />
          </div>
        </div>

        {/* Beer Type */}
        <div className="col-sm-12 my-2 col-md-4">
          <div>
            <label className="form-label"> Type </label>
            <Form.Control
              onChange={handleChange}
              name='type'
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
              name='brewery_id'
              as="select"
              value={beer.brewery_id}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            >
            <option disabled value=""> Select brewery </option>
            {
              breweries.map((brewery, idx) => 
                <option key={brewery.brewery_id} value={brewery.brewery_id}> {brewery.name} </option>
              )
            }
            </Form.Control>
          </div>
        </div>

        {/* Beer Supplier */}
        <div className="col-sm-12 my-2 col-md-4">
          <div>
            <label className="form-label"> Supplier Name </label>
            <Form.Control
              onChange={handleChange}
              name='supplier_id'
              as="select"
              value={beer.supplier_id}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            >
            <option disabled value=""> Select supplier </option>
            {
              suppliers.map((supplier, idx) => 
                <option key={idx} value={supplier.supplier_id}> {supplier.name} </option>
              )
            }
            </Form.Control>
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
              name='flavor_details'
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
              name='price_per_keg'
              value={beer.price_per_keg}
              aria-label='Large'
              type="number"
              min="1"
              aria-describedby='inputGroup-sizing-sm'
            />
          </div>
        </div>

        <div className="col-sm-12 my-2 col-md-4">
          <div>
            <label className="form-label"> Arrival Date </label>
            <Form.Control
              onChange={handleChange}
              name='arrival_date'
              type="date"
              value={beer.arrival_date}
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
              name='keg_size_id'
              as="select"
              value={beer.keg_size_id}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            >
            <option disabled value=""> Select Keg Size </option>
            {
              kegSizes.map((size, idx) => 
                <option value={size.keg_size_id} key={idx}> {size.size} </option>
              )
            }
            </Form.Control>
          </div>
        </div>

        <div className="col-sm-12 my-2 col-md-4">
          <div>
            <label className="form-label"> Serving Size </label>
            <Form.Control
              onChange={handleChange}
              name='serving_sizes'
              value={beer.serving_sizes}
              aria-label='Large'
              as="select"
              aria-describedby='inputGroup-sizing-sm'
            >
              <option disabled value=""> Select Serving Size </option>
              <option value="16oz">16oz</option>
              <option value="10oz">10oz</option>
              <option value="6oz">6oz</option>
            </Form.Control>
          </div>
        </div>

        <div className="col-sm-12 my-2 col-md-4">
          <div>
            <label className="form-label"> Price Per Serving ($) </label>
            <Form.Control
              onChange={handleChange}
              name='price_per_serving_size'
              type="number"
              min="1"
              value={beer.price_per_serving_size}
              aria-label='Large'
              aria-describedby='inputGroup-sizing-sm'
            />
          </div>
        </div>

        {/* Add more fields similarly */}
      </div>

      <div className="p-2 bg-light rounded mt-2 my-4">         
        <Button
          variant="success"
          size="md"
          className="bold w-fit btn-extra mr-1 my-1"
          onClick={saveBeerChanges}
        >
         <FontAwesomeIcon icon={faSave} /> Save changes
        </Button>

        <Button
          variant="warning"
          size="md"
          className="bold w-fit btn-extra my-1"
          onClick={cancelEditing}
        >
         <FontAwesomeIcon icon={faCancel} /> Cancel Editing
        </Button>
      </div>
    </div>

  )
}




export default AddBeer;
