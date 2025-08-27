import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer bg-light pt-5 pb-4">
      <Container>
        <Row className="text-center">
          <Col>
            <Nav className="justify-content-center mb-4">
              <Nav.Link as={Link} to="home" spy={true} smooth={true} offset={-70} duration={500}>Home</Nav.Link>
              <Nav.Link as={Link} to="about" spy={true} smooth={true} offset={-70} duration={500}>About</Nav.Link>
              <Nav.Link as={Link} to="services" spy={true} smooth={true} offset={-70} duration={500}>Services</Nav.Link>
              <Nav.Link as={Link} to="doctors" spy={true} smooth={true} offset={-70} duration={500}>Doctors</Nav.Link>
              <Nav.Link as={Link} to="faq" spy={true} smooth={true} offset={-70} duration={500}>FAQ</Nav.Link>
              <Nav.Link as={Link} to="contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Nav.Link>
            </Nav>
            <p className="text-muted">&copy; {new Date().getFullYear()} Lugoda Hospital. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
