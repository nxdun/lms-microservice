import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

//propTypes validation fro linearprogress component
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

//functional comp to render linarProgress with value labek
export default function LinearWithValueLabel() {

  //state to hold the progress value
  const [Pc, setPc] = React.useState(0);

  //useEffext hook to update progress every 800ms
  React.useEffect(() => {

    //set timer to update progrm vlaue 
    const timer = setInterval(() => {
    }, 800);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={Pc} Pc = {Pc} setPc= {setPc}/>
    </Box>
  );
}
