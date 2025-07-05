import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowRight, FiUsers, FiHeart, FiTarget } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaPhone, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from './assets/bg.jpg';
import imageOne from './assets/one.jpeg';
import imageTwo from './assets/two.jpeg';
import imageThree from './assets/three.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [imageOne, imageTwo, imageThree];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLoginDropdown = () => setLoginDropdownOpen(!loginDropdownOpen);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Modern Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <motion.div 
          className="text-white text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          CommunityHub
        </motion.div>
        
        <div className="hidden md:flex space-x-8 items-center">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-white/90 hover:text-white transition-all duration-300 relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          
          {/* Enhanced Login Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={toggleLoginDropdown}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>
            
            <AnimatePresence>
              {loginDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50"
                >
                  {[
                    { to: "/user-login", label: "User Login", icon: "👤" },
                    { to: "/volunteer-login", label: "Volunteer", icon: "🤝" },
                    { to: "/admin-login", label: "Admin", icon: "⚙️" },
                    { to: "/organisation-login", label: "Organization", icon: "🏢" }
                  ].map((item) => (
                    <Link 
                      key={item.label}
                      to={item.to} 
                      className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={toggleMenu} 
            className="text-white p-2"
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-lg z-40 p-6 pt-20"
          >
            <div className="space-y-6">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-white text-lg hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  {item}
                </motion.a>
              ))}
              
              <div className="pt-6 border-t border-white/20">
                <p className="text-white/70 mb-4">Join as:</p>
                {[
                  { to: "/user-login", label: "User" },
                  { to: "/volunteer-login", label: "Volunteer" },
                  { to: "/admin-login", label: "Admin" },
                  { to: "/organisation-login", label: "Organization" }
                ].map((item) => (
                  <Link 
                    key={item.label}
                    to={item.to} 
                    className="block text-white/90 py-2 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-20 pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              Building
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Communities</span>
              <br />Together
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/80 leading-relaxed max-w-lg"
            >
              Join our vibrant community platform where volunteers, organizations, and users come together to create positive change and meaningful connections.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { number: "10K+", label: "Members" },
                { number: "500+", label: "Events" },
                { number: "50+", label: "Organizations" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Community ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 px-6 lg:px-20"
        id="about"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CommunityHub</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Empowering communities through innovative technology and meaningful connections
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FiUsers,
                title: "Connect & Collaborate",
                description: "Build meaningful relationships with like-minded individuals and organizations in your community."
              },
              {
                icon: FiHeart,
                title: "Make an Impact",
                description: "Participate in volunteer activities and community projects that create real, positive change."
              },
              {
                icon: FiTarget,
                title: "Achieve Goals",
                description: "Work together towards common objectives and celebrate collective achievements."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="text-4xl text-cyan-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 py-20 px-6 lg:px-20"
        id="contact"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
            <p className="text-white/70 text-lg mb-8">
              Ready to join our community? We'd love to hear from you!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { icon: FaEnvelope, text: "hello@communityhub.com", color: "text-blue-400" },
                { icon: FaPhone, text: "+1 (555) 123-4567", color: "text-green-400" },
                { icon: FaInstagram, text: "@CommunityHub", color: "text-pink-400" },
                { icon: FaTwitter, text: "@CommunityHub", color: "text-blue-400" },
                { icon: FaLinkedin, text: "CommunityHub", color: "text-blue-500" }
              ].map((contact) => (
                <motion.div
                  key={contact.text}
                  className={`flex items-center space-x-2 ${contact.color} hover:scale-105 transition-transform cursor-pointer`}
                  whileHover={{ y: -2 }}
                >
                  <contact.icon />
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Modern Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-lg border-t border-white/20 py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              CommunityHub
            </div>
            <p className="text-white/60 mb-6">Building stronger communities, one connection at a time.</p>
            <div className="flex justify-center space-x-6 mb-6">
              {[FaInstagram, FaTwitter, FaLinkedin, FaEnvelope].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  <Icon size={24} />
                </motion.div>
              ))}
            </div>
            <p className="text-white/40 text-sm">
              © 2024 CommunityHub. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;