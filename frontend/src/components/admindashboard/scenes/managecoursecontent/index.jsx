import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

function CoursesContent() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3002/api/v1/content')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        // Fetch course titles based on course IDs
        fetchCourseTitles(data.map(course => course.courseId));
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Fetch course titles based on course IDs
  const fetchCourseTitles = (courseIds) => {
    Promise.all(courseIds.map(courseId => {
      return fetch(`http://localhost:3002/api/v1/courses/${courseId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch course title');
          }
          return response.json();
        });
    }))
    .then(courseTitles => {
      // Update the course title in the courses state
      const updatedCourses = courses.map(course => {
        const foundCourseTitle = courseTitles.find(courseTitle => courseTitle._id === course.courseId);
        if (foundCourseTitle) {
          return { ...course, course_title: foundCourseTitle.course_title };
        }
        return course;
      });
      setCourses(updatedCourses);
    })
    .catch(error => console.error('Error fetching course titles:', error));
  };

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
                <Typography variant="h6" component="div">Course Title: {course.course_title}</Typography>
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
        <DialogTitle>{selectedCourse && selectedCourse.course_title}</DialogTitle>
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