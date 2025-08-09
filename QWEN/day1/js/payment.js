// js/payment.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with payment functionality
    const paymentButton = document.getElementById('payment-button');
    
    if (paymentButton) {
        paymentButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get amount and currency from form or data attributes
            const amount = document.getElementById('amount').value || 500; // Default to 500 INR
            const currency = document.getElementById('currency').value || 'INR';
            
            // Send request to backend to create order
            fetch('/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: currency
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Open Razorpay checkout
                    const options = {
                        key: 'rzp_test_placeholder', // Replace with your Razorpay key
                        amount: data.order.amount,
                        currency: data.order.currency,
                        name: 'NexaCore',
                        description: 'Service Payment',
                        order_id: data.order.id,
                        handler: function(response) {
                            // Verify payment on backend
                            fetch('/api/payment/verify-payment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            })
                            .then(response => response.json())
                            .then(verification => {
                                if (verification.success) {
                                    alert('Payment successful!');
                                    // Redirect to success page or update UI
                                } else {
                                    alert('Payment verification failed!');
                                }
                            })
                            .catch(error => {
                                console.error('Error verifying payment:', error);
                                alert('An error occurred during payment verification.');
                            });
                        },
                        prefill: {
                            name: 'John Doe',
                            email: 'john.doe@example.com',
                            contact: '9876543210'
                        },
                        theme: {
                            color: '#0071e3'
                        }
                    };
                    
                    const rzp = new Razorpay(options);
                    rzp.open();
                } else {
                    alert('Failed to create payment order!');
                }
            })
            .catch(error => {
                console.error('Error creating payment order:', error);
                alert('An error occurred while processing your payment.');
            });
        });
    }
});