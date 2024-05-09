import { useState } from 'react';
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { Formik } from "formik";
import * as yup from "yup";

//defining initial values for form fields
const initialValues = {
  course_title: "",
  course_description: "",
  categories: [], // Initialize as an empty array
  course_picture: "",
  price: "",
  course_duration: "",
  lecturer_ID: ""
};

//validation schema for the form fields
const courseSchema = yup.object().shape({
  course_title: yup.string().required("Course title is required"),
  course_description: yup.string().required("Course description is required"),
  categories: yup.array().of(yup.string()).required("At least one category is required"),
  course_picture: yup.string().required("Course picture URL is required"),
  price: yup.number().required("Price is required"),
  course_duration: yup.string().required("Course duration is required"),
  lecturer_ID: yup.string().required("Lecturer ID is required")
});

//form component definition
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //function to handle form submission
  const handleFormSubmit = async (values, actions) => {
    try {
      //sending form data to backend
      const response = await fetch('http://localhost:5000/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      //handling response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      //resetting form values on successful submission
      actions.resetForm({
        values: initialValues
      });

      setErrorMessage("");
      setSuccessMessage("Course created successfully!");

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  }

  //display form
  return (
    <Box m="20px">
      <Header title="CREATE Course" subtitle="Create a New Course" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={courseSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
        <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Course Title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.course_title}
            name="course_title"
            error={!!(touched.course_title && errors.course_title)}
            helperText={touched.course_title && errors.course_title}
            sx={{
                gridColumn: "span 2",
            }}
            />

            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Categories"
                onBlur={handleBlur}
                onChange={(e) => {
                  const selectedCategories = e.target.value.split(',').map(category => category.trim());
                  handleChange({
                    target: {
                      name: 'categories',
                      value: selectedCategories,
                    },
                  });
                }}
                value={values.categories.join(', ')}
                name="categories"
                error={touched.categories && errors.categories}
                helperText={touched.categories && errors.categories}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.course_description}
                name="course_description"
                error={touched.course_description && errors.course_description}
                helperText={touched.course_description && errors.course_description}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Picture URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.course_picture}
                name="course_picture"
                error={touched.course_picture && errors.course_picture}
                helperText={touched.course_picture && errors.course_picture}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={touched.price && errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.course_duration}
                name="course_duration"
                error={touched.course_duration && errors.course_duration}
                helperText={touched.course_duration && errors.course_duration}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Lecturer ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lecturer_ID}
                name="lecturer_ID"
                error={touched.lecturer_ID && errors.lecturer_ID}
                helperText={touched.lecturer_ID && errors.lecturer_ID}
                sx={{ gridColumn: "span 2" }}
              />

            </Box>
            {/* Display success message if course is created successfully */}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            
            {/* Display error message if any */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            
            {/* Submit button */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Create New Course
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
