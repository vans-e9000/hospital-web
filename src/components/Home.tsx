import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Activity, Shield, Users } from 'lucide-react';
import { Button } from './ui/Button';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="hero-section">
      {/* Floating Medical Icons */}
      <div className="hero-icons">
        <motion.div 
          className="floating-icon"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-8 h-8" />
        </motion.div>
        <motion.div 
          className="floating-icon"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Activity className="w-8 h-8" />
        </motion.div>
        <motion.div 
          className="floating-icon"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Shield className="w-8 h-8" />
        </motion.div>
        <motion.div 
          className="floating-icon"
          animate={{ y: [25, -25, 25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Users className="w-8 h-8" />
        </motion.div>
      </div>
      
      <Container>
        <motion.div 
          className="hero-content max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="hero-title text-6xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Excellence in 
            <motion.span 
              className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Healthcare
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover world-class medical care with cutting-edge technology, compassionate professionals, and patient-centered excellence at Lugoda Hospital.
          </motion.p>
          
          <motion.div 
            className="hero-button flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="services" spy={true} smooth={true} offset={-70} duration={500}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                Our Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default Home;
