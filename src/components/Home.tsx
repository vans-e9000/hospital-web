import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Activity, Shield, Users, Star, Award, Clock, Phone } from 'lucide-react';
import { Button } from './ui/Button';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-900 via-blue-900 to-red-800">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 25px 25px'
        }} />
      </div>
      
      {/* Dynamic Gradient Orbs */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-400/30 to-white/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-red-400/25 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 0.8, 1.2], 
          rotate: [360, 180, 0],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-white/25 to-blue-400/25 rounded-full blur-2xl"
        animate={{ 
          x: [-20, 20, -20],
          y: [-30, 30, -30],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Enhanced Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { Icon: Heart, delay: 0, x: '10%', y: '20%' },
          { Icon: Activity, delay: 2, x: '85%', y: '15%' },
          { Icon: Shield, delay: 4, x: '15%', y: '70%' },
          { Icon: Users, delay: 1, x: '80%', y: '60%' },
          { Icon: Star, delay: 3, x: '20%', y: '45%' },
          { Icon: Award, delay: 5, x: '75%', y: '35%' }
        ].map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{ left: x, top: y }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay
            }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust Indicators */}
          <motion.div 
            className="flex justify-center items-center gap-8 mb-8 text-red-100/90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-red-300" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium">24/7 Emergency</span>
            </div>
          </motion.div>
          
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-white">Your Health,</span>
              <br />
              <span className="bg-gradient-to-r from-red-300 via-white to-blue-300 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
          </motion.div>
          
          {/* Enhanced Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-4 text-red-50 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience world-class healthcare with cutting-edge technology, 
            <span className="text-red-300 font-medium"> compassionate care</span>, and 
            <span className="text-blue-300 font-medium">exceptional outcomes</span>.
          </motion.p>
          
          {/* Stats Row */}
          <motion.div 
            className="flex justify-center items-center gap-8 md:gap-12 mb-12 text-red-100/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">25+</div>
              <div className="text-sm font-medium">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-red-400/40" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">50k+</div>
              <div className="text-sm font-medium">Patients Treated</div>
            </div>
            <div className="w-px h-12 bg-red-400/40" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100+</div>
              <div className="text-sm font-medium">Expert Doctors</div>
            </div>
          </motion.div>
          
          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 border-0 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Book Appointment
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            
            <Link to="services" spy={true} smooth={true} offset={-70} duration={500}>
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white/10 border-2 border-white/50 text-white hover:bg-white hover:text-red-900 px-10 py-6 text-xl font-bold backdrop-blur-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Explore Services
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="flex flex-col items-center text-red-200/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-red-300/40 rounded-full flex justify-center"
            >
              <motion.div 
                className="w-1 h-3 bg-red-300/60 rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default Home;
