import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="me-auto"
          >
            <Navbar.Brand 
              href="#home" 
              className="text-3xl font-black"
              style={{ 
                background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              🏥 Lugoda Hospital
            </Navbar.Brand>
          </motion.div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-2">
              {[
                { to: 'home', label: 'Home', delay: 0.1 },
                { to: 'about', label: 'About', delay: 0.2 },
                { to: 'services', label: 'Services', delay: 0.3 },
                { to: 'doctors', label: 'Doctors', delay: 0.4 },
                { to: 'faq', label: 'FAQ', delay: 0.5 },
                { to: 'contact', label: 'Contact', delay: 0.6 }
              ].map(({ to, label, delay }) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                    <span className="relative z-10">{label}</span>
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Header;
