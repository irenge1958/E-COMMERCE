import React from 'react';
import { Navbar, Nav, Container,NavDropdown  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ResponsiveNav = () => {
  
  return (
    
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-center">
            <LinkContainer to="/productuserList/all">
              <Nav.Link className="ms-3">All</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productuserList/awaiting-shipment">
              <Nav.Link className="ms-3">Awaiting Shipment</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productuserList/intransit">
              <Nav.Link className="ms-3">In Transit</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productuserList/indelivering">
              <Nav.Link className="ms-3">Delivering</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productuserList/awaiting-list">
              <Nav.Link className="ms-3">Awaiting Picking</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productuserList/picked">
              <Nav.Link className="ms-3">Picked</Nav.Link>
            </LinkContainer>


<NavDropdown title="Category" id="category-dropdown" className="ms-3" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
<LinkContainer  to={{ pathname: "/allproduct" }}>
  <NavDropdown.Item >All</NavDropdown.Item>
</LinkContainer>

<LinkContainer to={{ pathname: "/allproduct", search: "?itemss=gadgets" }}>
  <NavDropdown.Item>Gadgets</NavDropdown.Item>
</LinkContainer>

<LinkContainer to={{ pathname: "/allproduct", search: "?itemss=agriculture-tools" }}>
  <NavDropdown.Item>Agriculture Tools</NavDropdown.Item>
</LinkContainer>

<LinkContainer to={{ pathname: "/allproduct", search: "?itemss=cars" }}>
  <NavDropdown.Item>Cars</NavDropdown.Item>
</LinkContainer>

<LinkContainer to={{ pathname: "/allproduct", search: "?itemss=computers" }}>
  <NavDropdown.Item>Computers</NavDropdown.Item>
</LinkContainer>

<LinkContainer to={{ pathname: "/allproduct", search: "?itemss=Energy" }}>
  <NavDropdown.Item>Energy</NavDropdown.Item>
</LinkContainer>

</NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ResponsiveNav;
