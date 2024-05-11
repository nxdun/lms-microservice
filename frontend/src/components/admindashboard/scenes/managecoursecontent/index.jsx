import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, Button, CircularProgress } from '@mui/material';

function CoursesContent() {
  const [courses, setCourses] = useState([]);
  const [courseTitles, setCourseTitles] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

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
      .catch(error => console.error('Error fetching courses:', error))
      .finally(() => setLoading(false));
  }, []);

  const fetchCourseTitles = (courseIdList) => {
    Promise.all(courseIdList.map(courseId =>
      fetch(`http://localhost:3002/api/v1/courses/${courseId}`)
        .then(response => response.json())
        .then(data => {
          setCourseTitles(prevState => ({
            ...prevState,
            [courseId]: data.course_title // Adjusted to match your database field
          }));
        })
        .catch(error => console.error(`Error fetching course title for ${courseId}:`, error))
    ));
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleDeleteCourse = async (id) => {
    try {
      await fetch(`http://localhost:3002/api/v1/content/${id}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter(course => course._id !== id));
      // Optionally, you can also close the dialog if the deleted course was currently selected
      if (selectedCourse && selectedCourse._id === id) {
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateCourse = async (id) => {
    // Implement your update logic here
    console.log('Update course with ID:', id);
  };

  return (
    <div>
      <h1>Courses Contents</h1>
      {loading ? (
        <CircularProgress /> // Show loading indicator
      ) : (
        <Grid container spacing={2}>
          {courses.map((course, index) => (
            <Grid key={course._id || index} item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6" component="div">Course: {courseTitles[course.courseId]}</Typography>
                  <Button onClick={() => handleCourseClick(course)} style={{ color: 'white' }} variant="contained" >View Details</Button>
                  <Button onClick={() => handleUpdateCourse(course._id)} style={{ marginLeft: '10px' }} variant="contained" color="primary">Update</Button>
                  <Button onClick={() => handleDeleteCourse(course._id)} style={{ marginLeft: '10px' }} variant="contained" color="error">Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {selectedCourse && (
          <>
            <DialogTitle>{courseTitles[selectedCourse.courseId]}</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" component="div">Video URLs:</Typography>
              <ul>
                {selectedCourse.videoUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>
              <Typography variant="subtitle1" component="div">Chapters:</Typography>
              <ul>
                {selectedCourse.chapters.map((chapter, index) => (
                  <li key={index}>{chapter}</li>
                ))}
              </ul>
              <Typography variant="subtitle1" component="div">Quizzes:</Typography>
              <ul>
                {selectedCourse.quizzes.map((quiz, index) => (
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
          </>
        )}
      </Dialog>
    </div>
  );
}

export default CoursesContent;
