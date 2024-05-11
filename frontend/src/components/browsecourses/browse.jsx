import { Box, Grid } from "@mui/material";
import BrowseCourses from "./browseCourses.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from "src/components/common/backdrop.jsx";

export default function Browse() {
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    //API: /browse + /lecget/:id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get("http://localhost:5000/browse");
                const courses = coursesResponse.data;
    
                const approvedCourses = courses.filter(course => course.approved === true);
    
                const coursesWithLecturers = await Promise.all(
                    approvedCourses.map(async course => {
                        console.log("Course ID:", course.lecturer_ID);
                        const lecturerResponse = await axios.get(`http://localhost:5000/lecget/${course.lecturer_ID}`);
                        const lecturerData = lecturerResponse.data;
                        return { ...course, lecturer: lecturerData };
                    })
                );
    
                setCourseData(coursesWithLecturers);
                setLoading(false); // Set loading to false when data fetching is complete
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    
        // Disable horizontal scrolling on mount
        document.body.style.overflowX = 'hidden';
    
        // Re-enable horizontal scrolling on unmount
        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                marginTop: "-2vh",
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {loading ? (
                        <Backdrop open={loading} />
                    ) : (
                        <BrowseCourses sampleCourseData={courseData} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
