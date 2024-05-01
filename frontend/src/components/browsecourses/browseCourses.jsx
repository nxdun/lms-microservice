import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import propval from "prop-types";
const BrowseCourses = ({ sampleCourseData }) => {
  const EnrollAction = (courseId) =>{
    if (!courseId) return;
    //append course id to route and redirect to course page
    window.location.href = `/browse/view/${courseId}`;
  };

  // If the sampleCourseData is empty or less than o, display a Skeleton component
  // Otherwise, display the course data

  return (
    <>
      {sampleCourseData.length === 0 ? (
        <>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"1000vh"}
            style={{ backgroundColor: "grey", marginTop: "10vh" }}
          />
        </>
      ) : (
        <div>
          <Typography variant="h3" gutterBottom>
            Browse Courses
          </Typography>
          <Grid container spacing={3}>
            {sampleCourseData.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {course.description}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Avatar
                        src={course.instructorPic}
                        alt={course.instructor}
                      />
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "10px" }}
                      >
                        {course.instructor}
                      </Typography>
                    </div>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "auto" }}
                    fullWidth
                    onClick={() => EnrollAction(course.id)}
                  >
                    Enroll
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default BrowseCourses;

BrowseCourses.propTypes = {
  sampleCourseData: propval.array.isRequired,
};
