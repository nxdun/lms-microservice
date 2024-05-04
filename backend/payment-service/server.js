// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const {products} = req.body;

    const lineItems = products.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                images: [product.image],
            },
            unit_amount: product.price * 100,// Convert to usd
        },
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
});

app.listen(PORT, () => {
  console.log(`🚀💵💳 Payment Server is running on port ${PORT}`);
});
