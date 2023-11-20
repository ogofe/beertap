import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Button, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink from react-router-dom
import {GlobalStore} from '../App'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const {onLogout, authUser} = useContext(GlobalStore)
  const {user, token} = authUser;

  useEffect(() => {
    // Check if the user is logged in by inspecting local storage
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to the login page
    onLogout()
  };

  return (
    <Navbar className="fixed-top" expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/beers">
          University Of Beer
        </Navbar.Brand>

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
        </Navbar.Collapse>

        <NavDropdown title={user} className="text-white chip" id="basic-nav-dropdown">    
          <NavDropdown.Item as={Button} onClick={handleLogout}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />

      </Container>
    </Navbar>
  );
}

export default Navigation;
