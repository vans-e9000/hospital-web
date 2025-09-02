import { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const hospitalImages = [
    {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Modern African hospital with medical professionals"
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      alt: "African healthcare workers in hospital setting"
    },
    {
      src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Advanced medical equipment in African hospital"
    },
    {
      src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Modern operating theater in African medical facility"
    },
    {
      src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      alt: "Contemporary African hospital interior"
    }
  ];
  
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % hospitalImages.length
        );
      }, 4000); // Change image every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [hospitalImages.length, isHovered]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % hospitalImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? hospitalImages.length - 1 : prevIndex - 1
    );
  };

  const stats = [
    { icon: Users, label: 'Patients Served', value: '50,000+' },
    { icon: Award, label: 'Years of Excellence', value: '18+' },
    { icon: Clock, label: '24/7 Emergency Care', value: 'Always' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver compassionate, high-quality, and affordable healthcare services while fostering innovation and excellence in medical care for all our patients.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the most trusted healthcare provider in the region, recognized for our clinical excellence, innovative treatments, and patient-centered care.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, compassion, excellence, and innovation guide every decision. We treat every patient with respect, dignity, and the highest standard of care.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            About Lugoda Hospital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the way in healthcare excellence since 2005
          </p>
        </motion.div>

        <Row className="align-items-center mb-20">
          <Col lg={6} className="mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src={hospitalImages[currentImageIndex].src}
                      fluid 
                      className="rounded-2xl w-100"
                      alt={hospitalImages[currentImageIndex].alt}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"
                    whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
                onClick={prevImage}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
                onClick={nextImage}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              
              {/* Image indicators */}
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {hospitalImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ 
                      scale: 1.3,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pl-0 pl-lg-8"
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Excellence in Healthcare Since 2005
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to transform healthcare delivery, Lugoda Hospital has evolved from a modest clinic into a state-of-the-art medical facility. We seamlessly blend cutting-edge technology with compassionate care to serve our community with distinction.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our unwavering commitment to excellence drives everything we do - from our world-class medical equipment to our highly trained healthcare professionals who work tirelessly to ensure every patient receives exceptional care.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-4 bg-white rounded-lg shadow-md"
                    >
                      <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </Col>
        </Row>
        
        {/* Values Section */}
        <Row className="g-4">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Col lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default About;
