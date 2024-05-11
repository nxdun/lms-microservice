import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Card,
  MenuItem, // Import MenuItem for dropdown
} from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import axios from "axios";

const AddCourseForm = () => {
  const [courses, setCourses] = useState([]); // State to hold courses

  useEffect(() => {
    // Fetch courses from API
    axios.get("http://localhost:5000/browse")
      .then((response) => {
        setCourses(response.data); // Update courses state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Define validation schema
  const courseSchema = yup.object().shape({
    courseId: yup.string().required("Course ID is required"),
    videoUrls: yup
      .array()
      .of(yup.string().url().required("Video URL is required"))
      .required("At least one video URL is required"),
    chapters: yup
      .array()
      .of(yup.string().required("Chapter name is required"))
      .required("At least one chapter is required"),
    quizzes: yup.array().of(
      yup.object().shape({
        question: yup.string().required("Question is required"),
        options: yup
          .array()
          .of(yup.string().required("Option is required"))
          .min(4, "At least four options are required"),
        correctAnswerIndex: yup
          .number()
          .required("Correct answer index is required")
          .min(0)
          .max(3, "Correct answer index must be between 0 and 3"),
      })
    ),
  });

  const initialValues = {
    courseId: "", // Initially empty as we are selecting course from dropdown
    videoUrls: [""], // Initially one video URL field
    chapters: [],
    quizzes: [],
  };

  const handleFormSubmit = async (values, actions) => {
    // Check if video URL count and chapter count are equal
    if (values.videoUrls.length !== values.chapters.length) {
      alert("Video URL count and chapter count must be equal.");
      return;
    }

    // Log form values
    console.log(values);
    // Here you can handle form submission, e.g., send data to an API

    axios.post("http://localhost:5000/addcoursecontent", values)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Course content added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });

    // Reset form values
    actions.resetForm({
      values: initialValues,
    });
  };

  const copyToClipboard = () => {
    window.location.href = "/upload";
  };

  return (
    <Box m="20px">
      <Header title="ADD COURSE CONTENT" subtitle="Add Content to Course" />

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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Paper>
              <Box p={3}>
                {/* Dropdown for selecting course */}
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Select Course"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.courseId}
                  name="courseId"
                  error={touched.courseId && errors.courseId}
                  helperText={touched.courseId && errors.courseId}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.course_title}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Video URLs */}
                <FieldArray name="videoUrls">
                  {({ push, remove }) => (
                    <div>
                      {values.videoUrls.map((url, index) => (
                        <div key={index}>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`Video URL ${index + 1}`}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: `videoUrls[${index}]`,
                                  value: e.target.value,
                                },
                              });
                            }}
                            value={url}
                            name={`videoUrls[${index}]`}
                            error={
                              touched.videoUrls &&
                              touched.videoUrls[index] &&
                              errors.videoUrls &&
                              errors.videoUrls[index]
                            }
                            helperText={
                              touched.videoUrls &&
                              touched.videoUrls[index] &&
                              errors.videoUrls &&
                              errors.videoUrls[index]
                            }
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove Video URL
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          push("");
                        }}
                      >
                        Add Video URL
                      </Button>
                    </div>
                  )}
                </FieldArray>

                {/* Chapters */}
                <FieldArray name="chapters">
                  {({ push, remove }) => (
                    <div>
                      {values.chapters.map((chapter, index) => (
                        <div key={index}>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={`Chapter ${index + 1}`}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: `chapters[${index}]`,
                                  value: e.target.value,
                                },
                              });
                            }}
                            value={chapter}
                            name={`chapters[${index}]`}
                            error={
                              touched.chapters &&
                              touched.chapters[index] &&
                              errors.chapters &&
                              errors.chapters[index]
                            }
                            helperText={
                              touched.chapters &&
                              touched.chapters[index] &&
                              errors.chapters &&
                              errors.chapters[index]
                            }
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove Chapter
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          push("");
                        }}
                      >
                        Add Chapter
                      </Button>
                    </div>
                  )}
                </FieldArray>

                {/* Quizzes */}
                <FieldArray name="quizzes">
                  {({ push, remove }) => (
                    <div>
                      {values.quizzes.map((quiz, index) => (
                        <div key={index}>
                          <Typography variant="h6">{`Question ${
                            index + 1
                          }`}</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Question"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: `quizzes[${index}].question`,
                                  value: e.target.value,
                                },
                              });
                            }}
                            value={quiz.question}
                            name={`quizzes[${index}].question`}
                            error={
                              touched.quizzes &&
                              touched.quizzes[index] &&
                              touched.quizzes[index].question &&
                              errors.quizzes &&
                              errors.quizzes[index] &&
                              errors.quizzes[index].question
                            }
                            helperText={
                              touched.quizzes &&
                              touched.quizzes[index] &&
                              touched.quizzes[index].question &&
                              errors.quizzes &&
                              errors.quizzes[index] &&
                              errors.quizzes[index].question
                            }
                          />
                          <FieldArray name={`quizzes[${index}].options`}>
                            {({ push: pushOption, remove: removeOption }) => (
                              <div>
                                {quiz.options.map((option, optionIndex) => (
                                  <div key={optionIndex}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      type="text"
                                      label={`Option ${optionIndex + 1}`}
                                      onBlur={handleBlur}
                                      onChange={(e) => {
                                        handleChange({
                                          target: {
                                            name: `quizzes[${index}].options[${optionIndex}]`,
                                            value: e.target.value,
                                          },
                                        });
                                      }}
                                      value={option}
                                      name={`quizzes[${index}].options[${optionIndex}]`}
                                      error={
                                        touched.quizzes &&
                                        touched.quizzes[index] &&
                                        touched.quizzes[index].options &&
                                        touched.quizzes[index].options[
                                          optionIndex
                                        ] &&
                                        errors.quizzes &&
                                        errors.quizzes[index] &&
                                        errors.quizzes[index].options &&
                                        errors.quizzes[index].options[
                                          optionIndex
                                        ]
                                      }
                                      helperText={
                                        touched.quizzes &&
                                        touched.quizzes[index] &&
                                        touched.quizzes[index].options &&
                                        touched.quizzes[index].options[
                                          optionIndex
                                        ] &&
                                        errors.quizzes &&
                                        errors.quizzes[index] &&
                                        errors.quizzes[index].options &&
                                        errors.quizzes[index].options[
                                          optionIndex
                                        ]
                                      }
                                    />
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        removeOption(optionIndex);
                                      }}
                                    >
                                      Remove Option
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    pushOption("");
                                  }}
                                >
                                  Add Option
                                </Button>
                              </div>
                            )}
                          </FieldArray>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Correct Answer Index"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: `quizzes[${index}].correctAnswerIndex`,
                                  value: e.target.value,
                                },
                              });
                            }}
                            value={quiz.correctAnswerIndex}
                            name={`quizzes[${index}].correctAnswerIndex`}
                            error={
                              touched.quizzes &&
                              touched.quizzes[index] &&
                              touched.quizzes[index].correctAnswerIndex &&
                              errors.quizzes &&
                              errors.quizzes[index] &&
                              errors.quizzes[index].correctAnswerIndex
                            }
                            helperText={
                              touched.quizzes &&
                              touched.quizzes[index] &&
                              touched.quizzes[index].correctAnswerIndex &&
                              errors.quizzes &&
                              errors.quizzes[index] &&
                              errors.quizzes[index].correctAnswerIndex
                            }
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove Quiz
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          push({
                            question: "",
                            options: ["", "", "", ""],
                            correctAnswerIndex: "",
                          });
                        }}
                      >
                        Add Quiz
                      </Button>
                    </div>
                  )}
                </FieldArray>

                {/* Add Course Content button */}
                <Button variant="contained" color="primary" type="submit">
                  Add Course Content
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>

      <Card style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={copyToClipboard}>Upload Files</Button>
      </Card>
    </Box>
  );
};

export default AddCourseForm;
