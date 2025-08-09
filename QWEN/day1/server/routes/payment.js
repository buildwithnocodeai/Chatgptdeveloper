// server/routes/payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    
    // Basic validation
    if (!amount || !currency) {
        return res.status(400).json({ error: 'Amount and currency are required' });
    }
    
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amounts in cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

// Handle payment confirmation webhook (simplified)
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder');
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('Payment succeeded:', paymentIntentSucceeded.id);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            console.log('Payment failed:', paymentIntentFailed.id);
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
});

module.exports = router;