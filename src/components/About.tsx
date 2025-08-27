import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <h2 className="text-center mb-5">About Us</h2>
        <Row className="align-items-center">
          <Col md={6}>
            <Image src="https://via.placeholder.com/500x400" rounded fluid />
          </Col>
          <Col md={6}>
            <h3>Our History</h3>
            <p>
              Founded in 2005, Lugoda Hospital has been dedicated to providing exceptional medical care to our community for over 15 years. Our journey began with a small clinic and has since grown into a leading healthcare institution.
            </p>
            <h3>Our Mission</h3>
            <p>
              To deliver compassionate, high-quality, and affordable healthcare services to all our patients, fostering a community of health and wellness.
            </p>
            <h3>Our Vision</h3>
            <p>
              To be the most trusted healthcare provider in the region, recognized for our clinical excellence, innovative spirit, and commitment to patient-centered care.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
