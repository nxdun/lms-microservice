import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import * as yup from "yup"; // Import yup for validation

//import MUI components for building the registration form
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DynamicBackdrop from 'src/components/common/backdrop'; // Import the backdrop component

// Define Yup schema for validation
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
});

//functional component for the registration page
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors

  //styling for paper, avatar, and buttons
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //function to handle registration
  const handleRegister = async () => {
    try {
      setLoading(true);
      // Validate input using Yup schema
      await userSchema.validate({ firstName, lastName, email, password }, { abortEarly: false });
      
      // Make a POST request to your backend API endpoint for user registration
      await axios.post("http://localhost:5000/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      // Registration successful, you may redirect the user to login or show a success message
      console.log("Registration successful!");
      
      //navigate to login page
      window.location.href = "/login/learner";
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        setValidationErrors(error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {}));
      } else {
        // Handle other errors, such as network errors
        console.error("Error registering user:", error);
      }
      setLoading(false);
    }
  };

  //function to handle form submission and registration
  const onSignUp = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <HowToRegOutlinedIcon />
          </Avatar>
          <h2>Learner Register</h2>
        </Grid>
        <form onSubmit={onSignUp}>
          <TextField
            label="First Name"
            placeholder="Enter first name"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!validationErrors.firstName}
            helperText={validationErrors.firstName}
          />
          <TextField
            label="Last Name"
            placeholder="Enter last name"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!validationErrors.lastName}
            helperText={validationErrors.lastName}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography>
          {" "}
          Want to Login ? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
      <DynamicBackdrop open={loading} />
    </Grid>
  );
};

export default Register;
