import { Grid, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";


const BrowseCourses = ({ sampleCourseData }) => {

    console.log(sampleCourseData);
    const EnrollAction = (courseId) => {
        if (!courseId) return;
        window.location.href = `/browse/view/${courseId}`;
    };
    


    // If sampleCourseData is available, render the course cards
    return (
        <div>
            <Grid container spacing={3} sx={{paddingTop:"10vh"}}>
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
                                        alt={course.lecturer.ppic}
                                    />
                                    <Typography
                                        variant="body2"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        {course.lecturer.name}
                                    </Typography>
                                </div>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginTop: "auto" }}
                                fullWidth
                                onClick={() => EnrollAction(course._id)}
                            >
                                Enroll
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

BrowseCourses.propTypes = {
    sampleCourseData: PropTypes.array,
};

export default BrowseCourses;
