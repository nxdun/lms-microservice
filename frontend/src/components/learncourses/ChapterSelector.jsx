import PropTypes from 'prop-types';
import { Paper, Divider, Typography, Skeleton } from '@mui/material';

const ChapterSelector = ({ chapters }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', maxHeight: "60vh" }}>
            <Typography variant="h6" gutterBottom>Chapter Selector</Typography>
            <Divider />
            {/* Dropdown menu */}
            {chapters.map((chapter, index) => (
                <Skeleton key={index} variant="text" />
            ))}
        </Paper>
    );
};

export default ChapterSelector;

ChapterSelector.propTypes = {
    chapters: PropTypes.array.isRequired,
};