import PropTypes from 'prop-types';

import { Paper, Divider, Typography, Skeleton } from '@mui/material';

const Quizzes = ({ questions }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Quizzes</Typography>
            <Divider />
            {/* Quiz questions */}
            {questions.map((question, index) => (
                <Skeleton key={index} variant="text" />
            ))}
        </Paper>
    );
};

export default Quizzes;

Quizzes.propTypes = {
    questions: PropTypes.array.isRequired,
};
