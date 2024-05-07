import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Button,
  Skeleton,
} from "@mui/material";
import Backdrop from "src/components/common/backdrop.jsx";
import axios from "axios";

const CourseSPA = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  console.log(courseData);
  useEffect(() => {
    // Validate course ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("Invalid course ID");
      return;
    }
    const fetchCourseData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:5000/browse/${id}`
        );
        const course = courseResponse.data;

        const lecturerResponse = await axios.get(
          `http://localhost:5000/lecget/${course.lecturer_ID}`
        );
        const lecturer = lecturerResponse.data;

        setCourseData({ ...course, lecturer });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Backdrop open={loading} />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100vh"
          style={{ marginBottom: "10px", backgroundColor: "grey" }}
        />
      </>
    );
  }

  if (!courseData) {
    return <Typography variant="body1">Course not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {/* Course Title and Image */}
      <Grid item xs={12}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={courseData.course_picture}
            alt={courseData.course_title}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              {courseData.course_title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Course Description */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="body1" align="center">
              {courseData.course_description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Instructor Information */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={courseData.lecturer.ppic}
                alt={courseData.lecturer.name}
              />
              <div style={{ marginLeft: "10px" }}>
                <Typography variant="body1">
                  {courseData.lecturer.name}
                </Typography>
                <Typography variant="body2">
                  {courseData.course_duration}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* Categories */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              Categories:
            </Typography>
            <div>
              {courseData.categories ? (
                courseData.categories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    style={{ marginRight: "5px" }}
                  />
                ))
              ) : (
                <Chip label="None" style={{ marginRight: "5px" }} />
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* About the Instructor */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              About the Instructor
            </Typography>
            <Avatar
              src={courseData.lecturer.ppic}
              alt={courseData.lecturer.name}
            />
            <Typography variant="body1" gutterBottom>
              {courseData.lecturer.bio}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Social Media:
            </Typography>
            <div>
              {courseData.lecturer.socialMedia ? (
                courseData.lecturer.socialMedia.map((social, index) => (
                  <Chip
                    key={index}
                    label={social}
                    style={{ marginRight: "5px" }}
                  />
                ))
              ) : (
                <Chip label="None" style={{ marginRight: "5px" }} />
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* Enroll Now Button */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={courseData.enrollState}
            >
              {courseData.enrollState ? "Enrolled" : `Enroll Now - ${Number(courseData.price)} LKR`}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseSPA;
