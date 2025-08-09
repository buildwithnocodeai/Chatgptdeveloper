// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In a real application, you would use a database to store user information
// For this example, we'll use a simple in-memory array
// NEVER do this in production!
let users = [];

// User registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };
    
    users.push(newUser);
    
    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '1h'
    });
    
    res.json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '1h'
    });
    
    res.json({
        success: true,
        message: 'User logged in successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Get user profile (protected route example)
router.get('/profile', (req, res) => {
    // In a real application, you would verify the JWT token here
    // For this example, we'll just send a placeholder response
    res.json({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    });
});

module.exports = router;