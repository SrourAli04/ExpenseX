import React from "react";
import { Container, Navbar } from "react-bootstrap";

const AppNavbar: React.FC = () => {
    return (
        <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand className="text-white">Expense Tracker</Navbar.Brand>
        </Container>
      </Navbar>
    );
}
    
export default AppNavbar;