import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Container, Table, ButtonGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStore} from '../../App';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Deliveries() {
  const [beerList, setBeerList] = useState([]); // Original list of beers
  const [filteredBeerList, setFilteredBeerList] = useState([]); // Filtered list based on status
  const {apiUrl} = useContext(GlobalStore)
  const updateUrl = `${apiUrl}/tap/updateStatus`;

  useEffect(() => {
    // Fetch data from the API to populate the list of beers
    axios.get(`${apiUrl}/beers`).then((response) => {
      if (response.data) {
        setBeerList(response.data);
        // Initialize filtered list with beers with 'ordered' status
        const orderedBeers = response.data.filter((beer) => beer.status === 'ordered');
        setFilteredBeerList(orderedBeers);
      } else {
        console.error('Beer data is missing in the response');
      }
    });
  }, []);

  // Opening mailer and sending mail
  const sendEmailToManager = (beerId) => {
    const recipientEmail = 'manager@example.com'; // Replace with the manager's email
    const subject = 'Beer Issue Report';
    const beerName = beerList.find((beer) => beer.product_id === beerId)?.name || 'Unknown Beer';
    const body = ` Beer ID: ${beerId}\nBeer Name: ${beerName} has been marked as Upcoming due to issues....`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the pre-filled email
    window.location.href = mailtoLink;
  };

  const updateBeerStatus = (beerId, newStatus) => {
    axios
      .patch(`${updateUrl}/${beerId}`, { status: newStatus })
      .then(() => {
        // After updating the beer status, update it in the original list of beers
        const updatedBeerList = beerList.map((beer) =>
          beer.product_id === beerId ? { ...beer, status: newStatus } : beer
        );
        setBeerList(updatedBeerList);

        // Filter the beers based on status (e.g., 'ordered')
        const filteredBeers = updatedBeerList.filter((beer) => beer.status === 'ordered');
        setFilteredBeerList(filteredBeers);

        if (newStatus === 'upcoming') {
          // Open the default email client with pre-filled email
          sendEmailToManager(beerId);
        }
      })
      .catch((error) => {
        console.error('Error updating beer status:', error);
      });
  };

  return (
    <div className="page">
      <Container className='pt-5'>
        
        <h2 className='listUntapTitle my-3'>Deliveries</h2>
        
        <div className="table-wrapper">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th className='bg-dark text-white tbl-left'>Beer Name</th>
                <th className='bg-dark text-white tbl-left'>Status</th>
                <th className="bg-dark text-white ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeerList.map((beer) => (
                <tr key={beer.product_id}>
                  <td className='tbl-left'>{beer.name}</td>
                  <td className='text-center'>
                    <Badge bg="warning" className="text-black bolder bold" style={{fontSize: '15px'}}> {beer.status} </Badge>
                  </td>
                  <td>
                    <DropdownButton as={ButtonGroup} title="Set Delivery status" id="bg-nested-dropdown">
                      <Dropdown.Item
                        onClick={() => updateBeerStatus(beer.product_id, 'delivered')}
                        className="bg-success text-white p-2" as={Button}
                      > Delivery was Received </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => updateBeerStatus(beer.product_id, 'upcoming')}
                        className="bg-primary text-white p-2" as={Button}
                      > Delivery was not Received </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Deliveries;
