import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
//import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


function Users() {
  //const navigate = useNavigate();
  //const location = useLocation();
  //const breweryId = location.pathname.split('/')[3];
  const [isDeleted, setIsDeleted] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const maxRecords = 5; // Define the maximum number of records per table
  const [activePage, setActivePage] = useState(0);

  const userUrl = 'http://localhost:5001/api/users/';

  // Fetch all breweries using the useEffect
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(userUrl);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
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
      const deleteUrl = `${userUrl}${id}`;
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
    if (activePage < Math.ceil(users.length / maxRecords) - 1) {
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
        <h1>All Staffs</h1>
        {deleteConfirmation && <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>}
        <table className="brewery-table">
          <thead>
            <tr>
              <th className='tbl-left'>Username</th>
              <th className='tbl-left'>Full Name</th>
              <th className='tbl-left'>Email</th>
              <th className='tbl-left'>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.slice(start, end).map((user) => (
              <tr key={user.user_id}>
                <td className='tbl-left'>{user.username}</td>
                <td className='tbl-left'>{user.full_name}</td>
                <td className='tbl-left'>{user.email}</td>
                <td className='tbl-left'>{user.role}</td>
                <td>
                  <Button>
                    <Link to={`/users/update/${user.user_id}`} className="update-link">
                    <FontAwesomeIcon icon={faEdit} /> 
                    </Link>
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleDelete(user.user_id)} variant="dark">
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
            disabled={activePage === Math.ceil(users.length / maxRecords) - 1}
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
        <Button variant='primary' size='lg' className='btn-extra'>
          <Link to="/users/add" className="update-link">
            Add Staff
          </Link>
        </Button>
      </Container>
    </div>
  );
}

export default Users;
