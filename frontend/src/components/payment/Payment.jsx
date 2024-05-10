
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';

function PaymentPage({ apiUrl }) {
  const location = useLocation();
  const { courseData } = location.state;
  console.log('Courseid:', courseData._id);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe('pk_test_51PBff92LxlKPHBMAvdpHbLfvrowceNrOKe3HkNoVG8b9ZSAvn1vbdR11MjTIDw8gHmNI9BSt8VwNxeHrOe43Nrzg00HWzJkvXo');

      const body = {
        products: [
          {
            name: courseData.course_title,
            image: courseData.course_picture,
            price: courseData.price,
            quantity: 1
          }
        ]
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

      // Store courseId in local storage
      localStorage.setItem('courseId', courseData._id);

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

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Typography variant="h4" gutterBottom align="center">Enroll in {courseData.course_title}</Typography>
      <Typography variant="h5" gutterBottom align="center">Proceed to Checkout</Typography>

      {/* Display course information */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        
        <img src={courseData.course_picture} alt={courseData.course_title} style={{ width: '200px', height: '200px', borderRadius: '10px', marginTop: '10px' }} />
        <br/>
        <Typography variant="subtitle1">Name: <strong> {courseData.course_title} </strong></Typography>
        <Typography variant="subtitle1">Course price:<strong> ${Number(courseData.price).toFixed(2)} </strong></Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={makePayment}
        style={{ borderRadius: '10px', padding: '10px', marginTop: '20px', backgroundColor: '#6200EE', color: '#FFFFFF', fontWeight: 'bold' }}
        sx={{
          '&:hover': {
            backgroundColor: '#3700B3',
          },
        }}
      >
        Make Payment
      </Button>
    </Paper>
  );
}

export default PaymentPage;
