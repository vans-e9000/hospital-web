import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="hero-section">
      <Container className="text-center">
        <h1 className="display-3">Welcome to Lugoda Hospital</h1>
        <p className="lead">Your health, our priority</p>
        <Button variant="primary" size="lg" as={Link} to="contact" spy={true} smooth={true} offset={-70} duration={500}>
          Contact Us
        </Button>
      </Container>
    </section>
  );
};

export default Home;
