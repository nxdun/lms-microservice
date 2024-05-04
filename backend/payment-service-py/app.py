from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os

app = Flask(__name__) # Create a Flask app
CORS(app)  # Enable CORS for all routes

# Set up Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route('/create-checkout-session', methods=['POST'])# A POST route to create a new Checkout Session
def create_checkout_session():
    data = request.json# Get the JSON data from the request
    products = data.get('products')# Get the products from the request

    line_items = [
        {
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": product["name"],
                    "images": [product["image"]]
                },
                "unit_amount": int(product["price"] * 100)  # Convert to cents
            },
            "quantity": product["quantity"]
        }
        for product in products
    ]# Create line items for the products

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=line_items,
        mode='payment',
        success_url=os.getenv("CLIENT_URL") + '/success',
        cancel_url=os.getenv("CLIENT_URL") + '/cancel',
    )# Create a new Checkout Session using the data passed in

    return jsonify({'id': session.id})# Return the session ID
# route for testing
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=3001)  # Run the app in debug mode
