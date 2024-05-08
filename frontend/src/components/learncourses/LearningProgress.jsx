import { Paper, Divider, Typography, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';


const LearningProgress = ({ progress }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Learning Progress</Typography>
            <Divider />
            {/* Progress bar or other visual representation */}
            <Skeleton variant="rectangular" height={200} />
        </Paper>
    );
};

export default LearningProgress;

LearningProgress.propTypes = {
    progress: PropTypes.number.isRequired,
};

