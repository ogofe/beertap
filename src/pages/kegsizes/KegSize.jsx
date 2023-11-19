import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
//import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStore} from '../../App';


function KegSizes() {
  //const navigate = useNavigate();
  //const location = useLocation();
  //const breweryId = location.pathname.split('/')[3];
  const [isDeleted, setIsDeleted] = useState(false);
  const [kegsize, setKegsize] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const maxRecords = 5; // Define the maximum number of records per table
  const [activePage, setActivePage] = useState(0);
  const {apiUrl} = useContext(GlobalStore)
  const sizeUrl = `${apiUrl}/kegsizes/`;

  // Fetch all Suppliers using the useEffect
  useEffect(() => {
    const fetchAllSizes = async () => {
      try {
        const res = await axios.get(sizeUrl);
        setKegsize(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSizes();
  }, [isDeleted]); // Include isDeleted in the dependency array

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
      const deleteUrl = `${sizeUrl}${id}`;
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
    if (activePage < Math.ceil(kegsize.length / maxRecords) - 1) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevious = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  // Calculate the range of records to display on the current page
  const start = activePage * maxRecords;
  const end = start + maxRecords;

  return (
    <div className="page">
      <Container className='contMargin'>
        
        <div className="d-flex justify-content-between mb-3 align-items-center flex-wrap w-100">
          <h2 className='listUntapTitle my-4 w-fit'>Keg Sizes</h2>

          <Button variant='primary' size='md'>
            <Link to="/kegsizes/add" className="update-link btn-extra">
              <FontAwesomeIcon icon={faAdd} /> Add KegSize
            </Link>
          </Button>
        </div>

        {deleteConfirmation && <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>}
        
        <div className="table-wrapper">
          <table className="brewery-table">
            <thead>
              <tr>
                <th className='tbl-left'>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {kegsize.slice(start, end).map((size) => (
                <tr key={size.keg_size_id}>
                  <td className='tbl-left'>{size.size}</td>
                  <td>
                    <div className="d-flex">
                      <Button className="warning mr-1">
                        <Link to={`/kegsizes/update/${size.keg_size_id}`} className="update-link">
                        <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Button>

                      <Button onClick={() => handleDelete(size.keg_size_id)} variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Button 
          onClick={handlePrevious} 
          disabled={activePage === 0} 
          style={{
            background:'none',
            color:"black",
            border: "none"
            }}>
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={activePage === Math.ceil(kegsize.length / maxRecords) - 1}
            style={{
                background:'none',
                color:"black",
                border: "none"
                }}
          >
            Next
          </Button>
        </div>
        
      </Container>
    </div>
  );
}

export default KegSizes;
