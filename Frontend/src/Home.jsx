import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa'; // Import icons
import backgroundImage from './assets/bg.jpg'; // Adjust path as needed
import imageOne from './assets/one.jpeg';
import imageTwo from './assets/two.jpeg';
import imageThree from './assets/three.jpeg';
import {Link} from 'react-router-dom';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay to darken background image (optional) */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-gray-800 bg-opacity-75 backdrop-blur-sm"> {/* Fixed Navbar */}
        <div className="text-white text-lg font-bold">MyLogo</div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="" className="text-white transform transition-transform hover:text-cyan-400 hover:scale-110">Home</a>
          <a href="#about" className="text-white transform transition-transform hover:text-cyan-400 hover:scale-110">About</a>
          <a href="#contact" className="text-white transform transition-transform hover:text-cyan-400 hover:scale-110">Contact</a>
          {/* Login Button with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleLoginDropdown} 
              className="text-white transform transition-transform hover:text-cyan-400 hover:scale-110"
            >
              Login
            </button>
            {loginDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-40">
                <Link to="/user-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User</Link>
                <Link to="/volunteer-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Volunteer</Link>
                <a href="/admin-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin</a>
                <a href="/organisation-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Organization</a>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 p-4 space-y-2 relative z-30">
          <a href="#home" className="block text-white transform transition-transform hover:text-cyan-400 hover:scale-110">Home</a>
          <a href="#about" className="block text-white transform transition-transform hover:text-cyan-400 hover:scale-110">About</a>
          <a href="#contact" className="block text-white transform transition-transform hover:text-cyan-400 hover:scale-110">Contact</a>
          {/* Mobile Login Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleLoginDropdown} 
              className="block text-white w-full text-left transform transition-transform hover:text-cyan-400 hover:scale-110"
            >
              Login
            </button>
            {loginDropdownOpen && (
              <div className="bg-white mt-2 rounded shadow-md z-40">
                <Link to="#user" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User</Link>
                <Link to="/volunteer-login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Volunteer</Link>
                <a href="#admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin</a>
                <a href="#organization" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Organization</a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="relative z-10 md:flex p-10 pt-20"> {/* Added padding to top to avoid content hiding behind fixed navbar */}
        {/* Left Side: Text */}
        <div className="md:w-1/2 flex items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Our Community</h1>
            <p className="text-lg text-gray-300">
              Join us in building a stronger community. Participate in events, engage with members, and grow together.
            </p>
          </div>
        </div>
        {/* Right Side: Moving Images */}
        <div className="md:w-1/2 flex items-center justify-center overflow-hidden relative z-10">
          <div className="flex animate-slide">
            <img src={imageOne} alt="Community 1" className="w-96 h-96 object-cover rounded-lg shadow-lg mx-2" />
            <img src={imageTwo} alt="Community 2" className="w-96 h-96 object-cover rounded-lg shadow-lg mx-2" />
            <img src={imageThree} alt="Community 3" className="w-96 h-96 object-cover rounded-lg shadow-lg mx-2" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 bg-white bg-opacity-80 p-10 mt-10 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">About Our Community</h2>
        <p className="text-lg text-gray-700">
          Our community is dedicated to bringing people together and creating opportunities for collaboration and growth. We organize events, workshops, and volunteer activities to empower individuals and strengthen our bonds.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative z-10 bg-white bg-opacity-80 p-10 mt-10 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <div className="flex items-center mb-4">
          <FaInstagram className="mr-2 text-pink-500" />
          <span>@OurCommunity</span>
        </div>
        <div className="flex items-center mb-4">
          <FaTwitter className="mr-2 text-blue-500" />
          <span>@OurCommunityTweets</span>
        </div>
        <div className="flex items-center">
          <FaPhone className="mr-2 text-green-500" />
          <span>(123) 456-7890</span>
        </div>
      </div>

       {/* Footer Section */}
       <footer className="bg-gray-800 text-white p-4 mt-10">
        <div className="text-center">
          <p className="mb-2">© 2024 Community Support System. All Rights Reserved.</p>
          <p className="mb-1">Building a better future together.</p>
          <p>Follow us on social media for updates and events!</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
