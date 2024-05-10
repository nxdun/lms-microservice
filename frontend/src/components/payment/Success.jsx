import { useState } from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function SuccessPage() {
  const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);

  const handleEnrollUser = async () => {
    try {
      if (!enrollmentCompleted) {
        const userId = localStorage.getItem("token"); // Hardcoded user ID for demonstration
        const courseId = localStorage.getItem('courseId');
        console.log('Enrolling user in course:', courseId);

        const enrollResponse = await fetch(`http://localhost:2222/api/v1/users/enroll/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ course: courseId }),
        });

        const enrollData = await enrollResponse.json();

        if (enrollResponse.ok) {
          console.log('User enrolled successfully:', enrollData.message);
          localStorage.removeItem('courseId');
          setEnrollmentCompleted(true);
        } else {
          console.error('Error enrolling user:', enrollData.message);
        }
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>

        <img src="src/assets/images/Successfulpurchase.gif" alt="Success" style={{ width: '280px', height: '280px' }} />
        <Typography variant="h3" gutterBottom>Payment Successful!</Typography>
        <Typography variant="body1">Your payment was successful. Thank you for your purchase!</Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/browse"
          disabled={enrollmentCompleted} // Disable the button if enrollment is completed
          style={{ borderRadius: '10px', padding: '10px', marginTop: '30px', backgroundColor: '#6200EE', color: '#FFFFFF', fontWeight: 'bold', textDecoration: 'none' }}
          sx={{
            '&:hover': {
              backgroundColor: '#3700B3',
            },
          }}
          onClick={handleEnrollUser}
        >
          Start Learning
        </Button>
      </div>
    </Paper>
  );
}

export default SuccessPage;
