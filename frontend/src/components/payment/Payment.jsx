import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

function PaymentPage({ apiUrl }) {
  const makePayment = async () => {
    try {
      const stripe = await loadStripe('pk_test_51PBff92LxlKPHBMAvdpHbLfvrowceNrOKe3HkNoVG8b9ZSAvn1vbdR11MjTIDw8gHmNI9BSt8VwNxeHrOe43Nrzg00HWzJkvXo');


      const body = {
        products: products // Send the products array in the request body
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error making payment:', error);
      // Handle error, e.g., show error message to user
    }
  };

  // Define the products array here
  const products = [
    {
      name: 'Ham and Cheese Burger Course',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/022/559/426/small/american-cheese-bbq-beef-with-tomato-lettuce-juicy-beef-burger-fast-food-presentation-studio-product-isolated-on-white-background-photo.jpg',
      price: 100.00,
      quantity: 1
    }
  ];

  return (
    <div>
      <h1>Enroll to This course</h1>
      <h2>Proceed to Checkout</h2>

      {/* Loop through products and display them */}
      {products.map((product, index) => (
        <div key={index}>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <img src={product.image} alt={product.name} style={{ width: '200px', height: '200px' }} />
        </div>
      ))}
      <br />
      <button onClick={makePayment} style={{ width: '150px', height: '50px' }}>Enroll Now</button>

    </div>
  );
}

export default PaymentPage;
