import { Box, Button, TextField, useMediaQuery, Select, MenuItem } from "@mui/material";
import { Header } from "src/components/admindashboard/";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios"; // Import Axios for HTTP requests
import { useState } from "react"; // Import useState hook

//initial values for form fields
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "admin", // Assuming default role is student
};

//schema for validation using yup
const userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  role: yup.string().required("Role is required"),
});

//form component
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [successMessage, setSuccessMessage] = useState(""); // State variable for success message
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  //function to handle form submission
  const handleFormSubmit = async (values, actions) => {
    try {
      // Send POST request to create user
      const response = await axios.post("http://localhost:2222/api/v1/users", values);
      
      setSuccessMessage("User created successfully!"); // Set success message
      setErrorMessage(""); // Clear error message
      console.log("User created successfully:", response.data);

      // Reset form after successful submission
      actions.resetForm({
        values: initialValues,
      });
      
    } catch (error) {
      setErrorMessage("Error creating user. Please try again."); // Set error message
      setSuccessMessage(""); // Clear success message
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="lecturer">Lecturer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </Box>

            {successMessage && <Box sx={{ color: "green", marginBottom: "10px" }}>{successMessage}</Box>}
            {errorMessage && <Box sx={{ color: "red", marginBottom: "10px" }}>{errorMessage}</Box>}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
