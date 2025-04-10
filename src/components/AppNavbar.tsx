import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar: React.FC = () => {
  return (
    <Navbar className="bg-primary" expand="lg">
      <Container>
        <Navbar.Brand className="text-white">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className='text-white'
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/stats" 
              className='text-white'
            >
              Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;