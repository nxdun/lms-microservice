import { useState } from 'react';
import { Card, CardContent, Typography, Button, Divider, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { CheckCircle, Cancel } from '@mui/icons-material';

const Quiz = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswerIndex(answerIndex);
    };

    const handleNextQuestion = () => {
        if (selectedAnswerIndex !== null) {
            const isCorrect = isCorrectAnswer(selectedAnswerIndex);
            setUserAnswers((prevUserAnswers) => {
                const updatedUserAnswers = [...prevUserAnswers];
                updatedUserAnswers[currentQuestionIndex] = isCorrect;
                return updatedUserAnswers;
            });
            if (isCorrect) {
                setCorrectAnswers(correctAnswers + 1);
            }
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswerIndex(null); // Reset selected answer for next question
            } else {
                setShowResult(true); // Show quiz result when all questions are answered
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswerIndex(null); // Reset selected answer for previous question
        }
    };

    const isCorrectAnswer = (answerIndex) => {
        return answerIndex === questions[currentQuestionIndex].correctAnswerIndex;
    };

    const getFeedbackMessage = () => {
        if (correctAnswers === questions.length) {
            return 'Congratulations! You got all questions correct!';
        } else if (correctAnswers === 0) {
            return 'Oops! You got all questions wrong. Better luck next time!';
        } else {
            return `You got ${correctAnswers} out of ${questions.length} questions correct. Keep it up!`;
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Question {currentQuestionIndex + 1}/{questions.length}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {questions[currentQuestionIndex].question}
                </Typography>
                <Divider style={{ marginBottom: '10px' }} />
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <Button
                        key={index}
                        variant={selectedAnswerIndex === index ? 'contained' : 'outlined'}
                        onClick={() => handleAnswerClick(index)}
                        disabled={showResult}
                        sx={{ marginBottom: '5px', textTransform: 'none' }}
                    >
                        {option}
                    </Button>
                ))}
                <Divider style={{ marginTop: '10px' }} />
                <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                </Button>
                <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
                {showResult && (
                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom>
                            Quiz Result
                        </Typography>
                        <Grid container alignItems="center" spacing={1}>
                            {userAnswers.map((answer, index) => (
                                <Grid key={index} item>
                                    {answer ? <CheckCircle color="success" /> : <Cancel color="error" />}
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="body1" gutterBottom mt={1}>
                            {getFeedbackMessage()}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Quiz;

Quiz.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            correctAnswerIndex: PropTypes.number.isRequired,
        })
    ).isRequired,
};
