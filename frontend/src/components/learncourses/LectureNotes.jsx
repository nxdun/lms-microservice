import { Paper, Divider, Typography, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

const LectureNotes = ({ notes }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Lecture Notes</Typography>
            <Divider />
            {/* Text area for lecture notes */}
            <Skeleton variant="rectangular" height={200} />
        </Paper>
    );
};

export default LectureNotes;

LectureNotes.propTypes = {
    notes: PropTypes.string.isRequired,
};
