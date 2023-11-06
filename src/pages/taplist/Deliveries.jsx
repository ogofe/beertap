import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Deliveries() {
  const [beerList, setBeerList] = useState([]); // Original list of beers
  const [filteredBeerList, setFilteredBeerList] = useState([]); // Filtered list based on status
  const updateUrl = 'http://localhost:5001/api/tap/updateStatus';

  useEffect(() => {
    // Fetch data from the API to populate the list of beers
    axios.get('http://localhost:5001/api/beers').then((response) => {
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
    <>
      <Container className='contMargin'>
        <br />
        <h2 className='listUntapTitle'>Deliveries</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='tbl-left'>Beer Name</th>
              <th className='tbl-left'>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeerList.map((beer) => (
              <tr key={beer.product_id}>
                <td className='tbl-left'>{beer.name}</td>
                <td
                  className='tbl-left'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '20px',
                    color: 'orange', // Assuming 'Ordered' status is displayed in orange
                  }}
                >
                  {beer.status}
                </td>
                <td>
                  <Button
                    className='tap'
                    variant='success'
                    onClick={() => updateBeerStatus(beer.product_id, 'delivered')}
                  >
                    Received
                  </Button>
                  <Button
                    className='tap'
                    variant='primary'
                    onClick={() => updateBeerStatus(beer.product_id, 'upcoming')}
                  >
                    Not Received
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Deliveries;
