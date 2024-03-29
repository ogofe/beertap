import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
//import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStore} from '../../App';
import useRoleBasedAccess from '../../hooks/useRole';


function Users() {
  //const navigate = useNavigate();
  //const location = useLocation();
  //const breweryId = location.pathname.split('/')[3];
  const [isDeleted, setIsDeleted] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const maxRecords = 5; // Define the maximum number of records per table
  const {apiUrl, axios} = useContext(GlobalStore)
  const [activePage, setActivePage] = useState(0);
  useRoleBasedAccess(['Super Admin', 'Admin'])

  const userUrl = `${apiUrl}/users/`;

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
    <div className="page">
      <Container className='contMargin'>

        <div className="d-flex flex-wrap my-5 pt-3 justify-content-between align-items-center">
          <h2 className="listUntapTitle"> Staff Accounts </h2>

          <Button variant='primary' size='md' className=''>
            <Link to="/users/add" className="update-link">
              <FontAwesomeIcon icon={faAdd} className="mx-2" /> Add Staff
            </Link>
          </Button>
        </div>

        {deleteConfirmation && <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteConfirmation}</p>}
        
        <div className="table-wrapper">
          <table className="table table-responsive brewery-table">
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
                    <div className="d-flex">
                      <Button className="mr-1">
                        <Link to={`/users/update/${user.user_id}`} className="update-link">
                          <FontAwesomeIcon icon={faEdit} /> 
                        </Link>
                      </Button>

                      <Button onClick={() => handleDelete(user.user_id)} variant="dark">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-light rounded p-2 my-3">
          <Button 
            onClick={handlePrevious} 
            disabled={activePage === 0}
            className="mr-1"
          >
           <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={activePage === Math.ceil(users.length / maxRecords) - 1}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
        
      </Container>
    </div>
  );
}

export default Users;
