const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/organizationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes'); // Import volunteer routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes')
require('dotenv').config();

const app = express();

// Middleware
//app.use(cors());
app.use(cors({
    origin: process.env.REACT_APP_API_URL || 'http://localhost:3000', // Set your frontend URL in .env
    credentials: true
  }));
  
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/organization', orgRoutes);
app.use('/api/generaluser', userRoutes);
app.use('/api/Volunteer', volunteerRoutes); // Add volunteer routes
app.use('/api/admin',adminRoutes)

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
