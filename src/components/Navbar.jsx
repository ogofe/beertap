import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink from react-router-dom

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Check if the user is logged in by inspecting local storage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to the login page
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // dispatch({ type: 'LOGOUT' });
    navigate('/')
// Reload the page
    // window.location.reload();
  };

  return (
    <Navbar className="fixed-top" expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/beers">
          University Of Beer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/beers">
              Beers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/beers/add">
              Order Beer
            </Nav.Link>
            <Nav.Link as={NavLink} to="/taplist">
              Tapped List
            </Nav.Link>

            <Nav.Link as={NavLink} to="/untaplist">
              Unapped List
            </Nav.Link>
            <Nav.Link as={NavLink} to="/deliveries">
              Deliveries
            </Nav.Link>
            <NavDropdown title="Extra" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/breweries">
                Breweries
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/categories">
                Categories
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/suppliers">
                Suppliers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/kegsizes">
                Keg Sizes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/users">
                Staff
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Nav.Link as={NavLink} to="/" className="ms-auto" style={{ color: 'white' }} onClick={isLoggedIn ? handleLogout : null}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
