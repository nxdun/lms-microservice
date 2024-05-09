import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  chapterVideoUrls: {}, // Object to store video URLs for each chapter
  chapters: [], // Array to store chapter names
  quizzes: [], // Array to store quiz questions
};

const courseSchema = yup.object().shape({
  chapterVideoUrls: yup.object().test(
    "notEmpty",
    "At least one video URL must be added to each chapter",
    (value) => {
      const chapterKeys = Object.keys(value);
      return chapterKeys.every((chapter) => value[chapter].length > 0);
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
      delete updatedChapterVideoUrls[`Chapter ${index + 1}`];
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
            >
              {values.chapters.map((chapter, index) => (
                <Box key={index}>
                  <Typography variant="h6">{`Chapter ${index + 1}: ${chapter}`}</Typography>
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
                </Box>
              ))}
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
              {values.quizzes.map((quiz, index) => (
                <Box key={index}>
                  <Typography variant="h6">{`Quiz ${index + 1}`}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Question"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const updatedQuizzes = [...values.quizzes];
                      updatedQuizzes[index].question = e.target.value;
                      handleChange({ target: { name: "quizzes", value: updatedQuizzes } });
                    }}
                    value={quiz.question || ""}
                    name={`quizzes[${index}].question`}
                    error={touched.quizzes && touched.quizzes[index] && errors.quizzes && errors.quizzes[index] && errors.quizzes[index].question}
                    helperText={(touched.quizzes && touched.quizzes[index]) && (errors.quizzes && errors.quizzes[index] && errors.quizzes[index].question)}
                  />
                  {quiz.options.map((option, optionIndex) => (
                    <TextField
                      key={optionIndex}
                      fullWidth
                      variant="filled"
                      type="text"
                      label={`Option ${optionIndex + 1}`}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const updatedQuizzes = [...values.quizzes];
                        updatedQuizzes[index].options[optionIndex] = e.target.value;
                        handleChange({ target: { name: "quizzes", value: updatedQuizzes } });
                      }}
                      value={option}
                      name={`quizzes[${index}].options[${optionIndex}]`}
                    />
                  ))}
                  <TextField
                    fullWidth
                    variant="filled"
                    select
                    label="Correct Answer Index"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const updatedQuizzes = [...values.quizzes];
                      updatedQuizzes[index].correctAnswerIndex = parseInt(e.target.value);
                      handleChange({ target: { name: "quizzes", value: updatedQuizzes } });
                    }}
                    value={quiz.correctAnswerIndex || 0}
                    name={`quizzes[${index}].correctAnswerIndex`}
                    error={touched.quizzes && touched.quizzes[index] && errors.quizzes && errors.quizzes[index] && errors.quizzes[index].correctAnswerIndex}
                    helperText={(touched.quizzes && touched.quizzes[index]) && (errors.quizzes && errors.quizzes[index] && errors.quizzes[index].correctAnswerIndex)}
                  >
                    {quiz.options.map((_, optionIndex) => (
                      <MenuItem key={optionIndex} value={optionIndex}>{`Option ${optionIndex + 1}`}</MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const updatedQuizzes = [...values.quizzes];
                      updatedQuizzes.splice(index, 1);
                      handleChange({ target: { name: "quizzes", value: updatedQuizzes } });
                    }}
                  >
                    Remove Quiz
                  </Button>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const updatedQuizzes = [...values.quizzes, { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 }];
                  handleChange({ target: { name: "quizzes", value: updatedQuizzes } });
                }}
              >
                Add Quiz
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" color="primary" variant="contained">
                Add Course Content
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCourseForm;
