import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function VHmenu() {
  return (
    <>
     
        <Navbar bg="light" expand="sm" className="mr-2 ml-2 mb-1 mt-0">
          <Container fluid>
            <Navbar.Brand href="#">Admin Board</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"sm"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                    title="Operation"
                    id={`offcanvasNavbarDropdown-expand-${"sm"}`}
                  >
                    <NavDropdown.Item >Action</NavDropdown.Item>
                    <NavDropdown.Item>
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                 
                    <Link to={"/admin-board/clients-operations"} className="text-decoration-none text-secondary nav-link">New clients</Link>
            
                  <Nav.Link href="#">Link</Nav.Link>
                 
                </Nav>
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    
    </>
  );
}

export default VHmenu;