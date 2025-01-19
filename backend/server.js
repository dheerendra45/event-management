const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authroutes = require('./routes/authroutes'); // User authentication routes
const eventroutes = require('./routes/eventroutes'); // Event-related routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON data

// Routes
app.use('/api/auth/users', authroutes); // Authentication routes
app.use('/api/events', eventroutes); // Event management routes (secured by auth and role middleware)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
