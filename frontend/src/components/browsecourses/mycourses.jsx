import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DynamicBackdrop from "../common/backdrop";
const MyCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Pc, setPc] = useState(40);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get("http://localhost:5000/browse");
        const courses = coursesResponse.data;

        const coursesWithLecturers = await Promise.all(
          courses.map(async (course) => {
            const lecturerResponse = await axios.get(
              `http://localhost:5000/lecget/${course.lecturer_ID}`
            );
            const lecturerData = lecturerResponse.data;
            return { ...course, lecturer: lecturerData };
          })
        );

        setCourseData(coursesWithLecturers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Disable horizontal scrolling on mount
    document.body.style.overflowX = "hidden";

    // Re-enable horizontal scrolling on unmount
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleLearnNowClick = (courseId) => {
    // Handle the Learn Now button click event
    console.log(`Learn Now clicked for course ID: ${courseId}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
                      src={course.lecturer.ppic}
                      alt={course.lecturer.name}
                    />
                    <Typography variant="body2" style={{ marginLeft: "10px" }}>
                      {course.lecturer.name}
                    </Typography>
                  </div>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px",
                  }}
                >
                  Progress:
                  <Box sx={{ width: "100%" }}></Box>
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
      </Box>
      <DynamicBackdrop open={loading} />
    </>
  );
};

export default MyCourses;
