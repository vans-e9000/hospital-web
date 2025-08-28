import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Stethoscope, Microscope, Baby, Ambulance, Heart, Brain, Bone, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';

const services = [
  {
    icon: Stethoscope,
    title: 'General Consultation',
    description: 'Comprehensive health check-ups and consultations with our experienced general physicians.',
    features: ['Health Screenings', 'Preventive Care', 'Chronic Disease Management']
  },
  {
    icon: Microscope,
    title: 'Laboratory Services',
    description: 'State-of-the-art laboratory with cutting-edge equipment for accurate diagnostic results.',
    features: ['Blood Tests', 'Imaging Services', 'Pathology Reports']
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents with child-friendly facilities.',
    features: ['Newborn Care', 'Vaccinations', 'Growth Monitoring']
  },
  {
    icon: Ambulance,
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response team for critical and life-threatening situations.',
    features: ['Trauma Care', 'Critical Care', 'Emergency Surgery']
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Comprehensive heart care with advanced cardiac diagnostic and treatment facilities.',
    features: ['ECG', 'Echocardiography', 'Cardiac Rehabilitation']
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Specialized care for neurological conditions with state-of-the-art diagnostic equipment.',
    features: ['Brain Imaging', 'Stroke Care', 'Neurological Rehabilitation']
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Expert orthopedic care for bone, joint, and musculoskeletal conditions.',
    features: ['Joint Replacement', 'Sports Medicine', 'Fracture Care']
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Complete eye care services with modern equipment for vision correction and treatment.',
    features: ['Cataract Surgery', 'Retinal Care', 'Vision Correction']
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by expert medical professionals using cutting-edge technology
          </p>
        </motion.div>

        <Row className="g-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300"
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </CardDescription>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                            className="flex items-center text-sm text-gray-500"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Need Medical Assistance?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our medical experts are available 24/7 to provide you with the best possible care. Don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Emergency: (123) 456-7891
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 border-0"
            >
              Schedule Appointment
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
