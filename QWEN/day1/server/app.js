// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (frontend files)
// In a production environment, you might serve these files differently
// For this example, we'll assume frontend files are in the root directory
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

// Basic route for testing
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the NexaCore API!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});