import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const About = () => {
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
            >
              <Image 
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80" 
                fluid 
                className="rounded-2xl shadow-2xl"
                alt="Modern hospital interior with advanced medical equipment"
              />
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
