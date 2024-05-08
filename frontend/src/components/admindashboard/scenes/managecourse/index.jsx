import  { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Button, Typography, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';

const CourseGrid = () => {
  
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    course_title: '',
    course_description: '',
    categories: '',
    course_picture: '',
    price: '',
    course_duration: '',
    lecturer_ID: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/v1/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEdit = async (id) => {
    setEditCourseId(id);
    try {
      const response = await fetch(`http://localhost:3002/api/v1/courses/${id}`);
      if (response.ok) {
        const courseData = await response.json();
        setEditFormData(courseData);
      } else {
        console.error('Failed to fetch course data for editing');
      }
    } catch (error) {
      console.error('Error fetching course data for editing:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/v1/courses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCourses(courses.filter(course => course._id !== id));
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/${editCourseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });
      if (response.ok) {
        const updatedCourses = courses.map(course => {
          if (course._id === editCourseId) {
            return { ...course, ...editFormData };
          }
          return course;
        });
        setCourses(updatedCourses);
        setEditCourseId(null);
      } else {
        console.error('Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditCourseId(null);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/v1/courses/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const updatedCourses = courses.map(course => {
          if (course._id === id) {
            // Toggle the approval status
            return { ...course, approved: !course.approved };
          }
          return course;
        });
        setCourses(updatedCourses);
      } else {
        console.error('Failed to toggle approval status');
      }
    } catch (error) {
      console.error('Error toggling approval status:', error);
    }
  };


  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    }
  }, []);

  return (
    <Box m={3}>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.course_title}
                </Typography>
                <img src={course.course_picture} alt={course.course_title} style={{ maxWidth: '100%' }} />
                <Typography variant="body2" color="textSecondary">
                  {course.course_description}
                </Typography>
                <Typography variant="body2">
                  Categories: {course.categories.join(', ')}
                </Typography>
                <Typography variant="body2">
                  Duration: {course.course_duration}
                </Typography>
                <Typography variant="body2">
                  Price: ${course.price}
                </Typography>
                <Typography variant="body2">
                  Lecturer ID: {course.lecturer_ID}
                </Typography>
                
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(course._id)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(course._id)}>Delete</Button>
                

                  {/* Conditionally render the Approve button */}
                {userRole === 'admin' && (
                  <Button
                    variant="contained"
                    color={course.approved ? "primary" : "secondary"}
                    onClick={() => handleApprove(course._id)}
                  >
                    {course.approved ? "Approved" : "Approve"}
                  </Button>
                )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={Boolean(editCourseId)} onClose={handleCancelEdit}>
  <DialogTitle>Edit Course</DialogTitle>
  <DialogContent>
    <form onSubmit={handleEditFormSubmit}>
      <TextField
        label="Course Title"
        name="course_title"
        value={editFormData.course_title}
        onChange={handleEditFormChange}
        fullWidth
      />
      <TextField
        label="Course Description"
        name="course_description"
        value={editFormData.course_description}
        onChange={handleEditFormChange}
        fullWidth
      />
      
      <TextField
        label="Categories"
        name="categories"
        value={editFormData.categories}
        onChange={handleEditFormChange}
        fullWidth
      />
      <TextField
        label="Course Picture URL"
        name="course_picture"
        value={editFormData.course_picture}
        onChange={handleEditFormChange}
        fullWidth
      />
      <TextField
        label="Price"
        name="price"
        value={editFormData.price}
        onChange={handleEditFormChange}
        fullWidth
      />
      <TextField
        label="Course Duration"
        name="course_duration"
        value={editFormData.course_duration}
        onChange={handleEditFormChange}
        fullWidth
      />
      <TextField
        label="Lecturer ID"
        name="lecturer_ID"
        value={editFormData.lecturer_ID}
        onChange={handleEditFormChange}
        fullWidth
      />
      <Button type="submit" color="primary">Save Changes</Button>
      <Button onClick={handleCancelEdit} color="secondary">Cancel</Button>
    </form>
  </DialogContent>
</Dialog>
    </Box>
  );
};

export default CourseGrid;
