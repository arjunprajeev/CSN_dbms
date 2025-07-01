import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (name === 'email' && (!value || !emailRegex.test(value))) {
      error = 'Please enter a valid email address.';
    }
    if (name === 'password' && (!value || !passwordRegex.test(value))) {
      error = 'Password must be at least 8 characters, contain an uppercase letter and a special character.';
    }
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (!Object.values(errors).some((error) => error)) {
      try {
        const response = await fetch('http://localhost:5500/api/admin-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log(formData)
        if (!response.ok) {
          const errorText = await response.text();
          alert('Error submitting form: ' + errorText);
          return;
        }

        const data = await response.json();
        console.log(data)
        alert('Registration successful!');
        setFormData({ email: '', password: '' });
        setErrors({});
        
        // Uncomment to navigate on success
        // navigate('/admin-dashboard');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(1px)' }} 
      />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Registration</h2>

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

        <button 
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-150"
        >
          Register
        </button>
        <button 
          onClick={() => navigate('/admin-login')}
          className="w-full py-2 mt-4 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-150"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminRegister;
