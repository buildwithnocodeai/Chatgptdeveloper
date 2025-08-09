// server/routes/payment.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with your key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
});

// Create a payment order
router.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    
    // Basic validation
    if (!amount || !currency) {
        return res.status(400).json({ error: 'Amount and currency are required' });
    }
    
    try {
        // Create a Razorpay order
        const options = {
            amount: amount * 100, // Razorpay expects amounts in paise (smallest currency unit)
            currency: currency,
            receipt: receipt || 'rcptid_' + Date.now()
        };
        
        const order = await razorpay.orders.create(options);
        
        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

// Verify payment
router.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Verify the payment signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret');
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    
    if (generated_signature === razorpay_signature) {
        res.json({
            success: true,
            message: 'Payment verified successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid signature sent!'
        });
    }
});

module.exports = router;