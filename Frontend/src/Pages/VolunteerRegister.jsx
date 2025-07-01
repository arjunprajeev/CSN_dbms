import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg'

const VolunteerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skill: '',
    customSkill: '',
    dob: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const skills = ["Swimming", "Driving", "Machinery Operator", "Cooking", "Other"];

  const validateField = (name, value) => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (name === 'name' && !value) error = 'Name is required.';
    if (name === 'phone' && (!value || !phoneRegex.test(value))) error = 'Please enter a valid 10-digit phone number.';
    if (name === 'email' && (!value || !emailRegex.test(value))) error = 'Please enter a valid email address.';
    if (name === 'password' && (!value || !passwordRegex.test(value))) error = 'Password must be at least 8 characters, contain an uppercase letter and a special character.';
    if (name === 'confirmPassword' && value !== formData.password) error = 'Passwords do not match.';
    
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dob') {
      const today = new Date();
      const birthDate = new Date(value);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      setFormData((prevData) => ({
        ...prevData,
        age: calculatedAge
      }));
    }

    validateField(name, value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

//______________________________________________edited________________________
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form data:', formData);
  Object.keys(formData).forEach((key) => validateField(key, formData[key]));

  if (!Object.values(errors).some((error) => error)) {
    try {
      // Example URL (update to match your server setup)
const response = await fetch('http://localhost:5500/api/volunteer-register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});


      const data = await response.json();
      if (!response.ok) {
        console.error('Error:', data);
        alert(data.message); // Display the error message (Email or phone number exists)
        return;
      }

      console.log('Form submitted:', data);
      setFormData({
        name: '',
        phone: '',
        skill: '',
        customSkill: '',
        dob: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      // navigate('/success'); // Uncomment to redirect on successful registration
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};


//-------------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(1px)' }} 
      />
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-2xl font-bold mb-8 text-center">Volunteer Registration</h2>

        {/* Name Field */}
        <div className="mb-4 relative flex items-center">
          <FaUser className="absolute left-3 text-gray-400" />
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}
        
        {/* Phone Field */}
        <div className="mb-4 relative flex items-center">
          <FaPhone className="absolute left-3 text-gray-400" />
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mb-4">{errors.phone}</p>}

        {/* Skill Dropdown */}
        <div className="mb-4">
          <select 
            name="skill" 
            value={formData.skill} 
            onChange={handleChange} 
            className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Skill</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        
        {/* Custom Skill Field (conditionally displayed) */}
        {formData.skill === 'Other' && (
          <div className="mb-4">
            <input 
              type="text" 
              name="customSkill" 
              value={formData.customSkill} 
              onChange={handleChange} 
              placeholder="Please specify your skill" 
              className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* DOB Field */}
        <div className="mb-4">
          <label className="text-gray-700">Date of Birth</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.dob && <p className="text-red-500 text-sm mb-4">{errors.dob}</p>}
        
        {/* Age Field (Read-Only) */}
        <div className="mb-4">
          <label className="text-gray-700">Age</label>
          <input 
            type="number"
            name="age"
            value={formData.age}
            readOnly
            placeholder="Age"
            className="w-full py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
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
            {/* {confirmPasswordVisible ? '🙈' : '👁️'} */}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}
        
        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
         
          className="w-full py-2 mt-4 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-150"
        >
          Register
        </button>
        <button 
          onClick={() => navigate('/volunteer-login')}
          className="w-full py-2 mt-4 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-150"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default VolunteerRegister;



