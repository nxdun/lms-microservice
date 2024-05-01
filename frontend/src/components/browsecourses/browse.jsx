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
            {
                id: 2,
                title: "Introduction to Cybersecurity",
                description: "This is a course that introduces students to the basics of cybersecurity",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Jane Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 3,
                title: "Introduction to Data Science",
                description: "This is a course that introduces students to the basics of data science",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Rebecca Smith",
                enrolled: true,
                price: 0.00,
            },
            {
                id: 4,
                title: "Introduction to Machine Learning",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                description: "This is a course that introduces students to the basics of machine learning",
                instructor: "John Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 5,
                title: "Web Development Fundamentals",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Sarah Johnson",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 6,
                title: "Graphic Design Essentials",
                description: "Master the essentials of graphic design and create stunning visual content",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Michael Smith",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 7,
                title: "Introduction to Computer Science",
                description: "This is a course that introduces students to the basics of computer science",
                instructor: "John Doe",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 8,
                title: "Introduction to Cybersecurity",
                description: "This is a course that introduces students to the basics of cybersecurity",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Jane Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 9,
                title: "Introduction to Data Science",
                description: "This is a course that introduces students to the basics of data science",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Rebecca Smith",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 10,
                title: "Introduction to Machine Learning",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                description: "This is a course that introduces students to the basics of machine learning",
                instructor: "John Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 11,
                title: "Web Development Fundamentals",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Sarah Johnson",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 12,
                title: "Graphic Design Essentials",
                description: "Master the essentials of graphic design and create stunning visual content",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Michael Smith",
                enrolled: false,
                price: 0.00,
            },  {
                id: 13,
                title: "Introduction to Computer Science",
                description: "This is a course that introduces students to the basics of computer science",
                instructor: "John Doe",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 14,
                title: "Introduction to Cybersecurity",
                description: "This is a course that introduces students to the basics of cybersecurity",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Jane Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 15,
                title: "Introduction to Data Science",
                description: "This is a course that introduces students to the basics of data science",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Rebecca Smith",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 16,
                title: "Introduction to Machine Learning",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                description: "This is a course that introduces students to the basics of machine learning",
                instructor: "John Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 17,
                title: "Web Development Fundamentals",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Sarah Johnson",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 18,
                title: "Graphic Design Essentials",
                description: "Master the essentials of graphic design and create stunning visual content",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Michael Smith",
                enrolled: true,
                price: 0.00,
            },  {
                id: 19,
                title: "Introduction to Computer Science",
                description: "This is a course that introduces students to the basics of computer science",
                instructor: "John Doe",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 20,
                title: "Introduction to Cybersecurity",
                description: "This is a course that introduces students to the basics of cybersecurity",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Jane Doe",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 21,
                title: "Introduction to Data Science",
                description: "This is a course that introduces students to the basics of data science",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Rebecca Smith",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 22,
                title: "Introduction to Machine Learning",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                description: "This is a course that introduces students to the basics of machine learning",
                instructor: "John Doe",
                enrolled: true,
                price: 0.00,
            },
            {
                id: 23,
                title: "Web Development Fundamentals",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Sarah Johnson",
                enrolled: false,
                price: 0.00,
            },
            {
                id: 24,
                title: "Graphic Design Essentials",
                description: "Master the essentials of graphic design and create stunning visual content",
                instructorPic: "https://via.assets.so/img.jpg?w=200&h=200&tc=blue&bg=#cecece",
                instructor: "Michael Smith",
                enrolled: false,
                price: 0.00,
            },
        ]);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                marginTop: "-4vh",
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
