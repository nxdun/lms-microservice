import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardMedia, Avatar, Chip, Button, Skeleton } from '@mui/material';

const CourseSPA = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);

  // Sample useEffect to fetch course data (replace with your actual fetch logic)
  useEffect(() => {
    // Simulate fetching course data
    setTimeout(() => {
      setCourseData({
        _id: "sampleid",
        title: "Sample Course",
        coursePic: "https://via.placeholder.com/300",
        description: "This is a sample course description",
        instructor: "Sample Instructor Name",
        instructorPic: "https://via.placeholder.com/150",
        instructorBio: "This is a sample instructor bio",
        duration: "2 weeks", 
        categories: ["Sample Category 1", "Sample Category 2", "Sample Category 3"],
        enrollState: false,
      });
      setLoading(false);
    }, 1000); // Simulating async fetch delay
  }, [id]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {/* Course Title and Image Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        {/* Course Description Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>
        {/* Instructor Information Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>
        {/* Categories Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>
        {/* About the Instructor Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>
        {/* Enroll Now Button Skeleton */}
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Course Title and Image */}
      <Grid item xs={12}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={courseData.coursePic}
            alt={courseData.title}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">{courseData.title}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Course Description */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="body1" align="center">{courseData.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Instructor Information */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={courseData.instructorPic} alt={courseData.instructor} />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant="body1">{courseData.instructor}</Typography>
                <Typography variant="body2">{courseData.duration}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* Categories */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="body2" gutterBottom>Categories:</Typography>
            <div>
              {courseData.categories.map((category, index) => (
                <Chip key={index} label={category} style={{ marginRight: '5px', marginTop: '5px' }} />
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* About the Instructor */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>About the Instructor</Typography>
            <Avatar src={courseData.instructorPic} alt={courseData.instructor} />
            <Typography variant="body1" gutterBottom>{courseData.instructorBio}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Enroll Now Button */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button variant="contained" color="primary" fullWidth disabled={courseData.enrollState}>
              {courseData.enrollState ? 'Enrolled' : 'Enroll Now'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseSPA;
