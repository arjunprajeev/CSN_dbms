const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/organizationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    credentials: true
}));
  
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/organization', orgRoutes);
app.use('/api/generaluser', userRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));