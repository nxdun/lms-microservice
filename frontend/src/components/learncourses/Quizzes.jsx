import { useState } from 'react';
import { Card, CardContent, Typography, Button, Divider, Box, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { CheckCircle, Cancel } from '@mui/icons-material';


//component for renderign and managing a quiz
const Quiz = ({ questions }) => {
    //state variables for managign a quiz
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

    // render fallback loading component if questions not available:N
    if (!questions || questions.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        <Skeleton />
                    </Typography>
                    <Typography variant="body1">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </Typography>
                    <Divider style={{ marginBottom: '10px' }} />
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} height={40} style={{ marginBottom: '5px' }} />
                    ))}
                    <Divider style={{ marginTop: '10px' }} />
                    <Button disabled>
                        <Skeleton />
                    </Button>
                    <Button disabled>
                        <Skeleton />
                    </Button>
                    <Box mt={2}>
                        <Typography variant="h6">
                            <Skeleton />
                        </Typography>
                        <Grid container alignItems="center" spacing={1}>
                            {[...Array(4)].map((_, index) => (
                                <Grid key={index} item>
                                    <Skeleton variant="circle" width={40} height={40} />
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="body1" mt={1}>
                            <Skeleton />
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    //function to handle next click
    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswerIndex(answerIndex);
    };

    //funciton to handle next question
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

    //function to handle previous question
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswerIndex(null); // Reset selected answer for previous question
        }
    };

    //function to check if an answer is correct
    const isCorrectAnswer = (answerIndex) => {
        return answerIndex === questions[currentQuestionIndex].correctAnswerIndex;
    };

    //fucntion to get feedback message based on quiz result
    const getFeedbackMessage = () => {
        if (correctAnswers === questions.length) {
            return 'Congratulations! You got all questions correct!';

        } else if (correctAnswers === 0) {
            return 'Oops! You got all questions wrong. Better luck next time!';
        
        } else {
            return `You got ${correctAnswers} out of ${questions.length} questions correct. Keep it up!`;
        
        }
    };

    //render quiz component with questions and answers
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

//prop types validation fro quiz component
Quiz.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            correctAnswerIndex: PropTypes.number.isRequired,
        })
    ),
};
