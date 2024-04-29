/*
    common backdrop component used in every waiting state
 */

import { useState, useEffect } from 'react';
import { Backdrop } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import { infinity } from 'ldrs'



const DynamicBackdrop = ({ open }) => {
  infinity.register()
  const [color, setColor] = useState('#000000'); // Initial color

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setColor(randomColor); // Update the color state
    }, 400); // Change color every 400ms

    return () => clearInterval(interval); // Cleanup function 
  }, []);

  return (
    <Backdrop
      open={open}
      style={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.2"
        speed="1.3"
        color={color} 
      />
    </Backdrop>
  );
};

// Add prop validation 
DynamicBackdrop.propTypes = {
  open: PropTypes.bool.isRequired, 
};

export default DynamicBackdrop;
