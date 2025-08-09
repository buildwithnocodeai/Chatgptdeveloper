// server/routes/contact.js
const express = require('express');
const router = express.Router();

// In a real application, you would integrate with an email service or database
// For this example, we'll just log the data to the console

router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Log the contact form data (in a real app, you'd send an email or save to database)
    console.log('Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    
    // Simulate a successful response
    res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
});

module.exports = router;