import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="footer bg-light pt-5 pb-4 border-t-2 border-red-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Hospital Brand - Left */}
          <Col md={4} className="text-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="me-auto"
            >
              <motion.h4 
                className="text-3xl font-black mb-0"
                style={{ 
                  background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                🏥 Lugoda Hospital
              </motion.h4>
            </motion.div>
          </Col>
          
          {/* Navigation Links - Center */}
          <Col md={8}>
            <Nav className="justify-content-center mb-0 gap-2">
              {[
                { to: 'home', label: 'Home', delay: 0.3 },
                { to: 'about', label: 'About', delay: 0.4 },
                { to: 'services', label: 'Services', delay: 0.5 },
                { to: 'doctors', label: 'Doctors', delay: 0.6 },
                { to: 'faq', label: 'FAQ', delay: 0.7 },
                { to: 'contact', label: 'Contact', delay: 0.8 }
              ].map(({ to, label, delay }) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                >
                  <Nav.Link 
                    as={Link} 
                    to={to} 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={500}
                    className="font-bold px-3 py-2 mx-1 text-dark hover:text-primary transition-all duration-300 cursor-pointer"
                    style={{ fontSize: '16px', fontWeight: '700' }}
                  >
                    {label}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>
          </Col>
        </Row>
        
        {/* Copyright - Bottom Center */}
        <Row>
          <Col className="text-center mt-3">
            <motion.p 
              className="text-muted font-semibold mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              &copy; {new Date().getFullYear()} Lugoda Hospital. All rights reserved.
            </motion.p>
          </Col>
        </Row>
      </Container>
    </motion.footer>
  );
};

export default Footer;
