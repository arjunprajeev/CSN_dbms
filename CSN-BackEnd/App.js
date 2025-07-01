require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
connectDB();

app.use(bodyParser.json());

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/generaluser', require('./routes/userRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));
app.use('/api/Organization', require('./routes/organizationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
