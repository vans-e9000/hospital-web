import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Services.css';

const services = [
  {
    icon: '🩺',
    title: 'General Consultation',
    description: 'Comprehensive health check-ups and consultations with our experienced general physicians.',
  },
  {
    icon: '🔬',
    title: 'Laboratory',
    description: 'State-of-the-art laboratory services for accurate and timely diagnostic results.',
  },
  {
    icon: '👶',
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents.',
  },
  {
    icon: '🚑',
    title: 'Emergency',
    description: '24/7 emergency services to handle critical and life-threatening situations.',
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-5">Our Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="h-100 text-center service-card">
                <Card.Body>
                  <div className="service-icon mb-3">{service.icon}</div>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
