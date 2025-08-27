import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import './Doctors.css';

const doctors = [
  {
    image: 'https://via.placeholder.com/200',
    name: 'Dr. Jane Doe',
    specialty: 'Cardiologist',
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Dr. John Smith',
    specialty: 'Neurologist',
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Dr. Emily White',
    specialty: 'Pediatrician',
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Dr. Michael Brown',
    specialty: 'Orthopedic Surgeon',
  },
];

const Doctors = () => {
  return (
    <section id="doctors" className="py-5">
      <Container>
        <h2 className="text-center mb-5">Our Doctors</h2>
        <Row>
          {doctors.map((doctor, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="text-center doctor-card">
                <Card.Body>
                  <Image src={doctor.image} roundedCircle className="mb-3 doctor-img" />
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doctor.specialty}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Doctors;
