import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CancelPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box m={3} display="flex" flexDirection="column" alignItems="center">
      <Box p={3} boxShadow={3} borderRadius={8} bgcolor="background.paper" textAlign="center">
        <img src="src/assets/images/Cancel.gif" alt="Cancelled" style={{ width: '320px', height: '320px' }} />
        <Typography variant="h4" gutterBottom>
          Payment Cancelled
        </Typography>
        <Typography variant="body1" paragraph>
          Your payment was cancelled. If you have any questions, please contact support.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default CancelPage;
