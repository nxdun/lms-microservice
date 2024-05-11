import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DynamicBackdrop from "../common/backdrop";

const MyCourses = () => {
  const userid = localStorage.getItem("token");

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:5000/getenrolledcoursedatabyuid/${userid}`
        );
  
        if (!courseResponse.data || courseResponse.data.length === 0) {
          setError("No courses found.");
          setLoading(false);
          return;
        }
  
        const course = courseResponse.data;
        let coursesArray = [];
  
        if (Array.isArray(course)) {
          coursesArray = course;
        } else {
          coursesArray = [course];
        }
  
        // Fetch lecturer data for each course
        const coursesWithLecturer = await Promise.all(
          coursesArray.map(async (course) => {
            console.log("Course ID:", course.lecturer_ID);
            const lecturerResponse = await axios.get(
              `http://localhost:5000/lecget/${course.lecturer_ID}`
            );
            const lecturer = lecturerResponse.data;
            return { ...course, lecturer };
          })
        );
  
        setCourseData(coursesWithLecturer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
  
      document.body.style.overflowX = "hidden";
  
      return () => {
        document.body.style.overflowX = "auto";
      };
    };
  
    fetchContent();
  }, [userid]);

  const handleLearnNowClick = (courseId) => {
    window.location.href = `/learn/${courseId}`;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingTop: "16vh",
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width={500} height={600} />
        ) : error ? (
          <Grid item xs={12} md={4} key="error">
          <Card
            sx={{
              backgroundColor: "rgba(255, 255,255, 0.95)",
              margin: "10px",
              color: "red", // Change color to indicate error
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="error">
                {error}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {courseData.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4} lg={11}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {course.course_title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {course.course_description}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Avatar
                        src={course.lecturer && course.lecturer.ppic}
                        alt={course.lecturer && course.lecturer.name}
                      />
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "10px" }}
                      >
                        {course.lecturer && course.lecturer.name}
                      </Typography>
                    </div>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Typography variant="body2" sx={{ flex: "1" }}>
                      Progress: {localStorage.getItem(`${course._id}`) || 0}%{" "}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={localStorage.getItem(`${course._id}`) || 0}
                      sx={{
                        flex: "8",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<LocalLibraryIcon />}
                      onClick={() => handleLearnNowClick(course._id)}
                      sx={{
                        margin: "0 1vh 1vh 0",
                        width: "30vh",
                        height: "10vh",
                      }}
                    >
                      Learn Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <DynamicBackdrop open={loading} />
    </>
  );
};

export default MyCourses;
