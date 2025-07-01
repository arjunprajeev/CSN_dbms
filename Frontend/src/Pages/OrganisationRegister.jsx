import { useState } from 'react';
import { FaEnvelope, FaLock, FaBuilding, FaPhone, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/bg.jpg'; // Import the background image

const OrganisationRegister = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    contact: '',
    licenseId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (name === 'orgName' && !value) error = 'Organisation name is required.';
    if (name === 'contact' && (!value || !phoneRegex.test(value))) error = 'Please enter a valid 10-digit contact number.';
    if (name === 'email' && (!value || !emailRegex.test(value))) error = 'Please enter a valid email address.';
    if (name === 'password' && (!value || !passwordRegex.test(value))) error = 'Password must be at least 8 characters, contain an uppercase letter and a special character.';
    if (name === 'confirmPassword' && value !== formData.password) error = 'Passwords do not match.';
    
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (!Object.values(errors).some((error) => error)) {
      try {
        const response = await fetch('http://localhost:5500/api/org-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error:', data);
          alert(data.message);
          return;
        }

        setSuccessMessage('Your request has been sent to the admin. You will receive confirmation once approved.');

        setFormData({
          orgName: '',
          contact: '',
          licenseId: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});

        setTimeout(() => {
          alert(`Your organisation is approved! Organisation ID: ORG12345, Password: ${formData.password}`);
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(1px)' }} 
      />

      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Organisation Registration</h2>

        {/* Organisation Name Field */}
        <div className="mb-4 relative flex items-center">
          <FaBuilding className="absolute left-3 text-gray-400" />
          <input 
            type="text"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            placeholder="Organisation Name"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        {errors.orgName && <p className="text-red-500 text-sm mb-4">{errors.orgName}</p>}

        {/* Contact Number Field */}
        <div className="mb-4 relative flex items-center">
          <FaPhone className="absolute left-3 text-gray-400" />
          <input 
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        {errors.contact && <p className="text-red-500 text-sm mb-4">{errors.contact}</p>}

        {/* License ID Field */}
        <div className="mb-4 relative flex items-center">
          <FaIdCard className="absolute left-3 text-gray-400" />
          <input 
            type="text"
            name="licenseId"
            value={formData.licenseId}
            onChange={handleChange}
            placeholder="License ID"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>

        {/* Email Field */}
        <div className="mb-4 relative flex items-center">
          <FaEnvelope className="absolute left-3 text-gray-400" />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

        {/* Password Field */}
        <div className="mb-4 relative flex items-center">
          <FaLock className="absolute left-3 text-gray-400" />
          <input 
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={togglePasswordVisibility} 
            className="absolute right-3 text-gray-400"
          >
            {passwordVisible ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

        {/* Confirm Password Field */}
        <div className="mb-4 relative flex items-center">
          <FaLock className="absolute left-3 text-gray-400" />
          <input 
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={toggleConfirmPasswordVisibility} 
            className="absolute right-3 text-gray-400"
          >
            {confirmPasswordVisible ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-150"
        >
          Submit Request
        </button>

        {/* Success Message */}
        {successMessage && (
          <motion.p 
            className="text-green-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default OrganisationRegister;
