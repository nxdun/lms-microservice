import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  chapterVideoUrls: {},
  chapters: [],
  quizzes: [],
};

const courseSchema = yup.object().shape({
  chapterVideoUrls: yup.object().test(
    "notEmpty",
    "At least one video URL must be added to each chapter",
    (value) => {
      if (!value) return false;
      const chapterKeys = Object.keys(value);
      return chapterKeys.every((chapter) => value[chapter]?.length > 0);
    }
  ),
  chapters: yup.array().of(yup.string().required("required")),
  quizzes: yup.array().of(
    yup.object().shape({
      question: yup.string().required("required"),
      options: yup.array().of(yup.string()).min(4, "At least four options are required"),
      correctAnswerIndex: yup.number().required("required").min(0).max(3, "Correct answer index must be between 0 and 3"),
    })
  ),
});

const AddCourseForm = () => {
  const handleFormSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm({
      values: initialValues,
    });
  };

  const handleRemoveChapter = (index, handleChange, values) => {
    return () => {
      const updatedChapters = [...values.chapters];
      updatedChapters.splice(index, 1);
      handleChange({ target: { name: "chapters", value: updatedChapters } });
  
      const updatedChapterVideoUrls = { ...values.chapterVideoUrls };
      delete updatedChapterVideoUrls[values.chapters[index]];
      handleChange({ target: { name: "chapterVideoUrls", value: updatedChapterVideoUrls } });
    };
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
          <Paper component="form" onSubmit={handleSubmit}>
            <Box p={3}>
              <Grid container spacing={3}>
                {values.chapters.map((chapter, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Typography variant="h6">{`Chapter ${index + 1}`}</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Chapter Name"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const updatedChapters = [...values.chapters];
                        updatedChapters[index] = e.target.value;
                        handleChange({ target: { name: "chapters", value: updatedChapters } });
                      }}
                      value={chapter || ""}
                      name={`chapters[${index}]`}
                      error={touched.chapters && touched.chapters[index] && errors.chapters && errors.chapters[index]}
                      helperText={(touched.chapters && touched.chapters[index]) && (errors.chapters && errors.chapters[index])}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Video URL"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const updatedChapterVideoUrls = { ...values.chapterVideoUrls };
                        updatedChapterVideoUrls[chapter] = e.target.value;
                        handleChange({ target: { name: "chapterVideoUrls", value: updatedChapterVideoUrls } });
                      }}
                      value={values.chapterVideoUrls[chapter] || ""}
                      name={`chapterVideoUrls.${chapter}`}
                      error={touched.chapterVideoUrls && touched.chapterVideoUrls[chapter] && errors.chapterVideoUrls && errors.chapterVideoUrls[chapter]}
                      helperText={(touched.chapterVideoUrls && touched.chapterVideoUrls[chapter]) && (errors.chapterVideoUrls && errors.chapterVideoUrls[chapter])}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleRemoveChapter(index, handleChange, values)}
                    >
                      Remove Chapter
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const updatedChapterVideoUrls = { ...values.chapterVideoUrls };
                  updatedChapterVideoUrls[`Chapter ${values.chapters.length + 1}`] = "";
                  handleChange({ target: { name: "chapterVideoUrls", value: updatedChapterVideoUrls } });

                  const updatedChapters = [...values.chapters, `Chapter ${values.chapters.length + 1}`];
                  handleChange({ target: { name: "chapters", value: updatedChapters } });
                }}
              >
                Add Chapter
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" color="primary" variant="contained">
                Add Course Content
              </Button>
            </Box>
          </Paper>
        )}
      </Formik>
    </Box>
  );
};

export default AddCourseForm;
