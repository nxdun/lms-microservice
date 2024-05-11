import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

function CoursesContent() {
  const [courses, setCourses] = useState([]);
  const [courseTitles, setCourseTitles] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    // Fetch course content
    fetch('http://localhost:3002/api/v1/content')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        // Extract course IDs and fetch course titles
        const courseIds = data.map(course => course.courseId);
        fetchCourseTitles(courseIds);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const fetchCourseTitles = (courseIds) => {
    Promise.all(courseIds.map(courseId =>
      fetch(`http://localhost:3002/api/v1/courses/${courseId}`)
        .then(response => response.json())
        .then(data => {
          setCourseTitles(prevState => ({
            ...prevState,
            [courseId]: data.course_title // Adjusted to match your database field
          }));
        })
    ));
  };;

  // Open dialog with details of selected course
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  // Toggle show more content
  const toggleShowMoreContent = (courseId) => {
    setShowMoreContent(!showMoreContent);
    setSelectedCourseId(courseId);
  };

  return (
    <div>
      <h1>Courses Contents</h1>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid key={course._id} item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card onClick={() => handleCourseClick(course)} style={{ cursor: 'pointer' }}>
              <CardContent>
              <Typography variant="h6" component="div">Course: {courseTitles[course.courseId]}</Typography>
                {!showMoreContent && selectedCourseId !== course._id &&
                  <Button onClick={() => toggleShowMoreContent(course._id)}>Show More</Button>
                }
                {showMoreContent && selectedCourseId === course._id &&
                  <>
                    <Typography variant="subtitle1" component="div">Video URLs:</Typography>
                    <ul>
                      {course.videoUrls.map((url, index) => (
                        <li key={index}>{url}</li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" component="div">Chapters:</Typography>
                    <ul>
                      {course.chapters.map((chapter, index) => (
                        <li key={index}>{chapter}</li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" component="div">Quizzes:</Typography>
                    <ul>
                      {course.quizzes.map((quiz, index) => (
                        <li key={index}>
                          <Typography variant="body1">{quiz.question}</Typography>
                          <ul>
                            {quiz.options.map((option, optionIndex) => (
                              <li key={optionIndex}>{option}</li>
                            ))}
                          </ul>
                          <Typography variant="body2">Correct Answer Index: {quiz.correctAnswerIndex}</Typography>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={() => toggleShowMoreContent(course._id)}>Show Less</Button>
                  </>
                }
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Dialog to display more details of selected course */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedCourse && courseTitles[selectedCourse.courseId]}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" component="div">Video URLs:</Typography>
          <ul>
            {selectedCourse && selectedCourse.videoUrls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
          <Typography variant="subtitle1" component="div">Chapters:</Typography>
          <ul>
            {selectedCourse && selectedCourse.chapters.map((chapter, index) => (
              <li key={index}>{chapter}</li>
            ))}
          </ul>
          <Typography variant="subtitle1" component="div">Quizzes:</Typography>
          <ul>
            {selectedCourse && selectedCourse.quizzes.map((quiz, index) => (
              <li key={index}>
                <Typography variant="body1">{quiz.question}</Typography>
                <ul>
                  {quiz.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
                <Typography variant="body2">Correct Answer Index: {quiz.correctAnswerIndex}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CoursesContent;
