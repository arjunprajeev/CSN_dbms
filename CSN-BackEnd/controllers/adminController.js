const jwt = require('jsonwebtoken');

// Define the fixed admin ID
/*const FIXED_ADMIN_ID = 'ADM001002'; // Replace with your specific admin ID

// Function to validate email format
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};*/
const Admin = require('../models/Admin');
// Admin Login
const FIXED_ADMIN_ID = 'ADM001002';
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
 console.log(email)
  try {
    // Check if the provided admin ID matches the fixed ID
    if (password != FIXED_ADMIN_ID) {
      return res.status(400).json({ msg: 'Invalid admin ID' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    // Here you would usually check if the email exists in your database
    // For simplicity, let's assume the email is valid

    // Generate a JWT token for the admin
    const payload = {
      admin: { id: FIXED_ADMIN_ID } // Store the fixed admin ID in the token
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin Login
// exports.loginAdmin = async (req, res) => {
//   const { email, adminId } = req.body;
//  console.log(email)
//   try {
//     // Check if the provided admin ID matches the fixed ID
//     if (adminId !== FIXED_ADMIN_ID) {
//       return res.status(400).json({ msg: 'Invalid admin ID' });
//     }

//     // Validate email format
//     if (!isValidEmail(email)) {
//       return res.status(400).json({ msg: 'Invalid email format' });
//     }

//     // Here you would usually check if the email exists in your database
//     // For simplicity, let's assume the email is valid

//     // Generate a JWT token for the admin
//     const payload = {
//       admin: { id: FIXED_ADMIN_ID } // Store the fixed admin ID in the token
//     };

//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
