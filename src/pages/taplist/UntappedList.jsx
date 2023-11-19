import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Container, Table, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStore} from '../../App';


function UntappedList() {
  const [tapList, setTapList] = useState([]);
  const [untappedList, setUntappedList] = useState([]);
  const {apiUrl} = useContext(GlobalStore)
  const tapListUrl = `${apiUrl}/tap/`;
  const untappedListUrl = `${apiUrl}/tap/untappedList`;
  const updateUrl = `${apiUrl}/tap/updateStatus`;
  const bgColor = {
    'upcoming'    : 'secondary',
    'delivered'   : 'success',
    'ordered'     : 'warning',
    'empty'    : 'danger',
  }

  useEffect(() => {
    // Fetch data from the tapList URL
    // axios.get(tapListUrl).then((response) => {
    //   if (response.data && response.data.tapList) {
    //     setTapList(response.data.tapList);
    //   } else {
    //     console.error('tapList data is missing in the response');
    //   }
    // });

    // Fetch data from the untappedList URL
    axios.get(untappedListUrl).then((response) => {
      if (response.data && response.data.untappedList) {
        // Filter out beers with status 'ordered'
        const filteredUntappedList = response.data.untappedList.filter(
          (beer) => beer.status !== 'ordered'
        );
        setUntappedList(filteredUntappedList);
      } else {
        console.error('untappedList data is missing in the response');
      }
    });
  }, []);

  const updateBeerStatus = (beerId, newStatus) => {
    axios.patch(`${updateUrl}/${beerId}`, { status: newStatus }).then(() => {
      // After updating the beer status, fetch both tapList and untappedList
      axios.get(tapListUrl).then((tapResponse) => {
        if (tapResponse.data && tapResponse.data.tapList) {
          setTapList(tapResponse.data.tapList);
        } else {
          console.error('tapList data is missing in the response');
        }
      });

      axios.get(untappedListUrl).then((untappedResponse) => {
        if (untappedResponse.data && untappedResponse.data.untappedList) {
          // Filter out beers with status 'ordered'
          const filteredUntappedList = untappedResponse.data.untappedList.filter(
            (beer) => beer.status !== 'ordered'
          );
          setUntappedList(filteredUntappedList);
        } else {
          console.error('untappedList data is missing in the response');
        }
      });
    });
  };

  return (
    <div className="page">
      <Container className='contMargin pt-3'>
        
        <h2 className='listUntapTitle my-3'>Untapped List</h2>

        <div className="table-wrapper">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th className="bg-dark text-white tbl-left">Beer Name</th>
                <th className="bg-dark text-white tbl-left">Status</th>
                <th className="bg-dark text-white ">Action</th>
              </tr>
            </thead>
            <tbody>
              {untappedList.map((beer) => (
                <tr key={beer.product_id}>
                  <td className="tbl-left">{beer.name}</td>
                  <td className="tbl-left">
                    <Badge 
                      bg={bgColor[beer.status]}
                      style={{
                        fontWeight: 'bolder',
                        fontSize: '15px',
                      }}> {beer.status} </Badge>
                  </td>
                  <td>
                    <Button
                      variant={beer.status !== 'delivered' ? "secondary" :"primary"}
                      onClick={() => updateBeerStatus(beer.product_id, 'on-tap')}
                      disabled={beer.status !== 'delivered'}
                    >
                      Put On Tap
                    </Button>
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

export default UntappedList;
