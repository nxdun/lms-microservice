import { Box, Grid } from "@mui/material"
import BrowseCourses from "./browseCourses.jsx"
import { useState, useEffect } from 'react'

export default function Browse() {
    const [sampleCourseData, setSampleCourseData] = useState([]);

    //to retrive courselist from the database
    useEffect(() => {
        setSampleCourseData([
            {
                id: 1,
                title: "Introduction to Computer Science",
                description: "This is a course that introduces students to the basics of computer science",
                instructor: "John Doe",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                enrolled: false,
                price: 0.00,
            },
            
        ]);
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
                    <BrowseCourses sampleCourseData={sampleCourseData} />
                </Grid>
            </Grid>
        </Box>
    );
}
