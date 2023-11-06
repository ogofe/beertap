import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
//import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


function Categories() {
  //const navigate = useNavigate();
  //const location = useLocation();
  //const breweryId = location.pathname.split('/')[3];
  const [isDeleted, setIsDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const maxRecords = 5; // Define the maximum number of records per table
  const [activePage, setActivePage] = useState(0);

  const categoryUrl = 'http://localhost:5001/api/categories/';

  // Fetch all breweries using the useEffect
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(categoryUrl);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategories();
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
      const deleteUrl = `${categoryUrl}${id}`;
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
    if (activePage < Math.ceil(categories.length / maxRecords) - 1) {
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
    <div>
      <Container className='contMargin'>
        <br />
        <h1 className='listUntapTitle'>Categories</h1>
        {deleteConfirmation && <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>}
        <table className="brewery-table">
          <thead>
            <tr>
              <th className='tbl-left'>Name</th>
              <th className='tbl-left'>Type</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.slice(start, end).map((category) => (
              <tr key={category.category_id}>
                <td className='tbl-left'>{category.name}</td>
                <td className='tbl-left'>{category.type}</td>
                <td>
                  <Button>
                    <Link to={`/categories/update/${category.category_id}`} className="update-link">
                    <FontAwesomeIcon icon={faEdit} /> 
                    </Link>
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleDelete(category.category_id)} variant="dark">
                  <FontAwesomeIcon icon={faTrash} />
                  </Button>
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
            background:'none',
            color:"black",
            border: "none"
            }}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={activePage === Math.ceil(categories.length / maxRecords) - 1}
            style={{
                background:'none',
                color:"black",
                border: "none"
                }}
          >
            Next
          </Button>
        </div>
        <br />
        <Button variant='primary' size='lg'>
          <Link to="/categories/add" className="update-link btn-extra">
            Add Category
          </Link>
        </Button>
      </Container>
    </div>
  );
}

export default Categories;
