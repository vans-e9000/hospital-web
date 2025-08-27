import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Lugoda Hospital</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="home" spy={true} smooth={true} offset={-70} duration={500}>Home</Nav.Link>
            <Nav.Link as={Link} to="about" spy={true} smooth={true} offset={-70} duration={500}>About</Nav.Link>
            <Nav.Link as={Link} to="services" spy={true} smooth={true} offset={-70} duration={500}>Services</Nav.Link>
            <Nav.Link as={Link} to="doctors" spy={true} smooth={true} offset={-70} duration={500}>Doctors</Nav.Link>
            <Nav.Link as={Link} to="faq" spy={true} smooth={true} offset={-70} duration={500}>FAQ</Nav.Link>
            <Nav.Link as={Link} to="contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
